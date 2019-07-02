<template>
    <el-dialog title="添加店铺" :visible="visible" @update:visible="changeVisible">
        <el-form :model="form" ref="myForm">
            <el-form-item label="店铺名称" prop="shopName" label-width="120px" style="margin-bottom:30px">
                <el-input v-model="form.shopName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="店铺类别" prop="shopTypeId" label-width="120px">
                <el-select v-model="form.shopTypeId" placeholder="请选择">
                    <el-option
                            v-for="item in $store.state.shop.shopTypeList"
                            :key="item._id"
                            :label="item.shopTypeName"
                            :value="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-form-item label="是否作为推荐商家" style="margin-top: 30px;margin-bottom: 30px">
                    <el-radio-group v-model="form.resource">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-upload
                        :on-success="success"
                        ref="picInfo"
                        :headers="{authorization:$store.state.token}"
                        name="shopPic"
                        :data="form"
                        :auto-upload="false"
                        class="upload-demo"
                        action="/ele/shop"
                        list-type="picture"
                >
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="changeVisible(false)">取 消</el-button>
            <el-button type="primary" @click="addShop">提 交</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "add-shop",
        props: ["visible", "shopTypeId"],
        data() {
            return {
                form: {
                    shopName: "",
                    shopTypeId: "",
                    resource:""
                },
                shopTypeList: []
            };
        },

        components: {},

        mounted() {
            this.$store.dispatch("getAllShopType");
            if (this.shopTypeId) {
                this.form.shopTypeId = this.shopTypeId
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
                this.$store.dispatch("getShop", {pageIndex: 1});
                if (this.$router.name !== "shopList") {
                    this.$router.push({name: "shopList"});
                }
            },
            addShop() {
                this.$refs.picInfo.submit();
            }
        }
    };
</script>
<style scoped>
</style>