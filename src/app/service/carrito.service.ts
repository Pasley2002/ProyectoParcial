import { Injectable } from '@angular/core';
import { Producto } from './producto.service';

// Hace que este servicio esté disponible globalmente
@Injectable({
  providedIn: 'root'
})

export class CarritoService {
  // Lista de productos en el carrito, incluyendo la cantidad de cada uno
  private productos: (Producto & { cantidad: number })[] = [];

  // Agrega un producto al carrito
  agregarProducto(producto: Producto, cantidad: number = 1) {
    // Verifica si el producto ya está en el carrito
    const existente = this.productos.find(p => p.id === producto.id);
    if (existente) {
      // Si ya existe, aumenta la cantidad
      existente.cantidad += cantidad;
    } else {
      // Si no existe, lo agrega con la cantidad indicada
      this.productos.push({ ...producto, cantidad });
    }
  }

  // Devuelve todos los productos del carrito
  obtenerProductos() {
    return this.productos;
  }

  // Vacía el carrito completamente
  limpiarCarrito() {
    this.productos = [];
  }

  // Elimina un producto por su ID
  eliminarProducto(id: number) {
    this.productos = this.productos.filter(p => p.id !== id);
  }

  // Actualiza la cantidad de un producto existente
  actualizarCantidad(id: number, nuevaCantidad: number) {
    const producto = this.productos.find(p => p.id === id);
    if (producto) {
      producto.cantidad = nuevaCantidad;
    }
  }
}