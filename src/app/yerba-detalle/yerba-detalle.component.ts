import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Yerba } from '../yerba-listado/yerba';
import { YerbaDatoService } from '../yerba-dato.service';
import { YerbaCarritoService } from '../yerba-carrito.service';

@Component({
  selector: 'app-yerba-detalle',
  standalone: false,
  templateUrl: './yerba-detalle.component.html',
  styleUrl: './yerba-detalle.component.scss'
})
export class YerbaDetalleComponent implements OnInit {
  yerba!: Yerba;

  constructor(
    private ruta: ActivatedRoute,
    private datos: YerbaDatoService,
    private carrito: YerbaCarritoService
  ) {}

  ngOnInit(): void {
    const id = this.ruta.snapshot.paramMap.get('id');
    if (id) {
      this.datos.traerPorId(id).subscribe(producto => {
        this.yerba = producto;
      });
    }
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
