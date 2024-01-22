<template>
  <div class="mainContent" v-loading="loading">
    <div class="row">
      <div class="col-12">
        <table class="table table-hover table-responsive-sm mb-0">
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Description</th>
              <th>Storage</th>
              <th class="text-center">Status</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td class="no">
                {{ index + 1 + searchParams.paging.size * (searchParams.paging.page - 1) }}
              </td>
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.storage_name }}</td>
              <td class="text-center">
                <span
                  class="badge"
                  :class="{
                    'badge-info-border': item.status === 'ACTIVE',
                    'badge-danger-border': item.status === 'INACTIVE'
                  }"
                >
                  {{ item.status | nameFromCode(statusList) }}
                </span>
              </td>
              <td class="text-center">
                <template v-if="_checkPermissions([PERMISSIONS.category.update])">
                  <button type="button" class="btn btn-small btn-outline-primary" @click="showAddEditCategory(item.id)" title="Edit">
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
                <button type="button" class="btn btn-primary" @click="showAddEditCategory(null)" v-if="_checkPermissions([PERMISSIONS.category.create])">
                  <font-awesome-icon icon="plus" />
                  <span class="ml-2">Add category</span>
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>

    <addEditItem v-if="isShowAddEditCategory" :id="selectedItemId" @close="hideAddEditCategory" @completed="completeAddEditCategory($event)" />
  </div>
</template>

<script src="./component.js"></script>
