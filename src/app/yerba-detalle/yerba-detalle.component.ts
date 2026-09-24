import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Yerba } from '../yerba-listado/yerba';
import { YerbaDatoService } from '../yerba-dato.service';
import { YerbaCarritoService } from '../yerba-carrito.service';

@Component({
  selector: 'app-yerba-detalle',
  standalone: false,
  templateUrl: './yerba-detalle.component.html',
  styleUrls: ['./yerba-detalle.component.scss']
})
export class YerbaDetalleComponent implements OnInit {
  yerba!: Yerba;
  activeTab = 'description';
  avisoSolicitado = false;

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
        this.yerba.cantidad = producto.stock > 0 ? 1 : 0;
      });
    }
  }

  agregarCarrito(producto: Yerba): void {
    if (producto.stock <= 0 || producto.cantidad <= 0) return;
    producto.cantidad = Math.min(producto.cantidad, producto.stock);
    const cantidadAgregada = producto.cantidad;
    this.carrito.agregarCarrito({ ...producto });
    producto.stock -= cantidadAgregada;
    producto.cantidad = producto.stock > 0 ? 1 : 0;
  }

  avisarCuandoHayaStock(): void {
    this.avisoSolicitado = true;
  }
}
