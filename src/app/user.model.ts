export interface User {
  id: string;
  nombre: string;
  email: string;
  password?: string;
  direccion?: string;
  wishlist: string[];
  rol?: 'admin' | 'cliente';
  apellido?: string;
}

export interface OrderSummary {
  id: string;
  fecha: string;
  total: number;
  estado: 'Entregado' | 'En preparación';
  productos: string[];
}
