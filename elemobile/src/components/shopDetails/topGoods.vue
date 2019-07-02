<template>
    <div class="wrapper" ref="wrapper">
        <ul class="content" ref="content">
            <li v-for="item in topGoodsList" class="details-goods">
                <div class="details-goods-img">
                    <img :src="item.goodsPic |img" alt="">
                    <p class="details-top-goods-name">{{item.goodsName}}</p>
                    <span>月售12 好评率100%</span>
                    <div class="details-goods-c">
                        <span>￥{{item.goodsPrice}}</span>
                        <span class="tianjia">+</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    export default {
        name: "top-goods",
        data(){
          return{
              topGoodsList:[]
          }
        },
        methods:{
            _initPics() {
                if (this.topGoodsList) {
                    let picWidth = 30;
                    let margin = 6;
                    //width是所有图片的宽度和以及margin的大小和

                    let width = (picWidth + margin) * this.topGoodsList.length - margin;
                    console.log(width);
                    this.$refs.content.style.width = width + 'vw';
                    this.$nextTick(() => {
                        if (!this.Scroll) {
                            this.Scroll = new BScroll(this.$refs.wrapper, {
                                startX: 0,
                                click: true,
                                scrollX: true,
                                eventPassthrough:'vertical',
                                bounce: {
                                    top: false,
                                    bottom: false,
                                    left: false,
                                    right: false
                                },
                            });
                        } else {
                            this.Scroll.refresh();
                        }
                    });
                }

            }
        },
        mounted(){
            this.$axios.get("/ele/topGoods/" + this.$route.params.shopId)
                .then(({data}) => {
                    this.topGoodsList = data.goodsList;
                    this.$nextTick(() => {
                        this._initPics();
                    });
                    console.log(this.topGoodsList)
                })
        },
        watch:{
            //监听topGoodsList变量的值的变化在初始化
            //防止滚动不生效
//            topGoodsList(){
//                this.$nextTick(() => {
//                    this._initPics();
//                });
//                console.log(this.topGoodsList)
//            }
        }
    }
</script>

<style scoped>

</style>