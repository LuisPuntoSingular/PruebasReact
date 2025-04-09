 export interface Material {
   id: number;
    name: string;
  }
 export   interface Derivative {
    id: number;
    name: string;
    materialid: number;
  }
  
  export  interface Resistance {
    resistanceid: number;
    ect: string;
    flute: string;
    resistances: string;
    pricem2: string;
    minimum: string;
    trim: string;
    categoryid: number;
  }
  
   export interface Category {
    categoryid: number;
    categoryname: string;
  }
  
  export  interface Epe {
    id: number;
    medidas: string;
    precio: string;
  
    
  }

  export  interface Eva {
    id: number;
    medida: string;
    precio: string;
  
  }
  
  export  interface Foam {
    id: number;
    derivado: string;
  
  }
  
  
  export  interface FoamPrecio {
    id: number;
    medidas: string;
    precio: string;
    idfoam: number;
    ancho_rollo: string;
    largo_rollo: string;
  }
  
  
 export interface FoamColor {
    id: number;
    color: string;
    
    anchoplaca: number;
    largoplaca: number;
  }
  
  
  export  interface ColorPrecio {
    id: number;
    medida: string;
    precio: string;
    idcoloresfoam: number;
  }
  
  export   interface Polybubble {
    id: number;
    derivados: string;
  
  }
  
 export interface PolybubblePrecio {
    id: number;
    medidas: string;
    precio: string;
    idpoliburbuja: number;
    ancho_rollo: number;
    largo_rollo: number;
  }
  