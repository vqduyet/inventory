<template>
  <div class="login-box shadow rounded">
    <div class="wrapper" v-loading="loading">
      <ValidationObserver ref="observer" v-slot="{}">
        <form novalidate @submit="onSubmit">
          <div class="logo d-flex justify-content-center">
            <img :src="require('@/assets/img/logo.png')" />
          </div>

          <p class="text">Enter the email address and click Submit. A message will be sent to that address containing a link to reset your password.</p>

          <ValidationProvider name="email" :rules="{ required: true }" v-slot="{ valid, errors }">
            <div :class="{ invalid: errors[0] ? true : valid ? false : null }" class="custom-input-group mb-1">
              <label for="email">Email</label>
              <div class="input-wrapper-icons">
                <font-awesome-icon icon="user-alt" class="icon" />
                <input id="email" type="text" class="input-field form-control input-field prepend" v-model="email" placeholder="Enter email" />
              </div>
              <div class="error-wrapper">
                {{ errors[0] }}
              </div>
            </div>
          </ValidationProvider>
          <button type="submit" @click.prevent="onSubmit" class="btn btn-primary w-100">Submit</button>
          <div class="direct-link">
            <router-link :to="{ name: 'Login' }"> Back to login </router-link>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>

<script src="./component.js"></script>

<style lang="scss" scoped>
.text {
  text-align: justify;
  line-height: 1.1rem;
  margin-bottom: 1rem;
}

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
