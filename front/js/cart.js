import { basketTab } from "./product.js";
import { apiRecup } from "./script.js";
// for(let i = 0; i < basketTab.length; i++) {                                    equivaux à basketTab.forEach(function(basketObj)
//   let basketObj = basketTab[i];

// }
let url2 = " http://localhost:3000/api/products";
let totalPriceAllProducts = 0;
let totalAllQuantityProducts = 0;
basketTab.forEach(function (basketObj) {
  // Aller sur l'API chercher le reste des données de ce produit (name, price)
    apiRecup(`${url2}/${basketObj.id}`)
    .then(function (resteDonnees) {
        let totalCurrentProduct = resteDonnees.price * basketObj.quantity;
        totalAllQuantityProducts += basketObj.quantity   
        console.log("totalCurrentProduct",totalCurrentProduct)           // Ajoute  la QUANTITE de ce produit au total de la quantité des produits
        totalPriceAllProducts += totalCurrentProduct                                   // equivalent (raccourcis) ==>totalAllProducts = totalAllProducts + totalCurrentProduct Ajoute le prix total de ce produits au prix total de tout les produits 
        document.getElementById(
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
        document.getElementById("totalQuantity").innerText = totalAllQuantityProducts;
        document.getElementById("totalPrice").innerText = totalPriceAllProducts;
        
        const deleteItem = document.querySelectorAll(".deleteItem")
        deleteItem.forEach((btn) => {
            btn.addEventListener('click', e => {
                localStorage.setItem("itemBasket", JSON.stringify(basketTab.filter(basketObj => basketObj.id != e.target.id)));         //ici on retire un objet 
                window.location = window.location
            })
        })
    })
    .catch(function (erreur) {
        console.log("erreur : " + erreur);
        console.error(erreur);
    })
})


//quand je click sur "supprimer"    
//tchek => y a t il des produits si oui alors retirer le produit sinon rien faire
// 


        // let clickDelete = document.querySelector("#deleteItem");                  
        //  click.addEventListener("click", function () {                      
        //    console.log("Le clique fonctionne pour la fonction addBasket");
        //    });                                          
 
//   } 

// Dans LocalStorage : suppression de l'article sélectionné //
// function deleteItemSelect(e, items) {
//     let index = e.target.classList[1].slice();
//     items.splice(index, 1);
//     localStorage.setItem('anyItem', JSON.stringify(items));
 
//     if (items.length === 0) {
//         localStorage.removeItem('anyItem');
//     }
//     updateNumberArticles();
// }

// Btn supprimer article 
