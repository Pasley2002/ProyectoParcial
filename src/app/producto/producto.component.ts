import { Component, OnInit } from '@angular/core';
import { ProductoService, Producto } from '../../app/service/producto.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FiltroProductoPipe } from '../pipe/filtro-producto.pipe';
import { MatIconModule } from '@angular/material/icon';
import { CarritoService } from '../service/carrito.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, FiltroProductoPipe, MatIconModule, NavbarComponent],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})

export class ProductoComponent implements OnInit {
  productos: Producto[] = []; // Lista de productos a mostrar
  filtro: string = ''; // Texto para el filtro de búsqueda

  constructor(
    private productoService: ProductoService,
    private router: Router,
    public carritoService: CarritoService
  ) {}

  // Método que se ejecuta cuando se inicia el componente
  ngOnInit(): void {
    this.cargarProductos(); // Cargamos los productos desde el servicio
  }

  // Obtiene la lista de productos desde el servicio
  cargarProductos(): void {
    this.productos = this.productoService.obtenerProductos();
  }

  // Elimina un producto tras confirmación del usuario
  eliminarProducto(id: number): void {
    if (confirm('¿Estás seguro de que querés eliminar este producto?')) {
      this.productoService.eliminarProducto(id);
      this.cargarProductos();
    }
  }

  // Redirige al formulario de edición, guardando el producto a editar en localStorage
  editarProducto(producto: Producto): void {
    localStorage.setItem('productoEditar', JSON.stringify(producto));
    this.router.navigate(['/producto/nuevo']);
  }

  // Agrega el producto al carrito
  agregarAlCarrito(producto: Producto): void {
    this.carritoService.agregarProducto(producto);
    alert(`${producto.nombre} fue agregado al carrito.`);
  }
}