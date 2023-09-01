
/**
 * 格化数
 * 树的关联键，需要格式化的数据，
 * 子树指向源树的键
 * 
 */
interface formatTree<T> {
    (elKey: string,data: object[],parentKey: string, parentID: number, root?: T, level?: number): T
}

export const formatTree: formatTree<any[]> = (elKey, data, parentKEY, parentID = 0 ,root = [], level = 0) => {
    // 过滤空，已经被压入根组
    data = data.filter((el) => el);
     // 循环所有的数据 如果没有parentID 说明是根节点
    data.forEach((el: any,idx: number) => {
        console.log(el,"el")
        if(el.level === level && parentID === el[parentKEY]){
            data.splice(idx,1,null as any);
            root.push(el);
        }
    });
    
    // 每次传入时对root 进行更新
    root.forEach((el, idx) => {
        if(!el) return ;
        console.log(el,"el")
        parentID = el[elKey]
        // 递归，每次将等级加1
        formatTree(elKey, data, parentKEY ,parentID ,el.children = [], (level + 1));
        if(!el.children[0]){
            delete el.children;
        }
    })
    return root
}