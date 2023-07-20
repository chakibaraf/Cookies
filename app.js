const inputs = document.querySelectorAll("input");


inputs.forEach(input => {
    input.addEventListener("invalid", handleValidation);
    input.addEventListener("input", handleValidation);

});

function handleValidation(e) {
    if (e.type === "invalid") {
        e.target.setCustomValidity("ce champ ne peut etre vide");
    }
    else if (e.type === "input") {
        e.target.setCustomValidity("");
    }
}

const cookieForm = document.querySelector("form");
cookieForm.addEventListener("submit", handleForm);

function handleForm(e) {
    e.preventDefault()

    const newCookie = {};

    inputs.forEach(input => {
        const nameAttribute = input.getAttribute("name")
        newCookie[nameAttribute] = input.value;

    })
    newCookie.expires = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)

    // console.log(newCookie);
    createCookie(newCookie)
    cookieForm.reset();
}


function createCookie(newCookie) {

    if (doesCookieExist(newCookie.name)) {
        createToast({ name: newCookie.name, state: "modifié", color: "orange" })
    }
    else {
        createToast({ name: newCookie.name, state: "crée", color: "green" })
    }

    document.cookie = `${encodeURIComponent(newCookie.name)}=${encodeURIComponent(newCookie.value)};expires=${newCookie.expires.
        toUTCString()}`

}

function doesCookieExist(name) {
    const cookies = document.cookie.replace(/\s/g, "").split(";");
    const onlyCookiesName = cookies.map(cookie => cookie.split("=")[0])
    console.log(cookies, onlyCookiesName);
    const cookiePresence = onlyCookiesName.find(cookie => cookie === encodeURIComponent(name))
    return cookiePresence;
}

const toastContainer = document.querySelector(".toasts-container")
function createToast({ name, state, color }) {
    const tostInfo = document.createElement("p");
    tostInfo.className = "toast";

    tostInfo.textContent = `Cookie ${name} ${state}`;
    tostInfo.style.background = color;
    toastContainer.appendChild(tostInfo);

    setTimeout(() => {
        tostInfo.remove()
    }, 2500)
}


const cookiesList = document.querySelector(".cookies-list");
const displayCookieBtn = document.querySelector(".display-cookie-btn");
const infoTxt = document.querySelector(".info-txt");

displayCookieBtn.addEventListener("click", displayCookies)

 let lock = false
function displayCookies() {
    console.log(cookiesList.children);
   if(cookiesList.children.length) cookiesList.textContent = "";
    const cookies = document.cookie.replace(/\s/g, "").split(";").reverse()
    console.log(cookies);


    if (!cookies[0]) {
     if(lock) return

        lock = true
        infoTxt.textContent = " pas de cookies a afficher, créer un"

        setTimeout(() => {
            infoTxt.textContent = "";
        lock = false;
        }, 1500)
        return;
    }
    createElements(cookies)
}

function createElements(cookies){
    console.log(cookies);
    cookies.forEach(cookie =>{
        const formatCookie = cookie.split("=");
        console.log(formatCookie);
        const listItem = document.createElement("li");
        const name = decodeURIComponent(formatCookie[0])
        listItem.innerHTML =  `
        <p>
        <span>Nom</span> : ${name}
        </p>
        <p>

        <span>Valeur</span> : ${decodeURIComponent(formatCookie[1])}
        </p>
        <button>X</button>
        `;
        listItem.querySelector("button").addEventListener("click",e => {
            createToast({name:name, state: "supprimé", color:"crimson"})
            document.cookie = `${formatCookie[0]}=; expires=${new Date(0)}`
            e.target.parentElement.remove()
        })

        cookiesList.appendChild(listItem);

    })
}