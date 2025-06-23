import { Injectable } from '@angular/core';

// Interfaz que define la estructura de un producto
export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string;
}

@Injectable({
  providedIn: 'root'
})

export class ProductoService {

  // Clave usada para guardar y recuperar datos del localStorage
  private key = 'productos';

  constructor() {}

  // Obtiene la lista de productos desde el localStorage
  obtenerProductos(): Producto[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : []; // Si no hay datos, devuelve array vacío
  }

  // Agrega un nuevo producto a la lista
  agregarProducto(producto: Producto): void {
    const productos = this.obtenerProductos();
    producto.id = new Date().getTime(); // Asigna un ID único basado en timestamp
    productos.push(producto);
    localStorage.setItem(this.key, JSON.stringify(productos)); // Guarda en localStorage
  }

  // Actualiza un producto existente por su ID
  actualizarProducto(producto: Producto): void {
    let productos = this.obtenerProductos();
    productos = productos.map(p => p.id === producto.id ? producto : p); // Reemplaza el producto con el mismo ID
    localStorage.setItem(this.key, JSON.stringify(productos));
  }

  // Elimina un producto de la lista por su ID
  eliminarProducto(id: number): void {
    const productos = this.obtenerProductos().filter(p => p.id !== id);
    localStorage.setItem(this.key, JSON.stringify(productos));
  }

  // Busca y devuelve un producto por su ID (o undefined si no lo encuentra)
  obtenerProductoPorId(id: number): Producto | undefined {
    return this.obtenerProductos().find(p => p.id === id);
  }
}