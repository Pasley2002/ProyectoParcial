import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  logueado: boolean = false; // Variable que indica si hay un usuario logueado
  nombreUsuario: string = ''; // Muestra el nombre o correo del usuario logueado

  constructor(private router: Router) {
    // Recuperamos la sesión desde el localStorage
    const sesion = localStorage.getItem('dataSesion');
    this.logueado = localStorage.getItem('logueado') === 'true'; // Verificamos si está logueado

    // Si hay sesión activa, obtenemos el nombre o email del usuario
    if (this.logueado && sesion) {
      const usuario = JSON.parse(sesion);
      this.nombreUsuario = usuario.nombre || usuario.email;
    }
  }

  // Método para cerrar sesión
  logout() {
    // Eliminamos los datos del localStorage
    localStorage.removeItem('logueado');
    localStorage.removeItem('dataSesion');
    // Redirigimos al login
    this.router.navigate(['/login']);
  }
}