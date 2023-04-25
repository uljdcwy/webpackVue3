
import { execute } from "../mysql";

export const getListMiddle =  async (ctx, next) => {
    try{
      let params = ctx.request.query;
      let pageIndex: number | null, pageSize: number | null, count: number | null = null;
      let sqlStr: string | null = `select * from ${ctx.dbName} WHERE 1=1`;
  
      
      for(let key in params){
        let timeIndex = key.search(/time/i);
        // 如果是分页参数过虑
        if(key == "pageSize" || key == "pageIndex" || key == "sortFile" || key == "sortOrder"){
          continue;
         // 如果是时间参数做SQL开始与结束操作
        }else if(timeIndex > 0){
          try{
            let timeArr = decodeURIComponent(params[key]);
            if(typeof timeArr == 'string'){
              if(timeArr[0] == `"`){
                timeArr = timeArr.slice(1,timeArr.length - 1)
              }
              timeArr = timeArr.replace(/'/g, '"');
              timeArr = JSON.parse(timeArr);
            }
            sqlStr += ` and ${key} between '${timeArr[0]}' and '${timeArr[1]}'  `;
          }catch(e){
            ctx.body = {code: 0, msg: '时间格式异常'};
            return ;
          }
        }else{
          sqlStr +=  ` AND ${key}='${params[key]}'`
        }
      }


      // 如果传了排序字段 传了排序
      if(params.sortFile !== undefined && params.sortOrder !== undefined){
        sqlStr += ` ORDER BY ${params.sortFile} ${params.sortOrder}`
      }
      
      // 如果值不为声名的值则说明传pageIndex与pageSize 需要返回数量
      if(params.pageIndex !== undefined  || params.pageSize !== undefined){
        pageIndex = params.pageIndex || 0, pageSize = params.pageSize || 10;
        let [{recordCount}] = await execute(sqlStr.replace("*", "COUNT(*) as recordCount"));
        count = recordCount;
        sqlStr += ` LIMIT ${pageIndex}, ${pageSize}`;
      }
      let data = await execute(sqlStr);
      
      ctx.body = {code: 1, msg: '', data: data, count: count};
    
    }catch(e){
    
      ctx.body = {code: 0, msg: '查询数据异常'};
    
    }
  }