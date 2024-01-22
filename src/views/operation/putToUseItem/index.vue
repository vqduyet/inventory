<template>
  <div>
    <div class="modal custom-modal" role="dialog">
      <div class="mask" @click="close" />
      <div class="modal-dialog">
        <ValidationObserver ref="observer-form" v-slot="{}">
          <form novalidate @submit="save" v-loading="loading">
            <div class="modal-content" v-if="item">
              <div class="modal-header text-center">
                <div class="modal-title">Put to Use Item</div>
              </div>
              <div class="modal-body custom-modal-body scrollbar" v-if="item">
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
                    <ValidationProvider name="useDate" :rules="{ required: true }" v-slot="{ valid, errors }">
                      <div
                        :class="{
                          invalid: errors[0] ? true : valid ? false : null
                        }"
                        class="custom-input-group mb-1"
                      >
                        <label for="useDate">Use Date</label>
                        <div class="d-flex datepicker-wrapper">
                          <datepicker
                            :format="customFormatter"
                            v-model="formData.useDatetime"
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
                  <div class="col col-12">
                    <div class="custom-input-group mb-1">
                      <label for="reason">Reason</label>
                      <input id="reason" type="text" class="form-control input-field" v-model="formData.reason" />
                    </div>
                  </div>
                </div>
                <template v-if="destinationItem">
                  <hr class="hr-bold" />
                  <div class="row mb-0">
                    <div class="col-12 d-flex flex-column">
                      <h5 class="title">Current snapshot of destination item</h5>
                      <span>
                        <small>Name: {{ destinationItem.name }}</small>
                      </span>
                      <span>
                        <small>
                          Unit:
                          {{ destinationItem.unit | unitName(destinationItem.measure_type) }}
                        </small>
                      </span>
                      <div>
                        <small>
                          Available quantity:
                          {{ destinationItem.available_quantity }}
                        </small>
                        <ul v-if="destinationItem.available_quantity" class="custom-ul font-12">
                          <li v-for="(destAvItem, idx) in destinationItem.available_stocks" :key="`dav-${idx}`">
                            Stocked on
                            {{ destAvItem.entry_timestamp | customDatetime }} :
                            {{ destAvItem.remaining_quantity }}
                          </li>
                        </ul>
                      </div>
                      <span v-if="destinationItem.expired_quantity">
                        <small>
                          Expired quantity:
                          {{ destinationItem.expired_quantity }}
                        </small>
                      </span>
                      <span>
                        <small>
                          Min/Max Quantity: {{ destinationItem.min_quantity }} /
                          {{ destinationItem.max_quantity }}
                        </small>
                      </span>
                    </div>
                  </div>
                  <hr />
                  <div class="row mb-0 align-items-center">
                    <div class="col col-12 col-md-6">
                      <ValidationProvider name="destQuantity" :rules="{ required: true }" v-slot="{ valid, errors }">
                        <div
                          :class="{
                            invalid: errors[0] ? true : valid ? false : null
                          }"
                          class="custom-input-group mb-1"
                        >
                          <label for="destQuantity"> Quantity ({{ destinationItem.unit | unitName(destinationItem.measure_type) }}) </label>
                          <input id="destQuantity" type="number" class="form-control input-field" v-model="formData.destQuantity" />
                          <div class="error-wrapper">
                            {{ errors[0] }}
                          </div>
                        </div>
                      </ValidationProvider>
                    </div>
                    <div class="col col-12 col-md-6">
                      <ValidationProvider name="destExpiredDate" :rules="{ required: true }" v-slot="{ valid, errors }">
                        <div
                          :class="{
                            invalid: errors[0] ? true : valid ? false : null
                          }"
                          class="custom-input-group mb-1"
                        >
                          <label for="destExpiredDate">Expired Date</label>
                          <div class="d-flex datepicker-wrapper">
                            <datepicker
                              :format="customFormatter"
                              v-model="formData.destExpiredDatetime"
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
                </template>
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
