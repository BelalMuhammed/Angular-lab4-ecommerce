

import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Product } from '../interfaces/product';
import { computed } from '@angular/core';

export const WishListStore = signalStore(
  { providedIn: 'root' },
  withState({
    products: [] as Product[],
  }),
  withMethods((state) => ({
  addProduct:(product:Product)=>{
   const exists =state.products().some(p => p.id === product.id);
      if (!exists) {
        patchState(state,{
          products: [...state.products(), product]
        });
  }
  },
      removeProduct: (id: number) => {
      patchState(state,{
        products: state.products().filter(p => p.id !== id)
      });
    },
      isInWishlist:(product: Product): boolean => {
    return state.products().some(p => p.id === product.id);
  },
        clearWishlist: () => {
      patchState(state,{ products: [] });
    }

  })),
  withComputed((state)=>({
      total:  computed(() => state.products().length)
  }))
);

