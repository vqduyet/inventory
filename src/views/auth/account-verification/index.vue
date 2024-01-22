<template>
  <div class="login-box shadow rounded">
    <div class="wrapper">
      <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
        <b-form @submit.stop.prevent="handleSubmit(verifyAccount)">
          <div class="logo d-flex justify-content-center">
            <img :src="require('@/assets/img/logo.png')" />
          </div>

          <p class="text-center">Setup new password for your account</p>

          <!-- define input password and confirm password here for first time login (if required)-->

          <b-button type="submit" class="w-100"> Submit </b-button>
        </b-form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script src="./component.js"></script>

<style lang="scss" scoped>
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
    .input-group {
      margin-bottom: 3px !important;
      .input-group-prepend + input {
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
      }
    }
    .input-group-text {
      background-color: #ededed;
      border: 1px solid #e4e4e4;
      i {
        min-width: 17px;
      }
    }
    .invalid-feedback {
      display: block !important;
      min-height: 16px;
    }
    .forget {
      text-align: right;
      cursor: pointer;
    }
  }
}
</style>
