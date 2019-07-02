<template>
    <cube-slide ref="slide" :data="items" @change="changePage" :auto-play="false">
        <cube-slide-item class="cube-slide-item" v-for="(item, index) in items" :key="index"
                         @click.native="clickHandler(item, index)">
            <div class="shopType" v-for="info in item" @click="$router.push('/msite/'+info._id)">
                <img class="topShop-img" :src="info.shopTypePic | img" alt="">
                <span class="topShop-name">{{info.shopTypeName}}</span>
            </div>
        </cube-slide-item>
    </cube-slide>
</template>

<script>
    import axios from "axios";

    export default {
        name: "slide",
        props: ["num"],
        data() {
            return {
                items: []
            }
        },
        methods: {
            changePage(current) {
                console.log('当前轮播图序号为:' + current)
            },
            clickHandler(item, index) {
                console.log(item, index)
            }
        },
        mounted() {
            axios.get("/ele/slide/" + this.num)
                .then(({data}) => {
                    this.items = data.slideList;
                })
        }
    }
</script>

<style lang="less">
    .cube-slide-item {
        margin-top: .633333rem;
        display: flex;
        flex-wrap: wrap;
        .shopType {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 20%;
            padding-bottom: 5vw;
            .topShop-name {
                font-size: .32rem;
                margin-top: 2vw;
            }
            .topShop-img {
                width: .84rem;
                height: .84rem;
                border:1px solid #fff;
                border-radius: 50%;
            }
        }
    }
    /*.cube-slide-dots{*/
        /*display: none;*/
    /*}*/
</style>