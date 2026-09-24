import { Component } from '@angular/core';

/**
 * Componente que gestiona la página de consejos sobre yerba.
 * Muestra una lista de consejos relacionados con los diferentes tipos de yerba.
 */
@Component({
  selector: 'app-consejos',
  standalone: false,
  templateUrl: './consejos.component.html',
  styleUrls: ['./consejos.component.scss']
})
export class ConsejosComponent {
  /** Lista de consejos relacionados con la yerba */
  consejos = [
    {
      titulo: 'Yerba con palo vs. sin palo: ¿cuál elegir?',
      descripcion: 'La yerba con palo incluye fragmentos del tallo, lo que la hace más suave y duradera.', imagen: 'assets/img/yerba-canarias.jpg', categoria: 'Guía'
    },
    {
      titulo: 'Yerba tradicional, compuesta y saborizada',
      descripcion: 'La temperatura correcta cuida el sabor y hace que la yerba dure más.', imagen: 'assets/img/Pindare.jpg', categoria: 'Preparación'
    },
    {
      titulo: 'Molido fino, grueso y polvo: ¿cómo afecta el sabor?',
      descripcion: 'Un buen mate se prepara desde el primer día: aprendé a curarlo sin apuro.', imagen: 'assets/img/Nosotros.jpg', categoria: 'Rituales'
    },
    {
      titulo: 'Estacionada vs. verde: la maduración importa',
      descripcion: 'Hoja, palo, polvo y estacionamiento: las claves para encontrar tu perfil.', imagen: 'assets/img/Yerba-Rei-Verde.png', categoria: 'Cultura'
    }
  ];
}
