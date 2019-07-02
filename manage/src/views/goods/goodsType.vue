<template>
    <div>
        <div class="toolbar">
            <el-form :inline="true" class="demo-form-inline" :model="form">
                <el-form-item label="商品类别名称">
                    <el-input placeholder="搜索商品类别名称" v-model="form.goodsTypeName"
                              @input="$store.dispatch('searchGoodsType',form.goodsTypeName)"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="$store.dispatch('searchGoodsType',form.goodsTypeName)">查询
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="addGoodsTypeVisible=true">添加商品类别</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table
                v-loading="$store.state.isLoading"
                :border="true"
                :data="$store.state.goods.goodsTypeList"
                style="width: 100%;margin-top:30px"
        >
            <el-table-column label="商品类别名称" width="180">
                <template slot-scope="scope">{{scope.row.goodsTypeName }}</template>
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
                    <img width="150" :src="scope.row.goodsTypePic | img" alt>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="$store.dispatch('deleteGoodsType',scope.row._id)"
                    >删除
                    </el-button>
                    <el-button
                            size="mini"
                            type="primary"
                            @click="openAddGoods(scope.row.shopTypeId,scope.row.shopId,scope.row._id)"
                    >添加商品
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <pageInfo action-name="getGoodsType"></pageInfo>
        <addGoods
                v-if="addGoodsVisible"
                :visible.sync="addGoodsVisible"
                :shop-type-id="shopTypeId"
                :shop-id="shopId"
                :goods-type-id="goodsTypeId"
        ></addGoods>
        <addGoodsType :visible.sync="addGoodsTypeVisible"></addGoodsType>
    </div>
</template>

<script>
    export default {
        name: "goods-type",
        data() {
            return {
                addGoodsTypeVisible: false,
                addGoodsVisible: false,
                shopTypeId: "",
                shopId: "",
                goodsTypeId: "",
                form: {
                    goodsTypeName: ""
                }
            };
        },

        components: {},

        computed: {},

        mounted() {

        },

        methods: {
            openAddGoods(shopTypeId, shopId, goodsTypeId) {
                this.shopTypeId = shopTypeId;
                this.shopId = shopId;
                this.goodsTypeId = goodsTypeId;
                this.addGoodsVisible = true;
                console.log(this.$store.state.goods.goodsTypeList)
            }
        }
    };
</script>
<style scoped>
</style>