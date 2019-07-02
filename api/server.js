const help = require("./module/help");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./module/db");
const jwt = require("./module/jwt");
const upPic = require("./module/upPic");
const mongodb = require("mongodb");
app.use(bodyParser.json());
app.use(express.static(__dirname + "/upload"));   //设置静态资源

// app.all("*",function (req, res, next) {     //后端允许跨域
//     res.header("Access-Control-Allow-Origin","*");
//     res.header("Access-Control-Allow-Headers","content-type");
//     next();
// })
/*                      管理员登录接口                      */
app.post("/login", function (req, res) {   //登录
    const adminName = req.body.adminName;
    const passWord = help.enmd5(req.body.passWord);
    db.findOne("adminList", {
        adminName,
        passWord
    }, function (err, adminInfo) {
        if (adminInfo) {
            db.updateOne("adminList", {
                _id: adminInfo._id
            }, {
                $set: {
                    loginTime: Date.now()
                }
            }, function (err, results) {
                db.insertOne("adminLoginLog", {
                    adminName: adminInfo.adminName,
                    logTime: Date.now()
                }, function (err, results) {
                    res.json({
                        ok: 1,
                        token: jwt.encode(adminInfo.adminName),
                        adminName: adminInfo.adminName,
                        msg: "登陆成功"
                    })
                })
            })
        } else help.json(res, -1, "账号或密码错误")
    })
});

// app.all("*",function(req,res,next){
//     const info = jwt.decode(req.headers.authorization);
//     if(info.ok===1){
//         next();
//     }else{
//         res.json(info);
//     }
// })

app.get("/adminLog", function (req, res) {       //获取管理员登录日志列表
    setTimeout(() => {
        const info = jwt.decode(req.headers.authorization);
        if (info.ok === 1) {
            let pageIndex = (req.query.pageIndex || 1) / 1;
            const pageSize = 5;
            db.count("adminLoginLog", {}, function (err, total) {
                db.find("adminLoginLog", {
                    skip: (pageIndex - 1) * pageSize,
                    limit: pageSize,
                    sortObj: {
                        logTime: -1
                    }
                }, function (err, adminLog) {
                    res.json({
                        ok: 1,
                        msg: "成功",
                        adminLog,
                        total,
                        pageSize
                    })
                })
            })
        } else {
            res.json(info);
        }
    }, 500)
});

app.delete("/deleteAdmin", function (req, res) {     //删除管理员登录日志
    db.deleteOneById("adminLoginLog", req.body.id, function (err, results) {
        res.json({
            ok: 1,
            msg: "删除成功"
        })
    })
});

/*                      店铺类别相关接口                      */
app.post("/shopType", function (req, res) {      //添加店铺类别
    upPic("shopTypePic", req, function (obj) {
        if (obj.ok === 3) {
            db.insertOne("shopTypeList", {
                addTime: Date.now(),
                upTime: Date.now(),
                shopTypePic: obj.params.newPicName,
                shopTypeName: obj.params.shopTypeName,
            }, function (err, results) {
                if (err) help(res)
                else help.json(res, 1, "上传成功")
            })
        } else {
            help.json(res);
        }
    })
});

app.get("/shopType", function (req, res) {        //获得店铺类别信息
    setTimeout(() => {
        let pageIndex = (req.query.pageIndex || 1) / 1;
        const pageSize = 5;
        db.count("shopTypeList", {}, function (err, total) {
            db.find("shopTypeList", {
                skip: (pageIndex - 1) * pageSize,
                limit: pageSize,
                sortObj: {
                    addTime: -1
                }
            }, function (err, shopTypeList) {
                res.json({
                    ok: 1,
                    msg: "成功",
                    shopTypeList,
                    total,
                    pageSize
                })
            })
        })
    }, 500)
});

app.get("/allShopType", function (req, res) {     //获得所有店铺类别信息
    db.find("shopTypeList", {
        sortObj: {
            addTime: -1
        }
    }, function (err, shopTypeList) {
        res.json({
            ok: 1,
            shopTypeList,
            msg: "成功"
        })
    })
});

app.delete("/deleteShopType", function (req, res) {     //删除店铺类别
    db.deleteOneById("shopTypeList", req.body.id, function (err, results) {
        res.json({
            ok: 1,
            msg: "删除成功"
        })
    })
});

app.get("/searchShopType", function (req, res) {
    if (req.query.shopTypeName) {
        whereObj = {
            shopTypeName: new RegExp(req.query.shopTypeName)
        }
    } else {
        whereObj = {}
    }
    db.find("shopTypeList", {
        whereObj,
        sort: {
            addTime: -1
        }
    }, function (err, shopTypeList) {
        res.json({
            ok: 1,
            msg: "成功",
            shopTypeList
        })
    })
});

