<template>
  <div>
    <div class="page-title">
      <h3>Categories</h3>
    </div>
    <section>
      <loader v-if="loading"></loader>
      <div class="row" v-else>
        <category-create v-on:created="addNewCategory"></category-create>
        <category-edit v-if="categories.length"
                       v-bind:categories="categories"
                       v-bind:key="categories.length + updateCount"
                       v-on:updated="updateCategories"></category-edit>
        <p v-else class="center">No categories yet</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
  name: 'categories',
  data () {
    return {
      categories: [],
      loading: true,
      updateCount: 0
    }
  },
  components: {
    CategoryCreate,
    CategoryEdit
  },
  methods: {
    addNewCategory (category) {
      this.categories.push(category)
    },
    updateCategories (category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  }
}
</script>
