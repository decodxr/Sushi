'use client';
import { create } from 'zustand'; import { persist } from 'zustand/middleware'; import type { CartItem } from '@/types';
type State={items:CartItem[];coupon?:string;add:(item:CartItem)=>void;remove:(key:string)=>void;setQty:(key:string,q:number)=>void;applyCoupon:(code:string)=>boolean;clear:()=>void};
export const useCart=create<State>()(persist((set,get)=>({items:[],add:item=>set({items:[...get().items,item]}),remove:key=>set({items:get().items.filter(x=>x.key!==key)}),setQty:(key,q)=>set({items:get().items.map(x=>x.key===key?{...x,quantity:Math.max(1,q)}:x)}),applyCoupon:code=>{const ok=code.trim().toUpperCase()==='JAPA10';set({coupon:ok?'JAPA10':undefined});return ok},clear:()=>set({items:[],coupon:undefined})}),{name:'sushi-em-casa-cart'}));
