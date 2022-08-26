// Recuperation de l'id depuis l'url
let str = window.location //tu regardes dans la barre de nav 
let url = new URL(str)
let idProduct = url.searchParams.get('id') //et cherche les paramettres qu tu mets dans une variable
console.log(idProduct);//doit correspondre à l'id du produit

// Creation de la variable contentant l'article
// let article = 

// MEP du fetch avec Id de l'objet
let sUrl = " http://localhost:3000/api/products";
fetch(`${sUrl}/${idProduct}`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let produits = data;
    console.log(produits);
    
    // MEP de l'affichage et de la boucle
    let img = document.createElement("img"); 
    let image = document.querySelector('.item__img').appendChild(img);
    image.setAttribute("src",produits.imageUrl);
    image.setAttribute("alt",produits.altTxt)
    console.log(image);

    let title = document.querySelector('#title')
    title.innerHTML = (produits.name)
    let price = document.querySelector('#price')
    price.innerHTML = (produits.price)
    let desc = document.querySelector('#description')
    desc.innerHTML = (produits.description)



    
    // let selector = document.getElementById('selector') 
    // for(let i = 0; i < colors.length; i++){
    // option.appendChild(selector);
    // option.classList.add("value");
    // color.innerHTML = (produits.color[i])
    // let color = document.getElementById('#colors')
    
  })
  