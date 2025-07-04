import { useFoamContext } from "@/context/Foam/FoamContext";
import { useSelectedValues } from "@/context/CardBoardContext/SelectedValuesContext";
import { useMeasures } from "../CardBoardContext/CardboardMeasuresContext";
import { useFoamColorsContext } from "./FoamColorsContext";
const FoamIndex = () => {
  const {
   
    selectedFoam, // Tipo de foam seleccionado (Placa, Rollo, Rollo Laminado)
    selectedRolloType, // Tipo de rollo seleccionado (Hoja, Bolsa)
    selectedMedidaPrecioRollos, // Medida y precio seleccionados para rollos
    selectedMedidaPrecioRollosLaminados
  } = useFoamContext();

  const { largo, ancho} = useMeasures(); // Obtener las medidas de la hoja
  const { selectedColorPrecio,selectedColor } = useFoamColorsContext(); // Obtener el color seleccionado

 
  const { utilidad } = useSelectedValues(); // Obtener el valor de utilidad
 
  const ganancia = (100 - Number(utilidad)) / 100; // Calcular la ganancia
  

  ///// Variables de el Rollo //////
  const precioRollo = selectedMedidaPrecioRollos?.precio  || 0; // Precio del foam seleccionado
  const anchoRollo = selectedMedidaPrecioRollos?.anchorollo
  const largoRollo = selectedMedidaPrecioRollos?.largorollo






  ///// Variables de la Placa //////
  const precioPlaca = selectedColorPrecio?.precio || 0; // Precio de la placa seleccionada
  const anchoPlaca = selectedColor?.anchoplaca || 0; // Ancho de la placa seleccionada  
  const largoPlaca = selectedColor?.largoplaca || 0; // Largo de la placa seleccionada
  

   ///// Variables de la RolloLaminado //////

  const precioRolloLaminado = selectedMedidaPrecioRollosLaminados?.precio || 0; // Precio del rollo laminado seleccionado
  const anchoRolloLaminado = selectedMedidaPrecioRollosLaminados?.anchorollo || 0; // Ancho del rollo laminado seleccionado
  const largoRolloLaminado = selectedMedidaPrecioRollosLaminados?.largorollo || 0; // Largo del rollo laminado seleccionado





  if (selectedFoam === "Rollo") {
    if(selectedRolloType === "Hoja") {
      // Si el tipo de rollo es Hoja, se utiliza selectedMedidaPrecioRollos
          let partA =
          Math.floor(Number(anchoRollo) / Number(ancho)) *
          Math.floor(Number(largoRollo) / Number(largo));

          let partB =
          Math.floor(Number(anchoRollo) / Number(largo)) *
          Math.floor(Number(largoRollo) / Number(ancho));

          let precioA = precioRollo / partA;
          let precioB = precioRollo / partB;    
  
      if (partA > partB) {
        // Si la parte A es mayor que la parte B, se aplica el descuento a la parte B
        partB = Math.floor(partB * 0.9);
        precioB = ((precioRollo / partB) / ganancia);
      } else {
        // Si la parte B es mayor que la parte A, se aplica el descuento a la parte A
        partA = Math.floor(partA * 0.9);
        precioA = ((precioRollo / partA) / ganancia);
      }


    return {partA, partB, precioA, precioB};


  } 
    if(selectedRolloType === "Bolsa") {


      let partA =
    Math.floor(Number(anchoRollo) / Number(ancho)) *
    Math.floor(Number(largoRollo) / (Number(largo)*2));

  let partB =
    Math.floor(Number(anchoRollo) / (Number(largo)*2)) *
    Math.floor(Number(largoRollo) / Number(ancho));

    let precioA = precioRollo / partA;
    let precioB = precioRollo / partB;
      

      if (partA > partB) {
        // Si la parte A es mayor que la parte B, se aplica el descuento a la parte B
        partB = Math.floor(partB * 0.9);
        precioB = ((precioRollo/ partB) / ganancia);
      } else {
        // Si la parte B es mayor que la parte A, se aplica el descuento a la parte A
        partA = Math.floor(partA * 0.9);
        precioA = ((precioRollo / partA) / ganancia);
      }
      
      return {partA, partB, precioA, precioB};
    }
  }
    
  if(selectedFoam === "Rollos Laminados") { 
    // Si el tipo de rollo es Hoja, se utiliza selectedMedidaPrecioRollos
    let partA =
    Math.floor(Number(anchoRolloLaminado) / Number(ancho)) *
    Math.floor(Number(largoRolloLaminado) / Number(largo));

    let partB =
    Math.floor(Number(anchoRolloLaminado) / Number(largo)) *
    Math.floor(Number(largoRolloLaminado) / Number(ancho));

    let precioA = precioRolloLaminado / partA;
    let precioB = precioRolloLaminado/ partB;    

if (partA > partB) {
  // Si la parte A es mayor que la parte B, se aplica el descuento a la parte B
  partB = Math.floor(partB * 0.9);
  precioB = ((precioRolloLaminado / partB) / ganancia);
} else {
  // Si la parte B es mayor que la parte A, se aplica el descuento a la parte A
  partA = Math.floor(partA * 0.9);
  precioA = ((precioRolloLaminado / partA) / ganancia);
}


return {partA, partB, precioA, precioB};
  }
  // Si el tipo de foam es Placa, se utiliza selectedMedidaPrecioRollos
  if (selectedFoam === "Placa") {
    let partA =
      Math.floor(Number(anchoPlaca) / Number(ancho)) *
      Math.floor(Number(largoPlaca) / Number(largo));
    let partB =
      Math.floor(Number(anchoPlaca) / Number(largo)) *
      Math.floor(Number(largoPlaca) / Number(ancho));
      let precioA = Number(precioPlaca) / partA;
      let precioB = Number(precioPlaca) / partB;
      
    if (partA > partB) {
      // Si la parte A es mayor que la parte B, se aplica el descuento a la parte B
      partB = Math.floor((partB * 0.9));
      precioB = ((Number(precioPlaca) / partB) / ganancia);
    }
    else {
      // Si la parte B es mayor que la parte A, se aplica el descuento a la parte A
      partA = Math.floor(partA * 0.9);
      precioA = ((Number(precioPlaca) / partA) / ganancia);
    }
    return {partA, partB, precioA, precioB};
   
  }



return {partA: 0, partB: 0, precioA: 0, precioB: 0}; // Valor por defecto si no se cumple ninguna condición

};


export default FoamIndex;