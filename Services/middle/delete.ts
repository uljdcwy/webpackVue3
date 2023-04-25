import { execute } from "../mysql";

export const deleteMiddle = async (ctx, next) => {
    let params = ctx.request.body;
    let mainKey: any = 'id';
  
    for (let key in params) {
        if (key === ctx.mainKey) {
            mainKey = params[key];
            if(typeof mainKey == 'string'){
                mainKey = `"${mainKey}"`
            }
        }
    }
    console.log(mainKey,"mainKey")
    ctx.body = await execute(`DELETE FROM ${ ctx.dbName } WHERE ${ ctx.mainKey } = ${ mainKey }`, []);
  }