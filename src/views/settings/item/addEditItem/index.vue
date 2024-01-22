<template>
  <div>
    <div class="modal custom-modal" role="dialog">
      <div class="mask" @click="close" />
      <div class="modal-dialog">
        <ValidationObserver ref="observer-form" v-slot="{}">
          <form novalidate @submit="save" v-loading="loading">
            <div class="modal-content" v-if="item">
              <div class="modal-header text-center">
                <div class="modal-title">{{ formType }} Item</div>
              </div>
              <div class="modal-body custom-modal-body scrollbar" v-if="item">
                <div class="row mb-0 align-items-center">
                  <div class="col col-12 col-md-6 order-1 order-md-2">
                    <div class="custom-switch-wrapper my-1">
                      <label class="switch">
                        <input type="checkbox" v-model="item.status" true-value="ACTIVE" false-value="INACTIVE" />
                        <span class="slider round" />
                      </label>
                      <span class="ml-1">Active</span>
                    </div>
                  </div>
                  <div class="col col-12 col-md-6 order-2 order-md-1">
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
                </div>
                <div class="row mb-0">
                  <div class="col col-12 col-md-6">
                    <ValidationProvider name="category" :rules="{ required: true }" v-slot="{ valid, errors }">
                      <div
                        :class="{
                          invalid: errors[0] ? true : valid ? false : null
                        }"
                        class="custom-input-group mb-1"
                      >
                        <label for="category">Category</label>
                        <select class="form-control input-field" v-model="item.category_id" @change="handleChangeSelectCategory">
                          <option disabled value="">Please select one</option>
                          <option v-for="option in categoryList" :key="`op-${option.id}`" :value="option.id">
                            {{ option.name }}
                          </option>
                        </select>
                        <div class="error-wrapper">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col col-12 col-md-6">
                    <div class="custom-input-group mb-1">
                      <label for="destItem">Destination Item</label>
                      <select name="destItem" class="form-control input-field" v-model="item.destination_id">
                        <option disabled value="">Please select one</option>
                        <option v-for="option in itemList" :key="`opIt-${option.id}`" :value="option.id">
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
                <div class="row mb-0">
                  <div class="col col-12 col-md-6">
                    <ValidationProvider name="shelfLife" :rules="{ required: true }" v-slot="{ valid, errors }">
                      <div
                        :class="{
                          invalid: errors[0] ? true : valid ? false : null
                        }"
                        class="custom-input-group mb-1"
                      >
                        <label for="name">Shelf life</label>
                        <input id="shelfLife" type="text" class="form-control input-field" v-model="item.shelf_life" />
                        <div class="error-wrapper">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col col-12 col-md-6" v-if="selectedCategory && selectedCategory.is_show_price">
                    <ValidationProvider name="unitPrice" :rules="{ required: true }" v-slot="{ valid, errors }">
                      <div
                        :class="{
                          invalid: errors[0] ? true : valid ? false : null
                        }"
                        class="custom-input-group mb-1"
                      >
                        <label for="unitPrice">Base Unit Price</label>
                        <input id="unitPrice" type="number" class="form-control input-field" v-model="item.base_unit_price" />
                        <div class="error-wrapper">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="row mb-0">
                  <div class="col col-12 col-md-6">
                    <ValidationProvider name="measureType" :rules="{ required: true }" v-slot="{ valid, errors }">
                      <div
                        :class="{
                          invalid: errors[0] ? true : valid ? false : null
                        }"
                        class="custom-input-group mb-1"
                      >
                        <label for="measureType">Measure Types</label>
                        <select class="form-control input-field" v-model="item.measure_type" @change="handleMeasureTypeChange">
                          <option disabled value="">Please select one</option>
                          <option v-for="(option, idx) in measureTypeList" :key="`mt-${idx}`" :value="option.code">
                            {{ option.name }}
                          </option>
                        </select>
                        <div class="error-wrapper">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col col-12 col-md-6">
                    <ValidationProvider name="unit" :rules="{ required: true }" v-slot="{ valid, errors }">
                      <div
                        :class="{
                          invalid: errors[0] ? true : valid ? false : null
                        }"
                        class="custom-input-group mb-1"
                      >
                        <label for="unit">Unit</label>
                        <select class="form-control input-field" v-model="item.unit">
                          <option disabled value="">Please select one</option>
                          <option v-for="(option, idx) in unitList" :key="`u-${idx}`" :value="option.code">
                            {{ option.name }}
                          </option>
                        </select>
                        <div class="error-wrapper">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col col-12 col-md-6">
                    <ValidationProvider name="minQuantity" :rules="{ required: true }" v-slot="{ valid, errors }">
                      <div
                        :class="{
                          invalid: errors[0] ? true : valid ? false : null
                        }"
                        class="custom-input-group mb-1"
                      >
                        <label for="minQuantity">Min Quantity</label>
                        <input id="minQuantity" type="number" class="form-control input-field" v-model="item.min_quantity" />
                        <div class="error-wrapper">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col col-12 col-md-6">
                    <ValidationProvider name="maxQuantity" :rules="{ required: true }" v-slot="{ valid, errors }">
                      <div
                        :class="{
                          invalid: errors[0] ? true : valid ? false : null
                        }"
                        class="custom-input-group mb-1"
                      >
                        <label for="maxQuantity">Max Quantity</label>
                        <input id="maxQuantity" type="number" class="form-control input-field" v-model="item.max_quantity" />
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
