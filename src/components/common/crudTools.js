let crudTools = {}

let crudObj = window.JSON.parse(window.localStorage.getItem('crudObj') || '{}')
//新增
crudTools.addOrUpdateThings = function(p) {
    if(crudObj[p.id]){
        //追加
        crudObj[p.id] += p.num
    }else{
        //更新
        crudObj[p.id] = p.num
    }
    //保存
    this.save(crudObj)
}

//删除
crudTools.deleteThings = function (id) {
    delete crudObj[id]
    //保存
    this.save(crudObj)
}

//获取
crudTools.getCrud = function (){
    return window.JSON.parse(window.localStorage.getItem('crudObj') || '{}')
}

//获取总数
crudTools.getTotal = function () {
    let sum = 0
    for(let key in crudObj){
        sum += crudObj[key]
    }
    return sum
}

//存储
crudTools.save = function (crudObj) {
    window.localStorage.setItem('crudObj',window.JSON.stringify(crudObj))
}
export default crudTools