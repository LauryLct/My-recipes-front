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
          <input type='password' class='form-control' v-model='passwordconfirmation' id='password-confirmation' placeholder='Password Confirmation'>
        </div>

        <button type='submit' class='btn btn-primary' v-on:click='passwordCheck'> submit</button>
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
      passwordconfirmation: '',
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
    passwordCheck() {
      if (this.password !== this.passwordconfirmation) {
        alert('Please, enter the same passeword !')
        return
      }
    }
  }
}
</script>

<style scoped>

</style>
