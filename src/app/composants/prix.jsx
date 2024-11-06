const Prix = ({datas}) => {

    // Initialiser une variable pour la moyenne
    var moyenne = 0;

    // Addictionner tous les prix
    datas.forEach(data => {
        moyenne += data.prix;
    });
    
    // Calculer la moyenne 
    if(moyenne > 0){
        moyenne = (moyenne / datas.length).toFixed(2);
    }else{
        moyenne = 0;
    }
    

    return (
    <div>
        <h1>Prix moyenne</h1>
        <hr className="w-full border-amber-300 my-2" />
        <div>{moyenne}$</div>
    </div>
)}

export default Prix;