import { Component, Input } from '@angular/core';
import { Yerba } from './yerba';
import { YerbaCarritoService } from '../yerba-carrito.service';
import { YerbaDatoService } from '../yerba-dato.service';

@Component({
  selector: 'app-yerba-listado',
  standalone: false,
  templateUrl: './yerba-listado.component.html',
  styleUrls: ['./yerba-listado.component.scss']
})
export class YerbaListadoComponent {
  @Input() productos: Yerba[] = [];
  @Input() filtrarOferta: boolean = false; 
  constructor(private carrito: YerbaCarritoService, private dataServicio: YerbaDatoService) { }

  ngOnInit(): void {
    this.dataServicio.traerTodo().subscribe(yerba => {
      // Si filtrarOferta es verdadero, solo mostrar los productos en oferta
      if (this.filtrarOferta) {
        this.productos = yerba.filter(producto => producto.oferta);
      } else {
        this.productos = yerba; // De lo contrario, mostrar todos
      }
    });

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

  @Input() permitirAgregar: boolean = false;
}
