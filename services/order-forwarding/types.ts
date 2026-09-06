export type ForwardingMode='whatsapp'|'external'|'both'|'none';
export type ForwardingLine={quantity:number;name:string;options:string[];notes?:string};
export type ForwardingOrder={id:string;number:number;customer:{name:string;phone:string};fulfillmentType:'delivery'|'pickup';paymentMethod:'pix'|'cash'|'card_on_delivery';changeFor?:number;address?:{postalCode:string;street:string;number:string;complement?:string;district:string;reference?:string};lines:ForwardingLine[];subtotal:number;deliveryFee:number;discount:number;total:number;generalNotes?:string};
export type ForwardingResult={mode:ForwardingMode;whatsappUrl?:string;external:{enabled:false;reason:string}};
