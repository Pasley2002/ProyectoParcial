import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ProductoService, Producto } from '../service/producto.service';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../service/carrito.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, NavbarComponent, ReactiveFormsModule],
  templateUrl: './productoListado.component.html',
  styleUrls: ['./productoListado.component.css']
})

export class ProductoListadoComponent implements OnInit {

  productoForm!: FormGroup; // Formulario reactivo para el producto
  modoEdicion: boolean = false; // Modo edición (true si estamos editando un producto)

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router,
    private carritoService: CarritoService
  ) {}

  // Se ejecuta al iniciar el componente
  ngOnInit(): void {
    // Creamos el formulario con validaciones
    this.productoForm = this.fb.group({
      id: [0],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      categoria: ['', Validators.required],
      imagen: ['']
    });

    // Si hay un producto guardado para edición, lo cargamos en el formulario
    const productoGuardado = localStorage.getItem('productoEditar');
    if (productoGuardado) {
      const producto: Producto = JSON.parse(productoGuardado);
      this.modoEdicion = true;
      this.productoForm.patchValue(producto); // Cargamos datos en el formulario
      localStorage.removeItem('productoEditar');
    }
  }

  // Guardar o actualizar un producto
  guardar(): void {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched(); // Marca todos los campos para mostrar errores
      alert('Por favor complete correctamente todos los campos obligatorios');
      return;
    }

    const producto: Producto = this.productoForm.value;

    if (this.modoEdicion) {
      this.productoService.actualizarProducto(producto); // Actualiza producto
      alert('Producto actualizado correctamente');
    } else {
      this.productoService.agregarProducto(producto); // Agrega nuevo producto
      alert('Producto agregado correctamente');
    }

    this.router.navigate(['/producto']); // Vuelve a la lista de productos
  }

  // Agrega el producto al carrito
  agregarAlCarrito(producto: Producto) {
    this.carritoService.agregarProducto(producto);
  }

  // Botón cancelar que vuelve a la vista de productos
  cancelar(): void {
    this.router.navigate(['/producto']);
  }

  // Maneja la subida de imagen desde archivo local y lo convierte en base64
  onFileSelected(event: any): void {
    const archivo = event.target.files[0]; // Obtenemos el archivo subido
    if (archivo) {
      const lector = new FileReader(); // Creamos el lector de archivos
      lector.onload = () => {
        const imagenBase64 = lector.result as string; // Convertimos en base64
        this.productoForm.patchValue({ imagen: imagenBase64 }); // Cargamos en el formulario
      };
      lector.readAsDataURL(archivo); // Leemos el archivo como data URL
    }
  }
}