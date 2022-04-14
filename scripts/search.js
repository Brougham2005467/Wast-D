//Get search button and input from search bar
 var searchbutton = document.getElementById("searchbutton")
 
//function to retrieve search results generated via API
function searchInput(input){

   var input = document.getElementById("searchbox").value
   console.log(input)

   var url = ('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + input);
   
 //retrieving the info from JSON
 $.getJSON(url, function (data) {
   //Print to log for debug purposes
   console.log(data)
   searchData(data)

 });
}

   //Event listener
   searchbutton.addEventListener("click", searchInput, searchData);


 function searchData(data) {


    //Setting location for data to be inserted as children of parent
     var searchresults = document.getElementById("searchresults");

    //Clear search data to keep results relevant to search
    searchresults.innerHTML = "";
    //iterate through results in array
     for(var i = 0; i < data.drinks.length; i++) {
    //Create ion item element for each iteration   
       var div = document.createElement("ion-item");
    //create array for ingredients for each iteration
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
                        <ion-button slot="end" color="danger" href="./index2.html" id="close">Back</ion-button>\
                    </ion-toolbar>\
                </ion-header>\
     <ion-content fullscreen class="ion-padding">\
     <img src="' + data.drinks[i].strDrinkThumb + '">\
     <p><b>' + ingredsfull + '</b></p>\
     <ion-button id="addtoingredlist">Add to Ingredients List</ion-button>\
     <p>' + data.drinks[i].strInstructions + '</p>\
   </ion-content>\
   </div>\
   </ion-modal>\
   <button slot="end" value="cocktail: ' + data.drinks[i].idDrink + '"><ion-icon name="heart"></ion-icon></button>\
   </ion-item>'
   
       searchresults.appendChild(div);
      
     }

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
