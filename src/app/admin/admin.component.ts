import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { YerbaDatoService } from '../yerba-dato.service';
import { Yerba } from '../yerba-listado/yerba';

@Component({ selector: 'app-admin', templateUrl: './admin.component.html', styleUrls: ['./admin.component.scss'], standalone: false })
export class AdminComponent implements OnInit {
  products: Yerba[] = [];
  filteredProducts: Yerba[] = [];
  editing: Yerba | null = null;
  modalOpen = false;
  search = '';
  page = 1;
  pageSize = 8;
  imagePreview = '';
  draggedOver = false;
  activeFormTab: 'basic' | 'classification' | 'media' = 'basic';
  errorMessage = '';
  readonly existingImages = [
    'assets/img/Canarias-Serena.png',
    'assets/img/Yerba-Baldo.png',
    'assets/img/yerba-playadito.jpg',
  ];
  form = this.fb.group({
    nombre: ['', Validators.required], descripcion: [''], precio: [0, [Validators.required, Validators.min(0)]],
    marca: [''], categoria: [''], stock: [0, [Validators.required, Validators.min(0)]],
    imagen_url: [''], oferta: [false], descuento_porcentaje: [0, [Validators.min(0), Validators.max(100)]],
    tipo_corte: ['con_palo', Validators.required], origen: ['nacional', Validators.required],
    organica: [false], barbacua: [false], saborizada: [false], sabor: [''],
  });
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private productsApi: YerbaDatoService) {}
  ngOnInit(): void { this.load(); }
  load(): void {
    this.productsApi.traerTodo().subscribe({ next: products => { this.products = products; this.applyFilters(); }, error: () => this.errorMessage = 'No pudimos cargar el inventario.' });
  }
  applyFilters(): void {
    const term = this.search.trim().toLowerCase();
    this.filteredProducts = this.products.filter(product => !term || `${product.nombre} ${product.tipo}`.toLowerCase().includes(term));
    this.page = Math.min(this.page, this.totalPages);
  }
  get totalPages(): number { return Math.max(1, Math.ceil(this.filteredProducts.length / this.pageSize)); }
  get pagedProducts(): Yerba[] { return this.filteredProducts.slice((this.page - 1) * this.pageSize, this.page * this.pageSize); }
  setPage(page: number): void { this.page = Math.max(1, Math.min(page, this.totalPages)); }
  edit(product: Yerba): void { this.editing = product; this.modalOpen = true; this.activeFormTab = 'basic'; this.form.patchValue({ ...product, categoria: product.tipo, imagen_url: product.imagen }); this.imagePreview = product.imagen || ''; this.selectedFile = null; }
  openNew(): void { this.editing = null; this.modalOpen = true; this.activeFormTab = 'basic'; this.selectedFile = null; this.imagePreview = ''; this.form.reset(this.defaultFormValues()); }
  reset(): void { this.modalOpen = false; this.editing = null; this.selectedFile = null; this.imagePreview = ''; this.form.reset(this.defaultFormValues()); }
  private defaultFormValues() { return { nombre: '', descripcion: '', precio: 0, marca: '', categoria: '', stock: 0, imagen_url: '', oferta: false, descuento_porcentaje: 0, tipo_corte: 'con_palo', origen: 'nacional', organica: false, barbacua: false, saborizada: false, sabor: '' }; }
  @HostListener('document:keydown.escape')
  closeOnEscape(): void { if (this.modalOpen) this.reset(); }
  chooseImage(event: Event): void { const input = event.target as HTMLInputElement; if (input.files?.[0]) this.setFile(input.files[0]); }
  dropImage(event: DragEvent): void { event.preventDefault(); this.draggedOver = false; const file = event.dataTransfer?.files?.[0]; if (file) this.setFile(file); }
  selectExisting(image: string): void { this.selectedFile = null; this.form.patchValue({ imagen_url: image }); this.imagePreview = image; }
  private setFile(file: File): void {
    if (!file.type.startsWith('image/')) { this.errorMessage = 'Seleccioná un archivo de imagen válido.'; return; }
    if (file.size > 5 * 1024 * 1024) { this.errorMessage = 'La imagen no puede superar los 5 MB.'; return; }
    this.errorMessage = ''; this.selectedFile = file;
    const reader = new FileReader(); reader.onload = () => this.imagePreview = String(reader.result); reader.readAsDataURL(file);
  }
  save(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const formData = new FormData();
    Object.entries(this.form.getRawValue()).forEach(([key, value]) => formData.append(key, String(value ?? '')));
    if (this.selectedFile) formData.append('imagen', this.selectedFile);
    const request = this.editing ? this.productsApi.actualizar(this.editing.id, formData) : this.productsApi.crear(formData);
    request.subscribe({ next: () => { this.reset(); this.load(); }, error: () => this.errorMessage = 'No pudimos guardar el producto.' });
  }
  remove(product: Yerba): void { if (confirm(`¿Eliminar ${product.nombre}?`)) this.productsApi.eliminar(product.id).subscribe(() => this.load()); }
}
