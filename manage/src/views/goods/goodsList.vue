<template>
    <div style="margin-top:30px" class="toolbar">
        <el-form :inline="true" class="demo-form-inline" :model="form">
            <el-form-item label="商品名称">
                <el-input placeholder="搜索商品名称" v-model="form.goodsName"
                          @input="$store.dispatch('searchGoods',form.goodsName)"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="$store.dispatch('searchGoods',form.goodsName)">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="addGoodsVisible=true">添加商品</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="addGoodsTypeVisible=true">添加商品类别</el-button>
            </el-form-item>
            <span style="margin-left:300px"></span>
        </el-form>

        <el-table
                v-loading="$store.state.isLoading"
                :border="true"
                :data="$store.state.goods.goodsList"
                style="width: 100%;margin-top:30px"
        >
            <el-table-column label="商品类别" width="200">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.goodsTypeName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品名称" width="200">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.goodsName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品价格" width="180">
                <template slot-scope="scope">{{scope.row.goodsPrice}}</template>
            </el-table-column>

            <el-table-column label="是否为推荐商品" width="180">
                <template slot-scope="scope">{{scope.row.goodsTop}}</template>
            </el-table-column>

            <el-table-column label="图片" width="180">
                <template slot-scope="scope">
                    <img width="150" :src="scope.row.goodsPic | img" alt>
                </template>
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
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="$store.dispatch('deleteGoods',scope.row._id)"
                    >删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="toolbar" style="overflow:hidden">
            <pageInfo action-name="getGoods"></pageInfo>
        </div>
        <addGoods :visible.sync="addGoodsVisible"></addGoods>
        <addGoodsType :visible.sync="addGoodsTypeVisible"></addGoodsType>
    </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
                addGoodsTypeVisible: false,
                addGoodsVisible: false,
                form: {
                    goodsName: ""
                }
            };
        },

        components: {},

        computed: {},

        mounted() {
        },

        methods: {}
    };
</script>
<style scoped>
</style>