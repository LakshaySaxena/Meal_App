/* make buttons  */
const search = document.getElementById('search'); // Get the search input element
const submit = document.getElementById('submit');// Get the submit button element
const mealEl = document.getElementById('meals');// Get the meals container element
const like = document.getElementsByClassName('like');// Get elements with the 'like' class
const resultheading = document.getElementsByClassName('result-heading');// Get elements with the 'result-heading' class
const single_mealEl = document.getElementById('single-meal');// Get the single meal container element



// Set up the localStorage for the favorites list
const dbObjectFavList = "favouritesList";
if (localStorage.getItem(dbObjectFavList) == null) {
   localStorage.setItem(dbObjectFavList, JSON.stringify([]));
}
 
// search for meals
function searchMeal(e){
    e.preventDefault();

// clear sigle meal
single_mealEl.innerHTML="";

//get search meal
const term = search.value;

 
//check for empty
if(term.trim()){
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)

.then((res) => res.json())
 .then((data) =>{
     console.log(data);
     console.log(term);
    
        // Update the content of mealEl
        mealEl.innerHTML = data.meals.map(
            meal => `
            <div class="meal" onclick="showMealDetails(${meal.idMeal})">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="meal-info" data-mealId="${meal.idMeal}">
            <h3>${meal.strMeal}
            </h3>
        <div id="like-button" onclick=addRemoveToFavList(${meal.idMeal})>
        <i class="fas fa-heart" id="heart-icon-${meal.idMeal}"></i> 
             </div>
            </div>
            </div>`
            
             ).join("");

      });

    }
   

}
// function to save a meal to localStorage
function saveMeal(meal) {
    try {
      localStorage.setItem('favoriteMeal[]', JSON.stringify(meal));
    } catch (error) {
      console.error(error);
    }
    console.log(meal);  
  }
  
// fetch meal byc id
function getMealById(mealId){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res)  => res.json())
    .then((data) => {
        console.log(data);
      const meal = data.meals[0];
      addMealToDom(meal);
    });
}

// function to add meal details to the DOM
function addMealToDom(meal){
    const ingredients = [];
     for(let i=1; i<=20; i++){
        if(meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]}- ${
                meal[`strMeasure${i}`]}           
            `);
        }else{
            break;
        }
    
        
    }
    single_mealEl.innerHTML = `
    <div class="single-meal">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    <div class="single-meal-info">
    ${meal.strCategory ? `<p>${meal.strCategory}</p>`: ''}
    ${meal.strArea ? `<p>${meal.strArea}</p>`:''}
    </div>
    <div class="main">
    <p>${meal.strInstructions}</p>
    </div>
    </div>
    `;
}


// function addRemoveToFavList(idMeal){
//     const detailsPageLikeBtn = document.getElementsById('like-button');
//     let favoriteMeal = JSON.parse(localStorage.getItem(dbObjectFavList));
//     console.log(favoriteMeal);

    
// }
//To Add a new function to show meal details

function showMealDetails(mealId) {
    // Fetch meal details by ID
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            // Update the content of the mealDetailsContent div
            updateMealDetailsContent(meal);
            // Show the meal details section
            document.getElementById('mealDetailsSection').style.display = 'block';
        });
}

//To Add a new function to update the content of the mealDetailsContent div
function updateMealDetailsContent(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }

    // To Update the content of the mealDetailsContent div
    const mealDetailsContent = `
    <div class="single-meal-details">
    <div class="meal-header">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
    </div>
    <div class="single-meal-info">
        <div class="info-item">
            <span class="label">Category:</span>
            <span class="value">${meal.strCategory || 'Not specified'}</span>
        </div>
        <div class="info-item">
            <span class="label">Area:</span>
            <span class="value">${meal.strArea || 'Not specified'}</span>
        </div>
    </div>
    <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul class="ingredients-list">${ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}</ul>
    </div>
</div>
`;

    // To Update the content of the mealDetailsContent div
    document.getElementById('mealDetailsContent').innerHTML = mealDetailsContent;
}

// function to close the meal details section
function closeMealDetails() {
    document.getElementById('mealDetailsSection').style.display = 'none';
}

//function to update the content of the meal-details.html page
function updateMealDetailsPage(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }

    // To Update the content of the meal-details.html page
    const mealDetailsContent = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>${ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}</ul>
            </div>
        </div>
    `;

    // To Update the content of the meal-details.html page
    document.getElementById('mealDetailsContent').innerHTML = mealDetailsContent;
}


// function to add or remove a meal from the favorites list
function addRemoveToFavList(idMeal) {
    const heartIcon = document.getElementById(`heart-icon-${idMeal}`);
    let favouriteMeals = JSON.parse(localStorage.getItem('favouritesList')) || [];

    const index = favouriteMeals.findIndex(meal => meal.idMeal === idMeal);

    if (index === -1) {
        const mealToAdd = {
            idMeal: idMeal,
            details: null // You can fetch details here if needed
        };

        favouriteMeals.push(mealToAdd);
        heartIcon.classList.add('liked');
    } else {
        favouriteMeals.splice(index, 1);
        heartIcon.classList.remove('liked');
    }

    localStorage.setItem('favouritesList', JSON.stringify(favouriteMeals));
    displayFavorites(); // Refresh the displayed list
}

// function to display favorite meals
function displayFavorites() {
    const favouriteMeals = JSON.parse(localStorage.getItem('favouritesList')) || [];
    const favouritesContainer = document.getElementById('favouritesContainer');
    favouritesContainer.innerHTML = ''; // Clear previous content

    if (favouriteMeals.length === 0) {
        // Display a message when there are no meals in favorites
        const noMealsMessage = document.createElement('p');
        noMealsMessage.textContent = 'No favorite meals yet!';
        noMealsMessage.classList.add('no-meals-message');

  // Add the image
  const image = document.createElement('img');
  image.src = 'pics/images.jfif'; // Replace with the correct path to your image
  image.alt = 'No favorite meals yet!';
  noMealsMessage.appendChild(image);


        favouritesContainer.appendChild(noMealsMessage);
    } else {
        favouriteMeals.forEach(mealData => {
            const { idMeal, details } = mealData;
            const favouriteItem = document.createElement('div');
            favouriteItem.classList.add('favourite-item');
            // Fetch details if not available
            if (!details) {
                fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
                    .then(response => response.json())
                    .then(data => {
                        const mealDetails = data.meals[0];
                        mealData.details = mealDetails;
                        favouriteItem.innerHTML = createFavouriteItemHTML(mealData);
                    });
            } else {
                favouriteItem.innerHTML = createFavouriteItemHTML(mealData);
            }

            favouritesContainer.appendChild(favouriteItem);
        });
    }
}


function createFavouriteItemHTML(mealData) {
    const { idMeal, details } = mealData;
    return `
    <div class="meal">
        <img src="${details.strMealThumb}" alt="${details.strMeal}">
        <div>
            <h3>${details.strMeal}</h3>
        </div>
        <button onclick="addRemoveToFavList(${idMeal})">
            Remove from Favourites
        </button>
    `;
}


// function to show the favorites section
function showFavouritesSection() {
    displayFavorites(); // Call the function to display favorite meals
    document.getElementById('favouritesSection').style.display = 'flex';
}

// function to close the favorites section
function closeFavourites() {
    document.getElementById('favouritesSection').style.display = 'none';
}


// event listener for the search input
search.addEventListener("keyup",searchMeal);


