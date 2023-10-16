const fs = require("fs");
class DevHtml {
  /**
   * @param {{ hooks: { done: { tap: (arg0: string, arg1: (compilation: any, callback: any) => void) => void; }; }; }} compiler
   */
  apply(compiler) {
    compiler.hooks.done.tap('DevHtml ', (/** @type {{ compilation: { assets: any; }; }} */ compilation, /** @type {any} */ callback) => {
      let str = `<!doctype html>
                  <html lang="en" manifest="app.appcache">
                      <head>
                        <meta charset="UTF-8">
                        <title>场地订阅后台管理</title>
                        <script>try { global } catch (e) { window.global = window; }</script>
    
      `
                          for (let key in compilation.compilation.assets) {
                            if (key.indexOf('hot-update') > -1) {
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

      try {
        fs.accessSync('web', fs.constants.R_OK | fs.constants.W_OK);
      } catch (err) {
        if (err) {
          fs.mkdirSync("web")
        }
      }

      fs.writeFile('./web/index.html', str, function (/** @type {any} */ err, /** @type {any} */ data) {
        if (err) {
          return console.error(err);
        }
      });
    })
  }
}

module.exports = DevHtml