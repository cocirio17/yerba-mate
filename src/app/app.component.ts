import { Component } from '@angular/core';
import { YerbaCarritoService } from './yerba-carrito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'yerba-mate';
  mostrarCarrito = false;
  cantidadEnCarrito: number = 0;

  constructor(public carrito: YerbaCarritoService) {
    carrito.cantidadTotal$.subscribe(cant => this.cantidadEnCarrito = cant);
  }

  toggleCarrito(): void {
    this.mostrarCarrito = !this.mostrarCarrito;
  }
  
}

