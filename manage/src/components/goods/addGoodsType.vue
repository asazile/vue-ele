<template>
  <el-dialog title="添加商品类别" :visible="visible" @update:visible="changeVisible">
    <el-form :model="form" ref="myForm">
      <el-form-item
        label="商品类别名称"
        prop="goodsTypeName"
        label-width="120px"
        style="margin-bottom:30px"
      >
        <el-input v-model="form.goodsTypeName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="店铺" prop="shopId" label-width="120px"></el-form-item>

      <el-form-item style="margin-left:120px">
        <el-select :disabled="disabled" v-model="form.shopTypeId" @change="changeShop" placeholder="请选择店铺类别">
          <el-option
            v-for="item in $store.state.shop.shopTypeList"
            :key="item._id"
            :label="item.shopTypeName"
            :value="item._id"
          ></el-option>
        </el-select>
        <el-select :disabled="disabled" v-model="form.shopId" placeholder="请选择店铺">
          <el-option
            v-for="item in $store.state.shop.shopList"
            :key="item._id"
            :label="item.shopName"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-upload
          :on-success="success"
          ref="picInfo"
          :headers="{authorization:$store.state.token}"
          name="goodsTypePic"
          :data="form"
          :auto-upload="false"
          class="upload-demo"
          action="/ele/goodsType"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="changeVisible(false)">取 消</el-button>
      <el-button type="primary" @click="addGoodsType">提 交</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "add-goods",
  props: ["visible", "shopTypeId", "shopId"],
  data() {
    return {
      form: {
        goodsTypeName: "",
        shopId: "",
        shopTypeId: ""
      },
      shopTypeList: [],
      shopList: [],
      disabled:false
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.$store.dispatch("getAllShopType");

    if (this.shopTypeId) {
      this.form.shopTypeId = this.shopTypeId;
    }
    if (this.shopId) {
      this.form.shopId = this.shopId;
      this.disabled = true;
    }
  },

  methods: {
    changeVisible(bool) {
      this.$emit("update:visible", bool);
    },
    success() {
      this.$refs.picInfo.clearFiles(); // 清空上传文件列表
      this.$refs["myForm"].resetFields(); // 清空表单
      this.changeVisible(false);
      this.$store.dispatch("getGoodsType", { pageIndex: 1 });
      if (this.$router.name !== "goodsType") {
        this.$router.push({ name: "goodsType" });
      }
    },
    addGoodsType() {
      this.$refs.picInfo.submit();
    },
    changeShop(v) {
      this.form.shopId = "";
      this.$store.dispatch("getShopList", v);
    }
  }
};
</script>
<style scoped>
</style>