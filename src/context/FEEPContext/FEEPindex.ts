import { useMeasures } from "@/context/CardBoardContext/CardboardMeasuresContext";
import { useFEEP } from "@/context/FEEPContext/FEEPContext";
import {useSelectedValues} from "@/context/CardBoardContext/SelectedValuesContext";
const FEEPindex = () => {
  const { largo, ancho, cantidad, } = useMeasures();
  const { epeSizeWitdh, epeSizeLength, selectedEpe } = useFEEP();
    const{utilidad}=useSelectedValues()

  if (!largo || !ancho || !cantidad || !epeSizeWitdh || !epeSizeLength) {
    console.error("Faltan valores para realizar los cálculos.");
    return { partA: 0, partB: 0, precioA: 0, precioB: 0 }; // Valores predeterminados
  }

  const ganancia  = ((100 - Number(utilidad)) / 100) 

  const precio = selectedEpe?.precio || 0;

  let partA =
    Math.floor(Number(epeSizeWitdh) / Number(ancho)) *
    Math.floor(Number(epeSizeLength) / Number(largo));

  let partB =
    Math.floor(Number(epeSizeWitdh) / Number(largo)) *
    Math.floor(Number(epeSizeLength) / Number(ancho));

  let precioA = precio / partA;
  let precioB = precio / partB;

  if (partA > partB) {
    // Si la parte A es mayor que la parte B, se aplica el descuento a la parte B
    partB = Math.floor(partB * 0.9);
    precioB = ((precio / partB)/ganancia)  
  } else {
    // Si la parte B es mayor que la parte A, se aplica el descuento a la parte A
    partA = Math.floor(partA * 0.9);
    precioA = ((precio / partA)/ganancia)
  }

  return { partA, partB, precioA, precioB };
};

export default FEEPindex;