import { Component, inject, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { WishListStore } from '../../signalStore/wishList.store';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent{
products = signal<any[]>([]);
_products = inject(ProductsService);
_wishlist= inject(WishListStore);
showNumber(){
  console.log(this._products.productsCart());

}

}
