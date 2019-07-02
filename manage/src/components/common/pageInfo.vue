<template>
    <el-pagination
      class="el-pagination"
      background
      layout="prev, pager, next"
      @current-change="disAction"
      :page-size="$store.state.pageSize"
      :total="$store.state.total"
      ></el-pagination>
</template>

<script>
export default {
  name: "",
  props:["actionName"],
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted() {
    this.disAction();
  },

  methods: {
    disAction(pageIndex=1){
      this.$store.dispatch(this.actionName,{pageIndex});
    }
  }
};
</script>
<style scoped>
    .el-pagination{
      float: right;
    }
</style>