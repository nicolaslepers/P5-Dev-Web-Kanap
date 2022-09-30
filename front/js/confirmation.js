let str = window.location;                                            //tu regardes dans la barre de nav
let url = new URL(str);
let idCmd = url.searchParams.get("orderId"); 
document.getElementById("orderId").innerText = idCmd
console.log(idCmd)

localStorage.removeItem('itemBasket')