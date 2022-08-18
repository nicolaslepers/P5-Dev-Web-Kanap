fetch('http://localhost:3000/products')
    .then(function(response){
    return response.json()
    })
    .then(function(data){
        console.log(data)
    
    })
    .catch(function(erreur){
        console.log('erreur : ' + erreur)
       });
    