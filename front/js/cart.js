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
        "cart__items",

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
                    <p class="deleteItem">Supprimer</p>
                </div>
                </div>
            </div>
            </article>`;
            document.getElementById("totalQuantity").innerText = totalAllQuantityProducts;
            document.getElementById("totalPrice").innerText = totalPriceAllProducts;
    })
    .catch(function (erreur) {
    console.log("erreur : " + erreur);
    console.error(erreur);
    });

  // const price
});
// 1: prix du produit x le nombre => let priceQuantity resteDonnées.price * BasketObj.quantity 
// 2 : 1 + x autres produits => let totalPrice let priceQuantity + 





// apiRecup(url2)
//   .then(function (data) {
//     basketTab.forEach(function (basketObj) {                             // pour chaque basketobj dans basketTab on utilise la fonction  ... (basketObj)
//       data.find(function (objectPrice) {
//         return objectPrice == "idProduct";
//         console.log(objectPrice);
//       });

//     });
//   })
//   .catch(function (erreur) {
//     console.log("erreur : " + erreur);
//     console.error(erreur);
//   });
