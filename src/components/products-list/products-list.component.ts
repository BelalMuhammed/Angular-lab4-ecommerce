import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProductComponent } from '../product/product.component';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-products-list',
  imports: [ProductComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit{
  
  products=signal<Product[]>([]);
private _products = inject(ProductsService);

  ngOnInit(): void {
 this._products.getProducts().subscribe({
  next:(val:any)=>{
    this.products.set(val.products);
   
    console.log(this.products());
    
  }
 })
}



}
