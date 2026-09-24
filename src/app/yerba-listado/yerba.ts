export interface Yerba {
  "id": string;
  "nombre": string;
  "tipo": string;
  "marca": string;
  "precio": number;
  "stock": number;
  "imagen": string;
  "oferta": boolean;
  "descuento_porcentaje": number;
  "tipo_corte": 'con_palo' | 'sin_palo' | 'compuesta';
  "origen": 'nacional' | 'brasilera' | 'uruguaya';
  "organica": boolean;
  "barbacua": boolean;
  "saborizada": boolean;
  "sabor": string;
  "cantidad": number;
  "descripcion":string;
}