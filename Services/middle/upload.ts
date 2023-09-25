import fs from "fs";
import querystring from "querystring"
export const upload = async (ctx, next) => {
    let req = ctx.req;
    req.setEncoding('binary');
    let body = '';   // 文件数据

    // 边界字符串
    let boundary = req.headers['content-type'].split('; ')[1].replace('boundary=', '');

    //接收post如data 流 buffer
    req.on('data', function (d) {
        body += d;
    });
    let data = await new Promise((resolve, reject) => {
        req.on("error", () => {
            reject({
                "errno": 1, // 只要不等于 0 就行
                "message": "接收失败"
            })
        })

        req.on('end', () => {

            // 文件接收完成准备写入 查看是否有写入目录如果没有创建
            try {
                fs.accessSync('public', fs.constants.R_OK | fs.constants.W_OK);
            } catch (err) {
                console.log('文件接收完成', err)
                if (err) {
                    fs.mkdirSync("public")
                }
            }

            let file: any = querystring.parse(body, '\r\n', ':');
            let fileInfo = file['Content-Disposition']?.split('; ');
            let fileName = '';
            let ext = '';
            for (let value in fileInfo) {
                if (fileInfo[value].indexOf("filename=") != -1) {
                    fileName = fileInfo[value].substring(10, fileInfo[value].length - 1);

                    if (fileName.indexOf('\\') != -1) {
                        fileName = fileName.substring(fileName.lastIndexOf('\\') + 1);
                    }
                    ext = fileName.substr(fileName.indexOf('.') + 1, fileName.length);
                }
            }

            let upperBoundary = body.toString().indexOf(file['Content-Type'].substring(1)) + file['Content-Type'].substring(1).length;

            let binaryDataAlmost = body.toString().substring(upperBoundary).replace(/^\s\s*/, '').replace(/\s\s*$/, '');

            // 上传文件重命名
            let uuidFileName = `${Date.now()}.${ext}`
            //上传文件 本地存放地址
            let uploadDirFile = `./public/${uuidFileName}`

            //创建文件流
            let writerStream = fs.createWriteStream(uploadDirFile);

            //开始 —— 写入文件到本地
            writerStream.write(binaryDataAlmost.substring(0, binaryDataAlmost.indexOf(`--${boundary}--`)), 'binary');
            //写入完成
            writerStream.end();

            writerStream.on("error", () => {
                reject({
                    "errno": 1, // 只要不等于 0 就行
                    "message": "写入失败"
                })
            })

            writerStream.on('finish', function () {
                console.log("写入完成。");
                resolve({
                    "errno": 0, // 注意：值是数字，不能是字符串
                    "data": {
                        "url": uuidFileName, // 图片 src ，必须
                        "alt": "车牌识别资料集", // 图片描述文字，非必须
                        "href": "javascript:void();" // 图片的链接，非必须
                    }
                })
                //删除刚刚创建好的本地文件 -> 只有在把文件存起来的时候需要删除掉本地，否则不要用。
            });
        })
    });
    ctx.body = data
}