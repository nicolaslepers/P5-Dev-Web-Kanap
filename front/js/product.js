import { apiRecup } from "./script.js"; //on oublie pas de mettre le module apres le (src => src="../js/product.js" type="module")

// Recuperation de l'id depuis l'url
let str = window.location; //tu regardes dans la barre de nav
let url = new URL(str);
let idProduct = url.searchParams.get("id"); //et cherche les paramettres qu tu mets dans une variable
//console.log(idProduct);doit correspondre à l'id du produit

//LES FONCTIONS

//fonction changement
function displayProduct(produits) {
  // MEP de l'affichage et de la boucle
  let img = document.createElement("img");
  let image = document.querySelector(".item__img").appendChild(img);
  image.setAttribute("src", produits.imageUrl);
  image.setAttribute("alt", produits.altTxt);

  let title = document.querySelector("#title");
  title.innerHTML = produits.name;
  let price = document.querySelector("#price");
  price.innerHTML = produits.price;
  let desc = document.querySelector("#description");
  desc.innerHTML = produits.description;

  let defaultSelection = document.createElement("option");
  defaultSelection.setAttribute("selected", "selected");
  defaultSelection.innerHTML = "--SVP, choisissez une couleur --";
  let colors = document.querySelector("#colors");
  colors.appendChild(defaultSelection);
  return colors;
}

//fonction boucle option
// function loop(produits) {
//   for (let i = 0; i < produits.colors.length; i++) {
//   for (let color of produits.colors) {}
//   for (let i in produits.colors) {}
//     let multiColors = document.createElement("option");
//     multiColors.setAttribute("value", produits.colors[i]);
//     multiColors.innerHTML = produits.colors[i];
//     colors.appendChild(multiColors);
//     console.log("multiColors", multiColors);
//   }
// }
let basketTab = JSON.parse(localStorage.getItem("itemBasket")) || [];      // fait appel au local storage grace a quetitem et  est a l'exterieur donc utilisable facilement|| [] indique: si JSON.parse(localStorage.getItem("itemBasket")) il n'y a rien de dant alors on met juste []
      console.log(basketTab);


if (url.pathname == "/front/html/product.html") {
  let sUrl = " http://localhost:3000/api/products";
  apiRecup(`${sUrl}/${idProduct}`)
    .then(function (data) {
      let produits = data;
      console.log("produits", produits);

     
      let click = document.querySelector("#addToCart");                          //Fonction Panier (basket)
      click.addEventListener("click", function () {                              //appel  de la fonction addbasket (ajout au panier)
        console.log("Le clique fonctionne pour la fonction addBasket");
        addArray(produits);
      });
    
      

      function addArray(basketProd) {
        let chosenColor = document.getElementById("colors").value;                //attention queryselector bien mais getid meilleur ou different
        if (chosenColor == "--SVP, choisissez une couleur --") return;            // la fonction return permet de ne pas lancer la fonction si un couleur n'est pas choisie
        console.log("chosenColor", chosenColor);
        let basketObj = {
          id: idProduct,                                                          //version declarative
          name: basketProd.name,
          color: chosenColor,
        };
        basketTab.push(basketObj);
        localStorage.setItem("itemBasket", JSON.stringify(basketTab));           //stock du texte donc doit etre serialiser et deserialiser () et stock grace a setitem
        console.log("basketObj", basketObj);
      }
      const colors = displayProduct(produits);
      //loop(produits);
      produits.colors.forEach(function(color) {                                 //foreach better than for(let i = 0; i < produits.colors.length; i++) pour chaque produits.colors on utilise la fonction
        let multiColors = document.createElement("option");
        multiColors.setAttribute("value", color);
        multiColors.innerHTML = color;
        colors.appendChild(multiColors);
        console.log("multiColors", multiColors);
      });
    })
    .catch(function (erreur) {
      console.log("erreur : " + erreur);
    });
}

//Affichage du local storage sur la 

// for(let i = 0; i < basketTab.length; i++) {                                    equivaux à basketTab.forEach(function(basketObj)
//   let basketObj = basketTab[i];

// }                                                                            

basketTab.forEach(function(basketObj){                                            // pour chaque basketobj dans basketTab on utilise la fonction  ...
document.getElementById(
  "cart__items"
).innerHTML += `<article class="cart__item" data-id="${basketObj.id}" data-color="{product-color}">
          <div class="cart__item__img">
            <img src="../images/product01.jpg" alt="Photographie d'un canapé">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${basketObj.name}</h2>
              <p>${basketObj.color}</p>
              <p>42,00 €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        </article>`;
}
)
