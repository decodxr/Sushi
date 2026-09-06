export type Category = { id:string; name:string };
export type Product = { id:string; category:string; name:string; eyebrow:string; description:string; ingredients:string[]; price:number; promotionalPrice?:number; tag?:string; available:boolean; visual:'salmon'|'hot'|'poke'|'temaki'|'dark' };
export type Extra = { id:string; name:string; price:number };
export type CartItem = { key:string; product:Product; quantity:number; extras:Extra[]; removals:string[]; note:string };
