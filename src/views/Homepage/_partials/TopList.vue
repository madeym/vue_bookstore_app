<script setup>
import HttpHandler from "../../../assets/js/HttpHandler.js";
import { CutString, BookRating } from "../../../assets/js/Helpers.js";
import { CompreFace } from "@exadel/compreface-js-sdk";
</script>
<script>
export default {
  data() {
    return {
      BookTop: [],
    };
  },
  methods: {
    async GetBookTopData() {
      const response = await HttpHandler.RequestGET(
        "http://localhost:8080/v1/book?Page=1&Limit=5&OrderName=Rating&OrderBy=DESC"
      );
      if (response.Status == 200) {
        this.BookTop = response.Data;
      }
    },
    GetRandomColor() {
      return "#000000".replace(/0/g, function () {
        return (~~(Math.random() * 16)).toString(16);
      });
    },
  },
  beforeMount() {
    this.GetBookTopData();
  },
};
</script>

<template>
  <div class="container container-top">
    <div class="d-flex gap-1">
      <div
        v-for="book in BookTop"
        :key="book.id"
        class="top-list-container col-5 d-flex position-relative"
      >
        <img :src="book.CoverImage" class="img-top ms-3 mt-3" alt="" />
        <div
          class="card-content d-flex position-absolute"
          :style="{ backgroundColor: GetRandomColor() }"
        >
          <div class="col-5 ms-2"></div>
          <div class="col-6 ms-2 mt-3 position-relative text-white">
            <h5>{{ book.Title }}</h5>
            <h6 class="">{{ book.Genre.Name }}</h6>
            <div class="d-flex align-items-center">
              <div v-html="BookRating(book.Rating, 25)"></div>
              <span class="ms-2">|</span>
              <span class="ms-2"
                >{{ Math.floor(Math.random() * 1000) }} votes</span
              >
            </div>
            <span class="d-inline-block mt-4">{{
              CutString(book.Description, 100)
            }}</span>
            <router-link :to="'/detail/' + book.ID">
              <button
                class="
                  btn btn-light
                  col-10
                  rounded-pill
                  position-absolute
                  bottom-0
                  start-50
                  translate-middle
                  d-flex
                  justify-content-center
                  align-items-center
                  gap-2
                "
              >
                <img
                  width="25"
                  src="https://img.icons8.com/ios/100/null/ophthalmology.png"
                />
                <span>Detail</span>
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>