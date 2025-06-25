// yerba-carrito.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Yerba } from './yerba-listado/yerba';

@Injectable({
  providedIn: 'root'
})
export class YerbaCarritoService {
  private _listaCarrito: Yerba[] = [];

  listaCarrito: BehaviorSubject<Yerba[]> = new BehaviorSubject<Yerba[]>([]);
  cantidadTotal$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  // NUEVO: Evento para notificar productos eliminados del carrito
  productoEliminado$: Subject<Yerba> = new Subject<Yerba>();

  constructor() { }

  agregarCarrito(producto: Yerba): void {
    const index = this._listaCarrito.findIndex(p => p.nombre === producto.nombre);

    if (index !== -1) {
      this._listaCarrito[index].cantidad += producto.cantidad;
    } else {
      this._listaCarrito.push({ ...producto });
    }

    this._actualizarEstado();
  }

  eliminarProducto(producto: Yerba): void {
    // Emitimos antes de eliminar para poder restaurar el stock
    this.productoEliminado$.next(producto);

    this._listaCarrito = this._listaCarrito.filter(p => p.nombre !== producto.nombre);
    this._actualizarEstado();
  }

  vaciarCarrito(): void {
    // Emitimos cada producto antes de vaciar
    this._listaCarrito.forEach(p => this.productoEliminado$.next(p));
    this._listaCarrito = [];
    this._actualizarEstado();
  }

  getCantidadTotal(): number {
    return this._listaCarrito.reduce((total, p) => total + p.cantidad, 0);
  }

  private _actualizarEstado(): void {
    this.listaCarrito.next([...this._listaCarrito]);
    this.cantidadTotal$.next(this.getCantidadTotal());
  }
}
