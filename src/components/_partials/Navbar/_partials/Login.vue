<script setup>
import { useUserDataStore } from "@/stores/user";
import { LoadingBtn } from "../../../../assets/js/Helpers.js";
import LoginImg from "../../../../assets/images/login.jpg";
import { SendNotification } from "../../../../assets/js/Helpers.js";
import HttpHandler from "../../../../assets/js/HttpHandler";
</script>

<script>
export default {
  data() {
    return {
      UserDataStore: useUserDataStore(),
      form: "Login",
    };
  },
  methods: {
    async FormSubmit(event) {
      var html = event.target.innerHTML;
      LoadingBtn(event.target);

      var url =
        this.form == "Login" ? "/api/v1/user/login" : "/api/v1/user/register";

      var requestOption = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      };

      if (this.form == "Register") {
        requestOption.Name = document.getElementById("name").value;
      }

      const r = await HttpHandler.RequestPOST(
        url,
        JSON.stringify(requestOption),
        true
      );

      if (r.Status == 200) {
        if (this.form == "Login") {
          this.UserDataStore.Login(JSON.stringify(r));
          document.querySelector(".btn-close").click();
        } else {
          this.form = "Login";
        }
      }

      event.target.innerHTML = html;
      event.target.disabled = false;
    },
    changeForm(form) {
      this.form = form;
    },
  },
};
</script>

<template>
  <div
    class="modal fade"
    id="LoginModal"
    data-bs-backdrop="static"
    data-bs-keyboard="true"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
    role="dialog"
  >
    <div
      class="modal-dialog modal-lg modal-login-register modal-dialog-centered"
    >
      <div class="modal-content p-2">
        <div class="container-login-register d-flex justify-content-center">
          <div class="login d-flex">
            <div class="left d-flex align-items-center">
              <img
                src="../../../../assets/images/login.jpg"
                class="login-img"
                alt=""
              />
            </div>

            <div class="right">
              <div
                class="
                  modal-header
                  position-relative
                  d-flex
                  justify-content-center
                "
              >
                <h4>{{ form }}</h4>
                <button
                  type="button"
                  class="btn-close position-absolute top-0 end-0 mt-1 me-1"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div class="d-grid gap-3">
                  <div v-if="form == 'Register'" class="d-grid form-group">
                    <label htmlFor="Nama" class="text-start">Nama</label>
                    <input
                      type="text"
                      id="name"
                      class="form-control"
                      placeholder="Masukkan Nama"
                      required
                    />
                  </div>
                  <div class="d-grid form-group">
                    <label htmlFor="Email" class="text-start">Email</label>
                    <input
                      type="email"
                      id="email"
                      class="form-control"
                      placeholder="Masukkan Email"
                      required
                    />
                  </div>
                  <div class="d-grid form-group">
                    <label htmlFor="Password" class="text-start"
                      >Password</label
                    >
                    <input
                      type="password"
                      id="password"
                      class="form-control"
                      placeholder="Masukkan Password"
                      required
                    />
                  </div>
                  <div v-if="form == 'Register'" class="form-check">
                    <label htmlFor="TermsCondition" class="form-check-label"
                      >I accept temrs & condition</label
                    >
                    <input
                      type="checkbox"
                      id="termscondition"
                      class="form-check-input"
                      required
                    />
                  </div>
                </div>
                <div class="mt-4 bottom-0 mb-4 col-12 text-center">
                  <button
                    class="
                      btn btn-load btn-login btn-primary
                      col-12
                      mb-2
                      mw-100
                    "
                    @click="FormSubmit($event)"
                  >
                    {{ form == "Login" ? "Masuk" : "Daftar" }}
                  </button>
                  <span v-if="form == 'Login'" class=""
                    >Belum punya akun ?
                    <a
                      href="#"
                      class="fw-bold text-decoration-none color-primary"
                      @click="changeForm('Register')"
                      >Daftar</a
                    ></span
                  >
                  <span v-else class=""
                    >Sudah punya akun ?
                    <a
                      href="#"
                      class="fw-bold text-decoration-none color-primary"
                      @click="changeForm('Login')"
                      >Masuk</a
                    ></span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>