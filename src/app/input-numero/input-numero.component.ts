import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-input-numero',
  standalone: false,
  templateUrl: './input-numero.component.html',
  styleUrls: ['./input-numero.component.scss']
})
export class InputNumeroComponent {
   @Input() cantidad: number = 0;
  @Input() max: number = Infinity;
  @Input() min: number = 0;

  @Output() cantidadChange = new EventEmitter<number>();

  aumentarCantidad(): void {
    if (this.cantidad < this.max) {
      this.cantidad++;
      this.cantidadChange.emit(this.cantidad);
    }
  }

  disminuirCantidad(): void {
    if (this.cantidad > this.min) {
      this.cantidad--;
      this.cantidadChange.emit(this.cantidad);
    }
  }

  validarCantidad(): void {
    if (this.cantidad < this.min) {
      this.cantidad = this.min;
    } else if (this.cantidad > this.max) {
      this.cantidad = this.max;
    }
    this.cantidadChange.emit(this.cantidad);
  }
}
