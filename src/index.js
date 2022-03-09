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
  displayRecipesBySearchInput()
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


function displaySelectUstensils(recipes) {
  const ustensilArray = [] //défini tableau d'ustensils vide
  let arrayUstensilFinish = [] //défini tableau final vide

  //boucle sur chaque recette pour récupérer tous les ustensils
  for (const recipe of recipes) {
    const ustensilsElement = recipe.ustensils
    //pour chaque ustenstil = création nouveau tableau sans doublon
    for (const ustensils of ustensilsElement) {
      ustensilArray.push(ustensils.toLowerCase()) // remplissage du tableau avec chaque ustensils : nom en minuscule
      const uniqueSet = new Set(ustensilArray) // utilisation de l'objet Set qui ne stocke que des valeurs uniques
      arrayUstensilFinish = Array.from(uniqueSet) // conversion de uniqueSet en tableau
    }
  }
  //pour chaque élément du nouveau tableau sans doublon : création balise option + ajout valeur
  for (const ustensil of arrayUstensilFinish) {
    const tagOptionUstensils = document.createElement("option")
    selectUstensils.appendChild(tagOptionUstensils)
    tagOptionUstensils.innerHTML = ustensil
    tagOptionUstensils.value = ustensil
  }
}

function displaySelectDevice(recipes) {
  const deviceArray = []
  let arrayDeviceFinish = [];

  for (const recipe of recipes) {
    const deviceElement = recipe.appliance // string

    deviceArray.push(deviceElement.toLowerCase())
    const uniqueSet = new Set(deviceArray)
    arrayDeviceFinish = Array.from(uniqueSet)
  }

  for (const device of arrayDeviceFinish) {
    const tagOptionDevice = document.createElement("option")
    selectDevices.appendChild(tagOptionDevice)
    tagOptionDevice.innerHTML = device
    tagOptionDevice.value = device
  }
}

let tagSelect = []

/*
Fonction qui gère la construction des éléments des tags et leur affichage dans le dom
*/
function displayTag() {
  const selectAll = [selectIngredients, selectDevices, selectUstensils]

  const divTag = document.createElement("div");
  filter.prepend(divTag)
  divTag.className = "tag"

  for (const select of selectAll) {
    select.addEventListener("change", e => {
      let divTagSpanImg = document.createElement('div');
      divTag.appendChild(divTagSpanImg)
      let spanTag = document.createElement('span')
      divTagSpanImg.appendChild(spanTag)
      spanTag.innerHTML = e.target.value
      let imgTag = document.createElement('img');
      divTagSpanImg.appendChild(imgTag)
      imgTag.src = "../assets/close-tag.png"
      imgTag.id = e.target.value //donne comme id à l'img le nom du tag
      imgTag.className = "close-tag"

      if (select.id === 'ingredients') {
        divTagSpanImg.className = 'tag-ingredients'
        divTagSpanImg.id = e.target.value
      } else if (select.id === 'devices') {
        divTagSpanImg.className = 'tag-device'
        divTagSpanImg.id = e.target.value
      } else if (select.id === 'ustensils') {
        divTagSpanImg.className = 'tag-ustensils'
        divTagSpanImg.id = e.target.value
      }
      tagSelect.push(e.target.value) //tableau contient tous les tags selectionnés

      sortRecipesByTag(recipes) //appel de la fonction qui trie par tag avec en paramètre le tableau des tags sélectionnés

      closeTag()
    })
  }

}

/*
Fonction qui trie les recettes par tag + gère l'affichage des éléments restant dans les selects en fonction des tags choisis
*/
function sortRecipesByTag(recipes) {
  let allRecipes = []
  let filterDevice = ""
  let filterIngredient = ""
  let filterUstensil = ""
  const tagsUstensils = document.querySelectorAll(".tag-ustensils")
  const tagsDevices = document.querySelectorAll(".tag-device")
  const tagsIngredients = document.querySelectorAll(".tag-ingredients")

  /*
  filter sur tableau des recettes avec every pour cibler chaque tag. 
  Boucle sur toutes les balises tagustensils
  Défini par défaut fitlerustensil sur false
  Boucle sur tous les ustensils des recettes
  Si l'un des ustensils des recettes incluent le tag ET que l'id de la balise tagustensil (id = intitulé du tag) est égale à l'un des ustensils qu'on trouve dans les recettes -> on passe filterUstensil à true
  Idem pour chacun des 3 selects, on retourne les résultats (true / false) = les recettes filtrées --> allRecipes
  */
  allRecipes = recipes.filter(recipe =>
    tagSelect.every(tag => {
      filterUstensil = false
      for (const itemUstensil of recipe.ustensils) {
        const ustensil = itemUstensil.toLowerCase()
        for (const tagUstensil of tagsUstensils) {
          if (ustensil.includes(tag.toLowerCase()) && tagUstensil.id === ustensil) {
            filterUstensil = true
          }
        }
      }

      filterIngredient = false
      for (const itemIngredient of recipe.ingredients) {
        const ingredient = itemIngredient.ingredient.toLowerCase()
        for (const tagIngredient of tagsIngredients) {
          if (ingredient.includes(tag.toLowerCase()) && tagIngredient.id === ingredient) {
            filterIngredient = true
          }
        }
      }

      filterDevice = false
      for (const tagDevice of tagsDevices) {
        if (recipe.appliance.toLowerCase().includes(tag) && tagDevice.id === recipe.appliance.toLowerCase()) {
          return true
        }
      }
      return filterDevice || filterUstensil || filterIngredient
    })
  )

  containerArticleRecipes.innerHTML = ""
  displayAllRecipes(allRecipes)

  selectDevices.innerHTML = ""
  const optionDevice = document.createElement("option")
  optionDevice.innerHTML = "Appareils"
  selectDevices.prepend(optionDevice)
  displaySelectDevice(allRecipes)

  selectIngredients.innerHTML = ""
  const optionIngredient = document.createElement("option")
  selectIngredients.prepend(optionIngredient)
  optionIngredient.innerHTML = "Ingredients"
  displaySelectIngredients(allRecipes)

  selectUstensils.innerHTML = ""
  const optionUstensil = document.createElement("option")
  selectUstensils.prepend(optionUstensil)
  optionUstensil.innerHTML = "Ustensiles"
  displaySelectUstensils(allRecipes)

}

