import { Routes } from '@angular/router';
import { HomeConnectorComponent } from './components/home/home-connector/home-connector.component';
import { ProductConnectorComponent } from './components/products/product-connector/product-conector.component';
import { RegisterConnectorComponent } from './components/registerPage/register-connector/register-connector.component';
import { UserPageConnectorComponent } from './components/userPage/userPage-connector/userPage-connector.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeConnectorComponent },
  { path: 'products', component: ProductConnectorComponent },
  { 
    path: 'profile', 
    component: UserPageConnectorComponent, 
  },
  { path: 'register', component: RegisterConnectorComponent }
];