<template>
  <div>
    <div class="page-title">
      <h3>New record</h3>
    </div>

    <loader v-if="loading"></loader>

    <p class="center" v-else-if="!categories.length">No categories yet. <router-link to="/categories">Add new category</router-link></p>

    <form class="form" v-else v-on:submit.prevent="submitHandler">
      <div class="input-field" >
        <select ref="select"
                v-model="category">
          <option v-for="cat in categories"
                  v-bind:key="cat.id"
                  v-bind:value="cat.id">{{ cat.title }}</option>
        </select>
        <label>Select a category</label>
      </div>

      <div class="category-types">

        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type" />
          <span>Income</span>
        </label>

        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type" />
          <span>Expenses</span>
        </label>

      </div>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.trim.number="amount"
            v-bind:class="{invalid: $v.amount.$error}" >
        <label for="amount">Amount</label>
        <span class="helper-text invalid"
              v-if="$v.amount.$error">Enter amount > 0</span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model.trim="description"
            v-bind:class="{invalid: $v.description.$error}"
        >
        <label for="description">Description</label>
        <span
              class="helper-text invalid"
              v-if="$v.description.$error">Enter a description</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Create
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import M from 'materialize-css'
import { required, minValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  name: 'record',
  data () {
    return {
      loading: true,
      categories: [],
      category: null,
      type: 'outcome',
      amount: 1,
      description: ''
    }
  },
  validations: {
    amount: {
      required,
      minValue: minValue(1)
    },
    description: {
      required
    }
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    if (this.categories.length) {
      this.category = this.categories[0].id
    }
    setTimeout(() => {
      M.updateTextFields()
      M.FormSelect.init(this.$refs.select)
    }, 0)
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord () {
      if (this.type === 'income') {
        return true
      }

      return this.info.bill >= this.amount
    }
  },
  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })
          console.log('this.info')
          console.log(this.info)
          const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount
          console.log('bill')
          console.log(bill)
          await this.$store.dispatch('updateInfo', { bill })
          this.$message('Entry created successfully')
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (e) {}
      } else {
        this.$message(`insufficient funds in the account (${this.amount - this.info.bill})`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .category-types {
    display: grid;
    grid-template-columns: min-content min-content;
    grid-gap: 10px;
    padding-bottom: 20px;
  }
</style>
