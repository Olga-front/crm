<template>
  <div>
    <div class="page-title">
      <h3>Recording history</h3>
    </div>

    <section>
      <loader v-if="loading"></loader>
      <table v-else>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Category</th>
            <th>Type</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(el, ind) in records"
              v-bind:key="el.id">
            <td>{{ ind + 1 }}</td>
            <td>{{ el.description }}</td>
            <td>{{ el.amount }}</td>
            <td>{{ formatDate(el.date) }}</td>
            <td>{{ getCategory(el.categoryId) }}</td>
            <td>
              <span v-bind:class="recordTypeClass(el.type)"
                    data-badge-caption="">
                {{ el.type }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      records: [],
      categories: [],
      loading: true
    }
  },
  methods: {
    formatDate (date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
    getCategory (categoryId) {
      return this.categories.filter(el => el.id === categoryId)[0].title
    },
    recordTypeClass (type) {
      return [
        'badge new',
        {
          red: type === 'outcome',
          green: type === 'income'
        }
      ]
    }
  },
  async mounted () {
    this.records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  }
}
</script>
