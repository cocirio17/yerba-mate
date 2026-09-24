import { Component, HostListener } from '@angular/core';
import { YerbaCarritoService } from './yerba-carrito.service';
import { AuthService } from './auth.service';
import { User } from './user.model';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
  ,animations: [trigger('routeAnimations', [transition('* <=> *', [style({ opacity: 0 }), animate('350ms ease-out', style({ opacity: 1 }))])])]
})
export class AppComponent {
  title = 'YerbaShop';
  mostrarCarrito = false;
  cantidadEnCarrito = 0;
  isScrolled = false;
  user: User | null = null;

  constructor(public carrito: YerbaCarritoService, public auth: AuthService) {
    this.carrito.cantidadTotal$.subscribe(cantidad => this.cantidadEnCarrito = cantidad);
    this.carrito.productoAgregado$.subscribe(() => this.mostrarCarrito = true);
    this.auth.user$.subscribe(user => this.user = user);
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 24;
  }

  toggleCarrito(): void {
    this.mostrarCarrito = !this.mostrarCarrito;
  }

  logout(): void {
    this.auth.logout();
  }

  prepareRoute(outlet: any): string { return outlet?.activatedRouteData?.['animation'] || ''; }
}
