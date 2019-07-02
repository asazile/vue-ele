<template>
    <!--loading框-->
    <div class="comp-loading">
        <div class="comp-loading-box">
            <img src="@/assets/img/loading.png"/>
            <p>Loading...</p>
        </div>
    </div>
</template>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .comp-loading {
        &-box {
            z-index: 10000;
            position: fixed;
            top: 40%;
            left: 50%;
            width: 160px;
            margin-left: -80px;
            padding: 30px 0;
            border-radius: 10px;
            background-color: rgba(0,0,0,.7);
            img {
                display: block;
                width: 60px;
                height: 60px;
                margin: 0 auto;
                animation: comp-loading-spin 1200ms infinite linear;
            }
            p {
                font-size: 26px;
                color: #fff;
                text-align: center;
                line-height: 26px;
                padding-top: 14px;
            }
        }
    }
    @keyframes comp-loading-spin {
        0%   { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>