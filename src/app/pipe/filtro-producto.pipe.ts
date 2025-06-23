import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../service/producto.service';

@Pipe({
  name: 'filtroProducto',
  standalone: true
})

export class FiltroProductoPipe implements PipeTransform {

  // Método que transforma la lista de productos en base a un texto de búsqueda
  transform(productos: Producto[], texto: string): Producto[] {
    // Si no hay productos o no se escribió texto, devolvemos la lista original
    if (!productos || !texto) return productos;

    // Convertimos el texto de búsqueda a minúsculas para hacer una comparación sin mayúsculas
    texto = texto.toLowerCase();

    // Filtramos los productos por nombre o categoría que contenga el texto ingresado
    return productos.filter(producto =>
      producto.nombre.toLowerCase().includes(texto) || // Coincide con el nombre
      producto.categoria.toLowerCase().includes(texto) // O coincide con la categoría
    );
  }
}