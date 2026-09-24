import { Component, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Yerba } from '../yerba-listado/yerba';
import { YerbaDatoService } from '../yerba-dato.service';

type FilterKey = 'tipo' | 'origen';
interface FilterChip { key: FilterKey | 'marcas' | 'organica' | 'barbacua' | 'saborizada'; value: string; label: string; }

@Component({ selector: 'app-yerba-yerbas', standalone: false, templateUrl: './yerba-yerbas.component.html', styleUrl: './yerba-yerbas.component.scss' })
export class YerbaYerbasComponent implements OnInit {
  productos: Yerba[] = [];
  productosFiltrados: Yerba[] = [];
  marcas: string[] = [];
  tipos = [{ value: 'con_palo', label: 'Con palo' }, { value: 'sin_palo', label: 'Sin palo' }, { value: 'compuesta', label: 'Compuesta' }];
  origenes = [{ value: 'nacional', label: 'Nacional (Argentina)' }, { value: 'brasilera', label: 'Brasilera' }, { value: 'uruguaya', label: 'Uruguaya' }];
  caracteristicaOptions: Array<{ key: 'organica' | 'barbacua'; label: string }> = [{ key: 'organica', label: 'Orgánica' }, { key: 'barbacua', label: 'Barbacuá' }];
  varietyOptions: Array<{ key: 'saborizada'; label: string }> = [{ key: 'saborizada', label: 'Saborizadas' }];
  marcasSeleccionadas = new Set<string>();
  tiposSeleccionados = new Set<string>();
  origenesSeleccionados = new Set<string>();
  caracteristicas = { organica: false, barbacua: false, saborizada: false };
  seccionesAbiertas = { tipo: true, origen: true, caracteristicas: true, variedad: true, marcas: true };
  terminoBusqueda = '';
  orden = 'relevantes';
  private busqueda$ = new Subject<string>();

  constructor(private yerbaService: YerbaDatoService) {
    this.busqueda$.pipe(debounceTime(250), distinctUntilChanged()).subscribe(term => { this.terminoBusqueda = term; this.cargarResultados(); });
  }

  ngOnInit(): void {
    this.yerbaService.traerTodo().subscribe(productos => {
      this.productos = productos;
      this.marcas = [...new Set(productos.map(producto => producto.marca || producto.tipo).filter(Boolean))].sort();
      this.productosFiltrados = productos;
    });
  }

  buscar(event: Event): void { this.busqueda$.next((event.target as HTMLInputElement).value.trim()); }
  alternarSet(set: Set<string>, value: string): void { set.has(value) ? set.delete(value) : set.add(value); this.cargarResultados(); }
  alternarMarca(marca: string): void { this.alternarSet(this.marcasSeleccionadas, marca); }
  alternarTipo(tipo: string): void { this.alternarSet(this.tiposSeleccionados, tipo); }
  alternarOrigen(origen: string): void { this.alternarSet(this.origenesSeleccionados, origen); }
  alternarCaracteristica(key: 'organica' | 'barbacua' | 'saborizada'): void { this.caracteristicas[key] = !this.caracteristicas[key]; this.cargarResultados(); }
  cambiarOrden(event: Event): void { this.orden = (event.target as HTMLSelectElement).value; this.cargarResultados(); }
  alternarSeccion(section: keyof typeof this.seccionesAbiertas): void { this.seccionesAbiertas[section] = !this.seccionesAbiertas[section]; }

  get chips(): FilterChip[] {
    return [
      ...Array.from(this.tiposSeleccionados).map(value => ({ key: 'tipo' as const, value, label: this.tipos.find(item => item.value === value)?.label || value })),
      ...Array.from(this.origenesSeleccionados).map(value => ({ key: 'origen' as const, value, label: this.origenes.find(item => item.value === value)?.label || value })),
      ...Array.from(this.marcasSeleccionadas).map(value => ({ key: 'marcas' as const, value, label: value })),
      ...Object.entries(this.caracteristicas).filter(([, active]) => active).map(([key]) => ({ key: key as 'organica' | 'barbacua' | 'saborizada', value: 'true', label: key === 'saborizada' ? 'Saborizadas' : key === 'organica' ? 'Orgánicas' : 'Barbacuá' })),
    ];
  }

  quitarChip(chip: FilterChip): void {
    if (chip.key === 'tipo') this.tiposSeleccionados.delete(chip.value);
    if (chip.key === 'origen') this.origenesSeleccionados.delete(chip.value);
    if (chip.key === 'marcas') this.marcasSeleccionadas.delete(chip.value);
    if (chip.key === 'organica' || chip.key === 'barbacua' || chip.key === 'saborizada') this.caracteristicas[chip.key] = false;
    this.cargarResultados();
  }

  cantidadPorTipo(value: string): number { return this.productos.filter(product => product.tipo_corte === value).length; }
  cantidadPorOrigen(value: string): number { return this.productos.filter(product => product.origen === value).length; }
  cantidadPorMarca(value: string): number { return this.productos.filter(product => (product.marca || product.tipo) === value).length; }
  cantidadPorCaracteristica(key: 'organica' | 'barbacua' | 'saborizada'): number { return this.productos.filter(product => product[key]).length; }

  limpiarFiltros(): void {
    this.terminoBusqueda = ''; this.marcasSeleccionadas.clear(); this.tiposSeleccionados.clear(); this.origenesSeleccionados.clear();
    this.caracteristicas = { organica: false, barbacua: false, saborizada: false }; this.orden = 'relevantes'; this.cargarResultados();
  }

  private cargarResultados(): void {
    this.yerbaService.traerTodo({
      search: this.terminoBusqueda,
      marca: Array.from(this.marcasSeleccionadas),
      tipo: Array.from(this.tiposSeleccionados),
      origen: Array.from(this.origenesSeleccionados),
      organica: this.caracteristicas.organica ? true : undefined,
      barbacua: this.caracteristicas.barbacua ? true : undefined,
      saborizada: this.caracteristicas.saborizada ? true : undefined,
    }).subscribe(productos => {
      this.productosFiltrados = [...productos].sort((a, b) => this.orden === 'menor-precio' ? a.precio - b.precio : this.orden === 'mayor-precio' ? b.precio - a.precio : this.orden === 'nombre-az' ? a.nombre.localeCompare(b.nombre) : this.orden === 'nombre-za' ? b.nombre.localeCompare(a.nombre) : Number(b.oferta) - Number(a.oferta));
    });
  }
}
