import { Bar} from "react-chartjs-2";
import Chart from 'chart.js/auto';

const Graphiques = ({datas,type}) => {
    
  const dataType = {};
  
  // Incrémenter le compteur pour la valeur du type
  datas.forEach((data) => {
    dataType[data[type]] = (dataType[data[type]] || 0 ) + 1;
  });
  
  // Variables pour l'axe X et Y
  const labels = Object.keys(dataType);
  const values = Object.values(dataType);

  return (
    <div>
      <h1 className='text-2xl flex justify-center'> Répartition par {type}</h1>
      <hr className="w-full border-amber-300 my-2" />
      <Bar 
       data={{
        labels: labels,
        datasets: [
            {
                label: "Compteur",
                data: values,
                backgroundColor: 'rgba(50, 205, 50, 1)'
                
            }
        ],
       }}
      />
    </div>
  );
};

export default Graphiques;