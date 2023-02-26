import { ActionTypes } from './actions';
import produce from 'immer';
import { PedidoItemDto } from '../dtos/pedidoItemDto';

type PedidoState = {
  pedidoItems: PedidoItemDto[];
};

export function pedidosReducer(state: PedidoState, action: any) {
  switch (action.type) {
    case ActionTypes.ADICIONAR_ITEM: {
      const pedidoItem: PedidoItemDto = action.payload.item;

      return produce(state, (rascunho) => {
        rascunho.pedidoItems.push({
          id: new Date().getTime().toString(),
          description: pedidoItem.description,
          imageUrl: pedidoItem.imageUrl,
          price: pedidoItem.price,
          priceId: pedidoItem.priceId,
          quantity: pedidoItem.quantity,
        } as PedidoItemDto);
      });
    }
    case ActionTypes.REMOVER_ITEM: {
      const pedidoItemRemover: PedidoItemDto = action.payload.item;

      const indexItemExistente = state.pedidoItems.findIndex(
        (pedidoItemExistente) =>
          pedidoItemRemover.id === pedidoItemExistente.id,
      );

      if (indexItemExistente < 0) return state;

      return produce(state, (rascunho: PedidoState): PedidoState | any => {
        rascunho.pedidoItems.splice(indexItemExistente, 1);
      });
    }
    case ActionTypes.REINICIAR_CARRINHO: {
      const pedidoItems: PedidoItemDto[] = action.payload?.itens;

      return produce(state, (rascunho: PedidoState): PedidoState | any => {
        rascunho.pedidoItems = pedidoItems ?? [];
      });
    }
    case ActionTypes.CONFIRMAR_PEDIDO: {
      return produce(state, (rascunho: PedidoState): PedidoState | any => {
        rascunho.pedidoItems = [];
      });
    }
    default:
      return state;
  }
}
