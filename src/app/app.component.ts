import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FacturaComponent } from './factura/factura.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'parcial';
}