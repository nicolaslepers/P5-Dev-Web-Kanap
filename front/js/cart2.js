import { basketTab } from "./product.js";
import { apiRecup } from "./script.js";

let url2 = " http://localhost:3000/api/products";
let totalPriceAllProducts = 0;                                                                                                      // au debut creation de la variable let totalPriceAllProducts qui n'a rien (= 0 )
let totalAllQuantityProducts = 0;                                                                                                   // idem pour la quantité de produits avec la variable let totalAllQuantityProducts = 0;

// Integrer les données d'un canapé sur la page
function afficheBasketObj(basketObj) {                                                                                            // Aller sur l'API chercher le reste des données de ce produit (name, price...)
    apiRecup(`${url2}/${basketObj.id}`)
    .then(function (resteDonnees) {
        let totalCurrentProduct = resteDonnees.price * basketObj.quantity;                                                          //multiplication du prix dans reste des données x la quantitée de produits
        totalAllQuantityProducts += basketObj.quantity                                      
        console.log("totalCurrentProduct",totalCurrentProduct)                                                                      // Ajoute  la QUANTITE de ce produit au total de la quantité des produits
        totalPriceAllProducts += totalCurrentProduct                                                                                // equivalent (raccourcis) ==> totalAllProducts = totalAllProducts + totalCurrentProduct Ajoute le prix total de ce produits au prix total de tout les produits 
        const basketObjHtml = document.createElement("article")
        basketObjHtml.setAttribute("class", "cart__item")
        basketObjHtml.setAttribute("data-id", basketObj.id)
        basketObjHtml.setAttribute("data-color", basketObj.color)
        document.getElementById("cart__items").appendChild(basketObjHtml)
        basketObjHtml.innerHTML = `
            <div class="cart__item__img">
                <img src="${resteDonnees.imageUrl}" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                <h2>${resteDonnees.name}</h2>
                <p>${basketObj.color}</p>
                <p>${resteDonnees.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basketObj.quantity}" id="${basketObj.id}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
                </div>
            </div>`;
        document.getElementById("totalQuantity").innerText = totalAllQuantityProducts;                                                  // on met le total de la quantité de produits dans l'id "totalAllQuantityProducts"
        document.getElementById("totalPrice").innerText = totalPriceAllProducts;        
        const input = basketObjHtml.querySelector(".itemQuantity");
        input.addEventListener('change', function(event){
            console.log(basketTab, event)
            const tmp = basketTab.map(basketObj => {
                if(basketObj.id === event.target.id) {
                    basketObj.quantity = event.target.value;
                }
                return basketObj;
                
            });
            localStorage.setItem("itemBasket", JSON.stringify(tmp));
            location.reload();
        });                                              // on met le total des prix des produits dans l'id "totalPriceAllProducts"

        // Recuperer juste le deleteItem du basketObj en cours
        const btn = basketObjHtml.querySelector(".deleteItem")
        btn.addEventListener('click', e => {
            localStorage.setItem("itemBasket", JSON.stringify(basketTab.filter(bObj => bObj.id != basketObj.id || bObj.color != basketObj.color)));         //ici on retire un objet du tableau grace à sont ID
            location.reload();                                                                                                           // ici on refraichit l'image
        })
    })
    .catch(function (erreur) {
        console.log("erreur : " + erreur);
        console.error(erreur);
    })
}



// Utilisation des Fonctions
// 100 
basketTab.forEach(basketObj => afficheBasketObj(basketObj))                                                                             // Il recupere tout les elements qui ont pour class "deleteItem"                                                                                                                     
const deleteItem = document.querySelectorAll(".deleteItem")
deleteItem.forEach((btn) => {                                                                                                            // pour chaque bouton deleteItem on lance la fonction
    btn.addEventListener('click', e => {
        localStorage.setItem("itemBasket", JSON.stringify(basketTab.filter(bObj => bObj.id != basketObj.id || bObj.color != basketObj.color)));         //ici on retire un objet du tableau grace à sont ID
                                                                                                                                         // (incohérence spec back) la couleur serait partie constituante dun uuid ? pourquoi on ne demande que les id dans le back dans ce cas ????
        location.reload();                                                                                                               // attention compatibilité avec d'anciennes version de nav// ici on refraichit l'image
    })
})

///validation mail

