import { usePolybubbleContext } from './PolybubbleContext'; // Importar el contexto de Polybubble

const PolybubbleIndex = () => {
    const { selectedPoliburbuja, selectedPoliburbujaPrecio } = usePolybubbleContext(); // Obtener los valores del contexto
    
    console.log("selectedPoliburbuja", selectedPoliburbuja); // Imprimir el valor de selectedPoliburbuja
    console.log("selectedPoliburbujaPrecio", selectedPoliburbujaPrecio); // Imprimir el valor de selectedPoliburbujaPrecio
    return ; // Retornar los valores seleccionados
    }

    export default PolybubbleIndex; // Exportar el componente PolybubbleIndex