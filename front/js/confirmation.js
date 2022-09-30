//tu regardes dans la barre de nav
let str = window.location; 
//!!!!!!!!!!                                           
let url = new URL(str);
//creation de la variable qui va chercher la valeur de l'id "orderId"
let idCmd = url.searchParams.get("orderId"); 
//intégration du texte idCmd
document.getElementById("orderId").innerText = idCmd
console.log(idCmd)

//suppresion des item du LocalStorage
localStorage.removeItem('itemBasket')