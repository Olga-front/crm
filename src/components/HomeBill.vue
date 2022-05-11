<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Currency account</span>
        <p class="currency-line"
           v-for="cur in currencies"
           v-bind:key="cur">
          <span>
            {{ getCurrency(cur) | currency(cur) }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates'],
  data () {
    return {
      currencies: ['PLN', 'USD', 'EUR']
    }
  },
  computed: {
    base () {
      return this.$store.getters.info.bill / (this.rates.PLN / this.rates.EUR)
    }
  },
  methods: {
    getCurrency (currency) {
      return Math.floor(this.base * this.rates[currency])
    }
  }
}
</script>
