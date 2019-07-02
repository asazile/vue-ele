<template>
    <el-form :model="ruleForm" class="container" :rules="rules"ref="adminForm">
        <h4>饿了么后台管理系统</h4>
        <el-form-item prop = "adminName">
            <el-input v-model="ruleForm.adminName" placeHolder="管理员账号"></el-input>
        </el-form-item>
        <el-form-item prop = "passWord">
            <el-input v-model="ruleForm.passWord" type="password" placeHolder="管理员密码"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button style="width: 100%" :loading="$store.state.isLoading" @click="submitForm('adminForm')">登陆</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: "Login",
    data(){
        return{
            ruleForm:{
                adminName:"",
                passWord:"",
            },
            rules:{
                adminName: [
                    { required: true, message: '请输入管理员账号', trigger: 'blur' },
                    { min: 3, max: 10, message: '管理员账号在3到10个字符', trigger: 'blur' }
                ],
                passWord: [
                    { required: true, message: '请输入管理员密码', trigger: 'blur' },
                    { min: 5, max: 16, message: '管理员密码在5到16个字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        submitForm(formName) {
            console.log(this.$store.state.isLoading)
            this.$refs[formName].validate((valid) => {
//                console.log(this.$refs[formName])
                if (valid) {
//                    this.isLoading = true;
                    this.$store.dispatch("login",this);
                } else {

                }
            });
        },
    }

}
</script>

<style scoped lang="less">
    .container{
        width: 350px;
        margin: 130px auto;
        border:1px solid #eaeaea;
        padding:10px 30px;
        box-shadow: 0 0 30px #ccc;
        h4{
            font-family: "arial";
            text-align: center;
            color: #409eff;
            padding: 20px
        }
    }
</style>