<script setup>
import Login from "./_partials/Login.vue";
import ThemeSwitcher from "./_partials/ThemeSwitcher.vue";
import { useUserDataStore } from "@/stores/user";
</script>

<script>
export default {
  data() {
    return {
      UserDataStore: useUserDataStore(),
      SearchKeyword: "",
    };
  },
  methods: {
    Logout() {
      localStorage.removeItem("UserData");
    },
  },
};
</script>


<template>
  <login />

  <nav
    class="
      position-fixed
      mt-0
      col-12
      d-flex
      align-items-center
      py-4
      px-4
      justify-content-between
    "
  >
    <div class="nav-left d-flex align-items-center gap-3 col-3">
      <router-link
        to="/"
        class="text-decoration-none text-dark d-flex align-items-center mt-2"
      >
        <h4>read<strong>books</strong></h4>
      </router-link>
    </div>

    <div class="d-flex gap-2 align-items-center">
      <div
        v-if="UserDataStore.UserData == undefined"
        data-bs-toggle="modal"
        data-bs-target="#LoginModal"
      >
        <button class="btn btn-light">Masuk</button>
      </div>
      <div v-else>
        <span class="">{{ JSON.parse(UserDataStore.UserData).Data.Name }}</span>
        <img
          width="60"
          src="https://img.icons8.com/fluency/48/null/user-male-circle.png"
          class="btn dropdown-toggle border-0"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        />
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <router-link to="/profile" class="dropdown-item"
              >Profile</router-link
            >
          </li>
          <li>
            <a
              class="dropdown-item"
              href=""
              data-toggle="modal"
              data-target="#staticBackdrop"
              >Change Password</a
            >
          </li>
          <li><a class="dropdown-item" href="" @click="Logout">Logout</a></li>
        </ul>
      </div>
      <ThemeSwitcher />
    </div>
  </nav>
</template>
