import type { SupabaseClient } from '@supabase/supabase-js';
import type { CreateOrderInput } from './schema';
import {resolveDailyPromotion} from '@/services/daily-promotion-shared';
import type {PromotionSchedule} from '@/types/promotion';

type ProductRow={id:string;name:string;price:number|string;promotional_price:number|string|null;is_available:boolean};
type OptionDefinition={id:string;name:string;product_id:string;required:boolean;min_selections:number;max_selections:number};
type SelectedOption={id:string;name:string;price_modifier:number|string;is_available:boolean;product_options:OptionDefinition};

export async function calculateOrder(db:SupabaseClient,input:CreateOrderInput){
  const ids=[...new Set(input.items.map(item=>item.productId))];
  const productResult=await db.from('products').select('id,name,price,promotional_price,is_available').in('id',ids);
  if(productResult.error)throw new Error('Falha ao validar produtos.');
  const products=productResult.data as ProductRow[];
  if(products.length!==ids.length)throw new Error('Um produto não existe.');

  const promotionResult=await db.from('promotion_schedule').select('*,products(id,name,price,image_url,is_available,active)').eq('is_active',true);
  const dailyPromotion=promotionResult.error?null:resolveDailyPromotion((promotionResult.data??[]) as unknown as PromotionSchedule[]);
  const definitionsResult=await db.from('product_options').select('id,name,product_id,required,min_selections,max_selections').in('product_id',ids);
  if(definitionsResult.error)throw new Error('Falha ao validar opções.');
  const definitions=definitionsResult.data as OptionDefinition[];
  const optionIds=[...new Set(input.items.flatMap(item=>item.optionItemIds))];
  let optionItems:SelectedOption[]=[];
  if(optionIds.length){
    const result=await db.from('product_option_items').select('id,name,price_modifier,is_available,product_options!inner(id,name,product_id,required,min_selections,max_selections)').in('id',optionIds);
    if(result.error)throw new Error('Falha ao validar adicionais.');
    optionItems=result.data as unknown as SelectedOption[];
  }

  const lines=input.items.map(item=>{
    const product=products.find(candidate=>candidate.id===item.productId);
    if(!product?.is_available)throw new Error(`${product?.name??'Produto'} está indisponível.`);
    const selected=optionItems.filter(option=>item.optionItemIds.includes(option.id));
    if(selected.some(option=>!option.is_available||option.product_options.product_id!==item.productId))throw new Error('Adicional inválido.');
    const counts=new Map<string,number>();
    selected.forEach(option=>counts.set(option.product_options.id,(counts.get(option.product_options.id)??0)+1));
    const productDefinitions=definitions.filter(option=>option.product_id===item.productId);
    if(productDefinitions.some(option=>(counts.get(option.id)??0)<option.min_selections||(counts.get(option.id)??0)>option.max_selections))throw new Error('Seleção de adicionais inválida.');
    const basePrice=dailyPromotion?.productId===product.id&&dailyPromotion.price!==null?dailyPromotion.price:Number(product.promotional_price??product.price);
    const unit=basePrice+selected.reduce((sum,option)=>sum+Number(option.price_modifier),0);
    return {...item,product,selected,unit,subtotal:unit*item.quantity};
  });

  const subtotal=lines.reduce((sum,line)=>sum+line.subtotal,0);let discount=0;
  if(input.couponCode){
    const now=new Date().toISOString();
    const {data:coupon}=await db.from('coupons').select('*').eq('code',input.couponCode.toUpperCase()).eq('is_active',true).lte('starts_at',now).gte('ends_at',now).maybeSingle();
    if(!coupon||subtotal<Number(coupon.minimum_order))throw new Error('Cupom inválido ou fora das regras.');
    discount=coupon.discount_type==='percent'?subtotal*(Number(coupon.discount_value)/100):Number(coupon.discount_value);
    discount=Math.min(discount,subtotal);
  }
  let deliveryFee=0;
  if(input.fulfillmentType==='delivery'){
    const {data:zone}=await db.from('delivery_zones').select('fee,minimum_order,is_active').eq('id',input.deliveryZoneId).single();
    if(!zone?.is_active||subtotal<Number(zone.minimum_order))throw new Error('Entrega indisponível para esta região ou valor.');
    deliveryFee=Number(zone.fee);
  }
  return {lines,subtotal,discount,deliveryFee,total:subtotal-discount+deliveryFee};
}
