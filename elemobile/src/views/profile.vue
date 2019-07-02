<template>
    <div class="max-box">
        <div class="head">
            <div class="my-pt">
                <span style="background-position: 0px 4rem; background-size: 2rem;"></span>
            </div>
            <div>
                <p>63bb89api</p>
                <p>130****5020</p>
            </div>
            <div> <span>></span> </div>
        </div>
        <div class="price">
            <div>
                <p>0
                    <span>个</span>
                </p>
                <p>红包</p>
            </div>
            <div>
                <p>85
                    <span>个</span>
                </p>
                <p>金币</p>
            </div>
        </div>
        <div class="add-main">
            <div class="my-address">
                <div>
                    <i class="iconfont icon-location"></i>
                    <p>我的地址</p>
                </div>
                <p class="abc"> > </p>
            </div>
        </div>
        <div class="add-main">
            <div class="my-address">
                <div>
                    <i class="iconfont icon-jinbishangcheng"></i>
                    <p>金币商城</p>
                </div>
                <p class="abc"> > </p>
            </div>
            <div class="my-address">
                <div>
                    <i class="iconfont"></i>
                    <p>分享拿20元现金</p>
                </div>
                <p class="abc"> > </p>
            </div>
        </div>
        <div class="add-main">
            <div class="my-address">
                <div>
                    <i class="iconfont"></i>
                    <p>我的客服</p>
                </div>
                <p class="abc"> > </p>
            </div>
            <div class="my-address">
                <div>
                    <i class="iconfont"></i>
                    <p>下载饿了么App</p>
                </div>
                <p class="abc"> > </p>
            </div>
            <div class="my-address">
                <div>
                    <i class="iconfont"></i>
                    <p>规则中心</p>
                </div>
                <p class="abc"> > </p>
            </div>
        </div>
        <div class="privacy">隐私政策</div>
        <loading v-show="$store.state.isLoading"></loading>
    </div>
</template>

<script>
    export default {
        name: "profile"
    }
</script>

<style scoped>
    .max-box{
        height:100%;
        margin-bottom: 5vw;
    }
    .head{
        display: flex;
        background:#0085ff;
        padding: 0.5rem 0.4rem;
        align-items: center;
        justify-content:space-between;
    }
    .my-pt span{
        display: block;
        width: 2rem;
        height:2rem;
        background: url(//shadow.elemecdn.com/faas/h5/static/sprite.3ffb5d8.png);
        border-radius: 50%;
    }
    .head div:nth-child(2){
        margin-right:3.9rem;
    }
    .head div:nth-child(2) p:nth-child(1){
        font-size: 0.5rem;
        color:#fff;
        font-weight: 700;
        line-height: 0.6rem;
    }
    .head div:nth-child(2) p:nth-child(2){
        font-size: 0.3rem;
        color:#fff;
        line-height: 0.8rem;
    }
    .head div:nth-child(3) span{
        color:#fff;
        font-size: 0.6rem;
    }
    .price{
        display: flex;
        background:#fff;
    }
    .price div:nth-child(1){
        width: 50%;
        border-right: 0.005vw solid #ddd;
        height: 100%;
        text-align: center;
        padding-top:0.4rem;
    }
    .price div:nth-child(2){
        width: 50%;
        height:100%;
        text-align: center;
        padding-top:0.4rem;
    }
    .price div:nth-child(1) p:nth-child(1){
        font-size: .693333rem;
        font-weight: 700;
        color: rgb(255, 95, 62);
    }
    .price div:nth-child(1) p:nth-child(1) span{
        font-size: 0.4rem;
        color: rgb(247, 108, 108);
    }
    .price div:nth-child(1) p:nth-child(2){
        color: #666;
        font-weight: 700;
        font-size: 0.32rem;
        line-height: 0.6rem;
    }
    .price div:nth-child(2) p:nth-child(1){
        font-size: .693333rem;
        font-weight: 700;
        color: rgb(255, 95, 62);
    }
    .price div:nth-child(2) p:nth-child(1) span{
        font-size: 0.4rem;
        color: rgb(247, 108, 108);
    }
    .price div:nth-child(2) p:nth-child(2){
        color: #666;
        font-weight: 700;
        font-size: 0.32rem;
        line-height: 0.6rem;
    }
    .my-address{
        display: flex;
        justify-content: space-between;
        padding: 0.3rem 0.4rem;
        line-height: 0.6rem;
    }
    .my-address .iconfont{
        font-size: 0.5rem;
        color: #666;
        margin-right:0.2rem;
    }
    .my-address p{
        display: inline-block;
        font-size: 0.4rem;
        color: #666;
    }
    .add-main{
        margin-top:0.3rem;
        background: #fff;
    }
    .privacy{
        text-align: center;
        font-size: 0.4rem;
        color:#4da6f0;
        line-height: 2.8;
    }
    .abc{
        color: #bbb !important;
    }
</style>
