export type PedidoItemDto = {
  id: string;
  imageUrl: string;
  description: string;
  price: number;
  priceId: string;
  quantity: number;
};

export type CarrinhoDto = {
  priceId: string;
  quantity: number;
};
