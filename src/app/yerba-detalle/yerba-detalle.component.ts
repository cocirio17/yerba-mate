import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Yerba } from '../yerba-listado/yerba';
import { YerbaDatoService } from '../yerba-dato.service';
import { YerbaCarritoService } from '../yerba-carrito.service';

/**
 * Componente que muestra los detalles de un producto específico (Yerba).
 * Permite agregarlo al carrito si tiene stock disponible.
 */
@Component({
  selector: 'app-yerba-detalle',
  standalone: false,
  templateUrl: './yerba-detalle.component.html',
  styleUrls: ['./yerba-detalle.component.scss']
})
export class YerbaDetalleComponent implements OnInit {
  /** Producto específico que se muestra en detalle */
  yerba!: Yerba;

  constructor(
    private ruta: ActivatedRoute, // Para obtener el ID desde la URL
    private datos: YerbaDatoService, // Servicio que obtiene los datos de la yerba
    private carrito: YerbaCarritoService // Servicio que maneja el carrito
  ) {}

  /**
   * Al inicializar el componente, obtiene el producto correspondiente al ID desde la URL.
   * Si el ID existe, se carga el producto desde el servicio.
   */
  ngOnInit(): void {
    const id = this.ruta.snapshot.paramMap.get('id');
    if (id) {
      this.datos.traerPorId(id).subscribe((producto: Yerba) => {
        this.yerba = producto;
      });
    }
  }

  /**
   * Agrega el producto al carrito y actualiza el stock localmente.
   * Si la cantidad a agregar es mayor que el stock, se ajusta a la cantidad disponible.
   * 
   * @param producto Producto a agregar al carrito
   */
  agregarCarrito(producto: Yerba): void {
    if (producto.cantidad <= 0) return; // No agregar si la cantidad es 0 o negativa

    // Si la cantidad es mayor al stock, ajustamos al stock máximo
    if (producto.cantidad > producto.stock) {
      producto.cantidad = producto.stock;
    }

    // Copia el producto y lo agrega al carrito
    const productoACarrito: Yerba = { ...producto };
    this.carrito.agregarCarrito(productoACarrito);

    // Actualiza el stock y resetea la cantidad en el producto
    producto.stock -= producto.cantidad;
    producto.cantidad = 0;
  }
}
