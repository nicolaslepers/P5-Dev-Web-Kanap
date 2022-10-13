//tu regardes dans la barre de nav
let str = window.location; 
//!!!!!!!!!!                                           
let url = new URL(str);
//creation de la variable qui va chercher la valeur de l'id "orderId"
let idCmd = url.searchParams.get("orderId"); 
//intégration du texte idCmd

console.log(idCmd)

if( idCmd === null){
    alert ('Aucune commande réalisé')
    alert ('Retour à la page "Panier"')
    window.location.href= 'cart.html'

}
else{document.getElementById("orderId").innerText = idCmd}

//suppresion des item du LocalStorage
localStorage.removeItem('itemBasket') 