import { apiRecup } from "./script.js";                               //on oublie pas de mettre le module apres le (src => src="../js/product.js" type="module")

// Recuperation de l'id depuis l'url
let str = window.location;                                            //tu regardes dans la barre de nav
let url = new URL(str);
let idProduct = url.searchParams.get("id");                           //et cherche les paramettres qu tu mets dans une variable
export let basketTab = JSON.parse(localStorage.getItem("itemBasket")) || [];   // fait appel au local storage grace a quetitem et  est a l'exterieur donc utilisable facilement|| [] indique: si JSON.parse(localStorage.getItem("itemBasket")) il n'y a rien de dant alors on met juste []

//LES FONCTIONS

//Fonction changement
function displayProduct(produit) {                                    // MEP de l'affichage et de la boucle
  let img = document.createElement("img");                            //Creation de l'element img dans le DOM
  let image = document.querySelector(".item__img").appendChild(img);  //creation de la variable image couplé à la class DOM
  image.setAttribute("src", produit.imageUrl);                        //creation et attribution de l'element img avec sont attribut et sa source
  image.setAttribute("alt", produit.altTxt);                          

  let title = document.querySelector("#title");                       // recuperation du nom, prix et description du produit
  title.innerHTML = produit.name;
  let price = document.querySelector("#price");
  price.innerHTML = produit.price;
  let desc = document.querySelector("#description");
  desc.innerHTML = produit.description;

//Option de base --SVP, choisissez une couleur --
  let defaultSelection = document.createElement("option");             //creation de l'element option dans le DOM
  defaultSelection.setAttribute("selected", "selected");               //attribution de "selected"
  defaultSelection.innerHTML = "--SVP, choisissez une couleur --";     // insertion du texte "--SVP, choisissez une couleur --"
  let colors = document.querySelector("#colors");
  colors.appendChild(defaultSelection);

//Loop(produit);
  produit.colors.forEach(function (color) {
    let multiColors = document.createElement("option");                 //foreach better than for(let i = 0; i < produit.colors.length; i++) pour chaque produit.colors on utilise la fonction
    multiColors.setAttribute("value", color);                           // creation de la patie option 
    multiColors.innerText = color;                                      // innterText prends une chaine de caractere et ne se comporte pas comme du html
    colors.appendChild(multiColors);  
  });
}
function addElementBasket() {     
  let chosenColor = document.getElementById("colors").value;   
  let quantity = parseInt(document.querySelector("#quantity").value);   //Recuperation de la quantité

//Si dans le basketTab je rajouter un basketObj dont l'id et la couleur sont strictemement egal au basketObj deja existant alors j'additionne 
console.log(basketTab)
  const existingObj = basketTab.find(basketObj => basketObj.id === idProduct && basketObj.color === chosenColor);
  if(existingObj) {
    existingObj.quantity += quantity;
  
  } 
  else {
    basketTab.push({
      id: idProduct,                                                       //version declarative
      color: chosenColor,
      quantity,
      });
      alert ('Canapé ajouté')
  }
  localStorage.setItem("itemBasket", JSON.stringify(basketTab));         //stock du texte donc doit etre serialiser et deserialiser () et stock grace a setitem
}

//Utilisation des Fonctions

if (url.pathname == "/front/html/product.html") {
  let sUrl = " http://localhost:3000/api/products";
  apiRecup(`${sUrl}/${idProduct}`)
    .then(function (produit) {
      let click = document.querySelector("#addToCart");                   //Fonction Panier (basket)
      click.addEventListener("click", function () {  
        if(document.getElementById("colors").value == "--SVP, choisissez une couleur --"){
              alert ('Il vous manque la couleur')
              }
        else if(document.getElementById("quantity").value <= 0 ) {
          alert ('Il vous manque un nombre d\'article')
          }

        else{
          //appel  de la fonction addbasket (ajout au panier)
          addElementBasket();                                               //Appel de la fonction addarray qui est en dehors => (mauvaise pratique) quel est l'interet d'utiliser de la ressource en créant une fonction qui n'est utilisée qu'une seule fois dans l'integralité du code de l'application ???
        }
      });
        displayProduct(produit);
    })
    .catch(function (erreur) {
      console.log("erreur : " + erreur);
    });
}