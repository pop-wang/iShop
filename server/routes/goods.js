/**
 * Created by CDLX on 2017/9/26.
 */
var express=require('express');
var router=express.Router();
var mongoose=require('mongoose');
var Goods=require('../models/goods');
var User=require('../models/user');
mongoose.connect('mongodb://localhost:27017/shop');
mongoose.connection.on('connected',function () {
    console.log('mongodb connected success');
})
mongoose.connection.on('error',function () {
    console.log('mongodb connection fail');
})
mongoose.connection.on('disconnected',function () {
    console.log('mongodb connected disconnected');
})
router.get("/list",function(req,res,next){//查看是否与数据库连接成功，Goods里面设置的是可以访问到的字段，请求数据成功之后status为0，doc就是数据库连接成功请求到的API里面的数据。
    let sort=req.param('sort');//接收前端请求的参数
    let priceLevel=req.param('priceLevel');//接收前面传递过来的价格区间范围
    let priceGt='',priceLte='';
    let param={};
    if (priceLevel!='all'){
        switch (priceLevel){
            case '0':priceGt=0;priceLte=100;break;
            case '1':priceGt=100;priceLte=500;break;
            case '2':priceGt=500;priceLte=1000;break;
            case '3':priceGt=1000;priceLte=5000;break;
        }
        //表驱动法
        // let priceItem=[[0,100],[100,500],[500,1000],[1000,5000]];
        param={
            salePrice:{
                $gt:priceGt,//priceItem[priceLevel][0]
                $lte:priceLte//priceItem[priceLevel][1]
            }
        }
    }
    let currentPage=(parseInt(req.param('page'))>0)?parseInt(req.param('page')):1;//当前页数
    let pageSize=(parseInt(req.param('pageSize'))>0)?parseInt(req.param('pageSize')):8;//每页数据
    let skip=(currentPage-1)*pageSize;//跳过的数据条


    let goodModel=Goods.find(param).sort({'salePrice':sort}).skip(skip).limit(pageSize);//执行按照什么排序。limit就是从第九条起限制8条，这个8就是limit
    goodModel.exec({},function (err,doc) {//执行最后的结果
        res.json({status:0,result:doc})
    })
})
router.post('/addCart',function (req,res,next) {
    //查询那个用户，确定好用户
    let userId='100000077';
    //商品id
    let productId=req.body.productId;
    // res.json({
    //     id:productId
    // })
    User.findOne({userId:userId},function (err,userDoc) {
        // console.log(userDoc);
        //通过商品id去数据库查询，把商品的信息查出来，
        let goodItem='';
        userDoc.cartList.forEach(function (item) {
            if(item.productId==productId){
                goodItem=item;
                item.productNum++;//存在则数量加1
            }
        })
        //如果不是第一次加入购物车
        if(goodItem){
            userDoc.save(function (err3,doc3) {
                if (err3){
                    res.json({status:'1',msg:err3.message})
                }else{
                    res.json({status:0,msg:'',result:"商品数量添加成功!"})
                }
            })
        }else{
            //商品第一次加入购物车
            //怎么判断是第一次加入购物车还是已经有了
            Goods.findOne({productId:productId},function (err1,goodDoc) {
                console.log(productId);
                console.log(goodDoc);
                goodDoc.productNum=1;
                goodDoc.checked=1;//当第一次存进去的时候就默认被选中
                //   此时去查询这个商品是否存在于用户购物车列表里面
                userDoc.cartList.push(goodDoc);
                userDoc.save(function (err2,doc2) {
                    if (err2){
                        res.json({status:1,msg:err2.message})
                    }else{
                        res.json({status:0,msg:'',result:'加入购物车成功'})
                    }
                })
            })
        }


    })
})
module.exports=router;