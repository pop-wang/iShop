 proxyTable: {
      '/goods/**':{
        target:'http://localhost:3000',
        changeOrigin:true,
      },
      '/users/**': {
        target: 'http://localhost:3000'
      },
    },
    
这样有个弊端
每次开大都需要配置
万一vue的路由也是goods  users就会产生矛盾


理想方式：
配置一个路由，尽量避免和vue路由冲突

配置：
/api/**

每次在路由连
get（'/api/users/login'）
get('api/users/logou')

get('v1/goods/list')

最理想的方式
get('/users/login')
target:http://localhost:3000/users/login
Axios.defaults.baseURL=apiConfig.baseUrl;在每个使用axios请求的时候，自动加上api前缀，使用方式this.$http.get('users/login'),相当于访问http://loacalhost:8080/api/users/login
代理
    匹配到api
        转发
        http://localhost:3000/users/login

http://localhost:8080/api/goods/list

http://localhost:3000/goods/list

```
'/api/**': {
    target: 'http://localhost:3000',
    pathRewrite: {
        '^/api': '/'
    }
}
```