"use client"
import {useState} from 'react';
import BarreFiltre from '@/app/composants/barre_filtre';
import Prix from '@/app/composants/prix';
import Graphiques from '@/app/composants/graphiques';
import database from '@public/data/database.json';

const Composants = () => {
  
  const [datas, setDatas] = useState(database);
  const [filters, setFilters] = useState({});
  
  // Fonction qui permet de filtrer la base de données
  const filterData = (key, value, extra) => {
    const newFilters = {...filters};

    // Déterminer s'il y a une valeur minimale ou maximale dans la clé "prix"
    if(extra === "min" || extra === "max"){
      if(!newFilters[key]){
        newFilters[key] = {};
      }
      newFilters[key][extra] = value;
    }else{
      newFilters[key] = value;
    }

    // Mettre à jour les filtres
    setFilters(newFilters)

    // Filtrer les données en fonction des nouveaux filtres
    const newData = database.filter((data) => {
      return Object.entries(newFilters).every(([keyFilter, valueFilter]) => {
        
        if(keyFilter === 'prix'){

          const min = valueFilter.min || Number.MIN_VALUE;
          const max = valueFilter.max || Number.MAX_VALUE;

          return data[keyFilter] >= min && data[keyFilter] <= max;
        }

        return data[keyFilter].toString().includes(valueFilter)
      });
    });

    // Mettre à jour les données filtrées
    setDatas(newData);
  }
  
  return (
    <div className='flex justify-between px-2 py-4'>
      <div className="h-full border-4 border-t-green-500">
        <div className='max-w-sm rounded overflow-hidden px-4 py-4 shadow-sm rounded w-72'>
          <BarreFiltre database={database} filterData={filterData}/>
        </div>
      </div>

      <div className='w-full px-3'>

        <div className='border-4 border-t-green-500 w-full h-32 rounded  overflow-hidden px-6 shadow-lg'>
          <div className="text-4xl text-center">
            <Prix datas={datas}/>
          </div>
        </div>

        <div className='flex justify-between py-2'>
          <div className='w-full h-full rounded overflow-hidden px-10 py-10 shadow-lg border-4 border-t-green-500'>
            <Graphiques datas={datas} type="saison"/>
          </div>
          <div className='w-full h-full rounded overflow-hidden px-10 py-10 shadow-lg border-4 border-t-green-500'>
            <Graphiques datas={datas} type="age"/>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Composants;