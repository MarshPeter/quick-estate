<template>
  <div>
    <HeaderNavbar :authenticated="authenticated"></HeaderNavbar>
    <main>
      <router-view :authenticated="this.authenticated" />
    </main>
  </div>
</template>

<script>
  import HeaderNavbar from './components/HeaderNavbar.vue';
  export default {
    name: "App",
    data() {
      return {
        authenticated: false,
      }
    },
    components: { HeaderNavbar }
  }
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
} */

</style>
