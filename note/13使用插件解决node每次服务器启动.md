1.npm i supervisor -g
在后端server使用方式：
supervisor bin/www


2.使用nodemon
npm i nodemon -D
node_modules/.bin/nodemon .bin/www
cross-env
npm i cross-env nodemon -D
在package.json里面配置
“start”：“cross-env NODE_ENV=development ./node_modules/.bin/nodemon ./bin/www”

3.pm2