<script setup>
import { LoadingBtn, SendNotification } from "../../../assets/js/Helpers.js";
import HttpHandler from "../../../assets/js/HttpHandler.js";
import { LoadingContent } from "../../../assets/js/Helpers.js";
import { CutString } from "../../../assets/js/Helpers.js";
</script>

<script>
export default {
  data() {
    return {
      GenreListData: {},
      GenreSelected: "",
      BookListData: [],
      globalTimeout: null,
    };
  },
  methods: {
    async GetGenreListData() {
      const response = await HttpHandler.RequestGET("/api/v1/genre");
      if (response.Status == 200) {
        this.GenreListData = response.Data;
      }
    },
    async GetBookListData(genreName = "") {
      const response = await HttpHandler.RequestGET(
        "/api/v1/book?KeywordName=Genre.name&Keyword=" + genreName
      );
      if (response.Status == 200) {
        this.BookListData = response.Data;
      }
    },
    ChangeGenreSelected(name) {
      if (this.GenreSelected != name) {
        this.GenreSelected = name;
        this.GetBookListData(name);
      }
    },
    RatingBook(rating) {
      let ratingHTML = "";
      for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
          ratingHTML =
            ratingHTML +
            "<img width='25' src='https://img.icons8.com/fluency/48/null/star.png'/>";
        } else {
          ratingHTML =
            ratingHTML +
            "<img width='25' src='https://img.icons8.com/color/48/null/star--v1.png'/>";
        }
      }
      return ratingHTML;
    },
    SearchBook(event) {
      LoadingContent(document.querySelector(".main-content-container"));

      if (this.globalTimeout != null) {
        clearTimeout(this.globalTimeout);
      }
      this.globalTimeout = setTimeout(async () => {
        this.globalTimeout = null;
        const r = await HttpHandler.RequestGET(
          "/api/v1/book?KeywordName=title&Keyword=" + event.target.value
        );
        if (r.Status == 200) {
          this.BookListData = r.Data;
          this.GenreSelected = event.target.value == "" ? "" : "search";
        } else {
          SendNotification(r.Message, r.Status);
        }
        LoadingContent(document.querySelector(".main-content-container"), true);
      }, 1000);
    },
  },
  beforeMount() {
    this.GetGenreListData();
    this.GetBookListData();
  },
};
</script>

<template>
  <div class="container mt-4">
    <div class="header">
      <div className="d-flex gap-4">
        <span
          class="btn rounded-pill"
          :class="{ 'btn-primary': GenreSelected == '' }"
          @click="ChangeGenreSelected('')"
          >Semua</span
        >
        <span
          v-for="genre in GenreListData"
          :key="genre.ID"
          class="btn rounded-pill"
          :class="{ 'btn-primary': GenreSelected == genre.Name }"
          @click="ChangeGenreSelected(genre.Name)"
        >
          {{ genre.Name }}
        </span>
        <div class="nav-search">
          <div class="input-icon d-flex align-items-center rounded-pill p-2">
            <img
              width="20"
              height="20"
              class="pl-1"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAC3ElEQVRoge2ZvWtTURjGf3WoEYMgIppBC23BQicXwcF8GLq4OraWglAU+j9YdPBjd9dBEDeTkLbgoi62ilutbn4sSuwgFTWJGIeTlPCek3tzbt6bWMwPDvSk3Od5nxzu+QoMGRILIz0+nwIuABlgGhgDDjX/9w34AGwCT4Ey8LlHP3WyQAn4DTS6bHWgCKQHUK/FJLBK98V3amVgos+17zIPfA8p0KftAHN9TQBcDyjoDXATyAOngIPNNtX87BawFfD8cr9C3OhQwDqQ89A5CzzvoBV7mHmHaRVYJNqMNwJcaWpI3VmFep1MYr8TX4FzCtppYFto7wDjCtoWcnaqohOiRQaoCY+Soj5g1gk59IvaJsBVh4/ml0VJiL+g912AixFgQ3gVtMRTmFW4XTyjJe4gJ7zqwDEN4ctCeFNDNIS3wnPBV2Cf4zP57asNdQCPRT/rK+AKMi36T3xFIyA9ZA2huIKMif4nX9EIfAypIRJy1U1qiIaQFJ6/fAVcIyKJY9qVyDrqvQqA2Sq0k/IVjYD0qPgKuIK8F/0TvqIROCn6X3wFXEHkujHjKxoB6fFaQ1QuiFsaoiG8E54XNUSPY29RvBcoD/LCqwoc0RIvCvF14ts0vhJe9zUN0kK8gTnZabPk8DmtbVIWBjV076Ry2AerB4r6u0xg1pR2o210tvRZ7KNuBTiqoO1kDnvoa5iTXdTLhyXskWgAz4DR3kvuzLLDtAG8BM576OSxX2zZykBCq3AXncI0MIei25hFbQqzAUw2/54B7mCvE0GtQMwjM4v9zsTVisD+OMOMY19M+LY/wCNgbdBhwFzZFLB3AEHtJ/AQONPUSAArIc+U+hEGzG3HAnAP8/JXMFuMH5iT5QZwF7gEHHY8/0+F6ZVR7C2RbCvEPJtp0U2YVYZh+s9/F2YNODCoAn3oZjbr+++PUQkamWsDrCsSrjB7LkSL9jB7NkSLBDH+WDpkSAB/AT5+sT1GQO1MAAAAAElFTkSuQmCC"
            />
            <input
              type="text"
              placeholder="Search"
              class="input-search-nav"
              @keyup="SearchBook($event)"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      class="
        container
        main-content-container
        position-relative
        mt-4
        gap-2
        d-flex
      "
    >
      <div
        v-for="book in BookListData"
        :key="book.ID"
        class="main-list-container mb-4 p-0 d-flex position-relative"
      >
        <div class="list-view-detail-hover">
          <router-link :to="'/detail/' + book.ID" class="text-decoration-none">
            <button
              class="
                gap-2
                d-flex
                align-items-center
                rounded-pill
                btn btn-light
                px-4
              "
            >
              <img
                width="25"
                src="https://img.icons8.com/ios/100/null/ophthalmology.png"
              />

              Detail
            </button></router-link
          >
        </div>
        <div class="left">
          <img :src="book.CoverImage" class="img-main-content" alt="" />
        </div>
        <div class="right ms-3 mt-2 d-grid px-2">
          <h5>{{ CutString(book.Title, 15) }}</h5>
          <h6 class="">{{ book.Genre.Name }}</h6>
          <div class="d-grid align-items-center">
            <span class="d-block" v-html="RatingBook(book.Rating)"> </span>
            <span class="">{{ Math.floor(Math.random() * 1000) }} votes</span>
          </div>
          <span class="d-inline-block mt-1">{{
            CutString(book.Description, 60)
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-view-detail-hover {
  background-color: cyan;
  height: 100%;
  width: 100%;
  background-color: cyan;
  position: absolute;
  height: 100%;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;
  opacity: 0;
}

.list-view-detail-hover:hover {
  opacity: 1;
}
</style>