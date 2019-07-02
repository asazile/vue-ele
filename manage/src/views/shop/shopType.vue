<template>
    <div class="toolbar" style="margin-top:30px">
        <el-button @click="goHome" style="float:right">首页</el-button>

        <el-form :inline="true" class="demo-form-inline" :model="form">
            <el-form-item label="类别名字">
                <el-input placeholder="类别名称" v-model="form.shopTypeNames" @input="$store.dispatch('searchShopType',form.shopTypeNames)"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="$store.dispatch('searchShopType',form.shopTypeNames)">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="dialogFormVisible=true">添加店铺类别</el-button>
            </el-form-item>
        </el-form>

        <el-table
                v-loading="$store.state.isLoading"
                :border="true"
                :data="$store.state.shop.shopTypeList"
                style="width: 100%;margin-top:30px"
        >
            <el-table-column label="类别名称" width="180">
                <template slot-scope="scope">{{scope.row.shopTypeName }}</template>
            </el-table-column>
            <el-table-column label="添加时间" width="250">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.addTime | date}}</span>
                </template>
            </el-table-column>
            <el-table-column label="更新时间" width="250">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.upTime | date}}</span>
                </template>
            </el-table-column>
            <el-table-column label="图片" width="180">
                <template slot-scope="scope">
                    <img width="150" :src="scope.row.shopTypePic | img" alt>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="$store.dispatch('deleteShopType',scope.row._id)"
                    >删除
                    </el-button>
                    <el-button
                            size="mini"
                            type="primary"
                            @click="openAddShop(scope.row._id)"
                    >添加店铺
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <addShopType :visible.sync="dialogFormVisible"></addShopType>
        <addShop v-if="addShopVisible" :visible.sync="addShopVisible" :shop-type-id="shopTypeId"></addShop>
        <div class="toolbar" style="overflow:hidden">
            <pageInfo action-name="getShopType"></pageInfo>
        </div>
    </div>
</template>

<script>
    export default {
        name: "shop-type",
        inject: ["reload"],
        data() {
            return {
                dialogFormVisible: false,
                addShopVisible: false,
                shopTypeId: "0",
                form: {
                    shopTypeName: "",
                    shopTypeNames: ""
                }
            };
        },

        components: {},

        computed: {},

        mounted() {
            if (!localStorage.token) {
                this.$store.commit("OUT_LOGIN");
            }
        },

        methods: {
            goHome() {
                this.$router.push("/adminLog"); //根据地址进行跳转
            },
            addShopType() {
                this.$refs.picInfo.submit();
            },
            success(response) {
                this.$refs.picInfo.clearFiles(); // 清空上传文件列表
                this.$refs["myForm"].resetFields(); // 清空表单
                this.dialogFormVisible = false;
            },
            openAddShop(id) {
                this.shopTypeId = id;
                this.addShopVisible = true;
            }
        }
    };
</script>
<style scoped>
</style>