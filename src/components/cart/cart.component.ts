import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  cartProductsService = inject(ProductsService);

  ngOnInit(): void {

    const updated = this.cartProductsService.productsCart().map(product => ({
      ...product,
      count: product.count ?? 1
    }));

    this.cartProductsService.productsCart.set(updated);
    console.log(this.cartProductsService.productsCart());
    
  }

  removeProduct(product: Product) {
    this.cartProductsService.productsCart.update(cart =>
      cart.filter(p => p.id !== product.id)
    );
  }

  addCounter(productId: number) {
    const updated = this.cartProductsService.productsCart().map(product => {
      if (product.id === productId && product.count < +product.stock) {
        return { ...product, count: product.count + 1 };
      }
      return product;
    });
    this.cartProductsService.productsCart.set(updated);
  }

  subCounter(productId: number) {
    const updated = this.cartProductsService.productsCart().map(product => {
      if (product.id === productId && product.count > 1) {
        return { ...product, count: product.count - 1 };
      }
      return product;
    });
    this.cartProductsService.productsCart.set(updated);
  }

  getTotalPrice(): number {
    return this.cartProductsService.productsCart().reduce(
      (total, item) => total + item.price * (item.count ?? 1),
      0
    );
  }


  get cartItems() {
    return this.cartProductsService.productsCart();
  }
}