/*
Fonction pour fermer un tag au click sur la croix
Tri à nouveau les recettes affichées + l'affichage des éléments des selects par rapport aux recettes restantes
*/

function closeTag() {
  const close = document.getElementsByClassName("close-tag")

  for (const item of close) {
    item.addEventListener("click", () => {
      const tagsIngredients = document.querySelectorAll(".tag-ingredients")
      const tagsUstensils = document.querySelectorAll(".tag-ustensils")
      const tagsDevices = document.querySelectorAll(".tag-device")

      for (const tagIngredient of tagsIngredients) {
        if (item.id === tagIngredient.id) { //si l'id de l'élément cliqué est le même que l'id de la croix cliqué -> on retire du dom la balise
          tagIngredient.remove()
          let index = tagSelect.indexOf(tagIngredient.id) //dans le tableau récupération de l'index de l'élément cliqué
          tagSelect.splice(index, 1) //suppression de cet élément par son index
        }
      }

      for (const tagDevice of tagsDevices) {
        if (item.id === tagDevice.id) {
          tagDevice.remove()
          let index = tagSelect.indexOf(tagDevice.id) //dans le tableau récupération de l'index de l'élément cliqué
          tagSelect.splice(index, 1) //suppression de cet élément par son index
        }
      }
      for (const tagUstensil of tagsUstensils) {
        if (item.id === tagUstensil.id) {
          tagUstensil.remove()
          let index = tagSelect.indexOf(tagUstensil.id) //dans le tableau récupération de l'index de l'élément cliqué
          tagSelect.splice(index, 1) //suppression de cet élément par son index
        }
      }

      //si plus de tag = rappel de toutes les fonctions avec en paramètre le tableau de recettes d'origine
      if (tagSelect.length === 0) {
        displaySelectDevice(recipes)
        displaySelectIngredients(recipes)
        displaySelectUstensils(recipes)
        displayAllRecipes(recipes)
      } else { // sinon appel fonction tri par tag avec tableau des nouveaux tags
        sortRecipesByTag(recipes)
      }

    })
  }
}

function displayRecipesBySearchInput() {
  const searchBar = document.querySelector(".search")
  const selectUstensils = document.getElementById("ustensils");
  const selectDevices = document.getElementById("devices");
  const selectIngredients = document.getElementById("ingredients")
  let filterRecipes = []

  searchBar.addEventListener("input", e => {
    const valueInput = e.target.value.toLowerCase() //récupération de la valeur de l'input

    if (valueInput.length > 2) {

      containerArticleRecipes.innerHTML = "" //vide le dom des recettes
      filterRecipes = recipes.filter(recipe => {
        let filterIngredient = false
        for (const item of recipe.ingredients) {
          const ingredient = item.ingredient.toLowerCase();
          if (ingredient.includes(valueInput)) {
            filterIngredient = true
          }
        }
        return recipe.name.toLowerCase().includes(valueInput) ||
          recipe.description.toLowerCase().includes(valueInput) || filterIngredient
      })
      displayAllRecipes(filterRecipes) // appelle à nouveau la fonction pour afficher les recettes avec en paramètre le nouveau tableau trié

      selectUstensils.innerHTML = "" //vide le select ustenstils
      const optionUstenstils = document.createElement('option')
      selectUstensils.appendChild(optionUstenstils)
      optionUstenstils.innerHTML = "Ustensiles"
      displaySelectUstensils(filterRecipes) //rappelle la fonction avec en paramètres le nouveau tableau filtré

      selectDevices.innerHTML = ""  //vide le select devices
      const optionDevices = document.createElement('option')
      selectDevices.appendChild(optionDevices)
      optionDevices.innerHTML = "Appareils"
      displaySelectDevice(filterRecipes) //rappelle la fonction avec en paramètres le nouveau tableau filtré

      selectIngredients.innerHTML = ""  //vide le select ingredients
      const optionIngredients = document.createElement('option')
      selectIngredients.appendChild(optionIngredients)
      optionIngredients.innerHTML = "Ingredients"
      displaySelectIngredients(filterRecipes) //rappelle la fonction avec en paramètres le nouveau tableau filtré


      /*
      recherche sur barre de recherche d'abord puis avec les tags
      Ecouteur sur les balises select + au change appel de la fonction tri
      */
      const selectAll = [selectIngredients, selectDevices, selectUstensils]
      for (const select of selectAll) {
        select.addEventListener('change', () => {
          sortRecipesByTag(filterRecipes)
        })
      }

      /*
      recherche sur tags d'abord puis sur barre de recherche
      */
      sortRecipesByTag(filterRecipes)

      if (filterRecipes.length === 0) {
        containerArticleRecipes.innerHTML = 'Aucune recette ne correspond à votre critère... vous pouvez chercher "tarte aux pommes", "poisson", etc.'
      }


    } else {
      displayAllRecipes(recipes)
      console.log("il n'y a pas 3 lettres")
    }
  })
}

main()
