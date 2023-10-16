export const formatTree = (elKey, data, parentKEY, parentID = 0 ,root = [], level = 0) => {
    data = data.filter((el) => el);
    data.forEach((el, idx) => {
        console.log(el,"el")
        if(el.level === level && parentID === el[parentKEY]){
            data.splice(idx,1,null);
            root.push(el);
        }
    });
    
    root.forEach((el, idx) => {
        if(!el) return ;
        console.log(el,"el")
        parentID = el[elKey]
        formatTree(elKey, data, parentKEY ,parentID ,el.children = [], (level + 1));
        if(!el.children[0]){
            delete el.children;
        }
    })
    return root
}