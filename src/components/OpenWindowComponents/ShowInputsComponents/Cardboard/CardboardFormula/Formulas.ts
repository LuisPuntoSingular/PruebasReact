export const calcularCRRSencillo = (largo: number, ancho: number, alto:number): number => {
    let largocompuesto = (((largo*2)+10)+((ancho*2)+8))+40

    if (largocompuesto >= 2400) {
      largocompuesto += 100;
  }
    const anchocompuesto = ((((ancho/2)*2)+6)+(alto+9))
    const resultado = (largocompuesto/1000) * (anchocompuesto/1000)  // para obtener m2
    return resultado; 
  };
  
  // Función de cálculo doble para "CRR"
  export const calcularCRRDoble = (largo: number, ancho: number, alto:number): number => {
    let largocompuesto = (((largo*2)+16)+((ancho*2)+13))+804

    if (largocompuesto >= 2400) {
      largocompuesto += 100;
  }
    const anchocompuesto =((((ancho/2)*2)+10)+(alto+16))
    const resultado = (largocompuesto/1000) * (anchocompuesto/1000) 
    return resultado; 
  };
  
  // Función de cálculo sencillo para "Cinturon"
  export const calcularCinturonSencillo = (largo: number, ancho: number, alto:number): number => {
    let largocompuesto = (((largo*2)+10)+((ancho*2)+8))+40
    if (largocompuesto >= 2400) {
      largocompuesto += 100;
  }
    if (largocompuesto >= 2400) {
      largocompuesto += 100;
  }
    const anchocompuesto =  alto
    const resultado = (largocompuesto/1000) * (anchocompuesto/1000)  // para obtener m2
    return resultado; 
  };
  
  // Función de cálculo doble para "Cinturon"
  export const calcularCinturonDoble = (largo: number, ancho: number, alto:number): number => {
    let largocompuesto = (((largo*2)+16)+((ancho*2)+13))+80
    if (largocompuesto >= 2400) {
      largocompuesto += 100;
  }
    const anchocompuesto = alto
    const resultado = (largocompuesto/1000) * (anchocompuesto/1000) 
    return resultado;
  };
  
 
  export const calcularEsquineroSencillo = (largo: number, ancho: number, alto:number): number => {
    const largocompuesto = largo + (ancho*2)
    const anchocompuesto = alto
    const resultado = (largocompuesto/1000) * (anchocompuesto/1000) 
    return resultado;  // Ejemplo de cálculo sencillo
  };
  export const calcularEsquineroDoble = (largo: number, ancho: number, alto:number): number => {
    const largocompuesto = largo + (ancho*2)
    const anchocompuesto = alto
    const resultado = (largocompuesto/1000) * (anchocompuesto/1000) 
    return resultado;  
  };
   // Función de cálculo sencillo para "1/2 Caja"
   export const calcularMediaCajaSencillo = (largo: number, ancho: number, alto:number): number => {
    let largocompuesto=(((largo*2)+10)+((ancho*2)+8))+40

    if (largocompuesto >= 2400) {
      largocompuesto += 100;
  }

    const anchocompuesto= ((ancho/2)+3)+ (alto)
    const resultado = (largocompuesto/1000) * (anchocompuesto/1000) 
    return resultado; 
  };
  
  // Función de cálculo doble para "1/2 Caja"
  export const calcularMediaCajaDoble = (largo: number, ancho: number, alto: number): number => {
    let largocompuesto = (((largo*2)+16)+((ancho*2)+13))+80
    //condicion para agregar mas espacio
    if (largocompuesto >= 2400) {
      largocompuesto += 100;
  }
    const anchocompuesto = ((ancho/2)+5)+ (alto+8)
    const resultado = (largocompuesto/1000) * (anchocompuesto/1000) 
    return resultado;  
  };
  
  // Función de cálculo sencillo para "Tapa Base"
  export const calcularTapaBaseSencillo = (largo: number, ancho: number, alto: number): number => {
    const largocompuesto = (ancho+16)+((alto*2)+10)
    const anchocompuesto = (largo+15)+((alto*2)+10)
    const resultado = (largocompuesto/1000) * (anchocompuesto/1000) 
    return resultado; 
  };
  
  // Función de cálculo doble para "Tapa Base"
  export const calcularTapaBaseDoble = (largo: number, ancho: number, alto:number): number => {
    const largocompuesto = (ancho+16)+((alto*2)+10)
    const anchocompuesto = (largo+15)+((alto*2)+10)
    const resultado = (largocompuesto/1000) * (anchocompuesto/1000) 
    return resultado;
  };
  
  // Función de cálculo sencillo para "Separador"
  export const calcularSeparadorSencillo = (largo: number, ancho: number): number => {
    const largocompuesto = largo
    const anchocompuesto = ancho
    const resultado = (largocompuesto/1000) * (anchocompuesto/1000) 
    return resultado;  // Ejemplo de cálculo sencillo
  };
  
  // Función de cálculo doble para "Separador"
  export const calcularSeparadorDoble = (largo: number, ancho: number): number => {
    const largocompuesto = largo
    const anchocompuesto = ancho
    const resultado = (largocompuesto/1000) * (anchocompuesto/1000) 
    return resultado;  
  };
  
  // Función de cálculo sencillo para "Rejilla"
  export const calcularRejillaSencillo = (largo: number, ancho: number): number => {
    const largocompuesto = largo
    const anchocompuesto = ancho
    const resultado = (largocompuesto/1000) * (anchocompuesto/1000) 
    return resultado;  
  };
  
  // Función de cálculo doble para "Rejilla"
  export const calcularRejillaDoble = (largo: number, ancho: number): number => {
    const largocompuesto = largo
    const anchocompuesto = ancho
    const resultado = (largocompuesto/1000) * (anchocompuesto/1000) 
    return resultado;  // Ejemplo de cálculo doble
  };
  
  // Función de cálculo sencillo para "Area"
  export const calcularAreaSencillo = (largo: number, ancho: number): number => {
    const largocompuesto = largo
    const anchocompuesto = ancho
    const resultado = (largocompuesto/1000) * (anchocompuesto/1000) 
    return resultado;  // Ejemplo de cálculo sencillo
  };
  
  // Función de cálculo doble para "Area"
  export const calcularAreaDoble = (largo: number, ancho: number): number => {
    const largocompuesto = largo
    const anchocompuesto = ancho
    const resultado = (largocompuesto/1000) * (anchocompuesto/1000) 
    return resultado;  // Ejemplo de cálculo doble
  };


  