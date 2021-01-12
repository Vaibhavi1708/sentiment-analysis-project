<template>
  <div id="app" class="mt-0">
    <b-navbar toggleable="lg" type="primary" variant="light">
      <b-navbar-brand href="#">Shopping</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Mobiles</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav>
            <b-nav-item v-if="!isLoggedIn">
              <router-link to="/login"> Login</router-link></b-nav-item
            >
          </b-navbar-nav>
          <b-navbar-nav>
            <b-nav-item v-if="!isLoggedIn">
              <router-link to="/register"> Register</router-link></b-nav-item
            >
          </b-navbar-nav>
          <b-navbar-nav>
            <b-nav-item v-if="isLoggedIn">
              <a href="#" v-on:click="setLogout">Logout</a>
            </b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
import router from "./router";
import axios from "axios";

export default {
  name: "App",
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    }
  },

  methods: {
    setLogout: function(event) {
      event.preventDefault();
      axios
        .get("/api/auth/logout")
        .then(() => {
          console.log("Logout successful");
          this.$store.dispatch("logout");

          router.push("/login");
        })
        .catch(error => {
          console.log(error);
          alert("problem in logout");
        });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
