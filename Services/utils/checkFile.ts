import fs from "fs";
// 检查是否有数据库文件夹
export const getSaveDir = (fileName: string) => {
    console.info("获取目录了")
    // 文件接收完成准备写入 查看是否有写入目录如果没有创建
    try {
        fs.accessSync(fileName, fs.constants.R_OK | fs.constants.W_OK);
    } catch (err) {
        if (err) {
            fs.mkdirSync(fileName)
        }
    };
    return fileName
}