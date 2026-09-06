import {categories as fallbackCategories,products as fallbackProducts} from '@/data/menu';
import type {Category,Product,ProductOption} from '@/types';
import {createAdminClient} from '@/lib/supabase/admin';

type ProductRow={id:string;name:string;slug:string;description:string;price:number|string;promotional_price:number|string|null;image_url:string|null;is_available:boolean;is_featured:boolean;badge:string|null;categories:{slug:string}|null;product_options:Array<{id:string;name:string;required:boolean;min_selections:number;max_selections:number;product_option_items:Array<{id:string;name:string;price_modifier:number|string;is_available:boolean}>}>};

export async function getMenu():Promise<{categories:Category[];products:Product[]}> {
  if(!process.env.NEXT_PUBLIC_SUPABASE_URL||!process.env.SUPABASE_SERVICE_ROLE_KEY)return {categories:fallbackCategories,products:fallbackProducts};
  const db=createAdminClient();
  const [{data:categoryRows,error:categoryError},{data:productRows,error:productError}]=await Promise.all([
    db.from('categories').select('id,name,slug,description,display_order').eq('is_active',true).order('display_order'),
    db.from('products').select('id,name,slug,description,price,promotional_price,image_url,is_available,is_featured,badge,categories(slug),product_options(id,name,required,min_selections,max_selections,display_order,product_option_items(id,name,price_modifier,is_available,display_order))').order('display_order'),
  ]);
  if(categoryError||productError)throw new Error('Não foi possível carregar o cardápio.');
  const categories=(categoryRows??[]).map(row=>({id:row.slug,name:row.name,slug:row.slug,description:row.description??undefined,displayOrder:row.display_order}));
  const products=(productRows as unknown as ProductRow[]??[]).map(row=>({id:row.id,category:row.categories?.slug??'',name:row.name,eyebrow:row.badge??'Feito na hora',description:row.description,ingredients:[],price:Number(row.price),promotionalPrice:row.promotional_price===null?undefined:Number(row.promotional_price),tag:row.badge??undefined,available:row.is_available,featured:row.is_featured,imageUrl:row.image_url??undefined,visual:'dark' as const,options:row.product_options.map((option):ProductOption=>({id:option.id,name:option.name,required:option.required,minSelections:option.min_selections,maxSelections:option.max_selections,items:option.product_option_items.map(item=>({id:item.id,name:item.name,price:Number(item.price_modifier),available:item.is_available}))}))}));
  return {categories,products};
}
