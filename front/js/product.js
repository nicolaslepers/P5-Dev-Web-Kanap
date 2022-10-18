//on oublie pas de mettre le module apres le (src => src="../js/product.js" type="module")
import { apiRecup } from "./script.js";

// Recuperation de l'id depuis l'url
//tu regardes dans la barre de nav
let str = window.location;                                            
let url = new URL(str);
//et cherche les paramettres qu tu mets dans une variable
let idProduct = url.searchParams.get("id");
// fait appel au local storage grace a quetitem et est a l'exterieur donc utilisable facilement|| [] indique: si JSON.parse(localStorage.getItem("itemBasket")) il n'y a rien de dant alors on met juste []
export let basketTab = JSON.parse(localStorage.getItem("itemBasket")) || [];

/************************************************************ LES FONCTIONS ******************************************************/

//Fonction chargement
// MEP de l'affichage et de la boucle
function displayProduct(produit) {   
//Creation de l'element img dans le DOM
  let img = document.createElement("img");  
  //creation de la variable image couplé à la class DOM
  let image = document.querySelector(".item__img").appendChild(img);
  //creation et attribution de l'element img avec sont attribut et sa source
  image.setAttribute("src", produit.imageUrl);  
  image.setAttribute("alt", produit.altTxt);

// recuperation du nom, prix et description du produit
  let title = document.querySelector("#title");         
  title.innerHTML = produit.name;
  let price = document.querySelector("#price");
  price.innerHTML = produit.price;
  let desc = document.querySelector("#description");
  desc.innerHTML = produit.description;

//Option de base --SVP, choisissez une couleur --
  //creation de l'element option dans le DOM
  let defaultSelection = document.createElement("option"); 
  //attribution de "selected"
  defaultSelection.setAttribute("selected", "selected");   
  // insertion du texte "--SVP, choisissez une couleur --"
  defaultSelection.innerHTML = "--SVP, choisissez une couleur --"; 
  let colors = document.querySelector("#colors");
  colors.appendChild(defaultSelection);

//Loop(produit);
//foreach better than for(let i = 0; i < produit.colors.length; i++) pour chaque produit.colors on utilise la fonction
  produit.colors.forEach(function (color) {
//creation de l'element option
    let multiColors = document.createElement("option"); 
// attribution de la couleur
    multiColors.setAttribute("value", color);   
// innterText prends une chaine de caractere et ne se comporte pas comme du html
    multiColors.innerText = color;        
//colors est l'enfant de multicolors
    colors.appendChild(multiColors);  
  });
}



//Ajout au panier
function addElementBasket() {    
//selection de l'ID colors et de sa valeur 
  let chosenColor = document.getElementById("colors").value;
//selection de l'ID Quantité et de sa valeur 
  let quantity = parseInt(document.querySelector("#quantity").value); 
//Si dans le basketTab je rajouter un basketObj dont l'id et la couleur sont strictemement egal au basketObj deja existant alors j'additionne 
console.log(basketTab)
  const existingObj = basketTab.find(basketObj => basketObj.id === idProduct && basketObj.color === chosenColor);
  if(existingObj) {
// si j'ai deux obj avec la meme coouleur et le meme ID alors je stak
    existingObj.quantity += quantity;
  } 
  else {
//version declarative
    basketTab.push({
      id: idProduct,
      color: chosenColor,
      quantity,
      });
      alert ('Canapé ajouté')
  }
  //stock du texte donc doit etre serialiser et deserialiser () et stock grace a setitem
  localStorage.setItem("itemBasket", JSON.stringify(basketTab));
}

/**************************************************** Utilisation des Fonctions *********************************************/

if (url.pathname == "/front/html/product.html") {
  let sUrl = " http://localhost:3000/api/products";
  apiRecup(`${sUrl}/${idProduct}`)
    .then(function (produit) {
      let click = document.querySelector("#addToCart");
      click.addEventListener("click", function () {
        //si il n'y a ni couleur et que le texte est "--SVP, choisissez une couleur --" alors alerte
        if(document.getElementById("colors").value == "--SVP, choisissez une couleur --"){
              alert ('Il vous manque la couleur')
              }
        else if(document.getElementById("quantity").value <= 0 ) {
          alert ('Il vous manque un nombre d\'article')
          }

        else{
          //sinon appel  de la fonction addbasket (ajout au panier)
          addElementBasket();
        }
      });
      //affichage
        displayProduct(produit);
    })
    //en cas d'erreur
    .catch(function (erreur) {
      console.log("erreur : " + erreur);
    });
}