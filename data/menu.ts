import type { Category, Extra, Product } from '@/types';
// CONTEÚDO DEMONSTRATIVO: substitua pelo catálogo real no Supabase antes do lançamento.
export const categories:Category[]=[{id:'destaques',name:'Destaques'},{id:'combinados',name:'Combinados'},{id:'hot',name:'Hot rolls'},{id:'temakis',name:'Temakis'},{id:'pokes',name:'Pokes'},{id:'bebidas',name:'Bebidas'}];
export const extras:Extra[]=[{id:'cream',name:'Cream cheese',price:3},{id:'salmon',name:'Salmão extra',price:9},{id:'tare',name:'Tarê',price:1.5},{id:'ginger',name:'Gengibre',price:1},{id:'wasabi',name:'Wasabi',price:1}];
export const removals=['Sem cebolinha','Sem gergelim','Sem cream cheese'];
export const products:Product[]=[
{id:'tokyo32',category:'combinados',name:'Tokyo 32',eyebrow:'32 peças',description:'8 uramaki salmão, 8 hot roll, 8 joe e 8 sashimis.',ingredients:['Salmão','Arroz japonês','Nori','Cream cheese'],price:89.9,promotionalPrice:79.9,tag:'MAIS PEDIDO',available:true,visual:'salmon'},
{id:'hot20',category:'hot',name:'Salmão Crunch',eyebrow:'20 unidades',description:'Hot roll crocante, salmão e cream cheese. Finalizado com tarê.',ingredients:['Salmão','Cream cheese','Tarê'],price:44.9,tag:'CROCANTE',available:true,visual:'hot'},
{id:'poke-spicy',category:'pokes',name:'Salmon Spicy',eyebrow:'Bowl 450 g',description:'Salmão fresco, arroz, manga, sunomono, crispy e molho spicy.',ingredients:['Salmão','Manga','Sunomono','Crispy'],price:49.9,tag:'PICANTE',available:true,visual:'poke'},
{id:'combo-casa',category:'destaques',name:'Favorito da Casa',eyebrow:'40 peças',description:'Uma seleção completa para dividir — ou não.',ingredients:['Salmão','Kani','Nori','Arroz japonês'],price:109.9,tag:'NOVO',available:true,visual:'dark'},
{id:'temaki-salmao',category:'temakis',name:'Temaki Salmão',eyebrow:'1 unidade',description:'Salmão em cubos, arroz, cebolinha e cream cheese.',ingredients:['Salmão','Cream cheese','Cebolinha'],price:31.9,available:true,visual:'temaki'},
{id:'hot-doce',category:'hot',name:'Hot Banana',eyebrow:'10 unidades',description:'Banana, chocolate e massa crocante.',ingredients:['Banana','Chocolate'],price:24.9,available:false,visual:'hot'},
{id:'coca',category:'bebidas',name:'Coca-Cola',eyebrow:'Lata 350 ml',description:'Gelada, como tem que ser.',ingredients:[],price:7,available:true,visual:'dark'},
];
