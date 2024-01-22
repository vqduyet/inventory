<template>
  <div class="mainContent" v-if="user" v-loading="loading">
    <h2 class="my-2">User profile</h2>
    <ValidationObserver ref="update-form" v-slot="{}">
      <div class="row">
        <div class="col col-12 col-md-6">
          <div class="custom-input-group mb-1">
            <label for="email">Email</label>
            <input id="email" type="text" readonly class="form-control input-field" :value="user.email" />
          </div>
        </div>
        <div class="col col-12 col-md-6">
          <div class="custom-input-group mb-1">
            <label for="phone">Phone</label>
            <input id="phone" type="text" class="form-control input-field" v-model="user.phone" />
          </div>
        </div>
        <div class="col col-12 col-md-6">
          <ValidationProvider name="fname" :rules="{ required: true }" v-slot="{ valid, errors }">
            <div
              :class="{
                invalid: errors[0] ? true : valid ? false : null
              }"
              class="custom-input-group mb-1"
            >
              <label for="fname">First name</label>
              <input id="fname" type="text" class="form-control input-field" v-model="user.fname" />
              <div class="error-wrapper">
                {{ errors[0] }}
              </div>
            </div>
          </ValidationProvider>
        </div>
        <div class="col col-12 col-md-6">
          <ValidationProvider name="lname" :rules="{ required: true }" v-slot="{ valid, errors }">
            <div
              :class="{
                invalid: errors[0] ? true : valid ? false : null
              }"
              class="custom-input-group mb-1"
            >
              <label for="lname">Last name</label>
              <input id="lname" type="text" class="form-control input-field" v-model="user.lname" />
              <div class="error-wrapper">
                {{ errors[0] }}
              </div>
            </div>
          </ValidationProvider>
        </div>
        <div class="col-12 mb-3">
          <button type="button" class="btn btn-primary btn-form-action" @click="updateProfile">Update profile</button>
        </div>
      </div>
    </ValidationObserver>
    <hr />
    <h2 class="my-2">Setup password</h2>
    <ValidationObserver ref="password-form" v-slot="{}">
      <div class="row">
        <div class="col col-12 col-md-4">
          <ValidationProvider name="currentPassword" :rules="{ required: true }" v-slot="{ valid, errors }">
            <div
              :class="{
                invalid: errors[0] ? true : valid ? false : null
              }"
              class="custom-input-group mb-1"
            >
              <label for="currentPassword">Current password</label>
              <input id="currentPassword" type="password" class="form-control input-field" v-model="currentPassword" />
              <div class="error-wrapper">
                {{ errors[0] }}
              </div>
            </div>
          </ValidationProvider>
        </div>
        <div class="col col-12 col-md-4">
          <ValidationProvider name="newPassword" :rules="{ required: true }" v-slot="{ valid, errors }">
            <div
              :class="{
                invalid: errors[0] ? true : valid ? false : null
              }"
              class="custom-input-group mb-1"
            >
              <label for="newPassword">New password</label>
              <input id="newPassword" type="password" class="form-control input-field" v-model="newPassword" />
              <div class="error-wrapper">
                {{ errors[0] }}
              </div>
            </div>
          </ValidationProvider>
        </div>
        <div class="col col-12 col-md-4">
          <ValidationProvider name="confirmPassword" :rules="{ required: true }" v-slot="{ valid, errors }">
            <div
              :class="{
                invalid: errors[0] ? true : valid ? false : null
              }"
              class="custom-input-group mb-1"
            >
              <label for="confirmPassword">Confirm password</label>
              <input id="confirmPassword" type="password" class="form-control input-field" v-model="confirmPassword" />
              <div class="error-wrapper">
                {{ errors[0] }}
              </div>
            </div>
          </ValidationProvider>
        </div>
        <div class="col-12 mb-3">
          <button type="button" class="btn btn-primary btn-form-action" @click="changePassword">Change password</button>
        </div>
      </div>
    </ValidationObserver>
  </div>
</template>

<script src="./component.js"></script>
