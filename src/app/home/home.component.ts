import { Component } from '@angular/core';
import { Yerba } from '../yerba-listado/yerba';
import { YerbaDatoService } from '../yerba-dato.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  productosEnOferta: Yerba[] = [];

  constructor(private yerbaService: YerbaDatoService) { }

  ngOnInit(): void {
    this.yerbaService.traerTodo().subscribe(productos => {
      this.productosEnOferta = productos.filter(producto => producto.oferta); // Filtrar productos en oferta
    });
  }
}
