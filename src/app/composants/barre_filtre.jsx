import {useState, useEffect, useMemo, useRef} from 'react';

const BarreFiltre = ({database, filterData, resetFilters}) => {
  const [databaseValues, setDatabaseValues] = useState({});
  const refButtonReset = useRef(null);
  const refSelect = useRef({});

  // Fonction pour gérer le changement de données
  const  changementDonnee = (key,event, extra = "null") => {
    const value = event.target.value;

    // Passer la clé et la valeur dans la fonction filterData pour filtrer les données de la base de données
    filterData(key,value, extra);
  };

  // Récupérer toutes les clés uniques (exécuter une seule fois)
  const dataKeys = useMemo(() => {
    return [...new Set(database.flatMap(Object.keys))].slice(1);
  }, [database]);

  // Uniquement si dataKeys et database sont rendus en premier
  // Récupérer toutes les valeurs uniques et les trier par ordre alphabétique et numérique
  useEffect(()=>{
    const values = {};
    dataKeys.forEach((key) => {
      const newSet = [...new Set(database.map(item => {
        const value = item[key];
        
        // Convertir la valeur en String si elle est de type booléen
        return (typeof(value) === 'boolean') ? String(value) : value; 
      }))];

      // Trier les valeurs
      values[key] = newSet.sort( (a,b) =>{
        const valeurA = Number(a);
        const valeurB = Number(b);
        if(!isNaN(valeurA) && !isNaN(valeurB)){
          return valeurA - valeurB;
        }

        // Sinon trier les chaînes de caractères
        return String(a).localeCompare(String(b));
      });
    });

    setDatabaseValues(values);
  }, [database, dataKeys]);

  // Utilisation d'un useEffect pour ajouter un gestionnaire d'événement au bouton
  useEffect( ()=> {
    const resetBut = refButtonReset.current;
    if(resetBut){
      resetBut.addEventListener('click', handleResetSelectFilters);
    }

    // Après avoir cliqué, supprimer l'événement pour éviter la duplication des gestionnaires d'événements
    return () => {
      if(resetBut){
        resetBut.removeEventListener('click', handleResetSelectFilters);
      }
    };

  }, [resetFilters]);

  // Mise à zéro des sélecteurs
  const handleResetSelectFilters = () => {
    resetFilters();

    Object.values(refSelect.current).forEach((select) => {
      if(select){
        select.value = "";
      }
    })
  }

  return (
    <div >
      <h1 className='text-2xl flex justify-center'>Filtrer</h1>
      <hr className="w-full border-amber-300 my-2" />
      {dataKeys.map((key, index) => (
        <div key={index} className='py-3'>
          <h2 className="capitalize">{key}</h2>
          {key === 'prix' ? (
            <div>
              <label>
                Min :
                <select ref={el => refSelect.current[`${key}-min`] = el} className="border border-gray-400 rounded-md focus:ring focus:border-amber-300" onChange={(event) => changementDonnee(key,event,"min")}>
                  <option value="">&nbsp;</option>
                  {
                    databaseValues[key]?.map((dbValue, dbKey) => (
                      <option key={dbKey} value={dbValue}>{dbValue}</option>
                    ))
                  }
                </select>
              </label>
              <label>
                Max : 
                <select ref={el => refSelect.current[`${key}-max`] = el} className="border border-gray-400 rounded-md focus:ring focus:border-amber-300" onChange={(event) => changementDonnee(key,event,"max")}>
                  <option value="">&nbsp;</option>
                  {
                    databaseValues[key]?.map((dbValue, dbKey) => (
                      <option key={dbKey} value={dbValue}>{dbValue}</option>
                    ))
                  }
                </select>
              </label>
            </div>
          ) : ( 
            <select ref={el => refSelect.current[key] = el} className="border border-gray-400 rounded-md focus:ring focus:border-amber-300" onChange={(event) => changementDonnee(key,event)}>
              <option value="">--- Filtrer par {key} ---</option>
              {
                databaseValues[key]?.map((dbValue, dbKey) => (
                  <option key={dbKey} value={dbValue}>{dbValue}</option>
                ))
              }
            </select>
          )}
          
        </div>
      ))}
      <div className='py-4 text-left'>
        <button className="border-black border-2 rounded-lg px-2" ref={refButtonReset}>Reset</button>
      </div>
    </div>
    
  );
};

export default BarreFiltre;