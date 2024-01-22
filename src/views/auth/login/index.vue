<template>
  <div class="login-box shadow rounded">
    <div class="wrapper" v-loading="loading">
      <ValidationObserver ref="observer-login" v-slot="{}">
        <form novalidate @submit="onSubmitLogin">
          <div class="logo d-flex justify-content-center">
            <img :src="require('@/assets/img/logo.png')" />
          </div>
          <ValidationProvider name="email" :rules="{ required: true }" v-slot="{ valid, errors }">
            <div :class="{ invalid: errors[0] ? true : valid ? false : null }" class="custom-input-group mb-1">
              <label for="email">Email</label>
              <div class="input-wrapper-icons">
                <font-awesome-icon icon="user-alt" class="icon" />
                <input id="email" type="text" class="form-control input-field prepend" v-model="email" placeholder="Enter email" />
              </div>
              <div class="error-wrapper">
                {{ errors[0] }}
              </div>
            </div>
          </ValidationProvider>
          <ValidationProvider name="password" :rules="{ required: true }" v-slot="{ valid, errors }">
            <div :class="{ invalid: errors[0] ? true : valid ? false : null }" class="custom-input-group mb-1">
              <label for="password">Password</label>
              <div class="input-wrapper-icons">
                <font-awesome-icon icon="key" class="icon" />
                <input
                  id="password"
                  :type="passwordInputType"
                  class="form-control input-field prepend append"
                  v-model="password"
                  placeholder="Enter password"
                />
                <font-awesome-icon :icon="passwordIcon" class="icon append pointer" @click="toggleShowPassword" />
              </div>
              <div class="error-wrapper">
                {{ errors[0] }}
              </div>
            </div>
          </ValidationProvider>

          <button type="submit" @click.prevent="onSubmitLogin" class="btn btn-primary w-100 mt-2">Login</button>
          <div class="direct-link">
            <router-link :to="{ name: 'ForgotPassword' }"> Forgot password? </router-link>
          </div>
        </form>
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
  max-width: 450px;
  z-index: 1;
  .wrapper {
    width: 350px;
    padding: 35px 35px 15px 35px;
    .logo {
      margin-bottom: 35px;
      height: 150px;
      img {
        max-height: 150px;
        width: auto;
      }
    }
    .direct-link {
      text-align: right;
      cursor: pointer;
      font-size: 14px;
      margin-top: 5px;
    }
  }
}
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 100%;
    transform: translate(-50%, -50%);
    max-width: 440px;
  }
}
</style>
