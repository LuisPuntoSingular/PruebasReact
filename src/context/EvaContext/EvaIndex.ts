import { useMeasures } from "@/context/CardBoardContext/CardboardMeasuresContext";
import { useEva } from "@/context/EvaContext/EvaContext";
import { useSelectedValues } from "@/context/CardBoardContext/SelectedValuesContext";

const EvaIndex = () => {
  const { largo, ancho, cantidad } = useMeasures();
  const { evaSizeWidth, evaSizeLength, selectedEva } = useEva();
  const { utilidad } = useSelectedValues();

  if (!largo || !ancho || !cantidad || !evaSizeWidth || !evaSizeLength) {
    // Verifica si las medidas son válidas
    return { partA: 0, partB: 0, precioA: 0, precioB: 0 }; // Valores predeterminados
  }

  const ganancia = (100 - Number(utilidad)) / 100;

  const precio = selectedEva?.precio || 0;

  let partA =
    Math.floor(Number(evaSizeWidth) / Number(ancho)) *
    Math.floor(Number(evaSizeLength) / Number(largo));

  let partB =
    Math.floor(Number(evaSizeWidth) / Number(largo)) *
    Math.floor(Number(evaSizeLength) / Number(ancho));

  let precioA = precio / partA;
  let precioB = precio / partB;

  if (partA > partB) {
    // Si la parte A es mayor que la parte B, se aplica el descuento a la parte B
    partB = Math.floor(partB * 0.9);
    precioB = (precio / partB) / ganancia;
  } else {
    // Si la parte B es mayor que la parte A, se aplica el descuento a la parte A
    partA = Math.floor(partA * 0.9);
    precioA = (precio / partA) / ganancia;
  }

  return { partA, partB, precioA, precioB };
};

export default EvaIndex;