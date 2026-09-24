import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { YerbaCarritoService } from '../yerba-carrito.service';
import { Yerba } from '../yerba-listado/yerba';

@Component({
  selector: 'app-yerba-comprar',
  standalone: false,
  templateUrl: './yerba-comprar.component.html',
  styleUrls: ['./yerba-comprar.component.scss']
})
export class YerbaComprarComponent implements OnInit {
  carrito: Yerba[] = [];
  total = 0;
  shippingGoal = 35000;
  step = 1;
  summaryOpen = true;
  clienteForm!: FormGroup;

  constructor(private fb: FormBuilder, private carritoService: YerbaCarritoService) {}

  ngOnInit(): void {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required], apellido: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern(/^\d{7,8}$/)]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{7,15}$/)]],
      formaPago: ['', Validators.required], comentario: ['']
    });
    this.carritoService.listaCarrito.subscribe(productos => {
      this.carrito = productos;
      this.total = this.carritoService.obtenerTotal();
    });
  }

  avanzar(): void {
    const controls = this.step === 1 ? ['nombre', 'apellido', 'email', 'telefono'] :
      this.step === 2 ? ['direccion', 'dni'] : ['formaPago'];
    controls.forEach(control => this.clienteForm.get(control)?.markAsTouched());
    if (controls.some(control => this.clienteForm.get(control)?.invalid)) return;
    if (this.step < 3) {
      this.step++;
      return;
    }
    this.confirmarCompra();
  }

  campoInvalido(control: string): boolean {
    const campo = this.clienteForm.get(control);
    return !!campo && campo.invalid && campo.touched;
  }

  confirmarCompra(): void {
    alert('Gracias por tu compra. Pronto nos contactaremos.');
    this.carritoService.vaciarCarrito();
    this.clienteForm.reset();
    this.step = 1;
  }
}
