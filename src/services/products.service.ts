import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService{
http=inject(HttpClient);
 productsCart=signal<Product[]>([]);

 getProducts(){
  return this.http.get(`https://dummyjson.com/products`);
 } 
 
  getProductbyId(id:number){
  return this.http.get(`https://dummyjson.com/products/${id}`);
 } 
}
