<template>
  <div>
    <div class="modal custom-modal" role="dialog">
      <div class="mask" @click="close" />
      <div class="modal-dialog">
        <ValidationObserver ref="observer-form" v-slot="{}">
          <form novalidate @submit="save" v-loading="loading">
            <div class="modal-content" v-if="item">
              <div class="modal-header text-center">
                <div class="modal-title">{{ formType }} User</div>
              </div>
              <div class="modal-body custom-modal-body no-overflow" v-if="item">
                <div class="row mb-0">
                  <div class="col col-12 col-md-6">
                    <template v-if="!item.user_id">
                      <ValidationProvider name="email" :rules="{ required: true }" v-slot="{ valid, errors }">
                        <div
                          :class="{
                            invalid: errors[0] ? true : valid ? false : null
                          }"
                          class="custom-input-group mb-1"
                        >
                          <label for="email">Email</label>
                          <input id="name" type="text" class="form-control input-field" v-model="item.email" />
                          <div class="error-wrapper">
                            {{ errors[0] }}
                          </div>
                        </div>
                      </ValidationProvider>
                    </template>
                    <template v-else>
                      <div class="custom-input-group mb-1">
                        <label for="email">Email</label>
                        <input id="name" type="text" readonly class="form-control input-field" :value="item.email" />
                      </div>
                    </template>
                  </div>
                  <div class="col col-12 col-md-6">
                    <div class="custom-input-group mb-1">
                      <label for="phone">Phone</label>
                      <input id="name" type="text" class="form-control input-field" v-model="item.phone" />
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
                        <input id="fname" type="text" class="form-control input-field" v-model="item.fname" />
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
                        <input id="lname" type="text" class="form-control input-field" v-model="item.lname" />
                        <div class="error-wrapper">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col col-12 col-md-6">
                    <ValidationProvider name="role" :rules="{ required: true }" v-slot="{ valid, errors }">
                      <div
                        :class="{
                          invalid: errors[0] ? true : valid ? false : null
                        }"
                        class="custom-input-group mb-1"
                      >
                        <label for="role">Role</label>
                        <select class="form-control input-field" v-model="item.role_id">
                          <option disabled value="">Please select one</option>
                          <option v-for="option in roleList" :key="`op-${option.id}`" :value="option.id">
                            {{ option.name }}
                          </option>
                        </select>
                        <div class="error-wrapper">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col col-12 col-md-6 d-flex flex-column justify-content-center">
                    <template v-if="!item.user_id || isResetPassword">
                      <ValidationProvider name="password" :rules="{ required: true }" v-slot="{ valid, errors }">
                        <div
                          :class="{
                            invalid: errors[0] ? true : valid ? false : null
                          }"
                          class="custom-input-group mb-1"
                        >
                          <label for="password">Password</label>
                          <input id="password" type="text" class="form-control input-field" v-model="item.password" />
                          <div class="error-wrapper">
                            {{ errors[0] }}
                          </div>
                        </div>
                      </ValidationProvider>
                      <button v-if="!item.user_id" type="button" class="btn btn-secondary btn-form-action" @click="generatePassword">Generate password</button>
                    </template>
                    <div v-if="item.user_id" class="d-flex justify-content-between">
                      <button v-if="isResetPassword" type="button" class="btn btn-secondary btn-form-action" @click="generatePassword">
                        Generate password
                      </button>
                      <button type="button" class="btn btn-secondary btn-form-action flex-grow-1 ml-1" @click="toggleResetPassword">
                        <template v-if="isResetPassword">Cancel reset</template>
                        <template v-else>Reset password</template>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer justify-content-center">
                <button type="button" class="btn btn-secondary btn-form-action" @click="close">Close</button>
                <button type="button" class="btn btn-primary btn-form-action" @click="save">Save</button>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script src="./component.js"></script>

<style lang="scss" scoped>
.custom-modal-body {
  &.no-overflow {
    overflow: unset !important;
    overflow-y: unset !important;
  }
}
</style>