app.get("/slide/:num", function (req, res) {
    db.find("shopTypeList", {
        limit: req.params.num / 1,
        sortObj: {
            addTime: -1
        }
    }, function (err, arr) {


        const n = 10;
        let arr2Len = Math.ceil(arr.length / n);
        let arr2 = [];
        for (let i = 0; i < arr2Len; i++) {
            arr2.push([]);
            for (let j = i * n; j < (i + 1) * n && j < arr.length; j++) {
                arr2[i].push(arr[j]);
            }

        }


        res.json({
            ok: 1,
            slideList: arr2
        });
    })
})

/*                    店铺相关接口                             */
app.post("/shop", function (req, res) {             //添加店铺
    upPic("shopPic", req, function (obj) {
        if (obj.ok === 3) {
            db.findOneById("shopTypeList", obj.params.shopTypeId, function (err, shopTypeInfo) {
                db.insertOne("shopList", {
                    addTime: Date.now(),
                    upTime: Date.now(),
                    shopPic: obj.params.newPicName,
                    shopName: obj.params.shopName,
                    shopTop: obj.params.resource,
                    shopTypeId: obj.params.shopTypeId,
                    shopTypeName: shopTypeInfo.shopTypeName,
                }, function (err, results) {
                    if (err) help.json(res);
                    else help.json(res, 1, "上传成功")
                })
            })
        } else {
            help.json(res);
        }
    })
});

app.get("/shop", function (req, res) {        //获得店铺信息
    setTimeout(() => {
        let pageIndex = (req.query.pageIndex || 1) / 1;
        const pageSize = 5;
        db.count("shopList", {}, function (err, total) {
            db.find("shopList", {
                skip: (pageIndex - 1) * pageSize,
                limit: pageSize,
                sortObj: {
                    addTime: -1
                }
            }, function (err, shopList) {
                res.json({
                    ok: 1,
                    msg: "成功",
                    shopList,
                    total,
                    pageSize
                })
            })
        })
    }, 500)
});

app.delete("/deleteShop", function (req, res) {    //删除店铺
    db.deleteOneById("shopList", req.body.id, function (err, results) {
        res.json({
            ok: 1,
            msg: "删除成功"
        })
    })
});

app.get("/shopList/:typeId", function (req, res) {     //根据id获取店铺列表
    db.find("shopList", {
        whereObj: {
            shopTypeId: req.params.typeId
        },
        sortObj: {
            addTime: -1
        }
    }, function (err, shopList) {
        res.json({
            ok: 1,
            shopList
        })
    })
})

app.get("/allshopList/:Id", function (req, res) {
    db.find("shopList", {
        whereObj: {
            _id: mongodb.ObjectId(req.params.Id)
        },
        sortObj: {
            addTime: -1
        }
    }, function (err, shopList) {
        res.json({
            ok: 1,
            shopList
        })
    })
})

app.get("/searchShop", function (req, res) {//搜索店铺接口
    if (req.query.shopName) {
        whereObj = {
            shopName: new RegExp(req.query.shopName)
        }
    } else {
        whereObj = {}
    }
    db.find("shopList", {
        whereObj,
        sort: {
            addTime: -1
        }
    }, function (err, shopList) {
        res.json({
            ok: 1,
            msg: "成功",
            shopList
        })
    })
});

app.get("/topShop", function (req, res) {
    db.find("shopList", {
        whereObj: {
            shopTop: '是'
        },
        sortObj: {
            addTime: -1
        }
    }, function (err, shopList) {
        res.json({
            ok: 1,
            shopList,
            msg: "成功"
        })
    })
})

/*                      商品类别相关接口                      */
app.post("/goodsType", function (req, res) {     //添加商品类别
    upPic("goodsTypePic", req, function (obj) {
        if (obj.ok === 3) {
            db.findOneById("shopList", obj.params.shopId, function (err, shopInfo) {
                db.insertOne("goodsTypeList", {
                    addTime: Date.now(),
                    upTime: Date.now(),
                    goodsTypePic: obj.params.newPicName,
                    goodsTypeName: obj.params.goodsTypeName,
                    shopId: shopInfo._id,
                    shopName: shopInfo.shopName,
                    shopTypeId: shopInfo.shopTypeId,
                    shopTypeName: shopInfo.shopTypeName
                }, function (err, results) {
                    if (err) help.json(res);
                    else help.json(res, 1, "上传成功")
                })
            })

        } else {
            help.json(res);
        }
    })
})

app.get("/goodsType", function (req, res) {        //获得商品类别信息
    setTimeout(() => {
        let pageIndex = (req.query.pageIndex || 1) / 1;
        const pageSize = 5;
        db.count("goodsTypeList", {}, function (err, total) {
            db.find("goodsTypeList", {
                skip: (pageIndex - 1) * pageSize,
                limit: pageSize,
                sortObj: {
                    addTime: -1
                }
            }, function (err, goodsTypeList) {
                res.json({
                    ok: 1,
                    msg: "成功",
                    goodsTypeList,
                    total,
                    pageSize
                })
            })
        })
    }, 500)
});

