import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailsComponent } from './components/product-detail/product-detail.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    canActivate: ['authGuard'],
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: ['authGuard'],
  },
  { path: 'cart', component: CartComponent, canActivate: ['authGuard'] },
  {
    path: 'order-success',
    component: OrderSuccessComponent,
    canActivate: ['authGuard'],
  },
  { path: '', component: HomeComponent, canActivate: ['authGuard'] },
];
