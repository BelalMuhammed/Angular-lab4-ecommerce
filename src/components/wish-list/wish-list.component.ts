import { Component, Inject, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product';
import { WishListStore } from '../../signalStore/wishList.store';

@Component({
  selector: 'app-wish-list',
  imports: [],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent {
_wishList=inject(WishListStore)
 cartProductsService = inject(ProductsService);



  removeProduct(product: Product) {
this._wishList.removeProduct(product.id);
  }

clearWishlist(){
  this._wishList.clearWishlist();
}

  getTotalPrice(): number {
    return this.cartProductsService.productsCart().reduce(
      (total, item) => total + item.price * (item.count ?? 1),
      0
    );
  }

    toggleWishlist(event: Event, product: Product) {
    event.stopPropagation(); // prevent propagation if needed
    event.preventDefault();  // prevent navigation if inside routerLink

    if (this._wishList.isInWishlist(product)) {
      this._wishList.removeProduct(product.id);
    } else {
      this._wishList.addProduct(product);
    }
  }


}
