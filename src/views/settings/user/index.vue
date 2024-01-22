<template>
  <div class="mainContent" v-loading="loading">
    <div class="row">
      <div class="col-12">
        <table class="table table-hover table-responsive-sm mb-0">
          <thead>
            <tr>
              <th>No.</th>
              <th>Username</th>
              <th>Name</th>
              <th>Info</th>
              <th>Role</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td class="no">
                {{ index + 1 + searchParams.paging.size * (searchParams.paging.page - 1) }}
              </td>
              <td>{{ item.user_name }}</td>
              <td>{{ item.fname }} {{ item.lname }}</td>
              <td>
                <div class="d-flex flex-column">
                  <small>Email: {{ item.email }}</small>
                  <small>Phone: {{ item.phone }}</small>
                </div>
              </td>
              <td>{{ item.role_id }}</td>
              <td class="text-center">
                <template v-if="_checkPermissions([PERMISSIONS.user.update]) && item.role_id !== 'SystemAdmin'">
                  <button type="button" class="btn btn-small btn-outline-primary" @click="showAddEdit(item.user_id)" title="Edit">
                    <font-awesome-icon icon="edit" />
                  </button>
                </template>
                <template v-else />
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="7">
                <commons-pager
                  :loadContentAtPage="loadPage"
                  :page="searchParams.paging.page"
                  :size="searchParams.paging.size"
                  :total="searchParams.paging.total"
                  :pagerFull="false"
                  v-if="searchParams.paging.total > searchParams.paging.size"
                />
                <button type="button" class="btn btn-primary" @click="showAddEdit(null)" v-if="_checkPermissions([PERMISSIONS.user.create])">
                  <font-awesome-icon icon="plus" />
                  <span class="ml-2">Add user</span>
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <addEditItem v-if="isShowAddEdit" :id="selectedItemId" @close="hideAddEdit" @completed="completeAddEdit($event)" />
  </div>
</template>

<script src="./component.js"></script>
