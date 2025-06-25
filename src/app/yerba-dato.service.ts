import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Yerba } from './yerba-listado/yerba';

const URL = 'https://685c523a769de2bf085c68db.mockapi.io/yerba/productos';

@Injectable({
  providedIn: 'root'
})
export class YerbaDatoService {

  constructor(private http: HttpClient) { }

  public traerTodo(): Observable<Yerba[]> {
    return this.http.get<Yerba[]>(URL).pipe(
      tap((productos: Yerba[]) => {
        productos.forEach(producto => producto.cantidad = 0);
      })
    );
  }
}
