<template>
  <ul class="sidenav app-sidenav"
      v-bind:class="{ open: value }">
    <router-link tag="li"
                 active-class="active"
                 v-bind:to="link.url"
                 v-for="link in links"
                 v-bind:key="link.url"
                 v-bind:exact="link.exact">
      <a href="#" class="pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
      links: [
        {
          title: 'Account',
          url: '/',
          exact: true
        },
        {
          title: 'History',
          url: '/history'
        },
        {
          title: 'New record',
          url: '/record'
        },
        {
          title: 'Categories',
          url: '/categories'
        }
      ]
    }
  }
}
</script>
