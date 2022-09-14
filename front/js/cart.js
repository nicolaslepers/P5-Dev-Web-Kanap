import { basketTab } from "./product.js";
import { apiRecup } from "./script.js";
// for(let i = 0; i < basketTab.length; i++) {                                    equivaux à basketTab.forEach(function(basketObj)
//   let basketObj = basketTab[i];

// }
let url2 = " http://localhost:3000/api/products";

basketTab.forEach(function (basketObj) {
  // Aller sur l'API chercher le reste des données de ce produit (name, price)
apiRecup(`${url2}/${basketObj.id}`)
    .then(function (resteDonnees) {
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
    })
    .catch(function (erreur) {
    console.log("erreur : " + erreur);
    console.error(erreur);
    });

  // const price
});

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