app.delete("/deleteGoodsType", function (req, res) {     //删除商品类别
    db.deleteOneById("goodsTypeList", req.body.id, function (err, results) {
        res.json({
            ok: 1,
            msg: "删除成功"
        })
    })
});

app.get("/allGoodsType", function (req, res) {      //获得所有商品类别信息
    db.find("goodsTypeList", {
        sortObj: {
            addTime: -1
        }
    }, function (err, goodsTypeList) {
        res.json({
            ok: 1,
            goodsTypeList,
            msg: "成功"
        })
    })
});

app.get("/searchGoodsType", function (req, res) {
    if (req.query.goodsTypeName) {
        whereObj = {
            goodsTypeName: new RegExp(req.query.goodsTypeName)
        }
    } else {
        whereObj = {}
    }
    db.find("goodsTypeList", {
        whereObj,
        sort: {
            addTime: -1
        }
    }, function (err, goodsTypeList) {
        res.json({
            ok: 1,
            msg: "成功",
            goodsTypeList
        })
    })
});

app.get("/goodsTypeList/:typeId", function (req, res) {      //根据id获取商品类别信息
    db.find("goodsTypeList", {
        whereObj: {
            shopId: mongodb.ObjectId(req.params.typeId)
        },
        sortObj: {
            addTime: -1
        }
    }, function (err, goodsTypeList) {
        res.json({
            ok: 1,
            goodsTypeList
        })
    })
})
/*                      商品相关接口                      */
app.post("/goods", function (req, res) {             //添加商品
    upPic("goodsPic", req, function (obj) {
        if (obj.ok === 3) {
            db.findOneById("goodsTypeList", obj.params.goodsTypeId, function (err, goodsTypeInfo) {
                db.insertOne("goodsList", {
                    addTime: Date.now(),
                    upTime: Date.now(),
                    goodsPic: obj.params.newPicName,
                    goodsName: obj.params.goodsName,
                    goodsPrice: obj.params.goodsPrice,
                    goodsTop: obj.params.checked === 'true' ? '是' : '否',
                    shopeId: goodsTypeInfo.shopId,
                    goodsTypeName: goodsTypeInfo.goodsTypeName,
                }, function (err, results) {
                    if (err) help.json(res);
                    else help.json(res, 1, "上传成功")
                })
            })
        } else {
            help.json(res);
        }
    })
});

app.get("/goods", function (req, res) {        //获得商品信息
    setTimeout(() => {
        let pageIndex = (req.query.pageIndex || 1) / 1;
        const pageSize = 5;
        db.count("goodsList", {}, function (err, total) {
            db.find("goodsList", {
                skip: (pageIndex - 1) * pageSize,
                limit: pageSize,
                sortObj: {
                    addTime: -1
                }
            }, function (err, goodsList) {
                res.json({
                    ok: 1,
                    msg: "成功",
                    goodsList,
                    total,
                    pageSize
                })
            })
        })
    }, 500)
});

app.get("/goodsList/:typeId", function (req, res) {      //根据id获取商品信息
    db.find("goodsList", {
        whereObj: {
            shopeId: mongodb.ObjectId(req.params.typeId)
        },
        sortObj: {
            addTime: -1
        }
    }, function (err, goodsList) {
        res.json({
            ok: 1,
            goodsList
        })
    })
})

app.get("/topGoods/:typeId",function (req, res) {
    db.find("goodsList", {
        whereObj: {
            goodsTop: '是',
            shopeId:mongodb.ObjectID(req.params.typeId)
        },
        sortObj: {
            addTime: -1
        }
    }, function (err, goodsList) {
        res.json({
            ok: 1,
            goodsList,
            msg: "成功"
        })
    })
})

app.delete("/deleteGoods", function (req, res) {    //删除商品
    db.deleteOneById("goodsList", req.body.id, function (err, results) {
        res.json({
            ok: 1,
            msg: "删除成功"
        })
    })
});

app.get("/searchGoods", function (req, res) {
    if (req.query.goodsName) {
        whereObj = {
            goodsName: new RegExp(req.query.goodsName)
        }
    } else {
        whereObj = {}
    }
    db.find("goodsList", {
        whereObj,
        sort: {
            addTime: -1
        }
    }, function (err, goodsList) {
        res.json({
            ok: 1,
            msg: "成功",
            goodsList
        })
    })
});

app.listen(80, function (req, res) {
    console.log("success");
});
// let passWord= "admin";
// console.log(help.enmd5(passWord));
// console.log(Date.now())



