let str = window.location;                                            //tu regardes dans la barre de nav
let url = new URL(str);
let idCmd = url.searchParams.get("orderId"); 
document.getElementById("orderId").innerText = idCmd

// function removeCache (){
//     let cache = window.localStorage
//     cache.clear()
// }
localStorage.removeItem()