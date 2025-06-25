import { Component, OnInit } from '@angular/core';
import { YerbaCarritoService } from '../yerba-carrito.service';
import { Yerba } from '../yerba-listado/yerba';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-yerba-carrito',
  standalone: false,
  templateUrl: './yerba-carrito.component.html',
  styleUrls: ['./yerba-carrito.component.scss']
})
export class YerbaCarritoComponent implements OnInit {
  carroLista$: Observable<Yerba[]>;
  total: number = 0;

  constructor(private carrito: YerbaCarritoService) {
    this.carroLista$ = carrito.listaCarrito.asObservable(); // observable 1 sola vez
  }

  ngOnInit(): void {
    // Escuchamos cambios para recalcular el total
    this.carroLista$.subscribe(lista => {
      this.total = lista.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    });
  }

  eliminarProducto(producto: Yerba): void {
    this.carrito.eliminarProducto(producto);
  }

  vaciarCarrito(): void {
    this.carrito.vaciarCarrito();
  }
}