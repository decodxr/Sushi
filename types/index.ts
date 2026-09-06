export type Category = { id:string; name:string; slug?:string; description?:string; displayOrder?:number };
export type OptionItem = { id:string; name:string; price:number; available?:boolean };
export type ProductOption = { id:string; name:string; required:boolean; minSelections:number; maxSelections:number; items:OptionItem[] };
export type Product = { id:string; category:string; name:string; eyebrow:string; description:string; ingredients:string[]; price:number; promotionalPrice?:number; tag?:string; available:boolean; featured?:boolean; imageUrl?:string; visual:'salmon'|'hot'|'poke'|'temaki'|'dark'; options?:ProductOption[] };
export type Extra = OptionItem;
export type CartItem = { key:string; product:Product; quantity:number; extras:Extra[]; removals:string[]; note:string };
export type OrderStatus='pending'|'confirmed'|'preparing'|'ready'|'out_for_delivery'|'delivered'|'cancelled';
