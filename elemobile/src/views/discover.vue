<template>
    <div class="discover">
        <div class="discover-top">
            <div class="discover-top-left">
                <p>金币商城</p>
                <span>0元好物在这里</span>
                <img src="../assets/img/discover.webp" alt="">
            </div>
            <div class="discover-top-right">
                <div class="discover-top-right-t">
                    <p style="color: rgb(27, 169, 225)">推荐有奖</p>
                    <span>20元现金拿不停</span>
                    <img src="../assets/img/discover-right.webp" alt="" class="img1">
                </div>
                <div class="discover-top-right-b">
                    <p style="color: rgb(237, 102, 96)">周边优惠</p>
                    <span>领取口碑好券</span>
                    <img src="../assets/img/discover-bottom.webp" alt="" class="img2">
                </div>
            </div>
        </div>
        <p class="topShopName">— 推荐商家 —</p>
        <shopList :shop-list="shopList" style="background: #fff;height: 120vw"></shopList>
        <loading v-show="$store.state.isLoading"></loading>
    </div>
</template>

<script>
    export default {
        name: "discover",
        data(){
            return {
                shopList:[]
            }
        },
        mounted(){
            this.$axios.get("/ele/topShop")
                .then(({data}) => {
                    this.shopList = data.shopList;
                })
        }
    }
</script>

<style scoped>
    .discover p{
        font-size: .426667rem;
        line-height: 1.2;
        margin-bottom: 1.6vw;
    }
    .discover span{
        font-size: .32rem;
        display: block;
        line-height: 1.2;
        color: #999;
    }
    .discover-top{
        border-top: 1px solid #ededed;
        height: 35vw;
        margin-bottom: 2.8vw;
        background: #fff;
        display: flex;
    }
    .discover-top-left{
        padding: 5vw 5vw;
        width: 50%;
    }
    .discover-top-left p{
        color: rgb(255, 153, 0);
    }
    .discover-top-left img{
        width: 20vw;
        position: absolute;
        left: 30vw;
        top:15vw;
    }
    .discover-top-right-t{
        position: relative;
        margin-top: 5vw;
    }
    .img1{
        width: 12vw;
        position: absolute;
        top:0;
        right: -15vw;
    }
    .discover-top-right-b{
        position: relative;
        margin-top: 5vw;
    }
    .img2{
        width: 12vw;
        position: absolute;
        bottom:0vw;
        right: -15vw;
    }
</style>