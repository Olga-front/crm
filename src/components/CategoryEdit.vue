<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Edit</h4>
      </div>

      <form v-on:submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select"
                  v-model="current">
            <option v-for="cat in categories"
                    v-bind:key="cat.id"
                    v-bind:value="cat.id">{{ cat.title }}</option>
          </select>
          <label>Select a category</label>
        </div>

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
                v-if="$v.limit.$error">Minimum value {{ $v.limit.$params.minValue.min }}</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Update
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
  props: ['categories'],
  data () {
    return {
      select: null,
      title: '',
      limit: 1,
      current: null
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
  created () {
    const { id, title, limit } = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },
  mounted () {
    M.updateTextFields()
    M.FormSelect.init(this.$refs.select)
  },
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        }
        await this.$store.dispatch('updateCategory', categoryData)
        this.$message('Category updated successfully')
        this.$emit('updated', categoryData)
      } catch (e) {}
    }
  },
  watch: {
    current (catId) {
      const { title, limit } = this.categories.find(c => c.id === catId)
      this.title = title
      this.limit = limit
    }
  }
}
</script>
