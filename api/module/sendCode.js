const querystring = require("querystring");
const request = require("request");
const urlencode = require("urlencode");
const help = require("./help");
const tpl_id = "164465";
const key = "c71b251b54ebba2457f3069bd34d8b30";

module.exports = function (mobile, cb) {
    let code = help.randomNum(10000,999999);
    let queryObj = {
        mobile,//接收短信的手机号码
        tpl_id,// 短信模板ID，请参考个人中心短信模板设置
        tpl_value:"#code#="+code,
        key
    }
    let url = "http://v.juhe.cn/sms/send?"+querystring.stringify(queryObj);
    request(url,function (err, response, body) {
        if(!err && response.statusCode === 200){
            var results = JSON.parse(body);
            if(results.error_code ===0){
                cb({
                    ok:1,
                    code
                })
            }else {
                cb({
                    ok:-1,
                    msg:results.reason
                })
            }
        }else {
            cb({
                ok:1,
                msg:"网络连接错误"
            })
        }
    })
}