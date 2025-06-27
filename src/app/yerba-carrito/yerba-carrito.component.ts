import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { YerbaCarritoService } from '../yerba-carrito.service';
import { Yerba } from '../yerba-listado/yerba';
import { Observable } from 'rxjs';

/**
 * Componente que gestiona la visualización del carrito de compras.
 * Permite eliminar productos, vaciar el carrito y muestra el total de la compra.
 */
@Component({
  selector: 'app-yerba-carrito',
  standalone: false,
  templateUrl: './yerba-carrito.component.html',
  styleUrls: ['./yerba-carrito.component.scss']
})
export class YerbaCarritoComponent implements OnInit {
  /** Lista observable de productos en el carrito */
  carroLista$: Observable<Yerba[]>;

  /** Total de la compra calculado a partir de los productos en el carrito */
  total: number = 0;

  /** Bandera para mostrar o esconder el botón de compra */
  showBuyButton: boolean = true;

  constructor(
    private carrito: YerbaCarritoService, // Servicio para gestionar el carrito
    private router: Router // Router para gestionar las rutas de la aplicación
  ) {
    // Se observa el carrito mediante el BehaviorSubject
    this.carroLista$ = carrito.listaCarrito.asObservable();
  }

  /**
   * Al inicializar el componente, suscribe a los cambios en el carrito y verifica la ruta.
   * Calcula el total de la compra y controla la visibilidad del botón de compra.
   */
  ngOnInit(): void {
    // Escucha los cambios de la ruta actual
    this.router.events.subscribe(() => {
      this.checkRoute();
    });

    // Escucha los cambios en el carrito para recalcular el total
    this.carroLista$.subscribe(lista => {
      this.total = lista.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    });

    // Verifica la ruta al inicializar el componente
    this.checkRoute();
  }

  /**
   * Verifica si estamos en la ruta de 'comprar' para mostrar/ocultar el botón de compra.
   */
  checkRoute(): void {
    if (this.router.url.includes('/comprar')) {
      this.showBuyButton = false; // No mostrar el botón si estamos en la ruta de compra
    } else {
      this.showBuyButton = true; // Mostrar el botón en otras rutas
    }
  }

  /**
   * Elimina un producto del carrito.
   * 
   * @param producto Producto a eliminar del carrito
   */
  eliminarProducto(producto: Yerba): void {
    this.carrito.eliminarProducto(producto);
  }

  /**
   * Vacía todo el carrito.
   */
  vaciarCarrito(): void {
    this.carrito.vaciarCarrito();
  }
}
