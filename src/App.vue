<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import Navbar from "./components/_partials/Navbar/Navbar.vue";
import Notification from "./components/_partials/Notification/Notification.vue";

import "./assets/css/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import { useSessionStore } from "./stores/session.js";
import { SendNotification } from "./assets/js/Helpers.js";

import $ from "jquery";
</script>

<script>
export default {
  data() {
    return {
      theme: this.getTheme(),
      SessionStore: useSessionStore(),
    };
  },
  methods: {
    Login(data) {
      console.log(data);
    },
    getTheme() {
      if (localStorage.getItem("Theme") == undefined) {
        localStorage.setItem("Theme", "Light");
      } else {
        localStorage.setItem("Theme", "Dark");
        this.theme = localStorage.getItem("Theme");
        if (this.theme == "Dark") {
          document.getElementById("app").classList.add("dark-theme");
        }
      }
    },
  },
  mounted() {
    $(document).ready(() => {
      if (this.SessionStore.Message != null) {
        SendNotification(this.SessionStore.ShowMessage(), 404);
      }
    });
  },
};
</script>


<template>
  <Notification />
  <Navbar />

  <RouterView />
</template>

<style>
</style>
