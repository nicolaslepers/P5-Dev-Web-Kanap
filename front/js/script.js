let url = " http://localhost:3000/api/products";

fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let produits = data;
    console.log(produits);
    for (let i = 0; i < produits.length; i++) {
      document.querySelector(
        "#items"
      ).innerHTML += `<a href="./product.html?id=${id}">
      <article>
        <img src="${produits[i].imageUrl}" alt="${produits[i].altTxt}">
        <h3 class="productName">${produits[i].name}</h3>
        <p class="productDescription"${produits[i].description}</p>
      </article>
    </a>`;
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
    }
  })
  .catch(function (erreur) {
    console.log("erreur : " + erreur);
  });
