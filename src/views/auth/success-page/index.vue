<template>
  <div class="login-box shadow rounded">
    <div class="wrapper">
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <b-form @submit.stop.prevent="handleSubmit(verifyAccount)">
          <div class="logo d-flex justify-content-center">
            <img :src="require('@/assets/img/logo.png')" />
          </div>

          <div class="success text-center text-success mb-2">
            <i :class="icon" />
          </div>
          <h3 class="text-center text-success">
            {{ title }}
          </h3>
          <p class="text-center">
            {{ subTitle }}
          </p>
          <b-alert
            :show="dismissCountDown"
            variant="warning"
            @dismissed="dismissCountDown = 0"
            @dismiss-count-down="countDownChanged"
            class="p-0"
            v-if="isRedirect"
          >
            <p class="text-center">
              Redirect in <strong>{{ dismissCountDown }}</strong> seconds...
            </p>
            <b-progress variant="success" :max="dismissSecs" :value="dismissCountDown" height="4px" />
          </b-alert>
        </b-form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script src="./component.js"></script>

<style lang="scss" scoped>
.success {
  i {
    font-size: 11rem;
  }
}
.alert {
  background: unset;
  border: 0px;
  color: black;
}
.login-box {
  background-color: #fff;
  border: 1px solid #eaeaea;
  margin: 0 auto;
  max-width: 390px;
  z-index: 1;
  .wrapper {
    padding: 35px 35px 15px 35px;
    .logo {
      margin-bottom: 35px;
      img {
        max-width: 380px;
        height: auto;
      }
    }
  }
}
</style>
