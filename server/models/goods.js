/**
 * Created by CDLX on 2017/9/26.
 */
//设置请求到的数据包含的参数
var mongoose=require('mongoose');
var Schema=mongoose.Schema;//Schema是mongodb里面的一个类
var productSchema=new Schema({
    "productId":String,
    "productName":String,
    "productPrice":Number,
    "productImage":String,
    "productNum":String,
})
module.exports=mongoose.model("Goods",productSchema)//module.exports是node里面的命令，需要使用就需要导出，model是mongodb的一个方法。