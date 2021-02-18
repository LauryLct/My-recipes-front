<template>
  <div class='signin-form'>
    <h1>Sign In</h1>
    <form class="border m-3" @submit.prevent='signin'>
      <div class='m-5 pl-5 pr-5'>
        <div class='text-warning' v-if='error'> {{ error }} </div>

        <div class='form-group'>
          <label for='email'> Email address</label>
          <input type='email' class='form-control' v-model='email' id='email' placeholder='Enter your email'>
          <small id='emailHelp' class='form-text text-muted'>We'll never share your email with anyone else.</small>
        </div>
        <div class='form-group'>
          <label for='password'> Password</label>
          <input type='password' class='form-control' v-model='password' id='password' placeholder='Password'>
        </div>

        <button type='submit' class='btn btn-primary'> submit</button>
        <div class="p-3">
          <router-link class="text-secondary" to='/signup'>Sign Up</router-link>
        </div>

      </div>

    </form>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  created () {
    this.checkSignIn()
  },
  updated () {
    this.checkSignIn()
  },
  methods: {
    signin() {
      this.$http.plain.post('/signin', {email: this.email, passord: this.passord })
      .then(response => this.signinSuccesful(response))
      .catch(error => this.signinFailed(error))
    },
    signinSuccesful (response) {
      if (!response.data.csrf) {
        this.signinFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.replace('/recipes')
    },
    signinFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkSignIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/recipes')
      }
    }
  }
}
</script>

<style scoped>

</style>
