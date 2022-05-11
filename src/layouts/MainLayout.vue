<template>
  <div>
    <loader v-if="loading"></loader>
    <div v-else class="app-main-layout">
      <navbar v-on:click="click" />
      <sidebar v-model="isOpen" />
      <main class="app-content"
            v-bind:class="{full: !isOpen}">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar.vue'
import Sidebar from '@/components/app/Sidebar.vue'

export default {
  components: { Navbar, Sidebar },
  name: 'main-layout',
  data () {
    return {
      isOpen: true,
      loading: true
    }
  },
  async mounted () {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }

    this.loading = false
  },
  methods: {
    click () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style lang="scss" scoped></style>
