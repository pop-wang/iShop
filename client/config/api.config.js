/**
 * Created by CDLX on 2017/9/29.
 */
const isProdMode=Object.is(process.env.NOED_ENV,'production')
module.exports={
  baseUrl:isProdMode?'http://api.vnshop.cn/api':'api/'
}
