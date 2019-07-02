<template>
    <el-dialog title="添加商品" :visible="visible" @update:visible="changeVisible">
        <el-form :model="form" ref="myForm">
            <el-form-item label="商品名称" prop="goodsName" label-width="120px" style="margin-bottom:30px">
                <el-input v-model="form.goodsName" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item style="margin-left:120px;margin-bottom:30px">
                <el-select :disabled="disabled" v-model="form.shopTypeId" @change="changeShop" placeholder="请选择店铺类别">
                    <el-option
                            v-for="item in $store.state.shop.shopTypeList"
                            :key="item._id"
                            :label="item.shopTypeName"
                            :value="item._id"
                    ></el-option>
                </el-select>
                <el-select :disabled="disabled" v-model="form.shopId" placeholder="请选择店铺" @change="changeGoodsType">
                    <el-option
                            v-for="item in $store.state.shop.shopList"
                            :key="item._id"
                            :label="item.shopName"
                            :value="item._id"
                    ></el-option>
                </el-select>
                <el-select :disabled="disabled" v-model="form.goodsTypeId" placeholder="请选择商品类别">
                    <el-option
                            v-for="item in $store.state.goods.goodsTypeList"
                            :key="item._id"
                            :label="item.goodsTypeName"
                            :value="item._id"
                    ></el-option>
                </el-select>

            </el-form-item>
            <el-form-item label="商品价格" prop="goodsPrice" label-width="120px" style="margin-bottom:30px">
                <el-input v-model="form.goodsPrice" autocomplete="off"></el-input>
            </el-form-item>

            <el-checkbox v-model="form.checked" style="margin-left:50px;margin-bottom: 30px">是否作为推荐</el-checkbox>

            <el-form-item>
                <el-upload
                        :on-success="success"
                        ref="picInfo"
                        :headers="{authorization:$store.state.token}"
                        name="goodsPic"
                        :data="form"
                        :auto-upload="false"
                        class="upload-demo"
                        action="/ele/goods"
                        list-type="picture"
                >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="changeVisible(false)">取 消</el-button>
            <el-button type="primary" @click="addGoods">提 交</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "add-goods",
        props: ["visible", "shopTypeId", "shopId", "goodsTypeId"],
        data() {
            return {
                form: {
                    goodsName: "",
                    shopTypeId: "",
                    shopId: "",
                    goodsTypeId: "",
                    checked: ""
                },
                goodsTypeList: [],
                disabled: false
            };
        },

        components: {},

        computed: {},

        mounted() {
            this.$store.dispatch("getAllGoodsType");
            if (this.shopTypeId) {
                this.form.shopTypeId = this.shopTypeId;
                this.changeShop(this.shopTypeId);
            }
            if (this.shopId) {
                this.form.shopId = this.shopId;
                this.changeGoodsType(this.shopId);
            }
            if (this.goodsTypeId) {
                this.form.goodsTypeId = this.goodsTypeId;
                this.disabled = true;
            }
        },

        methods: {
            changeVisible(v) {
                this.$emit("update:visible", v);
            },
            success() {
                this.$refs.picInfo.clearFiles(); // 清空上传文件列表
                this.$refs["myForm"].resetFields(); // 清空表单
                this.changeVisible(false);
                this.$store.dispatch("getGoods", {pageIndex: 1});
                if (this.$router.name !== "goodsList") {
                    this.$router.push({name: "goodsList"});
                }
            },
            addGoods() {
                this.$refs.picInfo.submit();
            },
            changeShop(v) {
                this.form.shopId = "";
                this.form.goodsTypeId = "";
                this.$store.dispatch("getShopList", v);
            },
            changeGoodsType(m) {
                this.form.goodsTypeId = "";
                this.$store.dispatch("getGoodsTypeList", m);
            },
        }
    };
</script>
<style scoped>
</style>