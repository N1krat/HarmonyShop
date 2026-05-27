import { Routes } from '@angular/router';
import { HomeConnectorComponent } from './components/home/home-connector/home-connector.component';
import { ProductConnectorComponent } from './components/products/product-connector/product-conector.component';
import { RegisterConnectorComponent } from './components/registerPage/register-connector/register-connector.component';
import { UserPageConnectorComponent } from './components/userPage/userPage-connector/userPage-connector.component';
import { LoginConnectorComponent } from './components/loginPage/login-connector/login-connector.component';
import { AdminConnectorComponent } from './components/admin/admin-connector/admin-connector.component';
import { AdminOrders } from './components/admin/pages/orders/admin-orders.component';
import { AdminProducts } from './components/admin/pages/products/admin-products.component';
import { AdminUsers } from './components/admin/pages/users/admin-users.component';
import { CartConnectorComponent } from './components/cart/cart-connector/cart-connector.component';
import { ProductPageConnectorComponent } from './components/productPage/productPage-connector/productPage-connector.component';
import { LearningConnectorComponent } from './components/learning/learning-connector/learning-connector.component';
import { LessonsConnectorComponent } from './components/lessons/lessons-connector/lessons-connector.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeConnectorComponent },
  { path: 'products', component: ProductConnectorComponent },
  { path: 'product/:id', component: ProductPageConnectorComponent },
  { path: 'learning', component: LearningConnectorComponent },
  { path: 'learning/:id', component: LessonsConnectorComponent },
  { path: 'cart', component: CartConnectorComponent },
  {
    path: 'login',
    component: LoginConnectorComponent
  },
  {
    path: 'profile', 
    component: UserPageConnectorComponent, 
  },
  { path: 'register', component: RegisterConnectorComponent }, 
  { path: 'admin', component: AdminConnectorComponent 
    ,children: [
      { path: 'users', component: AdminUsers },
      { path: 'products', component: AdminProducts },
      { path: 'orders', component: AdminOrders },
    ]
  },

];