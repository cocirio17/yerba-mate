import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * Componente que maneja la cantidad de un producto en un rango específico.
 * Permite aumentar y disminuir la cantidad de acuerdo a los valores de min y max.
 */
@Component({
  selector: 'app-input-numero',
  standalone: false,
  templateUrl: './input-numero.component.html',
  styleUrls: ['./input-numero.component.scss']
})
export class InputNumeroComponent {
  /** Cantidad del producto, valor inicial es 0 */
  @Input() cantidad: number = 0;

  /** Valor máximo permitido para la cantidad */
  @Input() max: number = Infinity;

  /** Valor mínimo permitido para la cantidad */
  @Input() min: number = 0;

  /** Evento que emite el nuevo valor de la cantidad cuando cambia */
  @Output() cantidadChange = new EventEmitter<number>();

  /**
   * Aumenta la cantidad en 1, siempre y cuando no supere el valor máximo.
   */
  aumentarCantidad(): void {
    if (this.cantidad < this.max) {
      this.cantidad++;
      this.cantidadChange.emit(this.cantidad); // Emite el nuevo valor de cantidad
    }
  }

  /**
   * Disminuye la cantidad en 1, siempre y cuando no sea menor que el valor mínimo.
   */
  disminuirCantidad(): void {
    if (this.cantidad > this.min) {
      this.cantidad--;
      this.cantidadChange.emit(this.cantidad); // Emite el nuevo valor de cantidad
    }
  }

  /**
   * Valida que la cantidad esté dentro del rango de min y max.
   * Si la cantidad es menor que el valor mínimo, se ajusta al valor mínimo.
   * Si la cantidad es mayor que el valor máximo, se ajusta al valor máximo.
   */
  validarCantidad(): void {
    if (this.cantidad < this.min) {
      this.cantidad = this.min;
    } else if (this.cantidad > this.max) {
      this.cantidad = this.max;
    }
    this.cantidadChange.emit(this.cantidad); // Emite el nuevo valor de cantidad
  }
}
