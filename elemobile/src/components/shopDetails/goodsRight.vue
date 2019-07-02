<template>
    <div ref="wrapper" style="height: 60vw;overflow: hidden;z-index: 1;margin-bottom: 15vw" class="goods-right">
        <ul ref="content">
            <li v-for="item in goodsList" class="details-goods" style="display: flex;margin-bottom: 2vw">
                <div class="details-goods-img" style="margin-left: 4vw;margin-right: 2vw">
                    <img :src="item.goodsPic |img" alt="">
                </div>
                <div style="margin-left: 3vw;display: flex;flex-direction: column;justify-content: space-around">
                    <p class="details-top-goods-name" style="font-weight: 700;font-size: .5rem;">{{item.goodsName}}</p>
                    <span style="font-size:.366667rem;line-height: 1;color: #999;">月售12 好评率100%</span>
                    <div class="details-goods-c">
                        <span style="margin-right: 15vw">￥{{item.goodsPrice}}</span>
                        <span class="tianjia" style="width: 6vw;height: 6vw;font-size:.646667rem;line-height: 6vw">+</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';

    export default {
        name: "goods-right",
        data(){
            return{
                goodsList:[]
            }
        },
        mounted(){
            this.$axios.get("/ele/goodsList/" + this.$route.params.shopId)
                .then(({data}) => {
                    this.goodsList = data.goodsList;
                    this.$nextTick(() => {
                        //$refs绑定元素
                        if(!this.scroll){
                            this.scroll = new BScroll(this.$refs.wrapper, {
                                //开启点击事件 默认为false
                                click:true,
                                bounce: {
                                    top: false,
                                    bottom: false,
                                    left: false,
                                    right: false
                                },
                                mouseWheel:true
                            })
                            // console.log(this.scroll)
                        }else if(!this.$refs.wrapper){
                            return
                        }
                        else{
                            this.scroll.refresh()
                        }
                    })
                })
        }
    }
</script>

<style scoped>

</style>