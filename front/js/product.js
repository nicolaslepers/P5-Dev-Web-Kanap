import {apiRecup} from './script.js';//on oublie pas de mettre le module apres le (src => src="../js/product.js" type="module")


// Recuperation de l'id depuis l'url
let str = window.location //tu regardes dans la barre de nav 
let url = new URL(str)
let idProduct = url.searchParams.get('id') //et cherche les paramettres qu tu mets dans une variable
//console.log(idProduct);doit correspondre à l'id du produit



//LES FONCTIONS

//fonction changement
function displayProduct (produits){
  // MEP de l'affichage et de la boucle
let img = document.createElement("img"); 
let image = document.querySelector('.item__img').appendChild(img);
image.setAttribute("src",produits.imageUrl);
image.setAttribute("alt",produits.altTxt);

let title = document.querySelector('#title')
title.innerHTML = (produits.name)
let price = document.querySelector('#price')
price.innerHTML = (produits.price)
let desc = document.querySelector('#description')
desc.innerHTML = (produits.description)

let defaultSelection = document.createElement("option")
defaultSelection.innerHTML = ('--SVP, choisissez une couleur --')
let colors = document.querySelector('#colors')
colors.appendChild(defaultSelection)};

//fonction boucle option
function loop (produits){
for(let i = 0; i<produits.colors.length; i++)
        { 
          let multiColors = document.createElement('option')
          multiColors.setAttribute("value", produits.colors[i]);
          multiColors.innerHTML = (produits.colors[i])
          colors.appendChild(multiColors);
          console.log('multiColors', multiColors);
        }}

if(url.pathname == '/front/html/product.html'){
let sUrl = " http://localhost:3000/api/products";
apiRecup(`${sUrl}/${idProduct}`)
  .then(function (data) {
    let produits = data;
   console.log('produits', produits);

    //Fonction Panier (basket)
let click = document.querySelector('#addToCart')
// //appel  de la fonction addbasket (ajout au panier)
click.addEventListener('click',function (){
  console.log('Le clique fonctionne pour la fonction addBasket')
  addArray(produits)
 })

 let basketTab = localStorage.getItem("itemBasket") || []
 console.log(basketTab)
 function addArray (basketProd){
  //if (localStorage.getItem("itemBasket")) {
    console.log("La clé est existante");
  } 
  //else {
    console.log("La clé est inexistante, il faut créer le tableau");
    let choiseColors = document.querySelector('#colors')[0].value
    console.log(choiseColors)
    let basketObj = (idProduct, basketProd.name, basketProd.colors)
//basketTab.push(basketObj)

    console.log (basketObj)
  }}
    displayProduct (produits)
        loop(produits)})
  .catch(function (erreur) {
    console.log("erreur : " + erreur);
  })}







   // localStorage.setItem('itemBasket', 'test');



// <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
//           <div class="cart__item__img">
//             <img src="../images/product01.jpg" alt="Photographie d'un canapé">
//           </div>
//           <div class="cart__item__content">
//             <div class="cart__item__content__description">
//               <h2>Nom du produit</h2>
//               <p>Vert</p>
//               <p>42,00 €</p>
//             </div>
//             <div class="cart__item__content__settings">
//               <div class="cart__item__content__settings__quantity">
//                 <p>Qté : </p>
//                 <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
//               </div>
//               <div class="cart__item__content__settings__delete">
//                 <p class="deleteItem">Supprimer</p>
//               </div>
//             </div>
//           </div>
//         </article>}