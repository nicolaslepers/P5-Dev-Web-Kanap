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
      let title = document.createElement("h3");
      title.classList.add("productName");
      title.innerHTML = (produits[i].name);
      article.appendChild(title);
      

      // creation de l'image et integration des attributs img et alt 
      let image = document.createElement("img");
      image.setAttribute("src",produits[i].imageUrl);
      image.setAttribute("alt",produits[i].altTxt)
      article.appendChild(image);
      let items = document.getElementById("items");
      // items.appendChild(card);

      // creation de la descritpion
      let paragraph = document.createElement("p");
      paragraph.classList.add("productDescription");
      paragraph.innerHTML = (produits[i].description);
      article.appendChild(paragraph);

      /********************Page Produit********************/

      // integration de la descritpion
      let itemimg = document.getElementsByClassName("item__img")
      itemimg.setAttribute("src",produits[i].imageUrl);
      itemimg.setAttribute("alt",produits[i].altTxt)
      console.log(itemimg)
  }})
  .catch(function (erreur) {
    console.log("erreur : " + erreur);
  });