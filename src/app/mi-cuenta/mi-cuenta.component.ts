import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({ selector: 'app-mi-cuenta', standalone: false, templateUrl: './mi-cuenta.component.html', styleUrls: ['./mi-cuenta.component.scss'] })
export class MiCuentaComponent implements OnInit {
  user: User | null = null;
  activeTab = 'datos';
  saved = false;
  addressForm = this.fb.group({ direccion: ['', Validators.required] });
  orders = [
    { id: '#YS-1048', fecha: '12 de agosto de 2026', total: 14300, estado: 'Entregado', productos: 'Canarias Serena · Baldo' },
    { id: '#YS-0981', fecha: '24 de junio de 2026', total: 8950, estado: 'Entregado', productos: 'Playadito · 500 g' }
  ];

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.auth.currentUser;
    if (!this.user) { this.router.navigate(['/login']); return; }
    this.addressForm.patchValue({ direccion: this.user.direccion || '' });
  }

  saveAddress(): void {
    if (!this.user || this.addressForm.invalid) { this.addressForm.markAllAsTouched(); return; }
    this.user = this.auth.updateUser({ ...this.user, direccion: this.addressForm.value.direccion || '' });
    this.saved = true;
    setTimeout(() => this.saved = false, 2500);
  }

  logout(): void { this.auth.logout(); this.router.navigate(['/']); }
}
