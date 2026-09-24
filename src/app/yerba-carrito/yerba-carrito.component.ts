import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { YerbaCarritoService } from '../yerba-carrito.service';
import { Yerba } from '../yerba-listado/yerba';

@Component({
  selector: 'app-yerba-carrito',
  standalone: false,
  templateUrl: './yerba-carrito.component.html',
  styleUrls: ['./yerba-carrito.component.scss']
})
export class YerbaCarritoComponent implements OnInit {
  carroLista$: Observable<Yerba[]>;
  total = 0;
  showBuyButton = true;
  shippingGoal = 35000;
  progress = 0;

  constructor(private carrito: YerbaCarritoService, private router: Router) {
    this.carroLista$ = carrito.listaCarrito.asObservable();
  }

  ngOnInit(): void {
    this.router.events.subscribe(() => this.checkRoute());
    this.carroLista$.subscribe(lista => {
      this.total = lista.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
      this.progress = Math.min(100, (this.total / this.shippingGoal) * 100);
    });
    this.checkRoute();
  }

  checkRoute(): void {
    this.showBuyButton = !this.router.url.includes('/comprar');
  }

  cambiarCantidad(producto: Yerba, delta: number): void {
    this.carrito.actualizarCantidad(producto, producto.cantidad + delta);
  }

  eliminarProducto(producto: Yerba): void {
    this.carrito.eliminarProducto(producto);
  }

  vaciarCarrito(): void {
    this.carrito.vaciarCarrito();
  }
}
