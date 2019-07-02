<template>
    <div class="home">
        <header>
            <input type="text" placeholder="搜索饿了么商家、商品名称" class="header-search">
        </header>
        <section>
            <!--店铺轮播图-->
            <side></side>
            <!--banner-->
            <div class="banner" style="margin-top: 6vw">
                <div class="banner-nomove">
                    <img src="@/assets/img/banner2.jpg" alt="" style="width: 100%;">
                </div>
                <cube-slide ref="slide" :data="items">
                    <cube-slide-item v-for="(item, index) in items" :key="index"
                                     @click.native="">
                        <a :href="item.url" class="banner-a">
                            <img :src="item.image" class="banner-img">
                        </a>
                    </cube-slide-item>
                </cube-slide>
            </div>
            <!--商家推荐-->
            <p class="topShopName">— 推荐商家 —</p>
            <shopList :shop-list="shopList"></shopList>
            <loading v-show="$store.state.isLoading"></loading>
        </section>
    </div>
</template>

<script>
    // @ is an alias to /src
    export default {
        name: 'home',
        data() {
            return {
                shopList: [],
                items: [
                    {
                        url: 'http://www.didichuxing.com/',
                        image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png'
                    },
                    {
                        url: 'http://www.didichuxing.com/',
                        image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png'
                    },
                    {
                        url: 'http://www.didichuxing.com/',
                        image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png'
                    }
                ]
            }
        },
        mounted() {
            this.$axios.get("/ele/topShop")
                .then(({data}) => {
                    this.shopList = data.shopList;
                })
        }
    }
</script>
<style lang="less">
    @import "~@/assets/css/home/home.css";
</style>
