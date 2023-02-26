# ignite-shop

## Projeto criado com NextJS usando recursos de SSR e SSG;

Para que o projeto funcione, é necessário conhecer um pouco da plataforma [Stripe](https://stripe.com/br). Resumidamente, o Stripe fornece uma API para integração que possibilita simular um e-comerce. Confira a [documentação](https://stripe.com/docs) no site da plataforma.

## Porque SSR e SSG ?

Usar SSR - Server Side Rendering e usar SSG - Static Site Generation possibilita otimização de fluxo, ganho de performance e diminuição do custo de infraestrutura.

Usei o SSG em `src/pages/index.tsx` para carregar a página inicial mais rápido, uma vez que os dados necessários para renderizar a página serão buscados no momento do build da aplicação e uma lista de produtos não é alterada com frequência. Isso facilita o uso de SEO, trás performance, pois o usuário vê as informações da página mais rápido e diminui custo de infraestrutura.

Usei o SSR em `src/pages/success.tsx` para que os dados após confirmação do pedido fossem processados no lado do servidor, optimizando o fluxo e ganhando em performance.

#

## Como rodar o projeto

<code>npm install</code>

<code>npm run dev</code>

> Necessário adicionar a chave pública e a chave privada no arquivo `.env` antes de subir a aplicação. Essas chaves são fornecidas pela plataforma Stripe.

Após, a aplicação deve estar rodando em http://localhost:3000.

#
