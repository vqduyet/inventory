<template>
  <div class="main-content-wrapper" v-loading="loading">
    <div class="left-section data-content scrollbar">
      <div v-for="(storage, sidx) in storages" :key="`st-${sidx}`" class="custom-card" :class="{ selected: storage.id === selectedStorageId }">
        <div class="title-wrapper">
          <div class="title pointer" @click="handleSelectStorage(storage.id)">
            {{ storage.name }}
          </div>
        </div>
        <div class="desc">{{ storage.description }}</div>
      </div>
    </div>
    <div class="right-section data-content scrollbar">
      <div v-for="(item, idx) in items" :key="`it-${idx}`" class="custom-card">
        <div class="title-wrapper">
          <div class="title">
            {{ item.name }}
          </div>
          <div class="actions">
            <div>
              <b-dropdown right size="sm" variant="outline-primary" text="Actions">
                <b-dropdown-item @click="openRestockDialog(item.id)" v-if="selectedStorage && selectedStorage.destination_id"> Restock </b-dropdown-item>
                <b-dropdown-item @click="openPutToUseDialog(item.id)"> Out for usage </b-dropdown-item>
                <!-- <b-dropdown-item @click="openDisposeDialog(item.id)">
                  Dispose
                </b-dropdown-item> -->
              </b-dropdown>
            </div>
          </div>
        </div>
        <div class="desc d-flex flex-column">
          <span>Unit: {{ item.unit | unitName(item.measure_type) }}</span>
          <span>Min/Max quantity: {{ item.min_quantity }} / {{ item.max_quantity }}</span>
          <div>
            Available quantity: {{ item.available_quantity }}
            <ul v-if="item.available_quantity" class="custom-ul">
              <li v-for="(availableItem, idx) in item.available_stocks" :key="`av-${idx}`">
                Stocked on
                {{ availableItem.entry_timestamp | customDatetime }} :
                {{ availableItem.remaining_quantity }}
              </li>
            </ul>
          </div>
          <div v-if="item.expired_quantity">
            Expired quantity: {{ item.expired_quantity }}
            <ul class="custom-ul">
              <li v-for="(exItem, idx) in item.expired_stocks" :key="`ex-${idx}`">
                Stocked on
                {{ exItem.entry_timestamp | customDatetime }} :
                {{ exItem.remaining_quantity }}
              </li>
            </ul>
          </div>
          <span>Description: {{ item.description }}</span>
        </div>
      </div>
    </div>

    <restockItem v-if="isShowRestockItem" :id="selectedItemId" @close="hideRestockDialog" @completed="completeRestockItem" />

    <putToUseItem v-if="isShowPutToUseItem" :id="selectedItemId" @close="hidePutToUseDialog" @completed="completePutToUseItem" />

    <disposeItem v-if="isShowDisposeItem" :id="selectedItemId" @close="hideDisposeDialog" @completed="completeDisposeItem" />
  </div>
</template>

<script src="./component.js"></script>

<style lang="scss" scoped>
.main-content-wrapper {
  display: flex;
  flex-direction: row;
  padding: 10px;
  max-height: calc(100vh - 60px);
  overflow-y: hidden;
  .data-content {
    min-height: calc(100vh - 120px);
    display: block;
    border-radius: 3px;
  }
  .left-section {
    flex: 0 0 230px;
    max-width: 230px;
    @media screen and (max-width: 480px) {
      flex: 0 0 45vw;
      max-width: 45vw;
    }
    margin-right: 10px;
    padding: 10px;
    background-color: #f1f3f4;
    border-radius: 3px;
  }
  .right-section {
    flex-grow: 1;
    padding: 10px;
    background-color: #f1f3f4;
    border-radius: 3px;
  }
  .custom-card {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    background: #fff;
    padding: 5px;
    margin: 5px 0;
    &.selected {
      outline: 0;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
    }
    .title-wrapper {
      display: flex;
      align-items: center;
      padding-bottom: 5px;
      margin-bottom: 3px;
      border-bottom: 1px solid #ccc;
      .title {
        flex-grow: 1;
        font-size: 16px;
        &.inactive {
          color: red;
        }
      }
      .actions {
        display: flex;
        .btn-action {
          font-size: 10px;
        }
      }
    }
    .desc {
      font-size: 12px;
      text-align: justify;
      @supports (-webkit-line-clamp: 3) {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: initial;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
