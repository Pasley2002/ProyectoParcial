import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../../app/service/carrito.service';
import { Producto } from '../../app/service/producto.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})

export class CarritoComponent {
  
  // Lista de productos que están en el carrito, con cantidad incluida
  productos: (Producto & { cantidad: number })[] = [];
  
  constructor(private carritoService: CarritoService, private router: Router) {
    // Al iniciar, cargamos los productos del carrito desde el servicio
    this.productos = this.carritoService.obtenerProductos();
  }

  // Función para eliminar un producto del carrito
  eliminar(id: number) {
    this.carritoService.eliminarProducto(id);
    this.productos = this.carritoService.obtenerProductos(); // Actualizamos la lista local
  }

  // Función para actualizar la cantidad de un producto en el carrito
  actualizarCantidad(id: number, event: Event) {
    const cantidad = +(event.target as HTMLInputElement).value; // Obtenemos el número del input
    if (cantidad > 0) {
      this.carritoService.actualizarCantidad(id, cantidad); // Actualizamos en el servicio
    }
  }

  // Redirige a la pantalla de factura para generar la compra
  generarFactura() {
    this.router.navigate(['/factura']);
  }
}