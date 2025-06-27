import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Yerba } from './yerba-listado/yerba';

const URL = 'https://685c523a769de2bf085c68db.mockapi.io/yerba/productos';

@Injectable({
  providedIn: 'root'
})
export class YerbaDatoService {
  productosEnMemoria: Yerba[] = [];

  constructor(private http: HttpClient) { }

  // public traerTodo(): Observable<Yerba[]> {
  //   return this.http.get<Yerba[]>(URL).pipe(
  //     tap((productos: Yerba[]) => {
  //       productos.forEach(producto => producto.cantidad = 0);
  //     })
  //   );
  // }
  public traerTodo(): Observable<Yerba[]> {
    return this.http.get<Yerba[]>(URL).pipe(
      tap((productos: Yerba[]) => {
        productos.forEach(producto => producto.cantidad = 0);
        this.productosEnMemoria = productos;
      })
    );
  }
  public traerPorId(id: string): Observable<Yerba> {
    return this.http.get<Yerba>(`${URL}/${id}`).pipe(
      tap((producto: Yerba) => {
        producto.cantidad = 0;
      })
    );
  }
  public traerPorIdSinllamado(id: string): Observable<Yerba> {
    const producto = this.productosEnMemoria.find(p => p.id === id);
    return of({ ...producto! });
  }
}
