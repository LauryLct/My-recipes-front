<template>
  <div class='signup-form'>
    <h1>Sign up</h1>
    <form class="border m-3" @submit.prevent='signup'>
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
        <div class='form-group'>
          <label for='password'> Password confirmation</label>
          <input type='password' class='form-control' v-model='password_confirmation' id='password-confirmation' placeholder='Password Confirmation'>
        </div>

        <button type='submit' class='btn btn-primary'> submit</button>
        <div class="p-3">
          <router-link class="text-secondary" to='/'>Sign in</router-link>
        </div>

      </div>

    </form>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      password: '',
      password_confirmation: '',
      error: ''
    }
  },
  created () {
    this.checkedSignedIn()
  },
  updated () {
    this.checkedSignedIn()
  },
  methods: {
    signup () {
      this.$http.plain.post('/signup', { email: this.email, password: this.password, password_confirmation: this.password_confirmation })
      .then(response => this.signupSuccessful(response))
      .catch(error => this.signupFailed(error))
    },
    signupSuccessful (response) {
      if (!response.data.csrf) {
        this.signupFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.replace('/recipes')
    },
    signupFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || 'Something went wrong'
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkedSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/recipes')
      }
    }
  }
}
</script>
