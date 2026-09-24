import { Component, Input, OnInit } from '@angular/core';
import { Yerba } from './yerba';
import { YerbaCarritoService } from '../yerba-carrito.service';
import { YerbaDatoService } from '../yerba-dato.service';
import { AuthService } from '../auth.service';

/**
 * Componente que muestra una lista de productos de tipo Yerba.
 * Puede filtrar por ofertas y permite agregar productos al carrito.
 */
@Component({
  selector: 'app-yerba-listado',
  standalone: false,
  templateUrl: './yerba-listado.component.html',
  styleUrls: ['./yerba-listado.component.scss']
})
export class YerbaListadoComponent implements OnInit {
  /** Lista de productos a mostrar */
  @Input() productos: Yerba[] = [];

  /** Si es true, se muestran solo los productos en oferta */
  @Input() filtrarOferta: boolean = false;

  /** Si es true, permite mostrar los controles de agregar al carrito */
  @Input() permitirAgregar: boolean = false;

  @Input() cargarDatos: boolean = true;

  constructor(
    private carrito: YerbaCarritoService,
    private dataServicio: YerbaDatoService,
    public auth: AuthService
  ) {}

  /**
   * Al inicializar el componente, carga los productos desde el servicio.
   * También escucha productos eliminados para restaurar stock.
   */
  ngOnInit(): void {
    if (this.cargarDatos) {
      this.dataServicio.traerTodo().subscribe((yerbas: Yerba[]) => {
        this.productos = this.filtrarOferta
          ? yerbas.filter(p => p.oferta)
          : yerbas;
      });
    }

    this.carrito.productoEliminado$.subscribe(productoEliminado => {
      const original = this.productos.find(p => p.nombre === productoEliminado.nombre);
      if (original) {
        original.stock += productoEliminado.cantidad;
      }
    });
  }

  /**
   * Agrega el producto al carrito y actualiza el stock localmente.
   * 
   * @param producto Producto a agregar
   */
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

  agregarRapido(producto: Yerba): void {
    producto.cantidad = 1;
    this.agregarCarrito(producto);
  }

  esFavorito(producto: Yerba): boolean {
    return !!this.auth.currentUser?.wishlist.includes(producto.id);
  }

  alternarFavorito(producto: Yerba): void {
    if (this.auth.currentUser) {
      this.auth.toggleWishlist(producto.id);
    }
  }
}
