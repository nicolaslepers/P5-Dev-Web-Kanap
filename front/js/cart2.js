import { basketTab } from "./product.js";
import { apiRecup } from "./script.js";

let url2 = " http://localhost:3000/api/products";
let totalPriceAllProducts = 0;                                                                                                      // au debut creation de la variable let totalPriceAllProducts qui n'a rien (= 0 )
let totalAllQuantityProducts = 0;                                                                                                   // idem pour la quantité de produits avec la variable let totalAllQuantityProducts = 0;

// Integrer les données d'un canapé sur la page


function afficheBasketObj(basketObj) {
    // Aller sur l'API chercher le reste des données de ce produit (name, price...)
    apiRecup(`${url2}/${basketObj.id}`)
    .then(function (resteDonnees) {
        //multiplication du prix dans reste des données x la quantitée de produits
        let totalCurrentProduct = resteDonnees.price * basketObj.quantity;                                                          
        // Ajoute  la QUANTITE de ce produit au total de la quantité des produits
        totalAllQuantityProducts += basketObj.quantity                                      
        console.log("totalCurrentProduct",totalCurrentProduct)                                                                      
        // equivalent (raccourcis) ==> totalAllProducts = totalAllProducts + totalCurrentProduct Ajoute le prix total de ce produits au prix total de tout les produits 
        totalPriceAllProducts += totalCurrentProduct 
        //creation de la constante basketObjHtml avec creation de l'element article dans le Dom qui à pour attribut ... (voir en dessous)
        const basketObjHtml = document.createElement("article")
        basketObjHtml.setAttribute("class", "cart__item")
        basketObjHtml.setAttribute("data-id", basketObj.id)
        basketObjHtml.setAttribute("data-color", basketObj.color)
        document.getElementById("cart__items").appendChild(basketObjHtml)
        //integration des données dans le DOM
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
        // on met le total de la quantité de produits dans l'id "totalAllQuantityProducts"
        document.getElementById("totalQuantity").innerText = totalAllQuantityProducts; 
        //idem pour price                                                 
        document.getElementById("totalPrice").innerText = totalPriceAllProducts;   
        //recuperation de la class itemQuantity     
        const input = basketObjHtml.querySelector(".itemQuantity");
        input.addEventListener('change', function(event){
            console.log(basketTab, event)
            //changement temporaire grace à tmp
            const tmp = basketTab.map(basketObj => {
                //modification de la quantité grace à l'event
                if(basketObj.id === event.target.id) {
                    basketObj.quantity = event.target.value;
                }
                return basketObj;
                
            });
            localStorage.setItem("itemBasket", JSON.stringify(tmp));
            //recharge de la page
            location.reload();
        });

        // Recuperer juste le deleteItem du basketObj en cours
        const btn = basketObjHtml.querySelector(".deleteItem")
        btn.addEventListener('click', e => {
            localStorage.setItem("itemBasket", JSON.stringify(basketTab.filter(bObj => bObj.id != basketObj.id || bObj.color != basketObj.color)));
            // ici on refraichit l'image
            location.reload();                                                                                                           
        })
    })
    .catch(function (erreur) {
        console.log("erreur : " + erreur);
        console.error(erreur);
    })
}

// Utilisation des Fonctions

basketTab.forEach(basketObj => afficheBasketObj(basketObj))  
// Il recupere tout les elements qui ont pour class "deleteItem"                                                                                                                                                                                                
const deleteItem = document.querySelectorAll(".deleteItem")
// pour chaque bouton deleteItem on lance la fonction
deleteItem.forEach((btn) => {                                                                                                            
    btn.addEventListener('click', e => {
        //ici on retire un objet du tableau grace à sont ID
        localStorage.setItem("itemBasket", JSON.stringify(basketTab.filter(bObj => bObj.id != basketObj.id || bObj.color != basketObj.color)));         
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

//creation de la fonction validation return "true" si valide return "false", "null", "undefined", "0",  "-1" "[]", "{}",... sinon
function contactIsValid() {                              
    const inputs = document.querySelectorAll("input");
    // creation de la variable small pour cibler l'element du dessous
    console.log(inputs)
    //selection des inputs

    //de base tout est valide (let isValid = true)
    let isValid = true;
    //pour chaque input de la variable inputs
    for(let input of inputs) {
        //si la taille du champ est strictement égale à 0 (rien) alors on exectute
        if(input.value.length === 0) {
            //grace à "nextElementSibling" on selectionne l'element en dessous de input pour ce cas
            let small = input.nextElementSibling;
            small.innerHTML = 'Veuillez completer le champ';
            //au lieu de mettre un return qui stopera la boucle, une variable lancera la boucle à chaque fois que le bouton "commander" sera actionné
            isValid = false;
        } 
        //sinon on met " champ valide" 
        // else {let small = input.nextElementSibling;
        //         small.innerText = 'Champ Valide';
        //     }
    }
    return isValid;
}


let form = document.querySelector('.cart__order__form__submit')

form.addEventListener("click", (e) => { 
    //pour evité que "required" fonctionne on le desactive avec "preventDefault()" (L'attribut booléen required, s'il est présent, indique que l'utilisateur doit spécifier une valeur pour l'entrée avant que le formulaire propriétaire puisse être soumis.)
    e.preventDefault()                                                                               
    console.log("clique ok")  
    // si !contactIsValid (con... n'est pas valide) n'execute pas la suite pareil pour !validEmail et au lieu de faire un ET tu fait un OU
    if (!contactIsValid() || !validEmail()){
        return;
    }

    //recuperation des valeur de chaque id
    const contact = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        email: document.getElementById("email").value,
    };

    //creation de la constante tableau
    const products = [];

    // !!!!!!!!!!
    basketTab.forEach(elmnt => {
        products.push(elmnt.id);
    });

    //creation de la constante avec à l'interieur les contacts et les produits
    const dataUpload = {
        contact,
        products
    };
    
    //creation de la fonction fetch avec la methode "post" pour envoyer en version "string"(chaine de caractere) les données de dataUpload
    fetch((`http://localhost:3000/api/products/order`), {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(dataUpload),
    })
    //demande de reponse en .JSON
    .then(response => {
        return response.json()
    })

    .then((products) => {
        console.log(products)
        window.location.href = `confirmation.html?orderId=${products.orderId}`;  // si le back renvoie, il redirige vers confirmation?html avec la variable qui contiens le code du back
        console.log(products)
    })

    //en cas d'erreur utilisation de .catch pour l'affichage 
    .catch(function (erreur) {
        alert("erreur : " + erreur);
    })
}
) 
