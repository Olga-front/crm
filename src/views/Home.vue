<template>
  <div>
    <div class="page-title">
      <h3>Account</h3>

      <button class="btn waves-effect waves-light btn-small"
              v-on:click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>
    <loader v-if="loading"></loader>
    <div v-else class="row">
      <home-bill v-bind:rates="currency.rates"></home-bill>
      <home-currency v-bind:rates="currency.rates"
                     v-bind:date="currency.date"></home-currency>
    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'

export default {
  name: 'Home',
  data () {
    return {
      loading: true,
      currency: null
    }
  },
  async mounted () {
    try {
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    } catch (e) {}
  },
  components: {
    HomeBill,
    HomeCurrency
  },
  methods: {
    async refresh () {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    }
  }
}
</script>
