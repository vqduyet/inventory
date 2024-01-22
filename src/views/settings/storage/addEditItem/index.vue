<template>
  <div>
    <div class="modal custom-modal" role="dialog">
      <div class="mask" @click="close" />
      <div class="modal-dialog">
        <ValidationObserver ref="observer-form" v-slot="{}">
          <form novalidate @submit="save" v-loading="loading">
            <div class="modal-content" v-if="item">
              <div class="modal-header text-center">
                <div class="modal-title">{{ formType }} Storage</div>
              </div>
              <div class="modal-body custom-modal-body scrollbar" v-if="item">
                <div class="row mb-2">
                  <div class="col col-12 d-flex">
                    <div class="custom-switch-wrapper my-1 mr-3">
                      <label class="switch">
                        <input type="checkbox" v-model="item.status" true-value="ACTIVE" false-value="INACTIVE" />
                        <span class="slider round" />
                      </label>
                      <span class="ml-1">Active</span>
                    </div>
                    <div class="custom-switch-wrapper my-1">
                      <label class="switch">
                        <input type="checkbox" v-model="item.is_show_price" />
                        <span class="slider round" />
                      </label>
                      <span class="ml-1">Display price</span>
                    </div>
                  </div>
                </div>
                <div class="row mb-0">
                  <div class="col col-12 col-md-6">
                    <ValidationProvider name="name" :rules="{ required: true }" v-slot="{ valid, errors }">
                      <div
                        :class="{
                          invalid: errors[0] ? true : valid ? false : null
                        }"
                        class="custom-input-group mb-1"
                      >
                        <label for="name">Name</label>
                        <input id="name" type="text" class="form-control input-field" v-model="item.name" />
                        <div class="error-wrapper">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col col-12 col-md-6">
                    <div class="custom-input-group mb-1">
                      <label for="destStorage">Destination Storage</label>
                      <select name="destStorage" class="form-control input-field" v-model="item.destination_id">
                        <option disabled value="">Please select one</option>
                        <option v-for="option in storageList" :key="`op-${option.id}`" :value="option.id">
                          {{ option.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="row mb-0">
                  <div class="col col-12">
                    <ValidationProvider name="description" :rules="{ required: true }" v-slot="{ valid, errors }">
                      <div
                        :class="{
                          invalid: errors[0] ? true : valid ? false : null
                        }"
                        class="custom-input-group mb-1"
                      >
                        <label for="description">Description</label>
                        <textarea id="description" class="form-control input-field scrollbar" rows="5" v-model="item.description" />
                        <div class="error-wrapper">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>
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
textarea {
  resize: none;
}
</style>
