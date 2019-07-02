<template>
    <div class="scroll-list-wrap">
        <cube-scroll ref="scroll" :data="shopList" :options="options" @pulling-down="onPullingDown"
                     @pulling-up="onPullingUp">
            <div v-for="item in shopList" class="shopList" @click="$router.push('/shopDetails/'+item._id)">
                <div class="shopImg">
                    <img :src="item.shopPic |img" alt="">
                </div>
                <div class="shopDetails">
                    <p class="shopDetails-name">{{item.shopName}}</p>
                    <div class="shopDetails-fw">
                        <cube-rate v-model="value" :disabled="true"></cube-rate>
                        <span class="shopDetails-show">4.7</span>
                        <span class="shopDetails-show">月售400单</span>
                    </div>
                    <div class="shopDetails-wf">
                        <span class="shopDetails-show">￥20起送</span>
                        <span style="font-size: 0.2rem">|</span>
                        <span class="shopDetails-show">配送费￥5</span>
                    </div>
                </div>
            </div>
        </cube-scroll>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        name: "shop-list",
        props: ["shopList"],
        data(){
            return {
                value:5,
                options: {
                    pullDownRefresh: {
                        threshold: 90,
                        stop: 40,
                        txt: '刷新成功'
                    },                                // 配置下拉刷新
                    pullUpLoad: {
                        threshold: 0,
                        visible:true,
                        txt: {
                            more: '上拉加载更多',
                            noMore: '没有更多数据'
                        }
                    },                                 // 配置上拉加载，若要关闭可直接 pullUpLoad：false
                    mouseWheel: true,
                },
            }
        },
        methods:{
            // 触发下拉刷新
            onPullingDown(){
                console.log("下拉刷新");
                // 模拟更新数据
                setTimeout(() => {
                    if (Math.random() > 0.5) {
                        // 如果有新数据
                        console.log('有新数据');
                    } else {
                        // 如果没有新数据，调用 forceUpdate(), 显示成功文案，延迟 stopTime 时间完成刷新
                        this.$refs.scroll.forceUpdate();
                    }
                }, 1000)
            },
            // 触发上拉加载
            onPullingUp() {
                console.log("上拉加载");
                // 模拟更新数据
                setTimeout(() => {
                    if (Math.random() > 0.5) {
                        // 如果有新数据
                        console.log('有新数据');

                    } else {
                        // 如果没有新数据
                        this.$refs.scroll.forceUpdate();
                    }
                }, 1000);
            },
        },
        mounted(){

        }
    }
</script>

<style lang="less">
    .scroll-list-wrap{
        height: 74vw;
    }
    .shopList {
        display: flex;
        padding: 2vw 0 2vw 0;
        .shopImg {
            width: 17.3333vw;
            height: 17.3333vw;
            margin-right: 10vw;
            margin-left: 10vw;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .shopDetails-name {
            color: #333;
            font-weight: 700;
            font-size: .3rem;
            line-height: 9.0vw;
        }
        .shopDetails-fw{
            display: flex;
            align-items: center;
        }
        .cube-rate-item{
            width: 0.253333rem;
        }
        .shopDetails-show{
            margin:0 2vw 0 2vw;
            font-size: .2rem;
        }
        .shopDetails-wf{
            margin-top: 2vw;
        }
    }
</style>