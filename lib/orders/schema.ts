import {z} from 'zod';
export const createOrderSchema=z.object({
  idempotencyKey:z.string().uuid(),customer:z.object({name:z.string().trim().min(2).max(100),phone:z.string().transform(value=>value.replace(/\D/g,'')).pipe(z.string().min(10).max(13))}),
  fulfillmentType:z.enum(['delivery','pickup']),paymentMethod:z.enum(['pix','cash','card_on_delivery']),changeFor:z.number().positive().optional(),couponCode:z.string().trim().max(30).optional(),deliveryZoneId:z.string().uuid().optional(),
  address:z.object({postalCode:z.string().regex(/^\d{5}-?\d{3}$/),street:z.string().min(2).max(150),number:z.string().min(1).max(20),complement:z.string().max(100).optional(),district:z.string().min(2).max(100),reference:z.string().max(150).optional()}).optional(),
  items:z.array(z.object({productId:z.string().uuid(),quantity:z.number().int().min(1).max(20),optionItemIds:z.array(z.string().uuid()).max(20),notes:z.string().max(300).optional()})).min(1).max(40),
}).superRefine((data,ctx)=>{if(data.fulfillmentType==='delivery'&&!data.address)ctx.addIssue({code:'custom',message:'Endereço obrigatório para entrega',path:['address']});if(data.fulfillmentType==='delivery'&&!data.deliveryZoneId)ctx.addIssue({code:'custom',message:'Região de entrega obrigatória',path:['deliveryZoneId']});if(data.paymentMethod==='cash'&&data.changeFor===undefined)ctx.addIssue({code:'custom',message:'Informe o troco',path:['changeFor']});});
export type CreateOrderInput=z.infer<typeof createOrderSchema>;
