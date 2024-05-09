<template>
    <header>
        <nav class="navbar sticky-top navbar-expand-lg" style="background-color: #e3f2fd;">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">QuickEstate</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li v-for="link in headerLinks" v-bind:key="link.name">
                        <router-link class="nav-link" :to="{ path:link.route }">{{ link.name }}</router-link>
                    </li>
                    <!-- <li class="nav-item">
                        <router-link class="nav-link" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/about">About</router-link>
                    </li> -->
                    <button v-if="this.authenticated" class="nav-link" @click="logout">Logout</button>
                </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    name: "HeaderNavbar",
    data() {
        return {
            userSet: false,
            routes: [
                {
                    route: '/',
                    name: "Home",
                    whenAuthenticated: true,
                    whenNotAuthenticated: true,
                },
                {
                    route: "/login",
                    name: "Login",
                    whenAuthenticated: false,
                    whenNotAuthenticated: true,
                }
            ],
            authenticated: localStorage.getItem('user_id'),
        }
    },
    computed: {
        headerLinks() {
            return this.routes.filter(route => (!this.authenticated && route.whenNotAuthenticated) || (this.authenticated && route.whenAuthenticated));
        }
    },
    methods: {
        logout() {
            localStorage.removeItem("user_id");
            this.authenticated = null;
        }
    }
}
</script>

<style>
nav a.router-link-exact-active {
  color: #42b983;
}
</style>