<template>
  <form class="card auth-card" v-on:submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Home bookkeeping</span>
      <div class="input-field">
        <input id="email"
               type="text"
               v-model.trim="email"
               v-bind:class="{invalid: $v.email.$error}" />
        <label for="email">Email</label>
        <small class="helper-text invalid"
               v-if="$v.email.$error">Email</small>
      </div>
      <div class="input-field">
        <input id="password"
               type="password"
               v-model.trim="password"
               v-bind:class="{invalid: $v.password.$error}" />
        <label for="password">Password</label>
        <small class="helper-text invalid"
               v-if="$v.password.$error">Password</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Login
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Don't have an account?
        <router-link to="/register">Register</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'
import messages from '@/utils/messages'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  validations: {
    email: {
      email,
      required
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {}
    }
  },
  mounted () {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  }
}
</script>

<style lang="scss" scoped></style>
