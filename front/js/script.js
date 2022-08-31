// fonction recuperation data API
// export {apirecup};

function apiRecup(urlApi) {
  return fetch(urlApi).then(function (response) {
    return response.json();
  });
}
//fonction affichage
function affchProd(dataProduits) {
  console.log(dataProduits);
  for (let i = 0; i < dataProduits.length; i++) {
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

//execution

let url = " http://localhost:3000/api/products";

apiRecup(url)
  .then(function (data) {
    affchProd(data);
  })
  .catch(function (erreur) {
    console.log("erreur : " + erreur);
  });

/*   // Creation card Produit dans html                                       shift alt a 
      let card = document.createElement("a");
      let id = produits[i]._id;
      card.setAttribute("href", `./product.html?id=${id}`);

      let article = document.createElement("article");
      card.appendChild(article);

      // // creation du titre
      let title = document.createElement("h3");
      title.classList.add("productName");
      title.innerHTML = (produits[i].name);
      article.appendChild(title);

      // creation de l'image et integration des attributs img et alt 
      let image = document.createElement("img");
      article.appendChild(image);
      image.setAttribute("src",produits[i].imageUrl);
      image.setAttribute("alt",produits[i].altTxt)

      let items = document.getElementById("items");
      items.appendChild(card);

      // creation de la descritpion
      let paragraph = document.createElement("p");
      paragraph.classList.add("productDescription");
      paragraph.innerHTML = (produits[i].description);
      article.appendChild(paragraph); */
