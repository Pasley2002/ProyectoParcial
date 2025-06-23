import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup; // Formulario reactivo para login

  constructor(
    private fb: FormBuilder, // Constructor del formulario
    private router: Router // Para redireccionar páginas
  ) {}

  ngOnInit(): void {
    // Creamos el formulario con validaciones
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]], 
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Si el usuario ya está logueado, lo redirigimos a productos
    if (localStorage.getItem('logueado')) {
      this.router.navigate(['/producto']);
    }
  }

  login(): void {
    // Si el formulario no es válido, marcamos todos los campos y mostramos alertas
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      alert("Complete correctamente los campos requeridos");
      return;
    }

    // Tomamos los datos ingresados
    const { email, password } = this.loginForm.value;

    // Obtenemos el usuario guardado localmente (registro)
    const userData = localStorage.getItem('usuarioRegistrado');
    if (userData) {
      const usuario = JSON.parse(userData);

      // Comparamos email/nombre y contraseña
      if ((usuario.email === email || usuario.nombre === email) && usuario.password === password) {
        alert("Bienvenido al sistema");

        // Guardamos datos de sesión y redirigimos
        localStorage.setItem('logueado', 'true');
        localStorage.setItem('dataSesion', JSON.stringify(usuario));
        this.router.navigate(['/producto']);
      } else {
        alert("Credenciales incorrectas");
      }
    } else {
      alert("No hay usuarios registrados");
    }
  }
}