<template>
  <div>
    <h1> here </h1>
    <div class="add-recipe">
      <form action="" @submit.prevent="addRecipe">
        <input type="input"
               autofocus autocomplete="off"
               placeholder="type a recipe name"
               v-model='newRecipe.name'>
        <input type="submit" value="Add Recipe">
      </form>
    </div>

    <div class="recipe-list">
      <div class='row'>
        <div class="col col-lg-2 m-3 card align-middle"
             v-for="recipe in recipes"
             :key="recipe.id"
             :recipe="recipe">
          <div class='d-flex'
               style='height: 100px; justify-content: center; align-items: center'>
            <p>{{ recipe.name }}</p>
            </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  name: 'Recipe',
  data () {
    return {
      recipes: [],
      user: '',
      newRecipe: [],
      error: ''
    }
  },
  created () {
    this.recipesList()
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    recipesList () {
      this.$http.secured.get(`/api/v1/recipes`)
      .then(response => this.recipes = response.data)
      },
    addRecipe () {
      this.$http.secured.post(`/api/v1/recipes`, { recipe: { name: this.newRecipe.name } })
      .then(response => {
        this.recipes.push(response.data)
        this.newRecipe = ''
      })
      .catch(error => this.setError (error, 'cannot create recipe'))
    }
  }
}
</script>
<style scoped>
#card {
  width: 50rem;
  height: 50rem;
}
</style>
