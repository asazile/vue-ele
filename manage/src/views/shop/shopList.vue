<template>
    <div style="margin-top:30px" class="toolbar">
        <el-button @click="goHome" style="float:right">首页</el-button>
        <el-form :inline="true" class="demo-form-inline" :model="form">
            <el-form-item label="店铺名称">
                <el-input placeholder="搜索店铺名称" v-model="form.shopName" @input="$store.dispatch('searchShop',form.shopName)"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="$store.dispatch('searchShop',form.shopName)">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="addShopVisible=true">添加店铺</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="dialogFormVisible=true">添加店铺类别</el-button>
            </el-form-item>
            <span style="margin-left:300px"></span>
            <el-form-item>
                <el-select v-model="shopTypeId" @change="changeShop" placeholder="请选择店铺类别">
                    <el-option
                            v-for="item in $store.state.shop.shopTypeList"
                            :key="item._id"
                            :label="item.shopTypeName"
                            :value="item._id"
                    ></el-option>
                </el-select>

                <el-select v-model="shopId" placeholder="请选择店铺">
                    <el-option
                            v-for="item in $store.state.shop.shopList"
                            :key="item._id"
                            :label="item.shopName"
                            :value="item._id"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <el-table
                v-loading="$store.state.isLoading"
                :border="true"
                :data="$store.state.shop.shopList"
                style="width: 100%;margin-top:30px"
        >
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
            <el-table-column label="店铺名称" width="180">
                <template slot-scope="scope">{{scope.row.shopName}}</template>
            </el-table-column>

            <el-table-column label="店铺类别名称" width="180">
                <template slot-scope="scope">{{scope.row.shopTypeName}}</template>
            </el-table-column>

            <el-table-column label="图片" width="180">
                <template slot-scope="scope">
                    <img width="150" :src="scope.row.shopPic | img" alt>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="$store.dispatch('deleteShop',scope.row._id)"
                    >删除
                    </el-button>
                    <el-button size="mini" @click="openAddGoodsType(scope.row.shopTypeId,scope.row._id)" type="primary">
                        添加商品类别
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="toolbar" style="overflow:hidden">
            <pageInfo action-name="getShop"></pageInfo>
        </div>
        <addShopType :visible.sync="dialogFormVisible"></addShopType>
        <addShop :visible.sync="addShopVisible"></addShop>
        <addGoodsType v-if="addGoodsTypeVisible" :visible.sync="addGoodsTypeVisible" :shop-type-id="shopTypeId"
                      :shop-id="shopId"></addGoodsType>
    </div>
</template>

<script>
    export default {
        name: "shop-list",
        data() {
            return {
                dialogFormVisible: false,
                addShopVisible: false,
                addGoodsTypeVisible: false,
                shopTypeId: "",
                shopId: "",
                form:{
                    shopName:""
                }
            };
        },

        components: {},

        computed: {},

        mounted() {
            this.$store.dispatch("getAllShopType");
        },

        methods: {
            goHome() {
                this.$router.push("/adminLog"); //根据地址进行跳转
            },
            changeShop(v) {
                this.shopId = "";
                this.$store.dispatch("getShopList", v);
            },
            openAddGoodsType(shopTypeId, shopId) {
                this.shopTypeId = shopTypeId;
                this.shopId = shopId;
                this.addGoodsTypeVisible = true;
            }
        }
    };
</script>
<style scoped>
</style>