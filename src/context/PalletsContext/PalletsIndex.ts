import { usePallets } from "@/context/PalletsContext/PalletsContext";
import { useSelectedValues } from "@/context/CardBoardContext/SelectedValuesContext";

const PalletsIndex = () => {
  const { calculateTotal } = usePallets(); // Obtener la función calculateTotal
    const { utilidad } = useSelectedValues(); // Obtener el valor de utilidad
  // Calcular el total
  const total = calculateTotal();

 
  const ganancia = (100 - Number(utilidad)) / 100; // Calcular la ganancia
  const totalWithProfit = total / ganancia; // Calcular el total con ganancia


  return{ total, totalWithProfit}
}
export default PalletsIndex;