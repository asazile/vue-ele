<template>
    <div class="goods-left" ref="wrapper">
        <ul class="goods-left-name" ref="content">
            <li v-for="(item,index) in goodsTypeList" class="details-goods-z" :class="activeClass == index ? 'active' : ''" @click="createStyle(index)">
                <p>{{item.goodsTypeName}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import BScroll from 'better-scroll';
    export default {
        name: "goods-left",
        data(){
          return{
              goodsTypeList:[],
              activeClass:0
          }
        },
        methods:{
            createStyle(index){
                this.activeClass = index;
            }
        },
        mounted(){
            this.$axios.get("/ele/goodsTypeList/" + this.$route.params.shopId)
                .then(({data}) => {
                    this.goodsTypeList = data.goodsTypeList;
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
                                mouseWheel: true,
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