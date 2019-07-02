<template>
  <div>
    <el-dialog title="添加店铺类别" :visible="visible" @update:visible="changeVisible">
      <el-form :model="form" ref="myForm">
        <el-form-item label="店铺类别名称" prop="shopTypeName" label-width="120px">
          <el-input v-model="form.shopTypeName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload
            :on-success="success"
            ref="picInfo"
            name="shopTypePic"
            :data="form"
            :auto-upload="false"
            class="upload-demo"
            action="/ele/shopType"
            list-type="picture"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeVisible(false)">取 消</el-button>
        <el-button type="primary" @click="addShopType">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "add-shop-type",
  props: ["visible"],
  data() {
    return {
      form: {
        shopTypeName: ""
      }
    };
  },
  methods: {
    changeVisible(v) {
      this.$emit("update:visible", v);
    },
    success() {
      this.$refs.picInfo.clearFiles(); // 清空上传文件列表
      this.$refs["myForm"].resetFields(); // 清空表单
      this.changeVisible(false);
      this.$store.dispatch("getShopType",{pageIndex:1});
      if(this.$router.name !== "shopType"){
          this.$router.push({name:"shopType"})
      }
    },
    addShopType() {
      this.$refs.picInfo.submit(); 
    }
  },
};
</script>
<style scoped>
</style>