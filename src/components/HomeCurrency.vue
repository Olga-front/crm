<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">Exchange Rates</span>
        </div>
        <table>
          <thead>
          <tr>
            <th>Currency</th>
            <th>Rate</th>
            <th>Date</th>
          </tr>
          </thead>

          <tbody>
          <tr v-for="cur of currencies"
              v-bind:key="cur">
            <td>{{ cur }}</td>
            <td>{{ rates[cur].toFixed(2) }}</td>
            <td>{{ formatDate(date) }}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates', 'date'],
  data () {
    return {
      currencies: ['PLN', 'USD', 'EUR']
    }
  },
  methods: {
    formatDate (date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  }
}
</script>
