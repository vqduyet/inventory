export const PERMISSIONS = {
  user: {
    read: 'Users_Read',
    create: 'Users_Create',
    update: 'Users_Update',
    delete: 'Users_Delete',
    manage: 'Users_Manage'
  },
  role: {
    read: 'Roles_Read',
    create: 'Roles_Create',
    update: 'Roles_Update',
    delete: 'Roles_Delete'
  },
  storage: {
    read: 'Storages_Read',
    create: 'Storages_Create',
    update: 'Storages_Update',
    delete: 'Storages_Delete'
  },
  category: {
    read: 'Categories_Read',
    create: 'Categories_Create',
    update: 'Categories_Update',
    delete: 'Categories_Delete'
  },
  item: {
    read: 'Items_Read',
    create: 'Items_Create',
    update: 'Items_Update',
    delete: 'Items_Delete',
    restock: 'Items_Restock',
    putToUse: 'Items_PutToUse',
    return: 'Items_Return',
    dispose: 'Items_Dispose'
  },
  menu: {
    operation: 'Menu_Operation',
    settings: 'Menu_Settings'
  }
}

export const STATUS_LIST = {
  active: {
    code: 'ACTIVE',
    name: 'Active'
  },
  inactive: {
    code: 'INACTIVE',
    name: 'Inactive'
  }
}

export const MEASURE_TYPES = [
  {
    code: 'count',
    name: 'Count'
  },
  {
    code: 'weight',
    name: 'Weight'
  },
  {
    code: 'size',
    name: 'Size'
  }
]

export const UNITS = {
  count: [
    {
      code: 'sixth_pan',
      name: '6 Pan'
    },
    {
      code: 'one_third_pan',
      name: '1/3 Pan'
    },
    {
      code: 'half_hotel_pan',
      name: 'Half Hotel Pan'
    }
  ],
  weight: [
    {
      code: 'kg',
      name: 'Kilogram'
    },
    {
      code: 'g',
      name: 'Gram'
    }
  ],
  size: [
    {
      code: 'sm',
      name: 'Small'
    },
    {
      code: 'md',
      name: 'Medium'
    },
    {
      code: 'lg',
      name: 'Large'
    }
  ]
}
