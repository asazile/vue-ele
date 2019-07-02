<template>
    <div id="app">
        <router-view/>
        <eleFoot v-if="$route.meta.isFoot"></eleFoot>
    </div>
</template>
<script>

</script>
<style lang="less">
    body{
        background: #f5f5f5;
    }
    #app{

    }
</style>
