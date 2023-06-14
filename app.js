const inputs = document.querySelectorAll("input");


inputs.forEach(input => {
        input.addEventListener("invalid", handleValidation);
        input.addEventListener("input", handleValidation);

    });

function handleValidation(e){
   if(e.type === "invalid"){
    e.target.setCustomValidity("ce champ ne peut etre vide")
   }
   else if (e.type === "input"){
    e.target.setCustomValidity("")
   }
}