function validEmail() {
    let inputEmail = document.getElementById('email')
    // "g" = plusieurs lignes, ne pas mettre "g" si une suele ligne!
    let emailRegExp = /^[\w\.-_]+@[\w.-]+\.[a-z]{2,10}$/i;
    let testEmail = emailRegExp.test(inputEmail.value);
    let small = inputEmail.nextElementSibling;

    if (testEmail) {
        small.innerHTML = '';
    }
    else
        {small.innerHTML = 'Adresse mail Invalide';
    }
    return testEmail;
}
// let emailFrom = document.getElementById("email");
// console.log(emailFrom);
// emailFrom.addEventListener('change', function(){
//     validEmail(this);
// });
//creation de la fonction validation return "true" si valide return "false", "null", "undefined", "0",  "-1" "[]", "{}",... sinon
function contactIsValid() {                              
    const inputs = document.querySelectorAll("input");
    // creation de la variable small pour cibler l'element du dessous
    console.log(inputs)
    //lelection des inputs
    let isValid = true;
    for(let input of inputs) {
        if(input.value.length === 0) {
            let small = input.nextElementSibling;
            small.innerHTML = 'Veuillez completer le champ';
            isValid = false;
        } 
        else {let small = input.nextElementSibling;
    small.innerHTML = 'Champ Valide';}
    }
   
    return isValid;
}


let form = document.querySelector('.cart__order__form__submit')

form.addEventListener("click", (e) => { 
    e.preventDefault()                                                                                  // annule l'envenement par defaut du bouton (ici Submit)
    console.log("clique ok")                            
    if (!contactIsValid() || !validEmail()){
// si !contactIsValid (con... n'est pas valide) n'execute pas la suite pareil pour !validEmail et au lieu de faire un ET tu fait un OU
        return;
    }
    console.log('input.value.firstname.wtf', document.getElementById("firstName").value)


    const contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
    };

    const products = [];

    basketTab.forEach(elmnt => {
        products.push(elmnt.id);
    });
 
    //console.log(products);

    const dataUpload = {
        contact,
        products
    };
    // console.log(dataUpload)
    
    fetch((`http://localhost:3000/api/products/order`), {
        method: "POST",                                                                         //envoie de données
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(dataUpload),
    })

    .then(response => {
        return response.json()
    })

    .then((products) => {
        console.log(products)
        window.location.href = `confirmation.html?orderId=${products.orderId}`;  // si le back renvoie, il redirige vers confirmation?html avec la variable qui contiens le code du back
        console.log(products)
    })

    .catch(function (erreur) {
        alert("erreur : " + erreur);
    })
}
) 

// // validation du nom et prenom

// const validName = function(inputName){

//     let NameRegExp = /^[\w\.-_]{2,10}$/i;                     // "g" = plusieurs lignes, ne pas mettre "g" si une suele ligne!
//     let testName = NameRegExp.test(inputName.value);
//     let small = inputName.nextElementSibling;

//     if (testName) {
//         small.innerHTML = ''
//     }
//     else
//         {small.innerHTML = 'Invalide'
//     }
//     return testName
//     }
//     let NameFrom = document.getElementById("fistName")
//     console.log(emailFrom)
//     NameFrom.addEventListener('change', function(){
//         validName(this)
//     });


// //validation de la ville

// const validCity = function(inputCity){

//     let cityRegExp = /^[\w\.-_]{2,10}$/i;                     // "g" = plusieurs lignes, ne pas mettre "g" si une suele ligne! car avec "g" on peux accepter plusieurs email
//     let testCity = cityRegExp.test(inputCity.value);
//     let small = inputCity.nextElementSibling;

//     if (testCity) {
//         small.innerHTML = ''
//     }
//     else
//         {small.innerHTML = 'Invalide'
//     }
//     return testCity
//     }
//     let CityFrom = document.getElementById("City")
//     console.log(CityFrom)
//     CityFrom.addEventListener('change', function(){
//         validCity(this)
//     });

// //Validation de l'adresse

// const validAddress = function(inputAddress){

//     let addressRegExp = /^[\w\.-_]{2,10}$/i;                     // "g" = plusieurs lignes, ne pas mettre "g" si une suele ligne!
//     let testAddress = addressRegExp.test(inputAddress.value);
//     let small = inputAddress.nextElementSibling;

//     if (testAddress) {
//         small.innerHTML = ''
//     }
//     else
//         {small.innerHTML = 'Addresse Invalide'
//     }
//     return testAddress
//     }
//     let addressFrom = document.getElementById("Address")
//     console.log(addressFrom)
//     addressFrom.addEventListener('change', function(){
//         validAddress(this)
//     });    


// //envoi de data via le btn "commander"
// let contact = {                                                                                                                      // (bonne pratique) dans l'immediat je n'ai pas l'usage de le mettre dans une variable donc, bonne pratique je ne le fais pas. Quand j'en aurais besoin, je refléchis et là je le mettrais dans une variable. Merci de ne pas donner de mauvaises habitudes ;) 
//     firstName: document.getElementById("firstName").value,
//     lastName: document.getElementById("lastName").value,
//     address: document.getElementById("address").value,
//     city: document.getElementById("city").value,
//     email: document.getElementById("email").value
// }

// console.log(contact)

// let products = basketTab.map(basketObj => basketObj.id)


// const InputQuantity = 