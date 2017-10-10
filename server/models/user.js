/**
 * Created by CDLX on 2017/9/28.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;//一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力

var userSchema = new Schema({
    "userId": String,
    "userName": String,
    "orderList": Array,
    "cartList": Array,
    "cartList": [{
        "productId": String,
        "productName": String,
        "salePrice": Number,
        "productImage": String,
        "productUrl": String,
        "productNum":Number,
        "checked": Boolean
    }],
    "addressList": [{
        "addressId": String,
        "userName": String,
        "streetName": String,
        "postCode": Number,
        "tel": Number,
        "isDefault": Boolean
    }]
})

module.exports = mongoose.model('user', userSchema);
