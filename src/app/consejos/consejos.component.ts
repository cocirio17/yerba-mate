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
      descripcion: 'La yerba con palo incluye fragmentos del tallo, lo que la hace más suave y duradera. En cambio, la yerba sin palo es más intensa y rápida en sabor, ideal para quienes prefieren mates más fuertes y cortos.'
    },
    {
      titulo: 'Yerba tradicional, compuesta y saborizada',
      descripcion: 'La yerba tradicional solo contiene hoja y palo. La compuesta tiene hierbas (como menta, cedrón o boldo), ideal para digestión o relajación. Las saborizadas agregan aromas como naranja o vainilla, pensadas para quienes buscan variedad.'
    },
    {
      titulo: 'Molido fino, grueso y polvo: ¿cómo afecta el sabor?',
      descripcion: 'El molido fino y con mucho polvo da mates intensos pero se lava más rápido. El molido grueso dura más y es más suave. Un buen balance (como en yerbas estacionadas) da mejor rendimiento y sabor equilibrado.'
    },
    {
      titulo: 'Estacionada vs. verde: la maduración importa',
      descripcion: 'La yerba estacionada (reposada de 9 a 24 meses) tiene sabor más suave y parejo. La yerba verde, sin estacionar, puede resultar más amarga, agresiva o inestable. La estacionada suele ser más amable con el estómago.'
    }
  ];
}
