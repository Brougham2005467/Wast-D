 //Setting arrays to be used by local storage
 var shopList = []
 var favourites = []
 var storedingredients = []
 var storedfavourites = []

 
 
/* //Enable responses from buttons in filters
 var url = ('https://www.thecocktaildb.com/api/json/v1/1/search.php?i=A');
 $.getJSON(url, function (data) {
   //Print to log for debug purposes
   console.log(data)
 }); */

 $(function(){
   $("button").click(function() {
       var fired_button = $(this).val();
       console.log(fired_button);
       if (fired_button.includes("search.php?f")){
       var url = ('https://www.thecocktaildb.com/api/json/v1/1/' + fired_button +'');
       $.getJSON(url, function (data) {
         //Print to log for debug purposes
         getcocktails(data);
         console.log(data);
       });
      }
       else if (fired_button.includes("search.php?i")){
         var url = ('https://www.thecocktaildb.com/api/json/v1/1/' + fired_button +'');
         $.getJSON(url, function (data) {
           //Print to log for debug purposes
           getIngredients(data);
           console.log(data);         
        });
      }

      });

  
  //Handlers for refresh and clear buttons in favourites and ingredients tabs
  var faverefresh = document.getElementById("fave-refresh-button")
  faverefresh.addEventListener("click", getfavourites);
  var shoprefresh = document.getElementById("shoplist-refresh-button")
  shoprefresh.addEventListener("click", getshopping);
  var faveclear = document.getElementById("fave-clear-button")
  faveclear.addEventListener("click", clearFaves);
  var shopclear =  document.getElementById("shoplist-clear-button")   
  shopclear.addEventListener("click", clearShop);

  function clearFaves(){
    localStorage.removeItem('favourites');
    localStorage.setItem("favourites", JSON.stringify(storedfavourites));
    console.log ('Favourites Cleared')
  }

  function clearShop(){
    localStorage.removeItem('shopList');
    localStorage.setItem("shopList", JSON.stringify(storedingredients));
    console.log ('Shoplist Cleared')
  }
 

  function getcocktails(data) {
    //Setting location for data to be inserted as children of parent
     var mainContainer = document.getElementById("browseDrinkList");
     mainContainer.innerHTML = "";
    //iterate through results in array
     for(var i = 0; i < data.drinks.length; i++) {
    //Create ion item element for each iteration   
       var div = document.createElement("ion-item");
    //create array of ingredients and quantities for each iteration
       var ingredsfull = [data.drinks[i].strIngredient1 + " - " + data.drinks[i].strMeasure1 + "<br>", 
       data.drinks[i].strIngredient2 + " - " + data.drinks[i].strMeasure2 + "<br>", 
       data.drinks[i].strIngredient3 + " - " + data.drinks[i].strMeasure3 + "<br>", 
       data.drinks[i].strIngredient4 + " - " + data.drinks[i].strMeasure4 + "<br>",
       data.drinks[i].strIngredient5 + " - " + data.drinks[i].strMeasure5 + "<br>", 
       data.drinks[i].strIngredient6 + " - " + data.drinks[i].strMeasure6 + "<br>", 
       data.drinks[i].strIngredient7 + " - " + data.drinks[i].strMeasure7 + "<br>", 
       data.drinks[i].strIngredient8 + " - " + data.drinks[i].strMeasure8 + "<br>", 
       data.drinks[i].strIngredient9 + " - " + data.drinks[i].strMeasure9 + "<br>", 
       data.drinks[i].strIngredient10 + " - " + data.drinks[i].strMeasure10 + "<br>", 
       data.drinks[i].strIngredient11 + " - " + data.drinks[i].strMeasure11 + "<br>", 
       data.drinks[i].strIngredient12 + " - " + data.drinks[i].strMeasure12 + "<br>", 
       data.drinks[i].strIngredient13 + " - " + data.drinks[i].strMeasure13 + "<br>", 
       data.drinks[i].strIngredient14 + " - " + data.drinks[i].strMeasure14 + "<br>", 
       data.drinks[i].strIngredient15 + " - " + data.drinks[i].strMeasure15 + "<br>"];
    //remove null values from array
       ingredsfull = ingredsfull.filter(val => val !== "null - null<br>");
    //pass array as string
       ingredsfull = ingredsfull.toString();
    //remove commas present after conversion from array
       ingredsfull =  ingredsfull.replace(/,/g,'')
    //replacing nulls that are present from API data with blank spaces
       ingredsfull = ingredsfull.replace(/null/g,'')
    //Generate ion list items based on array length, Insert data from each drinks own array of data to browse page,
    //Create individual modal button for each item inside each ion list item, populate modal with recieved data
       div.innerHTML = '<ion-thumbnail item-start>\
       <img src="' + data.drinks[i].strDrinkThumb + '">\
     </ion-thumbnail>\
     <h4>' + data.drinks[i].strDrink + '</h4>\
     <ion-button id="view-button' + data.drinks[i].strDrink +'">View</ion-button>\
     <ion-modal trigger="view-button' + data.drinks[i].strDrink +'">\
     <div class="ion-page">\
     <ion-header>\
         <ion-toolbar color="primary">\
            <ion-title>' + data.drinks[i].strDrink + '</ion-title>\
               <ion-button slot="end" color="danger" href="./index.html" id="close">Back</ion-button>\
         </ion-toolbar>\
      </ion-header>\
     <ion-content fullscreen class="ion-padding">\
     <img src="' + data.drinks[i].strDrinkThumb + '">\
     <p><b>' + ingredsfull + '</b></p>\
     <p>' + data.drinks[i].strInstructions + '</p>\
   </ion-content>\
   </div>\
   </ion-modal>\
   <button slot="end" value="cocktail: ' + data.drinks[i].idDrink + '"><ion-icon name="heart"></ion-icon></button>\
   <script></script>\
   </ion-item>'

       mainContainer.appendChild(div);   
   };

   $(function(){
      $("button").click(function() {
          var fired_button = $(this).val();
          var cocktailName = (fired_button.replace("cocktail: ", ""))
          console.log(cocktailName);
          var storedfavourites = JSON.parse(localStorage.getItem("favourites"));
          if (storedfavourites == null){
            storedfavourites = []
            storedfavourites.push(cocktailName);
            localStorage.setItem("favourites", JSON.stringify(storedfavourites));
            console.log('added to favourites list')
            console.log(storedfavourites)
          }
          else{
          if (cocktailName.includes("?"))
          {
            console.log("not valid for array")
          }
          else if (!storedfavourites.includes(cocktailName)) 
          { 
            storedfavourites.push(cocktailName);
            localStorage.setItem("favourites", JSON.stringify(storedfavourites));
            console.log('added to favourites list')
            console.log(storedfavourites)
          } 
          else 
          {
            storedfavourites.splice(storedfavourites.indexOf(cocktailName), 1);
            console.log('already in list, removed')
          }
          }
          });
          });

}


 //function to show ingredients in list in ingredients tab
 function getIngredients(data){   
   //Setting location for data to be inserted as children of parent
   var ingredContainer = document.getElementById("ingredientsList");
   ingredContainer.innerHTML = ""
   console.log(data)

   //iterate through results in array
    for(var i = 0; i < data.ingredients.length; i++) {
   //Create ion item element for each iteration   
      var div = document.createElement("ion-item");
   //Creation of dynamic ingredient ion item, with button to add to shopping list
      div.innerHTML = '<h2>' + data.ingredients[i].strIngredient + '</h2>\
      <button slot="end" value="ingredient: ' + data.ingredients[i].idIngredient + '" id="shoptoggle"><ion-icon name="basket"></ion-icon></button>'

      ingredContainer.appendChild(div);
    };
 

          $(function(){
            $("button").click(function() {
                var fired_button = $(this).val();
                var ingredientName = (fired_button.replace("ingredient: ", ""))
                console.log(ingredientName);
                var storedingredients = JSON.parse(localStorage.getItem("shopList"));
                if (storedingredients == null){
                  storedingredients = []
                  storedingredients.push(ingredientName);
                  localStorage.setItem("shopList", JSON.stringify(storedingredients));
                  console.log('added to shopping list')
                  console.log(storedingredients)
                }
                else{
                if (ingredientName.includes("?"))
                {
                  console.log("not valid for array")
                }
                else if (!storedingredients.includes(ingredientName)) 
                { 
                  storedingredients.push(ingredientName);
                  localStorage.setItem("shopList", JSON.stringify(storedingredients));
                  console.log('added to shopping list')
                  console.log(storedingredients)
                } 
                else 
                {
                  storedingredients.splice(storedingredients.indexOf(ingredientName), 1);
                  console.log('already in shop list, removed')
                }
                }
                });
                });


   }})

   function getshopping(storedingredients, data) {
    //Setting location for data to be inserted as children of parent
     var shopContainer = document.getElementById("shoppingList");
     var storedingredients = JSON.parse(localStorage.getItem("shopList"));
     console.log(storedingredients)
    //iterate through results in array
     shopContainer.innerHTML = "";
     for(var i = 0; i < storedingredients.length; i++) {
       var div = document.createElement("ion-item");

         //call in API data for each cocktail from their ID to populate favourites list data
     var ingredienturl = ('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=' + storedingredients[i] + '');

       populateShopping(ingredienturl)
     }           
    }

    function populateShopping(ingredienturl){

      var shopContainer = document.getElementById("shoppingList");
      var div = document.createElement("ion-item");

      $.getJSON(ingredienturl, function (data) {
      //Print to log for debug purposes
       console.log(data)
       console.log(data.ingredients[0].strIngredient)

      //Create individual modal button for each item inside each ion list item, populate modal with recieved data
      div.innerHTML = '<h2>' + data.ingredients[0].strIngredient + '</h2>\
      <button slot="end" value="ingredient: ' + data.ingredients[0].strIngredient + '" id="shoptoggle"><ion-icon name="basket"></ion-icon></button>'
      shopContainer.appendChild(div); 
      });
      }



   function getfavourites(storedfavourites, data) {
      //Setting location for data to be inserted as children of parent
       var faveContainer = document.getElementById("favouritesList");
       var storedfavourites = JSON.parse(localStorage.getItem("favourites"));
      //iterate through results in array
       faveContainer.innerHTML = "";
       for(var i = 0; i < storedfavourites.length; i++) {
         var div = document.createElement("ion-item");

           //call in API data for each cocktail from their ID to populate favourites list data
       var drinkurl = ('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + storedfavourites[i] + '');
       console.log(drinkurl)

         populateFavourites(drinkurl)

       }           
      }




      function populateFavourites(drinkurl){

      var faveContainer = document.getElementById("favouritesList");
      var div = document.createElement("ion-item");

      $.getJSON(drinkurl, function (data) {
      //Print to log for debug purposes
       console.log(data)
       console.log(data.drinks[0].strIngredient1)
      
       var faveingreds = [data.drinks[0].strIngredient1 + " - " + data.drinks[0].strMeasure1 + "<br>", 
       data.drinks[0].strIngredient2 + " - " + data.drinks[0].strMeasure2 + "<br>", 
       data.drinks[0].strIngredient3 + " - " + data.drinks[0].strMeasure3 + "<br>", 
       data.drinks[0].strIngredient4 + " - " + data.drinks[0].strMeasure4 + "<br>",
       data.drinks[0].strIngredient5 + " - " + data.drinks[0].strMeasure5 + "<br>", 
       data.drinks[0].strIngredient6 + " - " + data.drinks[0].strMeasure6 + "<br>", 
       data.drinks[0].strIngredient7 + " - " + data.drinks[0].strMeasure7 + "<br>", 
       data.drinks[0].strIngredient8 + " - " + data.drinks[0].strMeasure8 + "<br>", 
       data.drinks[0].strIngredient9 + " - " + data.drinks[0].strMeasure9 + "<br>", 
       data.drinks[0].strIngredient10 + " - " + data.drinks[0].strMeasure10 + "<br>", 
       data.drinks[0].strIngredient11 + " - " + data.drinks[0].strMeasure11 + "<br>", 
       data.drinks[0].strIngredient12 + " - " + data.drinks[0].strMeasure12 + "<br>", 
       data.drinks[0].strIngredient13 + " - " + data.drinks[0].strMeasure13 + "<br>", 
       data.drinks[0].strIngredient14 + " - " + data.drinks[0].strMeasure14 + "<br>", 
       data.drinks[0].strIngredient15 + " - " + data.drinks[0].strMeasure15 + "<br>"];

       //remove null values from array
       faveingreds = faveingreds.filter(val => val !== "null - null<br>");
    //pass array as string
       faveingreds = faveingreds.toString();
    //remove commas present after conversion from array
       faveingreds =  faveingreds.replace(/,/g,'')
    //replacing nulls that are present from API data with blank spaces
       faveingreds = faveingreds.replace(/null/g,'')
      

      //Create individual modal button for each item inside each ion list item, populate modal with recieved data
       div.innerHTML = div.innerHTML = '<ion-thumbnail item-start>\
       <img src="' + data.drinks[0].strDrinkThumb + '">\
     </ion-thumbnail>\
     <h4>' + data.drinks[0].strDrink + '</h4>\
     <ion-button id="view-button' + data.drinks[0].strDrink +'">View</ion-button>\
     <ion-modal trigger="view-button' + data.drinks[0].strDrink +'">\
     <div class="ion-page">\
     <ion-header>\
         <ion-toolbar color="primary">\
            <ion-title>' + data.drinks[0].strDrink + '</ion-title>\
               <ion-button slot="end" color="danger" href="./index2.html" id="close">Back</ion-button>\
         </ion-toolbar>\
      </ion-header>\
     <ion-content fullscreen class="ion-padding">\
     <img src="' + data.drinks[0].strDrinkThumb + '">\
     <p><b>' + faveingreds + '</b></p>\
     <p>' + data.drinks[0].strInstructions + '</p>\
   </ion-content>\
   </div>\
   </ion-modal>\
   <button slot="end" value="cocktail: ' + data.drinks[0].idDrink + '"><ion-icon name="heart"></ion-icon></button>\
   <script></script>\
   </ion-item>'
      faveContainer.appendChild(div); 
      });
      }