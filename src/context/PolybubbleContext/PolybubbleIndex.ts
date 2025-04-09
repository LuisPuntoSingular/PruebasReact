import { usePolybubbleContext } from './PolybubbleContext'; // Importar el contexto de Polybubble
import { useSelectedValues } from '../CardBoardContext/SelectedValuesContext';
import { useMeasures } from '../CardBoardContext/CardboardMeasuresContext';


const PolybubbleIndex = () => {
    
    const {  selectedPoliburbujaPrecio } = usePolybubbleContext(); // Obtener los valores del contexto
   const {utilidad } = useSelectedValues();
    const { largo, ancho } = useMeasures(); // Obtener las medidas del contexto de CardboardMeasuresContext
    
  
   
   // Obtener los valores seleccionados del contexto de SelectedValuesContext
   const anchoPoly = selectedPoliburbujaPrecio?.ancho|| 0; // Obtener el ancho del precio seleccionado
    const largoPoly = selectedPoliburbujaPrecio?.largo || 0; // Obtener el largo del precio seleccionado
    const precio = selectedPoliburbujaPrecio?.precio || 0; // Obtener el precio del precio seleccionado

    const ganancia = Math.max((100 - Number(utilidad)) / 100, 0.01); // Valor mínimo de 0.01 para evitar división por 0

  

  


    let partA =
    Math.floor(Number(anchoPoly) / Number(ancho)) *
    Math.floor(Number(largoPoly) / Number(largo));

    let partB =
    Math.floor(Number(anchoPoly) / Number(largo)) *
    Math.floor(Number(largoPoly) / Number(ancho));

    

    let precioA = precio / partA;
    let precioB = precio / partB;

    if (partA > partB) {
        // Si la parte A es mayor que la parte B, se aplica el descuento a la parte B
        partB = Math.floor(partB * 0.9);
        precioB = ((Number(precio) / partB) / ganancia);  
    } else {
        // Si la parte B es mayor que la parte A, se aplica el descuento a la parte A
        partA = Math.floor(partA * 0.9);
        precioA = ((Number(precio) / partA) / ganancia);
    }

    return { partA, partB, precioA, precioB }; // Retornar los resultados
};


   
   
    export default PolybubbleIndex; // Exportar el componente PolybubbleIndex