import recipes from "./recipes.js" // import de l'ensemble de la constante

const selectIngredients = document.getElementById("ingredients") // récupère la balise select (sans options)
const selectUstensils = document.getElementById("ustensils") // récupère le select avec id ustensils
const selectDevices = document.getElementById("devices")
const filter = document.querySelector(".filter-tag")
const containerArticleRecipes = document.querySelector(".container-article")

function main() {
  displayAllRecipes(recipes)
  displaySelectIngredients(recipes)
  displaySelectUstensils(recipes)
  displaySelectDevice(recipes)
  displayTag()
}

function displayAllRecipes(recipes) {
  const containerArticle = document.querySelector(".container-article")

  for (const recipe of recipes) {
    const tagArticle = document.createElement("article");
    containerArticle.appendChild(tagArticle)
    tagArticle.className = "article-recipe"

    const tagImg = document.createElement("img")
    tagArticle.appendChild(tagImg)
    tagImg.src = "../assets/picture-recipe.jpg"

    const tagContainer = document.createElement("div")
    tagArticle.appendChild(tagContainer)
    tagContainer.className = "container-text-title"

    const h2 = document.createElement("h2")
    tagContainer.appendChild(h2)
    h2.className = "title"
    h2.innerHTML = recipe.name

    const tagContainerTime = document.createElement("div")
    tagContainer.appendChild(tagContainerTime)
    tagContainerTime.className = "icon-time"

    const tagI = document.createElement("i")
    tagContainerTime.appendChild(tagI)
    tagI.className = "far fa-clock"

    const tagSpanTime = document.createElement("span")
    tagContainerTime.appendChild(tagSpanTime)
    tagSpanTime.className = "time"
    tagSpanTime.innerHTML = recipe.time + " min"

    const tagContainerInfos = document.createElement("div")
    tagArticle.appendChild(tagContainerInfos);
    tagContainerInfos.className = "container-ingredient-recipe"

    const tagIngredient = document.createElement("div")
    tagContainerInfos.appendChild(tagIngredient)
    tagIngredient.className = "ingredient"

    const recipeIngredients = recipe.ingredients
    for (const ingredient of recipeIngredients) {

      const containerIngredient = document.createElement("div")
      tagIngredient.appendChild(containerIngredient)
      containerIngredient.className = "container-ingredient"
      const aliment = document.createElement("span");
      containerIngredient.appendChild(aliment)
      aliment.className = "aliment"

      aliment.innerHTML = ingredient.ingredient
      const quantity = document.createElement("span")
      containerIngredient.appendChild(quantity)
      quantity.className = "quantity"

      if (!ingredient.quantity) {
        quantity.innerHTML = ""
      } else {
        quantity.innerHTML = " : " + `${ingredient.quantity}`
      }

      const unit = document.createElement("span")
      containerIngredient.appendChild(unit)
      unit.className = "unit"

      if (!ingredient.unit) {
        unit.innerHTML = ""
      } else {
        unit.innerHTML = ingredient.unit
      }
    }

    const tagRecipe = document.createElement("div")
    tagContainerInfos.appendChild(tagRecipe)
    tagRecipe.className = "infos-recipe"
    tagRecipe.innerHTML = recipe.description
  }
}

function displaySelectIngredients(recipes) {
  const ingredientArray = [] //défini tableau d'ingrédients vide
  let arrayIngredientFinish = [] //défini tableau final vide


  // boucle sur les recettes
  for (const recipe of recipes) {
    const ingredientsElement = recipe.ingredients //récupère des tableaux avec tous les éléments d'une recette

    //boucle sur chaque ingrédients des tableaux
    for (const ingredient of ingredientsElement) {
      const ingredientsAll = ingredient.ingredient //récupère tous les ingrédients individuellement
      ingredientArray.push(ingredientsAll.toLowerCase()) //insère dans tableau ingredientArray chaque ingrédient, en minuscule
      const uniqueSet = new Set(ingredientArray) // utilisation de l'objet Set qui ne stocke que des valeurs uniques
      arrayIngredientFinish = Array.from(uniqueSet)// conversion de uniqueSet en tableau

      // filterArray = ingredientArray.filter((ingredient, index) => ingredientArray.indexOf(ingredient) !== index)
    }
  }
  //boucle sur chaque élément du tableau trié pour créer les balises option et insérer les éléments
  for (const element of arrayIngredientFinish) {
    const tagOptionIngredient = document.createElement("option") //créé une balise option pour chaque ingrédient
    selectIngredients.appendChild(tagOptionIngredient)
    tagOptionIngredient.value = element
    tagOptionIngredient.innerHTML = element
  }
}




main()
