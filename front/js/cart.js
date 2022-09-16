import { basketTab } from "./product.js";
import { apiRecup } from "./script.js";

let url2 = " http://localhost:3000/api/products";
let totalPriceAllProducts = 0;                                                                                                   // au debut creation de la variable let totalPriceAllProducts qui n'a rien (= 0 )
let totalAllQuantityProducts = 0;                                                                                                // idem pour la quantité de produits avec la variable let totalAllQuantityProducts = 0;
basketTab.forEach(function (basketObj) {                                                                                         // Aller sur l'API chercher le reste des données de ce produit (name, price...)
  
    apiRecup(`${url2}/${basketObj.id}`)
    .then(function (resteDonnees) {
        let totalCurrentProduct = resteDonnees.price * basketObj.quantity;                                                       //multiplication du prix dans reste des données x la quantitée de produits
        totalAllQuantityProducts += basketObj.quantity                                  
        console.log("totalCurrentProduct",totalCurrentProduct)                                                                    // Ajoute  la QUANTITE de ce produit au total de la quantité des produits
        totalPriceAllProducts += totalCurrentProduct                                                                              // equivalent (raccourcis) ==> totalAllProducts = totalAllProducts + totalCurrentProduct Ajoute le prix total de ce produits au prix total de tout les produits 
        document.getElementById(                                                                                                  // ensuite on incremente les diversesbasket.obj (id, color) dans le code html
            "cart__items"
        ).innerHTML += `<article class="cart__item" data-id="${basketObj.id}" data-color="{product-color}">
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
                    <p class="deleteItem" id="${basketObj.id}">Supprimer</p>
                </div>
                </div>
            </div>
            </article>`;
        document.getElementById("totalQuantity").innerText = totalAllQuantityProducts;                                                  // on met le total de la quantité de produits dans l'id "totalAllQuantityProducts"
        document.getElementById("totalPrice").innerText = totalPriceAllProducts;                                                        // on met le total des prix des produits dans l'id "totalPriceAllProducts"
        
        const deleteItem = document.querySelectorAll(".deleteItem")
        deleteItem.forEach((btn) => {                                                                                                   // pour chaque bouton deleteItem on lance la fonction
            btn.addEventListener('click', e => {
                localStorage.setItem("itemBasket", JSON.stringify(basketTab.filter(basketObj => basketObj.id != e.target.id)));         //ici on retire un objet du tableau grace à sont ID
                window.location = window.location                                                                                       // ici on refraichit l'image
            })
        })
    })
    .catch(function (erreur) {
        console.log("erreur : " + erreur);
        console.error(erreur);
    })
})

