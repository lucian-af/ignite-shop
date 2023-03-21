import Image from 'next/image';
import {
  CartContainer,
  HomeContainer,
  Product,
  Arrow as ArrowSvg,
} from '../styles/pages/home';
import { GetStaticProps } from 'next';
import { KeenSliderOptions, useKeenSlider } from 'keen-slider/react';
import { stripe } from '../lib/stripe';
import Stripe from 'stripe';
import Head from 'next/head';
import Link from 'next/link';
import { Handbag } from 'phosphor-react';
import 'keen-slider/keen-slider.min.css';
import { formatCurrency } from '../lib/formatCurrency';
import { usePlataformDetect } from '../hooks/usePlataformDetect';
import { useState } from 'react';
import Loading from '../components/loading';

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
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const configDesktop = {
    slides: {
      perView: 2.25,
      spacing: 48,
    },
  } as KeenSliderOptions;

  const configMobile = {
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  } as KeenSliderOptions;
  const [sliderRef, instanceRef] = useKeenSlider(
    isMobile ? configMobile : configDesktop,
  );

  function Arrow(props: {
    disabled: boolean;
    left?: boolean;
    onClick: (e: any) => void;
  }) {
    const pos = props.left ? 'left' : 'right';
    return (
      <ArrowSvg
        onClick={props.onClick}
        disabled={props.disabled}
        position={pos}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {props.left && (
          <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        )}
        {!props.left && (
          <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
        )}
      </ArrowSvg>
    );
  }

  return (
    <>
      <Head>
        <title>Home - Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((product, index) => {
          return (
            <Product
              className={`keen-slider__slide number-slide${index}`}
              key={product.id}
            >
              <Image src={product.imageUrl} alt="" width={300} height={400} />
              <footer>
                <div>
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
                <CartContainer
                  href={`/products/${product.id}`}
                  prefetch={false}
                >
                  <Handbag size={32} />
                </CartContainer>
              </footer>
            </Product>
          );
        })}
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />
            <Arrow
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
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
