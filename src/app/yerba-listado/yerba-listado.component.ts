import { Component } from '@angular/core';
import { Yerba } from './yerba';
import { YerbaCarritoService } from '../yerba-carrito.service';

@Component({
  selector: 'app-yerba-listado',
  standalone: false,
  templateUrl: './yerba-listado.component.html',
  styleUrls: ['./yerba-listado.component.scss']
})
export class YerbaListadoComponent {
  productos: Yerba[] = [
    {
      nombre: 'Yerba Canarias 500g',
      tipo: 'Yerba',
      precio: 7156,
      stock: 15,
      imagen: 'assets/img/yerba-canarias.jpg',
      oferta: false,
      cantidad: 0
    },
    {
      nombre: 'Yerba Baldo 500g',
      tipo: 'Yerba',
      precio: 14921,
      stock: 20,
      imagen: 'assets/img/Yerba-Baldo.png',
      oferta: false,
      cantidad: 0
    },
    {
      nombre: 'Yerba Canarias Serena 500g',
      tipo: 'Yerba',
      precio: 8729,
      stock: 0,
      imagen: 'assets/img/Canarias-Serena.png',
      oferta: true,
      cantidad: 0
    },
    {
      nombre: 'Yerba Rei Verde Premium Negra',
      tipo: 'Yerba',
      precio: 14603,
      stock: 30,
      imagen: 'assets/img/Yerba-Rei-Verde-Premium-Negra.png',
      oferta: false,
      cantidad: 0
    },
    {
      nombre: 'Yerba Rei Verde 500g',
      tipo: 'Yerba',
      precio: 7308,
      stock: 8,
      imagen: 'assets/img/Yerba-Rei-Verde.png',
      oferta: true,
      cantidad: 0
    }
  ];


  constructor(private carrito: YerbaCarritoService) { }

  ngOnInit(): void {
    // Restaurar stock cuando se elimina del carrito
    this.carrito.productoEliminado$.subscribe(productoEliminado => {
      const original = this.productos.find(p => p.nombre === productoEliminado.nombre);
      if (original) {
        original.stock += productoEliminado.cantidad;
      }
    });
  }

  agregarCarrito(producto: Yerba): void {
    if (producto.cantidad <= 0) return;

    if (producto.cantidad > producto.stock) {
      producto.cantidad = producto.stock;
    }

    const productoACarrito: Yerba = { ...producto };
    this.carrito.agregarCarrito(productoACarrito);

    producto.stock -= producto.cantidad;
    producto.cantidad = 0;
  }
}

