const jwt = require("jwt-simple")
const key = "!@#$%$*&&";
module.exports = {
    decode(token){  //解密
        try{
            const info = jwt.decode(token,key);
            if(info.lastTime < Date.now()){
                return{
                    ok:-3,
                    msg:"令牌过期"
                }
            }else {
                return{
                    ok:1,
                    msg:"成功",
                    info
                }
            }
        }catch (err){
            return{
                ok:-3,
                msg:"解析失败"
            }
        }
    },
    encode(adminName){    //加密（生成token）
        return jwt.encode({
            adminName,
            lastTime:Date.now()+ (10 * 60 * 1000)
        },key)
    }
}