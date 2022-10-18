export { apiRecup };




/******************************************************************** fonction  ****************************************************/
function apiRecup(urlApi) {
  return fetch(urlApi).then(function (response) {
    return response.json();
  });
}


//recuperation de la data dans L'API
function affchProd(dataProduits) {
  console.log(dataProduits);   
//Mise en place de la boucle d'affichage des produits dans le DOM
  for (let i = 0; i < dataProduits.length; i++) {  
//pour chaque produits on affcihe  l'id, le texte, l'img et la description
    let actuProduit = dataProduits[i];
    document.querySelector(
      "#items"
    ).innerHTML += `<a href="./product.html?id=${actuProduit._id}">
    <article>
      <img src="${actuProduit.imageUrl}" alt="${actuProduit.altTxt}">
      <h3 class="productName">${actuProduit.name}</h3>
      <p class="productDescription">${actuProduit.description}</p>
    </article>
  </a>`;
  }
}

/******************************************************************** Utilisation des fonctions ****************************************************/


//tu regardes dans la barre de nav
let urlPage = new URL(window.location)   
//si le pathname est index alors on execute                                                        
if (urlPage.pathname == '/front/html/index.html') { 
  let url = " http://localhost:3000/api/products";
  apiRecup(url)
//recuperation et affichage des datas
    .then(function (data){
      affchProd(data);
    })
//affichage si erreur il y a 
    .catch(function (erreur) {
      console.log("erreur : " + erreur);
      console.error(erreur)
    });
}