import Image from 'next/image';
import { CartContainer, HomeContainer, Product } from '../styles/pages/home';
import { GetStaticProps } from 'next';
import { useKeenSlider } from 'keen-slider/react';
import { stripe } from '../lib/stripe';
import Stripe from 'stripe';
import Head from 'next/head';
import Link from 'next/link';
import { Handbag } from 'phosphor-react';
import 'keen-slider/keen-slider.min.css';
import { formatCurrency } from '../lib/formatCurrency';
import { usePlataformDetect } from '../hooks/usePlataformDetect';

type HomeProps = {
  products: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
  }[];
};

export default function Home({ products }: HomeProps) {
  const currentPlataform = usePlataformDetect();
  const isMobile = currentPlataform.isMobile();
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: isMobile ? 1 : 2.25,
      spacing: 48,
    },
  });

  return (
    <>
      <Head>
        <title>Home - Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Product className="keen-slider__slide" key={product.id}>
              <Image src={product.imageUrl} alt="" width={520} height={480} />
              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>

                <CartContainer>
                  <Link href={`/products/${product.id}`} prefetch={false}>
                    <Handbag size={32} />
                  </Link>
                </CartContainer>
              </footer>
            </Product>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  });
  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price.unit_amount,
    };
  });

  return {
    props: {
      products,
    },
  };
};
