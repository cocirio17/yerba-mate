import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { YerbaCarritoService } from '../yerba-carrito.service';
import { Yerba } from '../yerba-listado/yerba';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-yerba-carrito',
  standalone : false,
  templateUrl: './yerba-carrito.component.html',
  styleUrls: ['./yerba-carrito.component.scss']
})
export class YerbaCarritoComponent implements OnInit {
  carroLista$: Observable<Yerba[]>;
  total: number = 0;
  showBuyButton: boolean = true;

  constructor(private carrito: YerbaCarritoService, private router: Router) {
    this.carroLista$ = carrito.listaCarrito.asObservable();
  }

  ngOnInit(): void {
    // Escuchamos los cambios de la ruta
    this.router.events.subscribe(() => {
      this.checkRoute();
    });

    // Escuchamos cambios para recalcular el total
    this.carroLista$.subscribe(lista => {
      this.total = lista.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    });

    // Revisamos la ruta al inicializar el componente
    this.checkRoute();
  }

  // Verifica si estamos en la ruta de 'comprar' y ajusta la visibilidad del botón
  checkRoute(): void {
    if (this.router.url.includes('/comprar')) {
      this.showBuyButton = false;
    } else {
      this.showBuyButton = true;
    }
  }

  eliminarProducto(producto: Yerba): void {
    this.carrito.eliminarProducto(producto);
  }

  vaciarCarrito(): void {
    this.carrito.vaciarCarrito();
  }
}
