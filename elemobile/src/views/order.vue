<template>
    <div class="order">
        <img src="../assets/img/digdan.png" alt="">
        <p>近三个月无外卖订单记录</p>
        <loading v-show="$store.state.isLoading"></loading>
    </div>
</template>

<script>
export default {
name: "order"
}
</script>

<style scoped>
    .order img {
        display: block;
        height: 53.3vw;
        max-width: 100%;
        margin: 26.6667vw auto 0 auto;
    }
    .order{
        margin: 3.333333vw 0 2.666667vw;
        color: #6a6a6a;
        font-weight: 400;
        font-size: .453333rem;
        text-align: center;
    }
    .order p{
        margin-top: 3vw;
    }
</style>