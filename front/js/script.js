export { apiRecup };                                                                          // export de fonction pour un utilisation dans un autre fichier
function apiRecup(urlApi) {                                                                   // fonction recuperation data API
  return fetch(urlApi).then(function (response) {
    return response.json();
  });
}
//fonction affichage
function affchProd(dataProduits) {                                                              //recuperation de la data dans L'API
  console.log(dataProduits);                                
  for (let i = 0; i < dataProduits.length; i++) {                                               //Mise en place de la boucle d'affichage des produits dans le DOM
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

let urlPage = new URL(window.location)                                                          //tu regardes dans la barre de nav 
if (urlPage.pathname == '/front/html/index.html') {                                             //si le pathname est index alors on execute
  let url = " http://localhost:3000/api/products";
  apiRecup(url)
    .then(function (data) {
      affchProd(data);
    })
    .catch(function (erreur) {
      console.log("erreur : " + erreur);
      console.error(erreur)
    });
}