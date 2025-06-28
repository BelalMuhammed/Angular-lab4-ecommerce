import { Routes } from '@angular/router';
import { ProductsListComponent } from '../components/products-list/products-list.component';
import { CartComponent } from '../components/cart/cart.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { WishListComponent } from '../components/wish-list/wish-list.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';

export const routes: Routes = [
    {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"home",component:ProductsListComponent,pathMatch:"full"},
    {path:"cart",component:CartComponent,pathMatch:"full"},
    {path:"product/:id",component:ProductDetailsComponent,pathMatch:"full"},
    {path:"wishList",component:WishListComponent,pathMatch:"full"},
    
    {path:"**",component:NotFoundComponent},
];
