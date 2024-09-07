// www.themealdb.com/api/json/v1/1/lookup.php?i={id}
// www.themealdb.com/api/json/v1/1/filter.php?c=(searchTerm)

// setup vars
let searchInput = document.querySelector(".search-input");
let searchBtn = document.querySelector("#search-btn");
let resultArea = document.querySelector(".results-area");
let recipeDetails = document.querySelector(".recipe-details")


// Events
searchBtn.onclick = function () {
    let searchTerm = searchInput.value;

    (fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchTerm}`))
    .then((res) => {
        if(res.ok) {
        return ( res.json());
        }
    }).then((data)=> {
        displayRecipes(data);
    })
}
function displayRecipes (recipes) {
    resultArea.innerHTML = ``;
    if(recipes.meals === null) {
        resultArea.innerHTML = "No Data";
        return;
    }

    recipes.meals.forEach((recipe) => {
        resultArea.innerHTML +=
     `
     <div class="card">
            <div class="card-img">
                <img src="${recipe.strMealThumb}" alt="">
            </div>
            <div class="card-info">
                <h2>"${recipe.strMeal}"</h2>
               <a href="#" class="recipe-btn" data-id=${recipe.idMeal}> Get Recipe </a>
            </div>
    </div>
          
    `
});
}
resultArea.onclick = function (e) {
    if(e.target.classList.contains("recipe-btn")) {
       let  id = e.target.getAttribute("data-id")
    
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => {
        if(res.ok) {
        return ( res.json());
        }
    }).then((data)=> {
        displayRecipesDetails(data);

    })
   }
   }
function displayRecipesDetails(recipeItem) {
    let item = recipeItem.meals[0];
    recipeDetails.classList.remove("showDetails");
    recipeDetails.innerHTML = ""
    recipeDetails.innerHTML = `
        <i class="fas fa-times"></i>
        <h2>${item.strMeal}</h2>
        <p>Instructions</p>
        <p>${item.strInstructions}</p>
        <a href="${item.strYoutube}">Watch Video</a>
    `

}
recipeDetails.onclick = function (e) {
    if(e.target.classList.contains("fa-times")) {
        e.target.parentElement.classList.add("showDetails");
    }
}
