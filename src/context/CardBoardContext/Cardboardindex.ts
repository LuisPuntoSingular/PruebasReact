import { useMeasures } from "@/context/CardBoardContext/CardboardMeasuresContext";
import { useSelectedValues } from "@/context/CardBoardContext/SelectedValuesContext";
import { 
  calcularCRRSencillo,
  calcularCRRDoble,
  calcularCinturonSencillo,
  calcularCinturonDoble,
  calcularMediaCajaSencillo,
  calcularMediaCajaDoble,
  calcularTapaBaseSencillo,
  calcularTapaBaseDoble,
  calcularSeparadorSencillo,
  calcularSeparadorDoble,
  calcularAreaSencillo,
  calcularAreaDoble,
  calcularEsquineroSencillo,
  calcularEsquineroDoble,
} from "@/components/OpenWindowComponents/ShowInputsComponents/Cardboard/CardboardFormula/Formulas";

export const useCalculos = () => {
  const { largo, ancho, alto, cantidad, rejillaTotal, totalCantidad } = useMeasures();
  const {
    selectedPriceM2,
    resistanceMinimum,
    selectedDerivado,
    selectedCorrugado,
    utilidad,
  } = useSelectedValues();

  const calculatePrice = () => {
    // Validar si faltan valores esenciales
    if (!selectedDerivado ||!selectedCorrugado ) {
      return { precioventa: 0, preciocosto: 0, minimo: 0 }; // Retornar valores por defecto
    }

    let resultado: number = 0;

    // Lógica para calcular el resultado basado en el derivado y la categoría
    switch (selectedDerivado) {
      case "CRR":
        resultado =
          selectedCorrugado === "Sencillo"
            ? calcularCRRSencillo(largo|| 0, ancho|| 0, Number(alto) )
            : calcularCRRDoble(largo|| 0, ancho|| 0, Number(alto) );
        break;
      case "Cinturon":
        resultado =
          selectedCorrugado === "Sencillo"
            ? calcularCinturonSencillo(largo|| 0, ancho|| 0, Number(alto) )
            : calcularCinturonDoble(largo|| 0, ancho|| 0, Number(alto) );
        break;
      case "1/2 Caja":
        resultado =
          selectedCorrugado === "Sencillo"
            ? calcularMediaCajaSencillo(largo|| 0, ancho|| 0, Number(alto) )
            : calcularMediaCajaDoble(largo|| 0, ancho|| 0, Number(alto) );
        break;
        case "Rejilla":
        resultado = rejillaTotal; // Usar el total de rejilla directamente
          
        break;
      case "Tapa Base":
        resultado =
          selectedCorrugado === "Sencillo"
            ? calcularTapaBaseSencillo(largo|| 0, ancho|| 0, Number(alto) )
            : calcularTapaBaseDoble(largo|| 0, ancho|| 0, Number(alto) );
        break;
      case "Separador":
        resultado =
          selectedCorrugado === "Sencillo"
            ? calcularSeparadorSencillo(largo|| 0, ancho|| 0)
            : calcularSeparadorDoble(largo|| 0, ancho|| 0);
        break;
      case "Area":
        resultado =
          selectedCorrugado === "Sencillo"
            ? calcularAreaSencillo(largo|| 0, ancho|| 0)
            : calcularAreaDoble(largo|| 0, ancho|| 0);
        break;
      case "Esquinero":
        resultado =
          selectedCorrugado === "Sencillo"
            ? calcularEsquineroSencillo(largo|| 0, ancho|| 0, Number(alto) )
            : calcularEsquineroDoble(largo|| 0, ancho|| 0, Number(alto) );
        break;
      default:
        return { precioventa: 0, preciocosto: 0, minimo: 0 }; // Retornar valores por defecto
    }

   // Calcular precios
const ganancia = (100 - Number(utilidad)) / 100; // Ganancia en porcentaje

let preciocosto = 0;
let precioventa = 0;
let minimo = 0;

if (selectedDerivado !== "Rejilla") {
  // Cálculos para derivados que no son "Rejilla"
  preciocosto = resultado * (Number(selectedPriceM2) || 0); // Precio de costo por m2
  precioventa = (preciocosto / ganancia)* Number(cantidad); // Aplicar margen de ganancia
  minimo = Math.ceil(((resistanceMinimum || 0)) / resultado); // Calcular mínimo


} else {
  // Cálculos específicos para "Rejilla"
  preciocosto = rejillaTotal  * (Number(selectedPriceM2) || 0); // Precio de costo por m2
  precioventa = preciocosto / ganancia; // Aplicar margen de ganancia
  minimo = Math.ceil(((resistanceMinimum || 0) * totalCantidad) / rejillaTotal); // Calcular mínimo
}

// Retornar los valores calculados
return { precioventa, preciocosto, minimo };

  };

  return calculatePrice();
};