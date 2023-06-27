const menuList = [
  {
    id: '1',
    icon: 's-home',
    name: '主页',
    route: '/home/dashboard'
  },
  {
    id: '2',
    icon: 'eleme',
    name: 'demo',
    children: [
      { id: '21', name: '表格', icon: 's-grid', route: '/home/demo/list' },
      { id: '22', name: '表单', icon: 's-grid', route: '/home/demo/form' },
    ],
  },
  {
    id: '3',
    icon: 'eleme',
    name: '商品管理',
    route: '/home/goods'
  },
  {
    id: '4',
    icon: 'eleme',
    name: '运营管理',
    route: '/home/operation'
  },
  {
    id: '4',
    icon: 'eleme',
    name: '订单管理',
    route: '/home/orders'
  },
]

export default menuList