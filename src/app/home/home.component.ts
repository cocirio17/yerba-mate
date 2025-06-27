import { Component } from '@angular/core';
import { Yerba } from '../yerba-listado/yerba';
import { YerbaDatoService } from '../yerba-dato.service';

/**
 * Componente que gestiona la página de inicio.
 * Muestra los productos que están en oferta.
 */
@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  /** Lista de productos que están actualmente en oferta */
  productosEnOferta: Yerba[] = [];

  constructor(private yerbaService: YerbaDatoService) { }

  /**
   * Al inicializar el componente, se obtienen todos los productos y se filtran
   * aquellos que están en oferta.
   */
  ngOnInit(): void {
    this.yerbaService.traerTodo().subscribe(productos => {
      // Filtrar los productos que están en oferta
      this.productosEnOferta = productos.filter(producto => producto.oferta);
    });
  }
}
