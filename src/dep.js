export default class Dep {
    constructor(){
        // 收集订阅者
        this.subs = []
    }

    addSub(sub){
        this.subs.push(sub)
    }

    notify(){
        this.subs.forEach(sub=>{
            sub.update()
        })
    }
}

// target指watcher实例（绑定订阅者回调更新函数），当target有值，会添加到订阅器中
// observer数据更新时，dep会调用notify函数
// 通知所有绑定订阅者，执行update回调函数
Dep.target = null
