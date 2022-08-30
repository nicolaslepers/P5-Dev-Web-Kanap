// Recuperation de l'id depuis l'url
let str = window.location //tu regardes dans la barre de nav 
let url = new URL(str)
let idProduct = url.searchParams.get('id') //et cherche les paramettres qu tu mets dans une variable
//console.log(idProduct);doit correspondre à l'id du produit

let sUrl = " http://localhost:3000/api/products";
fetch(`${sUrl}/${idProduct}`)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let produits = data;
   console.log(data);
    
    // MEP de l'affichage et de la boucle
    let img = document.createElement("img"); 
    let image = document.querySelector('.item__img').appendChild(img);
    image.setAttribute("src",produits.imageUrl);
    image.setAttribute("alt",produits.altTxt)

    let title = document.querySelector('#title')
    title.innerHTML = (produits.name)
    let price = document.querySelector('#price')
    price.innerHTML = (produits.price)
    let desc = document.querySelector('#description')
    desc.innerHTML = (produits.description)
 
    let defaultSelection = document.createElement("option")
    defaultSelection.innerHTML = ('--SVP, choisissez une couleur --')
    let colors = document.querySelector('#colors')
    colors.appendChild(defaultSelection);

        for(let i = 0; i<colors.length; i++)
        {
          let multiColors = document.createElement('option')
          multiColors.setAttribute("value", produits.colors[i]);
          multiColors.innerHTML = (produits.colors[i])
          console.log(multiColors);

        }})
      // console.log(defaultSelection);
      //document.createElement("option"produits.colors[i])