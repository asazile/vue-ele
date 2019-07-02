<template>
    <div class="elefoot">
        <cube-tab-bar
                v-model="selectedLabelDefault"
                :data="tabs"
                @click="clickHandler"
                class="cube-tab-bar">
        </cube-tab-bar>
    </div>
</template>

<script>
    export default {
        name: "ele-foot",
        data() {
            return {
                selectedLabelDefault: '首页',
                tabs: [{
                    label: '首页',
                    icon: 'iconfont icon-changyonglogo40',
                    name: 'home'
                }, {
                    label: '发现',
                    icon: 'iconfont icon-faxian',
                    name: 'discover'
                }, {
                    label: '订单',
                    icon: 'iconfont icon-dd',
                    name: 'order',
                }, {
                    label: '我的',
                    icon: 'iconfont icon-home',
                    name: 'profile'
                }]
            }
        },
        methods: {
            clickHandler(label) {
                this.$router.push({name: this.tabs.find(v => v.label === label).name})
            }
        },
        created() {
            this.selectedLabelDefault = this.tabs.find(v => v.name === this.$route.name).label;
        },
    }
</script>

<style lang="less">
    .elefoot{
        width: 100%;
        border-top: 1px solid #DCDCDC;
        position: fixed;
        bottom:0;
        left: 0;
        /*right: 0;*/
        z-index: 999;
        background: #f5f5f5;
    }
    .cube-tab-bar{
        font-size: .266667rem !important;
    }
    .cube-tab_active{
        color: #0085ff;
    }
</style>