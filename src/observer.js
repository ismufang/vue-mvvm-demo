import Dep from './dep'

class Observer {
    constructor(data){
        this.data = data

    }

    walk(data){
        Object.keys(data).forEach(key=>{
            // 传入value 深层响应，避免死循环
            this.defineReactive(data, key, data[key])
        },this)
    }

    defineReactive(data, key, value){
        // 深层添加响应式数据
        let chilrenObj = observe(value)

        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get(){
                return value
            },
            set(newval){
                value = newval
            }
        })
    }
}

const observe = data => {
    if(!data || typeof data !== 'object') return

    return new Observer(data)
}

export { observe }