import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { YerbaCarritoService } from '../yerba-carrito.service';
import { Yerba } from '../yerba-listado/yerba';

@Component({
  selector: 'app-yerba-comprar',
  standalone: false,
  templateUrl: './yerba-comprar.component.html',
  styleUrl: './yerba-comprar.component.scss'
})
export class YerbaComprarComponent implements OnInit  {
  carrito: Yerba[] = [];
  total: number = 0;
  clienteForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private carritoService: YerbaCarritoService
  ) {}

  ngOnInit(): void {
    this.carrito = this.carritoService.obtenerProductos();  // Obtiene los productos
    this.total = this.carritoService.obtenerTotal();  // Obtiene el total

    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^\d{7,8}$/)]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]],
      formaPago: ['', Validators.required],
      comentario: ['']
    });
  }

  confirmarCompra() {
    if (this.clienteForm.valid) {
      const datosCliente = this.clienteForm.value;
      console.log('✅ Compra confirmada:', { cliente: datosCliente, productos: this.carrito });
      alert('Gracias por tu compra. Pronto nos contactaremos.');
      this.carritoService.vaciarCarrito();
      this.clienteForm.reset();
    } else {
      this.clienteForm.markAllAsTouched(); // Para mostrar los errores de validación
    }
  }
}
