import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { YerbaCarritoService } from '../yerba-carrito.service';
import { Yerba } from '../yerba-listado/yerba';

/**
 * Componente que gestiona la confirmación de la compra.
 * Permite al usuario ingresar sus datos y procesar la compra.
 */
@Component({
  selector: 'app-yerba-comprar',
  standalone: false,
  templateUrl: './yerba-comprar.component.html',
  styleUrls: ['./yerba-comprar.component.scss']
})
export class YerbaComprarComponent implements OnInit {
  /** Productos que están en el carrito */
  carrito: Yerba[] = [];

  /** Total a pagar por los productos en el carrito */
  total: number = 0;

  /** Formulario de cliente con validaciones */
  clienteForm!: FormGroup;

  constructor(
    private fb: FormBuilder, // Servicio para crear formularios reactivos
    private carritoService: YerbaCarritoService // Servicio para gestionar el carrito
  ) {}

  /**
   * Al inicializar el componente, obtiene los productos del carrito y calcula el total.
   * También configura el formulario reactivo para capturar los datos del cliente.
   */
  ngOnInit(): void {
    this.carrito = this.carritoService.obtenerProductos();  // Obtiene los productos del carrito
    this.total = this.carritoService.obtenerTotal();  // Calcula el total de la compra

    // Inicialización del formulario reactivo con validaciones
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^\d{7,8}$/)]], // Validación de número de DNI
      email: ['', [Validators.required, Validators.email]], // Validación de email
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]], // Validación de teléfono
      formaPago: ['', Validators.required],
      comentario: [''] // Comentarios opcionales
    });
  }

  /**
   * Confirma la compra si el formulario es válido.
   * Muestra un mensaje de agradecimiento y vacía el carrito.
   * 
   * Si el formulario no es válido, marca todos los campos como tocados para mostrar los errores.
   */
  confirmarCompra(): void {
    if (this.clienteForm.valid) {
      const datosCliente = this.clienteForm.value;
      console.log('✅ Compra confirmada:', { cliente: datosCliente, productos: this.carrito });
      alert('Gracias por tu compra. Pronto nos contactaremos.');
      this.carritoService.vaciarCarrito(); // Vacia el carrito después de la compra
      this.clienteForm.reset(); // Reinicia el formulario
    } else {
      this.clienteForm.markAllAsTouched(); // Marca todos los campos del formulario como tocados
    }
  }
}
