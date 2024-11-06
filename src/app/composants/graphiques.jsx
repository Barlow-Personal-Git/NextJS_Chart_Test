import { useRef, useEffect, useState } from 'react';

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Pour éviter l'erreur "category"
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Graphiques = ({datas,type}) => {

  const refChart = useRef(null);
  const refCliquerElement = useRef(null);
  const [isZoom, setIsZoom] = useState(false);

  const dataType = {};
  
  // Incrémenter le compteur pour la valeur du type
  datas.forEach((data) => {
    dataType[data[type]] = (dataType[data[type]] || 0 ) + 1;
  });
  
  // Variables pour l'axe X et Y
  const labels = Object.keys(dataType);
  const values = Object.values(dataType);

  useEffect(() => {
    // Vérifier si chart est complément rendu
    if(refChart.current){
      const chart = refChart.current.canvas;
      const chartInstance = refChart.current.chartInstance || refChart.current;

      const handleClickElement = (event) => {

        // Obtenir les éléments situés à l'endroit cliqué
        const chartElements = chartInstance.getElementsAtEventForMode(event, 'nearest', {intersect: true}, true);

        
        if(chartElements.length > 0){
          const clickElement = chartElements[0];
          const indexElement = clickElement.index;

          // L'état du Zoom
          if(refCliquerElement.current === indexElement){
            setIsZoom((zoom) => !zoom);
            refCliquerElement.current = null;
          }else{
            refCliquerElement.current = indexElement;
            setIsZoom(true);
          }
        }
      };

      // Ajouter la gestion d'événement
      chart.addEventListener('click', handleClickElement);

      // Après avoir cliqué, supprimer l'événement pour éviter la duplication des gestionnaires d'événements
      return () => {
        chart.removeEventListener('click', handleClickElement);
      }

    }
  }, [datas, isZoom])

  // Filtrer les labels et les valeurs en fonction de l'état du Zoom
  const filterLabels = isZoom && refCliquerElement.current !== null  ? [labels[refCliquerElement.current]] : labels;
  const filterValues = isZoom && refCliquerElement.current !== null  ? [values[refCliquerElement.current]] : values;

  return (
    <div>
      <h1 className='text-2xl flex justify-center'> Répartition par {type}</h1>
      <hr className="w-full border-amber-300 my-2" />
      <Bar 
       ref={refChart}
       data={{
        labels: filterLabels,
        datasets: [
            {
                label: "Compteur",
                data: filterValues,
                backgroundColor: 'rgba(50, 205, 50, 1)'
            }
        ],
       }}
       options={{
        scales: {
          x: {
            ticks: {
              font: {
                size: 16,
              }
            }
          },
          y: {
            ticks: {
              font: {
                size: 16,
              }
            }
          },
        },
        plugins: {
          legend: {
            labels: {
              font: {
                size: 20,
              }
            }
          }
        }
       }}
      />
    </div>
  );
};

export default Graphiques;