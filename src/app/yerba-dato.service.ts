import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map, tap } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { Yerba } from './yerba-listado/yerba';
import { environment } from '../environments/environment';

/**
 * Servicio encargado de obtener y almacenar los datos de yerbas desde una API externa.
 * Implementa una pequeña caché en memoria para evitar llamadas redundantes.
 */
@Injectable({
  providedIn: 'root'
})
export class YerbaDatoService {
  /** Almacena en memoria los productos traídos desde la API */
  productosEnMemoria: Yerba[] = [];

  constructor(private http: HttpClient) {}

  /**
   * Trae todos los productos desde la API.
   * Inicializa la propiedad `cantidad` en 0 para cada producto.
   * Además, guarda los productos en memoria.
   * 
   * @returns Un observable con la lista de productos (`Yerba[]`)
   */
  public traerTodo(filters: Record<string, string | string[] | boolean | undefined> = {}): Observable<Yerba[]> {
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') params = params.set(key, Array.isArray(value) ? value.join(',') : String(value));
    });
    return this.http.get<any>(`${environment.apiUrl}/products`, { params }).pipe(
      map(response => Array.isArray(response) ? response : (response.rows || [])),
      map((productos: any[]) => productos.map(producto => this.mapProduct(producto))),
      tap((productos: Yerba[]) => {
        productos.forEach(producto => producto.cantidad = 0);
        this.productosEnMemoria = productos;
      })
    );
  }

  /**
   * Trae un producto por su ID desde la API.
   * También inicializa su cantidad en 0.
   * 
   * @param id El ID del producto a buscar
   * @returns Un observable con el producto correspondiente
   */
  public traerPorId(id: string): Observable<Yerba> {
    return this.http.get<any>(`${environment.apiUrl}/products/${id}`).pipe(
      map(producto => this.mapProduct(producto)),
      tap((producto: Yerba) => {
        producto.cantidad = 0;
      })
    );
  }

  /**
   * Devuelve un producto desde la memoria local (sin hacer una llamada HTTP).
   * Hace una copia para evitar modificar el original.
   * 
   * @param id El ID del producto a buscar
   * @returns Un observable con el producto encontrado o `undefined` si no existe
   */
  public traerPorIdSinllamado(id: string): Observable<Yerba> {
    const producto = this.productosEnMemoria.find(p => p.id === id);
    return of({ ...producto! });
  }

  crear(producto: Partial<Yerba> | FormData): Observable<Yerba> {
    return this.http.post<any>(`${environment.apiUrl}/products`, producto).pipe(map(p => this.mapProduct(p)));
  }
  actualizar(id: string, producto: Partial<Yerba> | FormData): Observable<Yerba> {
    return this.http.put<any>(`${environment.apiUrl}/products/${id}`, producto).pipe(map(p => this.mapProduct(p)));
  }
  eliminar(id: string): Observable<void> { return this.http.delete<void>(`${environment.apiUrl}/products/${id}`); }

  private mapProduct(producto: any): Yerba {
    return { ...producto, tipo: producto.tipo || producto.categoria || '', imagen: producto.imagen || producto.imagen_url || '', cantidad: 0, precio: Number(producto.precio), descuento_porcentaje: Number(producto.descuento_porcentaje || 0), tipo_corte: producto.tipo_corte || 'con_palo', origen: producto.origen || 'nacional', organica: Boolean(producto.organica), barbacua: Boolean(producto.barbacua), saborizada: Boolean(producto.saborizada), sabor: producto.sabor || '' };
  }
}
