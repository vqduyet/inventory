<template>
  <div>
    <div class="modal custom-modal" role="dialog">
      <div class="mask" @click="close" />
      <div class="modal-dialog">
        <div class="modal-content" v-if="item" v-loading="loading">
          <div class="modal-header text-center">
            <div class="modal-title">Assign Storage to Users</div>
          </div>
          <div class="modal-body custom-modal-body scrollbar">
            <div class="row mb-2">
              <div class="col col-12 d-flex">
                <span>
                  <small>Name: {{ item.name }}</small>
                </span>
              </div>
            </div>
            <hr />
            <div class="row mb-2">
              <div class="col col-12 d-flex">
                <div class="section-left">
                  <div>
                    <span>Available Users</span>
                    <hr />
                  </div>
                  <div class="item-card" v-for="(availableUser, idx) in availableUsers" :key="`avu-${idx}`">
                    <div class="card-section-left">
                      <span>Name: {{ availableUser.fname }} {{ availableUser.lname }} </span>
                      <span>Email: {{ availableUser.email }}</span>
                    </div>
                    <div class="card-section-right">
                      <button type="button" class="btn btn-small btn-outline-primary" @click="addUser(availableUser)" title="Add user">
                        <font-awesome-icon icon="plus" />
                      </button>
                    </div>
                  </div>
                </div>
                <div class="section-right">
                  <div>
                    <span>Assigned Users</span>
                    <hr />
                  </div>
                  <div class="item-card" v-for="(assignedUser, idx) in assignedUsers" :key="`asu-${idx}`">
                    <div class="card-section-left">
                      <span>Name: {{ assignedUser.fname }} {{ assignedUser.lname }} </span>
                      <span>Email: {{ assignedUser.email }}</span>
                    </div>
                    <div class="card-section-right">
                      <button type="button" class="btn btn-small btn-outline-warning" @click="removeUser(assignedUser)" title="Remove user">
                        <font-awesome-icon icon="trash" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-secondary btn-form-action" @click="close">Close</button>
            <button type="button" class="btn btn-primary btn-form-action" @click="save">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./component.js"></script>

<style lang="scss" scoped>
textarea {
  resize: none;
}
.section-left {
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
  background-color: #f1f1f1;
  margin-right: 5px;
  padding: 7px;
  border-radius: 5px;
}
.section-right {
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
  background-color: #f1f1f1;
  margin-left: 5px;
  padding: 7px;
  border-radius: 5px;
}
.item-card {
  background-color: #fff;
  display: flex;
  align-items: center;
  font-size: 13px;
  margin: 2px;
  padding: 7px;
  border-radius: 7px;
  .card-section-left {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>
