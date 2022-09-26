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
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basketObj.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
                </div>
            </div>`;
        document.getElementById("totalQuantity").innerText = totalAllQuantityProducts;                                                  // on met le total de la quantité de produits dans l'id "totalAllQuantityProducts"
        document.getElementById("totalPrice").innerText = totalPriceAllProducts;                                                        // on met le total des prix des produits dans l'id "totalPriceAllProducts"

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


let form = document.querySelector('.cart__order__form__question')
form.addEventListener("click", function () {  
    console.log("clique ok")            
fetch("http://localhost:3000/api/order ", {
    method: "POST",
    body: JSON.stringify({
        contact: {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value
        },
        products: basketTab.map(basketObj => basketObj.id )
    })
  .then (reponse => reponse.JSON())
    })
  })

  .catch(function (erreur) {
        console.log("erreur : " + erreur);
        console.error(erreur);
  })
  
// const validEmail = function(inputEmail){


// const reg = /^aze[015]\d\w{2,}$/i;
// let emailRegExp = /^[\w\.-_]+@[\w.-]+\.[a-z]{2,10}$/i; // "g" = plusieurs lignes, ne pas mettre "g" si une suele ligne!


// let testEmail = emailRegExp.test(inputEmail.value);
// let small = inputEmail.nextElementSibling;

// if (testEmail) {
//     small.innerHTML = 'Adresse mail Valide'
// }
// else
//     {small.innerHTML = 'Adresse mail Invalide'
// }
// }



// let emailFrom = document.querySelector("#email")
// console.log(emailFrom)
// form.email.addEventListener('change', function(){
//     validEmail(this)
// });









//recuperer le error msg pour y mettre le msg uniquement si c'est false



//ou 

// function checkEmail(email) {
//     var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(email);
// }
// function validate() {
//     var email = document.getElementById("email").value;

//     if (checkEmail(email)) {
//         alert('Adresse e-mail valide');
//     } else {
//         alert('Adresse e-mail non valide');
//     }
//     return false;
// }




