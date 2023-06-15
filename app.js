const inputs = document.querySelectorAll("input");


inputs.forEach(input => {
        input.addEventListener("invalid", handleValidation);
        input.addEventListener("input", handleValidation);

    });

function handleValidation(e){
   if(e.type === "invalid"){
    e.target.setCustomValidity("ce champ ne peut etre vide");
   }
   else if (e.type === "input"){
    e.target.setCustomValidity("");
}
}

const cookieForm = document.querySelector("form");
cookieForm.addEventListener("submit", handleForm);

function handleForm(e){
    e.preventDefault()

    const newCookie = {};
    
    inputs.forEach(input => {
        const nameAttribute = input.getAttribute("name")
        newCookie[nameAttribute]= input.value;

    })

    console.log(newCookie);
}