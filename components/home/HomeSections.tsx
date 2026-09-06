import Link from "next/link";
import {
  ArrowUpRightIcon,
  InstagramIcon,
  MapPinIcon,
  StarIcon,
} from "lucide-react";

import { restaurant } from "@/data/restaurant";

const reviews = [
  {
    content:
      "Comida incrível! Sempre me surpreendo com o sabor e com a qualidade dos pratos. Tudo muito fresquinho.",
    name: "Mariana",
    source: "Google",
  },
  {
    content: "Comida maravilhosa, bem saborosa e temperada.",
    name: "Carla",
    source: "Google",
  },
  {
    content: "Achei muito gostoso o sushi e são atenciosos.",
    name: "Rafael",
    source: "Google",
  },
] as const;

export function HomeSections() {
  return (
    <>
      <section className="overflow-hidden bg-lamp py-20">
        <div className="ticker border-y border-ink/30 py-3">
          <div className="display text-5xl">
            HOJE TEM. &nbsp; HOJE PEDE SUSHI. &nbsp; HOJE TEM. &nbsp; HOJE
            PEDE SUSHI. &nbsp;
          </div>
        </div>

        <div className="container mt-16 grid items-end gap-10 md:grid-cols-2">
          <div>
            <span className="kicker">Oferta ativa até 22:30</span>
            <h2 className="display mt-5 text-6xl md:text-8xl">
              TERÇA
              <br />
              DO HOT.
            </h2>
          </div>
          <div className="border-l border-ink pl-8">
            <p className="text-lg">20 unidades • Salmão Crunch</p>
            <strong className="display mt-3 block text-6xl">R$ 39,90</strong>
            <Link className="btn btn-dark mt-8" href="/cardapio">
              Quero agora <ArrowUpRightIcon aria-hidden="true" size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-ink py-24 text-white">
        <div className="container">
          <p className="kicker text-signal">Do feed pra mesa</p>
          <h2 className="display mt-5 max-w-4xl text-5xl md:text-8xl">
            PEDIR É FÁCIL.
            <br />
            DIFÍCIL É NÃO PEDIR DE NOVO.
          </h2>
          <div className="mt-14 grid grid-cols-2 gap-2 md:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                aria-label="Espaço configurável para foto do Instagram"
                className="food-visual grain aspect-square"
                key={item}
                role="img"
              />
            ))}
          </div>
          <a
            className="btn btn-outline mt-8"
            href={`https://instagram.com/${restaurant.instagram}`}
            rel="noreferrer"
            target="_blank"
          >
            <InstagramIcon aria-hidden="true" size={17} /> @{restaurant.instagram}
          </a>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <span className="kicker text-signal">Palavra de quem pediu</span>
          <h2 className="display mt-5 text-5xl md:text-7xl">
            BOA NOITE.
            <br />
            BOM SUSHI.
          </h2>
          <div className="mt-12 grid gap-px border rule bg-black/20 md:grid-cols-3">
            {reviews.map((review) => (
              <article className="bg-paper p-7" key={review.content}>
                <div aria-label="5 de 5 estrelas" className="flex text-signal">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      aria-hidden="true"
                      fill="currentColor"
                      key={star}
                      size={15}
                    />
                  ))}
                </div>
                <blockquote className="mt-8 min-h-32 text-lg leading-8">
                  “{review.content}”
                </blockquote>
                <p className="kicker mt-5">
                  {review.name} • {review.source}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t rule py-24" id="onde">
        <div className="container grid gap-12 md:grid-cols-2">
          <div>
            <p className="kicker text-signal">CMO • PR</p>
            <h2 className="display mt-5 text-6xl md:text-8xl">
              DA NOSSA
              <br />
              COZINHA
              <br />
              PRA SUA CASA.
            </h2>
          </div>
          <div className="flex flex-col justify-end border-l border-ink pl-8">
            <MapPinIcon
              aria-hidden="true"
              className="mb-8 text-signal"
              size={35}
            />
            <address className="not-italic text-xl leading-9">
              {restaurant.address.street}
              <br />
              {restaurant.address.district}
              <br />
              {restaurant.address.city} — {restaurant.address.state}
              <br />
              {restaurant.address.postalCode}
            </address>
            <a
              className="btn btn-dark mt-8 self-start"
              href="https://maps.google.com/?q=R.+Palotina,+227,+Campo+Mourão"
              rel="noreferrer"
              target="_blank"
            >
              Abrir no Maps
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
