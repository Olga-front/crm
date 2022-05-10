<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Create</h4>
      </div>
      <form v-on:submit.prevent="submitHandler">
        <div class="input-field">
          <input id="name"
                 type="text"
                 v-model.trim="title"
                 v-bind:class="{invalid: $v.title.$error}" />
          <label for="name">Title</label>
          <span class="helper-text invalid"
                v-if="$v.title.$error">Enter the title</span>
        </div>

        <div class="input-field">
          <input id="limit"
                 type="number"
                 v-model.trim.number="limit"
                 v-bind:class="{invalid: $v.limit.$error}" />
          <label for="limit">Limit</label>
          <span class="helper-text invalid"
                v-if="$v.limit.$error">Минимальное значение {{ $v.limit.$params.minValue.min }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Create
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import M from 'materialize-css'

export default {
  data () {
    return {
      title: '',
      limit: 1
    }
  },
  validations: {
    title: {
      required
    },
    limit: {
      minValue: minValue(1)
    }
  },
  mounted () {
    M.updateTextFields()
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
        this.title = ''
        this.limit = 1
        this.$v.$reset()
        this.$message('Category has been created')
        this.$emit('created', category)
      } catch (e) {}
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
