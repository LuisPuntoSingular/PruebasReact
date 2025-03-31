import { useMeasures } from "@/context/MeasuresContext";
import { useSelectedValues } from "@/context/SelectedValuesContext";
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
    if (
      !selectedDerivado ||
      !selectedCorrugado ||
      !largo ||
      !ancho ||
      !cantidad
      
    ) {
      return { precioventa: 0, preciocosto: 0, minimo: 0 }; // Retornar valores por defecto
    }

    let resultado: number = 0;

    // Lógica para calcular el resultado basado en el derivado y la categoría
    switch (selectedDerivado) {
      case "CRR":
        resultado =
          selectedCorrugado === "Simple"
            ? calcularCRRSencillo(largo, ancho,Number(alto) )
            : calcularCRRDoble(largo, ancho, Number(alto));
        break;
      case "Cinturon":
        resultado =
          selectedCorrugado === "Simple"
            ? calcularCinturonSencillo(largo, ancho, Number(alto))
            : calcularCinturonDoble(largo, ancho, Number(alto));
        break;
      case "1/2 Caja":
        resultado =
          selectedCorrugado === "Simple"
            ? calcularMediaCajaSencillo(largo, ancho, Number(alto))
            : calcularMediaCajaDoble(largo, ancho, Number(alto));
        break;
        case "Rejilla":
        resultado =
          selectedCorrugado === "Simple"
            ? rejillaTotal
            : rejillaTotal
        break;
      case "Tapa Base":
        resultado =
          selectedCorrugado === "Simple"
            ? calcularTapaBaseSencillo(largo, ancho, Number(alto))
            : calcularTapaBaseDoble(largo, ancho, Number(alto));
        break;
      case "Separador":
        resultado =
          selectedCorrugado === "Simple"
            ? calcularSeparadorSencillo(largo, ancho)
            : calcularSeparadorDoble(largo, ancho);
        break;
      case "Area":
        resultado =
          selectedCorrugado === "Simple"
            ? calcularAreaSencillo(largo, ancho)
            : calcularAreaDoble(largo, ancho);
        break;
      case "Esquinero":
        resultado =
          selectedCorrugado === "Simple"
            ? calcularEsquineroSencillo(largo, ancho, Number(alto))
            : calcularEsquineroDoble(largo, ancho, Number(alto));
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
  precioventa = preciocosto / ganancia; // Aplicar margen de ganancia
  minimo = Math.ceil(((resistanceMinimum || 0) * cantidad) / resultado); // Calcular mínimo


} else {
  // Cálculos específicos para "Rejilla"
  preciocosto = rejillaTotal * (Number(selectedPriceM2) || 0); // Precio de costo por m2
  precioventa = preciocosto / ganancia; // Aplicar margen de ganancia
  minimo = Math.ceil(((resistanceMinimum || 0) * totalCantidad) / rejillaTotal); // Calcular mínimo
  console.log(minimo, "minimo rejilla")
}

// Retornar los valores calculados
return { precioventa, preciocosto, minimo };

  };

  return calculatePrice();
};