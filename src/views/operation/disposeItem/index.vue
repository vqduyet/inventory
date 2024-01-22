<template>
  <div>
    <div class="modal custom-modal" role="dialog">
      <div class="mask" @click="close" />
      <div class="modal-dialog">
        <div class="modal-content" v-loading="loading">
          <div class="modal-header text-center">
            <div class="modal-title">Dispose Item</div>
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
                    Available quantity:
                    {{ item.available_quantity }}
                  </small>
                </span>
                <span>
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
            <div>
              <div class="row mb-0 align-items-center">
                <div class="col col-12 col-md-6">
                  <label for="quantity">Disposal Quantity</label>
                  <input id="quantity" type="number" class="form-control input-field" readonly :value="item.expired_quantity" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-secondary btn-form-action" @click="close">Close</button>
            <button type="button" class="btn btn-primary btn-form-action" @click="save" :disabled="!(item.expired_quantity > 0)">Dispose</button>
          </div>
        </div>
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
