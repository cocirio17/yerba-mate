import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Yerba } from './yerba-listado/yerba';

/**
 * Servicio que gestiona el carrito de compras.
 * Permite agregar, eliminar y listar productos,
 * así como emitir eventos reactivos para los componentes interesados.
 */
@Injectable({
  providedIn: 'root'
})
export class YerbaCarritoService {
  /** Lista interna del carrito (no observable) */
  private _listaCarrito: Yerba[] = [];

  /** Observable que emite los cambios en la lista del carrito */
  public listaCarrito: BehaviorSubject<Yerba[]> = new BehaviorSubject<Yerba[]>([]);

  /** Observable que emite la cantidad total de productos en el carrito */
  public cantidadTotal$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  /** Evento que se dispara cuando se elimina un producto (útil para restaurar stock) */
  public productoEliminado$: Subject<Yerba> = new Subject<Yerba>();

  constructor() {}

  /**
   * Agrega un producto al carrito.
   * Si ya existe en el carrito, aumenta la cantidad.
   * 
   * @param producto Producto a agregar
   */
  agregarCarrito(producto: Yerba): void {
    const index = this._listaCarrito.findIndex(p => p.nombre === producto.nombre);

    if (index !== -1) {
      this._listaCarrito[index].cantidad += producto.cantidad;
    } else {
      this._listaCarrito.push({ ...producto });
    }

    this._actualizarEstado();
  }

  /**
   * Elimina un producto del carrito completamente.
   * También emite un evento para que otros componentes puedan reaccionar.
   * 
   * @param producto Producto a eliminar
   */
  eliminarProducto(producto: Yerba): void {
    this.productoEliminado$.next(producto);
    this._listaCarrito = this._listaCarrito.filter(p => p.nombre !== producto.nombre);
    this._actualizarEstado();
  }

  /**
   * Vacía por completo el carrito.
   * Emite un evento por cada producto eliminado.
   */
  vaciarCarrito(): void {
    this._listaCarrito.forEach(p => this.productoEliminado$.next(p));
    this._listaCarrito = [];
    this._actualizarEstado();
  }

  /**
   * Calcula el total a pagar.
   * 
   * @returns Total en moneda local
   */
  obtenerTotal(): number {
    return this._listaCarrito.reduce((total, p) => total + (p.precio * p.cantidad), 0);
  }

  /**
   * Devuelve una copia de los productos actuales en el carrito.
   * 
   * @returns Lista de productos en el carrito
   */
  obtenerProductos(): Yerba[] {
    return [...this._listaCarrito];
  }

  /**
   * Calcula la cantidad total de unidades en el carrito.
   * 
   * @returns Número total de unidades
   */
  getCantidadTotal(): number {
    return this._listaCarrito.reduce((total, p) => total + p.cantidad, 0);
  }

  /**
   * Actualiza los observables (`listaCarrito` y `cantidadTotal$`)
   * con los últimos valores del carrito.
   */
  private _actualizarEstado(): void {
    this.listaCarrito.next([...this._listaCarrito]);
    this.cantidadTotal$.next(this.getCantidadTotal());
  }
}
