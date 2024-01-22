<template>
  <div>
    <div class="modal custom-modal" role="dialog">
      <div class="mask" @click="close" />
      <div class="modal-dialog">
        <ValidationObserver ref="observer-form" v-slot="{}">
          <form novalidate @submit="save" v-loading="loading">
            <div class="modal-content" v-if="item">
              <div class="modal-header text-center">
                <div class="modal-title">Restock Item</div>
              </div>
              <div class="modal-body" v-if="item">
                <div class="row mb-0">
                  <div class="col-12 d-flex flex-column">
                    <h5 class="title">Current snapshot of item</h5>
                    <span>
                      <small>Name: {{ item.name }}</small>
                    </span>
                    <span>
                      <small>
                        Unit:
                        {{ item.unit | unitName(item.measure_type) }}
                      </small>
                    </span>
                    <div>
                      <small>
                        Available quantity:
                        {{ item.available_quantity }}
                      </small>
                      <ul v-if="item.available_quantity" class="custom-ul font-12">
                        <li v-for="(availableItem, idx) in item.available_stocks" :key="`av-${idx}`">
                          Stocked on
                          {{ availableItem.entry_timestamp | customDatetime }} :
                          {{ availableItem.remaining_quantity }}
                        </li>
                      </ul>
                    </div>
                    <span v-if="item.expired_quantity">
                      <small>
                        Expired quantity:
                        {{ item.expired_quantity }}
                      </small>
                    </span>
                    <span>
                      <small>
                        Min/Max Quantity: {{ item.min_quantity }} /
                        {{ item.max_quantity }}
                      </small>
                    </span>
                  </div>
                </div>
                <hr />
                <div class="row mb-0 align-items-center">
                  <div class="col col-12 col-md-6">
                    <ValidationProvider name="entryDate" :rules="{ required: true }" v-slot="{ valid, errors }">
                      <div
                        :class="{
                          invalid: errors[0] ? true : valid ? false : null
                        }"
                        class="custom-input-group mb-1"
                      >
                        <label for="entryDate">Entry Date</label>
                        <div class="d-flex datepicker-wrapper">
                          <datepicker
                            :format="customFormatter"
                            v-model="formData.entryDatetime"
                            :disabled-dates="disabledDates"
                            :clear-button="true"
                            :clear-button-icon="'fas fa-times'"
                            class="flex-grow-1"
                          />
                        </div>
                        <div class="error-wrapper">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col col-12 col-md-6">
                    <ValidationProvider name="expiredDate" :rules="{ required: true }" v-slot="{ valid, errors }">
                      <div
                        :class="{
                          invalid: errors[0] ? true : valid ? false : null
                        }"
                        class="custom-input-group mb-1"
                      >
                        <label for="expiredDate">Expired Date</label>
                        <div class="d-flex datepicker-wrapper">
                          <datepicker
                            :format="customFormatter"
                            v-model="formData.expiredDatetime"
                            :disabled-dates="disabledDates"
                            :clear-button="true"
                            :clear-button-icon="'fas fa-times'"
                            class="flex-grow-1"
                          />
                        </div>
                        <div class="error-wrapper">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>
                  </div>
                </div>
                <div class="row mb-0">
                  <div class="col col-12 col-md-6">
                    <ValidationProvider name="amount" :rules="{ required: true }" v-slot="{ valid, errors }">
                      <div
                        :class="{
                          invalid: errors[0] ? true : valid ? false : null
                        }"
                        class="custom-input-group mb-1"
                      >
                        <label for="unitPrice">Cost</label>
                        <input id="amount" type="number" class="form-control input-field" v-model="formData.amount" />
                        <div class="error-wrapper">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col col-12 col-md-6">
                    <ValidationProvider name="quantity" :rules="{ required: true }" v-slot="{ valid, errors }">
                      <div
                        :class="{
                          invalid: errors[0] ? true : valid ? false : null
                        }"
                        class="custom-input-group mb-1"
                      >
                        <label for="quantity"> Quantity ({{ item.unit | unitName(item.measure_type) }}) </label>
                        <input id="quantity" type="number" class="form-control input-field" v-model="formData.quantity" />
                        <div class="error-wrapper">
                          {{ errors[0] }}
                        </div>
                      </div>
                    </ValidationProvider>
                  </div>
                  <div class="col col-12 col-md-6">
                    <div class="custom-input-group mb-1">
                      <label for="source">Source</label>
                      <input id="source" type="text" class="form-control input-field" v-model="formData.source" />
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
.title {
  font-weight: 600;
}
</style>
