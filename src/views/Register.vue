<template>
  <div>
    <form class="card auth-card" v-on:submit.prevent="submitHandler">
      <div class="card-content">
        <span class="card-title">Домашняя бухгалтерия</span>
        <div class="input-field">
          <input id="email"
                 type="text"
                 v-model.trim="email"
                 v-bind:class="{invalid: $v.email.$error}" />
          <label for="email">Email</label>
          <small class="helper-text invalid"
                v-if="$v.email.$error">Type email</small>
        </div>
        <div class="input-field">
          <input id="password"
                 type="password"
                 v-model.trim="password"
                 v-bind:class="{invalid: $v.password.$error}" />
          <label for="password">Пароль</label>
          <small class="helper-text invalid"
                v-if="$v.password.$error">Type password</small>
        </div>
        <div class="input-field">
          <input id="name"
                 type="text"
                 v-model.trim="name"
                 v-bind:class="{invalid: $v.name.$error}" />
          <label for="name">Имя</label>
          <small class="helper-text invalid"
                 v-if="$v.name.$error">Type name</small>
        </div>
        <p>
          <label>
            <input type="checkbox"
                   v-model="agree" />
            <span>С правилами согласен</span>
          </label>
        </p>
      </div>
      <div class="card-action">
        <div>
          <button
            class="btn waves-effect waves-light auth-submit"
            type="submit">
            Зарегистрироваться
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          Уже есть аккаунт?
          <router-link to="/login">Войти!</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'register',
  data () {
    return {
      email: '',
      password: '',
      name: '',
      agree: false
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
    },
    name: {
      required,
      minLength: minLength(3)
    },
    agree: {
      checked: v => v
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
        password: this.password,
        name: this.name
      }
      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (e) {}
    }
  }
}
</script>

<style lang="scss" scoped></style>
