import { Routes } from '@angular/router';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { ProductoComponent } from './producto/producto.component';
import { ProductoListadoComponent } from './productoListado/productoListado.component';
import { CarritoComponent } from './carrito/carrito.component';
import { FacturaComponent } from './factura/factura.component';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'producto', component: ProductoComponent},
    {path: 'producto/nuevo', component: ProductoListadoComponent},
    {path: 'carrito', component: CarritoComponent},
    {path: 'factura', component: FacturaComponent}
];