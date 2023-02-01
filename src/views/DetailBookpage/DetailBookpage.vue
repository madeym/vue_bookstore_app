<script setup>
import HttpHandler from "../../assets/js/HttpHandler.js";
import { useSessionStore } from "../../stores/session.js";
import { BookRating } from "../../assets/js/Helpers.js";

import Review from "./_partials/Review.vue";
</script>

<script>
export default {
  data() {
    return {
      BookDetail: {},
      SessionStore: useSessionStore(),
    };
  },
  methods: {
    async GetBookDetailData() {
      const r = await HttpHandler.RequestGET(
        "/api/v1/book/" + this.$route.params.id
      );
      if (r.Status == 200) {
        this.BookDetail = r.Data;
      } else {
        this.$router.go(-1);
        this.SessionStore.SetMessage(r.Message);
      }
    },
    GetDiscountPrice(price, discount) {
      var regex = /\d*\.?\d?/g;
      return regex.exec(price - (price * discount) / 100)[0];
    },
  },
  created() {
    this.GetBookDetailData();
  },
};
</script>

<template>
  <div v-if="BookDetail != {}" class="wrapper container">
    <div class="detail-container container d-flex justify-content-between">
      <div class="left col-auto d-flex flex-column me-4">
        <img
          :src="BookDetail.CoverImage"
          class="img-top mt-3 border-0"
          alt=""
        />
        <button
          :disabled="BookDetail.Quantity == 0"
          class="
            btn
            rounded-pill
            btn-primary
            d-flex
            align-items-center
            justify-content-center
            gap-2
            mt-4
          "
        >
          <img
            width="25"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAAEHklEQVR4nO2cz4scRRTHv29Fl4gGRb248ars1UPQuxf1KnrXgxejHgL+Ad48eTAg3iLoxWuMmERFUDZCcFfBH9EcV/wRkoi7ERLJfjxMD4wy1b+mqmu65n1gYJiqrvf6O68f9bqqW3Icx3Ecxxkc4E7gBPAnYa4AnwAvAody+zxKgLdrBJ7HJeBobr9HBbAG/N1RaIDrwOO5/V92bPoFWJO0L6lPOvhF0qaZ7cVyrDTWpl/M7EDSuz3H2ZB0LIpHqwBwCHgLuNYjhfyc2/9iAG4DnqsRezO3j0UBXAgIfTy3b8vKWnOXuXwY+P3pvo44cwCOBiL6H+Ce3P4VA5M5928BsZ/N7d8y0it1VFPBjwLNnj5iAjwTiOg/mBQ/TgyAw8CNgNiP5fZv2egdeWb2l6QvA82ePv7Hope4T/OGAHgkkDoOgCO5/VsmFopoM7so6dK8JklPLjJ2aVhzl3qANyW9EsGXMXNN0klJr5nZzXkdYkzDTkcYY+zcK+lVSW+EOsSI6HVJlyXdvehYBXDVzO6b17BwRJvZDUnnFh2nEIJ6xqrgQtO8VeOLUEMsoU9LItJYY+ZsqCGK0Gb2q6TtGGONnDOhhpg3f05FHGuM7JrZj6HGmEKvep7+uK4xptAXJP0ecbyxEczPUkShGxYDSudA0qd1HWLfoF/V9PG1mV2u6xBb6DOS5tb6hROcbUyJKnS1GBCctBdMbX6W4ke0tHrp47qkraZOLvTifFbd76klutA1iwGl0pg2pDQRLa1WVLvQA7BrZj+06ZhK6M8lrcLu/9qye5YkQlfrZquwGNAqbUjpIloqP300lt2zpBS69MWAxrJ7lmRCr8BiQGPZPUvqXZ8lLwa0zs9SeqFLzdOtyu5ZUgtd6mJAq7J7lqRCF7wY0CltSOkjWiozfXQWeuEtYU0AhzXZMnZHalsDsWtmD3U9KHlEF7gY0LrsnmWoh3pKSh+d04Y0QOqQJOBhSReHsJWYm5IeNLMrXQ8cJKLN7Cd1nHcuKaf6iCwNFNGSBDyhnpfdknBL0qNm9m2fgwd78NLMzkl6Zyh7CXi9r8iDA9wOfBB4kmuZOQEMdvVHgckD+8eZvPRq2bkKvBDjvLP9S8D9kp6X9JSkTUkP5PSn4pYmxdU3mkxJT1Z1gOM4juM4jtMOYB04BmwBe9Vnq/ptvTS7WQA2gJ2agmEb2Mhgd4dS3jdSRVTdyc6KHS3COtjdKSKygZdbnOyUlzLZHf8bhIGvOpxwtHvZwPkOds/HspvzXseepLtadt83syjvA8lldywvAjyIOFaWjZc5hf4+Ud+YY30Xy2hOod9L1LeJ9zPZzQPdpnfRNt90sFvG9E6SgCMNJ71NgsKhhd1yCpYp/LcU3q8+01I42TayBrtlRLLjOI7jOI7jOE4b/gUTyi8QlnlxYgAAAABJRU5ErkJggg=="
          />
          <span class="fs-5 fw-bold" v-if="BookDetail.Quantity == 0">
            out of stock
          </span>
          <span class="fs-5 fw-bold" v-else-if="BookDetail.Discount == 0">
            $ {{ BookDetail.Price }}
          </span>
          <span v-else class="gap-2 d-flex">
            <span class="fs-5 fw-bold"
              >$
              {{
                GetDiscountPrice(BookDetail.Price, BookDetail.Discount)
              }}</span
            >
            <span class="fs-6 text-decoration-line-through">{{
              BookDetail.Price
            }}</span>
          </span>
        </button>
      </div>
      <div class="right ms-4 overflow-hidden position-relative">
        <div
          v-if="BookDetail.Discount != 0"
          class="discount-container bg-warning"
        >
          {{ BookDetail.Discount }}% off !
        </div>
        <h4 class="ms-1">{{ BookDetail.Title }}</h4>
        <span class="d-block author ms-1">{{ BookDetail.Author }}</span>
        <div class="d-flex gap-2 mb-2 mt-2 align-items-center">
          <span class="d-block" v-html="BookRating(BookDetail.Rating, 30)">
          </span>
          <span class="">{{ Math.floor(Math.random() * 1000) }} votes</span>
        </div>
        <div class="mb-2 d-flex align-items-center gap-2 ms-1">
          <span v-if="BookDetail.Genre != undefined">{{
            BookDetail.Genre.Name
          }}</span>
          <span>|</span>
          <span>{{ BookDetail.Page }} pages</span>
        </div>
        <div class="ms-1 mb-2">
          <span
            >Stock :
            {{
              BookDetail.Quantity > 0 ? BookDetail.Quantity : "out of stock!"
            }}</span
          >
        </div>
        <div class="ms-1">
          <span class="mt-4">
            {{ BookDetail.Description }}
          </span>
        </div>
        <div class="border-container mt-4 mb-4 ms-1"></div>
        <Review />
      </div>
    </div>
  </div>
</template>

<style scoped>
.border-container {
  border: 1px solid grey;
  opacity: 0.7;
}

.discount-container {
  position: absolute;
  padding: 10px 100px;
  transform: rotate(45deg);
  right: -90px;
  top: 20px;
  color: white;
  font-weight: bold;
}

.author {
  font-size: large;
}
</style>