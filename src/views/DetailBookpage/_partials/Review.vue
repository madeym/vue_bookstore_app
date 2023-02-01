<script setup>
import HttpHandler from "../../../assets/js/HttpHandler.js";
import {
  BookRating,
  DateFormatter,
  LoadingBtn,
  LoadingContent,
  SendNotification,
} from "../../../assets/js/Helpers.js";
import { useUserDataStore } from "../../../stores/user.js";
</script>

<script>
export default {
  data() {
    return {
      ReviewData: [],
      SetRatingStarValue: 0,
      ReviewInput: "",
      UserDataStore: useUserDataStore(),
    };
  },
  methods: {
    async GetReviewData() {
      const r = await HttpHandler.RequestGET(
        "/api/v1/rating/" + this.$route.params.id
      );
      if (r.Status == 200) {
        this.ReviewData = r;
      }
    },
    async PostReview(event) {
      if (this.ReviewInput == "") {
        SendNotification("Review input required", 404);
      } else if (this.UserDataStore.UserData == null) {
        SendNotification("Login to post a review", 404);
      } else {
        LoadingBtn(event.target);

        const r = await HttpHandler.RequestPOST(
          "/api/v1/jwt/rating",
          JSON.stringify({
            book_id: parseInt(this.$route.params.id),
            rating: parseInt(this.SetRatingStarValue),
            review: this.ReviewInput,
          }),
          true,
          true
        );

        if (r.Status == 200) {
          LoadingContent(document.querySelector(".review-container"));

          this.GetReviewData();

          setTimeout(() => {
            LoadingContent(document.querySelector(".review-container"), true);
          }, 2000);

          this.SetRatingStarValue = 0;
          this.ReviewInput = "";

          var htmlStar = document.querySelector(".rating-star").children;
          for (let i = 0; i < htmlStar.length; i++) {
            htmlStar[i].src =
              "https://img.icons8.com/color/48/null/star--v1.png";
          }
        }

        event.target.innerHTML = "Submit";
        event.target.disabled = false;
      }
    },
    SelectRatingStar(event) {
      var targetStar = event.target;
      var htmlStar = document.querySelector(".rating-star").children;

      for (let i = 0; i < htmlStar.length; i++) {
        if (htmlStar[i].classList[0] <= targetStar.classList[0]) {
          htmlStar[i].src = "https://img.icons8.com/fluency/48/null/star.png";
        } else {
          htmlStar[i].src = "https://img.icons8.com/color/48/null/star--v1.png";
        }
      }
    },
    SetSelectRatingStar(event) {
      this.SetRatingStarValue = event.target.classList[0];
    },
    ResetSelectRatingStar(event) {
      for (let i = 0; i < event.target.children.length; i++) {
        if (i < this.SetRatingStarValue) {
          event.target.children[i].src =
            "https://img.icons8.com/fluency/48/null/star.png";
        } else {
          event.target.children[i].src =
            "https://img.icons8.com/color/48/null/star--v1.png";
        }
      }
    },
  },
  beforeMount() {
    this.GetReviewData();
  },
};
</script>
<template>
  <h5 class="ms-1">Review ({{ ReviewData.TotalData }})</h5>

  <div class="review-container position-relative" v-if="ReviewData.Data != []">
    <div class="review-post-container py-2">
      <div class="left">
        <img
          width="80"
          src="https://img.icons8.com/fluency/48/null/user-male-circle.png"
          class="btn dropdown-toggle border-0"
        />
      </div>
      <div class="right col-12">
        <span
          class="rating-star"
          @mouseover="SelectRatingStar($event)"
          @mouseleave="ResetSelectRatingStar($event)"
          @click="SetSelectRatingStar($event)"
          v-html="BookRating(0, 25)"
        ></span>
        <div class="textarea-container col-9">
          <textarea
            name="Review"
            id="Review"
            class="my-2 form-control"
            placeholder="your review"
            v-model="ReviewInput"
            cols="0"
          ></textarea>
        </div>

        <button
          @click="PostReview($event)"
          class="btn btn-submit-review mt-2 btn-primary"
        >
          Submit
        </button>
      </div>
    </div>

    <div v-for="review in ReviewData.Data" :key="review.ID" class="mt-2 d-flex">
      <div class="left">
        <img
          width="80"
          src="https://img.icons8.com/fluency/48/null/user-male-circle.png"
          class="btn dropdown-toggle border-0"
        />
      </div>
      <div class="right">
        <div class="review-header d-flex gap-2 ms-1">
          <span class="fw-bold">{{ review.User.Name }}</span>
          <span class="font-grey">{{ review.User.Email }}</span>
        </div>
        <div class="review-body">
          <div class="d-flex align-items-center gap-2">
            <span v-html="BookRating(review.Rating, 25)"></span>
            <span class="mt-1">{{
              DateFormatter(review.CreatedAt, true)
            }}</span>
          </div>
          <div class="mt-2 ms-1">
            <span>{{ review.Review }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.review-post-container {
  display: flex;
}

.rating-star {
  cursor: pointer;
}

textarea {
  width: 98% !important;
  padding: 1% !important;
}
</style>