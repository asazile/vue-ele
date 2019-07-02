<template>
    <div>
        <div v-for="key in shopList">
            <div class="details-banner">
                <span class="back" @click="$router.go(-1)"><</span>
                <img src="@/assets/img/details.webp" alt="">
                <div class="details-shop-pic">
                    <img :src="key.shopPic | img" alt="">
                </div>
            </div>
            <div class="assist"></div>
            <div class="details-shop-name">{{key.shopName}}</div>
            <div class="details-shop-fw">
                <span>评价4.5</span>
                <span>月售707单</span>
                <span>蜂鸟快送约31分钟</span>
            </div>
            <div class="details-shop-c">
                <div class="details-shop-qw">
                    <span>￥6</span>
                    <span>无门槛</span>
                    <span>领券</span>
                </div>
                <div class="details-shop-qw details-shop-er">
                    <span>￥5</span>
                    <span>满100可用</span>
                    <span>领取</span>
                </div>
            </div>
        </div>
        <div class="details-goods-banner">
            <img src="@/assets/img/huoguo.webp" alt="">
        </div>
        <p class="details-goods-recommend">商家推荐</p>
        <topGoods></topGoods>
        <div class="goods-lr">
            <goodsLeft></goodsLeft>
            <goodsRight></goodsRight>
        </div>
        <div>
            <loading v-show="$store.state.isLoading"></loading>
        </div>
        <div class="details-shop-footer">
            <div class="details-shop-footer-gwc">
                <i class="iconfont icon-gouwuche1"></i>
            </div>
            <div>
                <p>未选购商品</p>
                <p>另需配送费5元</p>
            </div>
            <div>
                <span>15起送</span>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';

    export default {
        name: "shop-details",
        data() {
            return {
                shopList: [],
            }
        },
        mounted() {
            this.$axios.get("/ele/allshopList/" + this.$route.params.shopId)
                .then(({data}) => {
                    this.shopList = data.shopList;
                })
        },
    }
</script>

<style scoped>
    @import "~@/assets/css/shoplist/shopdetails.css";
</style>