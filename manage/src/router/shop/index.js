import shopList from '@/views/shop/shopList';
import shopType from '@/views/shop/shopType';
export default[
  {
    path:'/shopList',
    name:'shopList',
    component:shopList,
    meta:{
      authorization:true
    }
  },
  {
    path:'/shopType',
    name:'shopType',
    component:shopType,
    meta:{
      authorization:true
    }
  },
]