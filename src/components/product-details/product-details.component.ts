import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
count:number=1;
private _ActivatedRoute=inject(ActivatedRoute);
private _productService=inject(ProductsService);
private _toaster = inject(ToastrService)
product=signal<any>({});

  ngOnInit(): void {

this._ActivatedRoute.params.subscribe({
  next:(val:any)=>{this.getProductbyId(val.id);
  }
})

 }

 getProductbyId(id:number){
this._productService.getProductbyId(id).subscribe({
  next:(val:any)=>{
this.product.set(val);
console.log(val);

  }
})
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


  addCounter(stock:any) {
if(this.count<stock){
  this.count++;
}
  }

  subCounter() {
if(this.count>1){
  this.count--;
}
  }
addProductToCart(product:any){

 const exists =this._productService.productsCart().some(p => p.id === product.id);
 if(!exists){

product.count = this.count;
this._productService.productsCart.update(cart => [...cart, product]);
this._toaster.success("product added to cart");
 }else{
  this._toaster.info("product already in the cart");
 }

}




}
