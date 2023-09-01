
import { execute } from "../mysql";

export const getListMiddle = async (ctx) => {
  try {
    let params = ctx.request.query;
    if(!Object.keys(params)[0]){
      params = ctx.request.body;
    }
    // 执行查表的方法
    ctx.body = await findTableSql(params, ctx);

  } catch (e) {
    ctx.body = { code: 0, msg: '查询数据异常' };
  }
}
// 查询表的方法
export const findTableSql = async (params: any, ctx) => {

  console.info(JSON.stringify(params), "查询参数");
  let pageIndex: number | 0, pageSize: number | 0, count: number | null = null;
  let sqlStr: string | null = `select * from ${ctx.dbName} WHERE 1=1`;


  for (let key in params) {
    let timeIndex = key.search(/time/i);
    // 如果是分页参数过虑
    if (key == "pageSize" || key == "pageIndex" || key == "sortFile" || key == "sortOrder") {
      continue;
      // 如果是时间参数做SQL开始与结束操作
    } else if (timeIndex > 0 && params[key]) {
      try {
        let timeArr = params[key];
        sqlStr += ` and ${key} between '${timeArr[0]}' and '${timeArr[1]}'  `;
      } catch (e) {
        return { code: 0, msg: '时间格式异常' };
      }
    } else if(params[key]) {
      sqlStr += ` AND ${key}='${params[key]}'`
    }
  }


  // 如果传了排序字段 传了排序
  if (params.sortFile !== undefined && params.sortOrder !== undefined) {
    sqlStr += ` ORDER BY ${params.sortFile} ${params.sortOrder}`
  }

  // 如果值不为声名的值则说明传pageIndex与pageSize 需要返回数量
  if (params.pageIndex !== undefined || params.pageSize !== undefined) {
    pageIndex = Number(params.pageIndex) || 0, pageSize = Number(params.pageSize) || 10;
    let [{ recordCount }] = await execute(sqlStr.replace("*", "COUNT(*) as recordCount"));
    count = recordCount;
    let startPosition = pageIndex * pageSize;
    sqlStr += ` LIMIT ${pageSize} offset ${startPosition}`;
    return {
      code: 1,
      count: count,
      data: await execute(sqlStr),
      msg: '',
    }
  }

  return {
    code: 1,
    data: await execute(sqlStr),
    msg: '',
  }
}