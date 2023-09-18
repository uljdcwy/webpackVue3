// 根目录  开发环境生成web html 文件的插件
const fs = require('fs');
class DevHtml {
  apply(compiler) {
    // 编译完成钩子，在编译完成后获取编译后文件，
    compiler.hooks.done.tap('DevHtml ', (compilation, callback) => {
      let str = `
      
      <!doctype html>
<html lang="en" manifest="app.appcache">

<head>
    <meta charset="UTF-8">
    <title>场地订阅后台管理</title>
    <script>try { global } catch (e) { window.global = window; }</script>
    
      `
      for (let key in compilation.compilation.assets) {
        if (key.indexOf('hot-update') > -1) {
          // 此时是热更新数据
          return;
        }
        if (key.indexOf('wasm') > -1) {
          continue;
        }
        if (key.indexOf('.js') && key.indexOf('.map') < 0) {
          str += `<script defer="defer" src="${key}"></script>\t\n`
        } else if (key.indexOf('.css') && key.indexOf('.map') < 0) {
          str += `<link href="${key}" rel="stylesheet"></link>\t\n`;
        }
      }
      str += `
      </head>
      
      <body></body>
      
      </html>`

      // 文件接收完成准备写入 查看是否有写入目录如果没有创建
      try {
          fs.accessSync('web', fs.constants.R_OK | fs.constants.W_OK);
      } catch (err) {
          console.log('文件接收完成', err)
          if (err) {
              fs.mkdirSync("web")
          }
      }

      fs.writeFile('./web/index.html', str, function (err, data) {
        if (err) {
          return console.error(err);
        }
      });
    })
  }
}


module.exports = DevHtml