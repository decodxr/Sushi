import {Header} from '@/components/layout/Header';
import {MenuClient} from '@/components/menu/MenuClient';
import {Footer} from '@/components/layout/Footer';
import {getMenu} from '@/services/menu';
export const metadata={title:'Cardápio'};
export const revalidate=60;
export default async function MenuPage({searchParams}:{searchParams:Promise<{produto?:string;promocao?:string}>}){
  const {produto,promocao}=await searchParams;
  let menu;
  try{menu=await getMenu();if(produto&&promocao){const {getDailyPromotion}=await import('@/services/daily-promotion');const active=await getDailyPromotion();if(active?.id===promocao&&active.productId===produto&&active.price!==null)menu.products=menu.products.map(product=>product.id===produto?{...product,promotionalPrice:active.price!}:product)}}catch{menu={categories:[],products:[]};}
  return <main id="conteudo"><div className="relative bg-ink pb-12 pt-32 text-white"><Header/><div className="container"><p className="kicker text-signal">Escolheu. Pediu. Chegou.</p><h1 className="display mt-4 text-6xl md:text-8xl">CARDÁPIO.</h1></div></div>{menu.categories.length?<MenuClient {...menu} initialProductId={produto}/>:<div className="container py-32 text-center"><h2 className="display text-4xl">CARDÁPIO INDISPONÍVEL.</h2><p className="mt-4 text-steel">Tente novamente em instantes.</p></div>}<Footer/></main>
}
