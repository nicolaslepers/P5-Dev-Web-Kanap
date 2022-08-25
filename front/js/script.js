let url = " http://localhost:3000/api/products";

fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let produits = data;
    console.log(produits);
    for (let i = 0; i < produits.length; i++) {
      
      // Creation card Produit dans html
      let card = document.createElement("a");
      let id = produits[i]._id;
      card.setAttribute("href", `./product.html?id=${id}`);

      let article = document.createElement("article");
      card.appendChild(article);

      // // creation du titre
      document.querySelector('h3').classList.add('productName')
      let title = document.createElement("h3")
      let name = document.querySelector('.productName')
      name.innerHTML = (produits[i].name)
      article.appendChild(title)
      

      // creation de l'image et integration des attributs img et alt 
      let image = document.createElement("img");
      article.appendChild(image);
      image.setAttribute("src",produits[i].imageUrl);
      image.setAttribute("alt",produits[i].altTxt)

      let items = document.getElementById("items");
      items.appendChild(card);

      // creation de la descritpion
      let paragraph = document.createElement("p")
      article.appendChild(paragraph)
      document.querySelector('p').classList.add('productDescription')
      let description = document.querySelector('.productDescription')
      description.innerHTML = (produits[i].description)
      // console.log(description)

    }
  })
  .catch(function (erreur) {
    console.log("erreur : " + erreur);
  });