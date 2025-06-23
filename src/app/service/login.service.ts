import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root' // Esto hace que el servicio esté disponible en toda la aplicación
})

export class LoginService {

  // URL base de la API REST para autenticación
  public urlApi = 'http://localhost:3000/api/auth/';
  constructor(private http:HttpClient) { }

  // Envia los datos de login a la API para autenticar al usuario
  login(dataLogin:any){
    return this.http.post(this.urlApi+'login',dataLogin);
  }

  // Envia los datos de registro a la API para crear un nuevo usuario
  registro(dataRegistro:any){
    return this.http.post(this.urlApi+'registro',dataRegistro);
  }

}