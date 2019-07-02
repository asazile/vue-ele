<template>
    <div>
        <cube-scroll-nav-bar :current="current" :labels="shopNames"/>
        <shopList :shop-list="shopList"></shopList>
        <loading v-show="$store.state.isLoading"></loading>
    </div>
</template>
<script>
    import ShopList from "../components/common/shopList.vue";
    export default {
        components: {ShopList},
        name: "msite",
        data() {
            return {
                shopNames: ['全部'],
                current: '全部',
                shopList: [],
            }
        },
        mounted() {
//            this.$axios.get("/ele/allShopType")
//                .then(({data}) => {
//                    for (let key in data.shopTypeList) {
//                        this.shopTypeNames.push(data.shopTypeList[key].shopTypeName);
//                    }
//                })
            this.$axios.get("/ele/shopList/" + this.$route.params.shopTypeId)
                .then(({data}) => {
                    for (let key in data.shopList) {
                        this.shopNames.push(data.shopList[key].shopName);
                    }
                    this.shopList = data.shopList;
                })
        }
    }


</script>

<style scoped>
    .scroll-list-wrap{
        height: 150vw;
    }

</style>