import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product';
import { RouterLink } from '@angular/router';
import { WishListStore } from '../../signalStore/wishList.store';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product',
  imports: [CommonModule,RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent  {
singleProduct = input<any>();
_products=inject(ProductsService);
_wishList = inject(WishListStore);
_toast = inject(ToastrService);

toggleProductInCart(product: Product) {
  const currentCart = this._products.productsCart();
  const exists = currentCart.some(p => p.id === product.id);

  if (exists) {
    // Remove product
   this._products.productsCart.update(cart => cart.filter(p => p.id !== product.id));
      this._toast.info("Product removed from cart");
  } else {
    // Add product

    this._products.productsCart.update(cart => [...cart, product]);
   this._toast.success("Product added to cart");
  }
}
isInCart(product: Product): boolean {
  return this._products.productsCart().some(p => p.id === product.id);
}


getFullStars(rating: number): number[] {
  return Array(Math.floor(rating)).fill(0);
}

hasHalfStar(rating: number): boolean {
  return rating % 1 >= 0.25 && rating % 1 < 0.75;
}

getEmptyStars(rating: number): number[] {
  const full = Math.floor(rating);
  const half = this.hasHalfStar(rating) ? 1 : 0;
  return Array(5 - full - half).fill(0);
}


  toggleWishlist(event: Event, product: Product) {
    event.stopPropagation(); // prevent propagation if needed
    event.preventDefault();  // prevent navigation if inside routerLink

    if (this._wishList.isInWishlist(product)) {
      this._wishList.removeProduct(product.id);
      this._toast.info("Product removed from wishList");
    } else {
      this._wishList.addProduct(product);
        this._toast.success("Product added to wishList");
    }
  }

}
