import goodsList from '@/views/goods/goodsList';
import goodsType from '@/views/goods/goodsType';
export default[
  {
    path:'/goodsList',
    name:'goodsList',
    component:goodsList,
    meta:{
      authorization:true
    }
  },
  {
    path:'/goodsType',
    name:'goodsType',
    component:goodsType,
    meta:{
      authorization:true
    }
  },
]