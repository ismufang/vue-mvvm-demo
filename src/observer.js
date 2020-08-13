import Dep from './dep'

 export default class Observer {
    constructor(data){
        this.data = data
        this.walk(this.data)
    }

    walk(data){
        if (!data || typeof data !== 'object') return

        Object.keys(data).forEach(key=>{
            // 传入value 深层响应，避免死循环
            this.defineReactive(data, key, data[key])
        },this)
    }

    // 当前函数的value值会在当前作用域行程闭包，方便响应式数据使用
    defineReactive(data, key, value){
        let self = this
        // 每个属性上都有一个dep订阅器，复制收集订阅者，发送通知
        let dep = new Dep()
        // 如果value是对象，把value内部属性转换为响应式数据
        let chilrenObj = this.walk(value)

        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get(){
                // 收集依赖 订阅者
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set(newVal){
                if (newVal === value) return
                value = newVal; // 更新value的值
                self.walk(newVal) // 如果新赋值是对象，将对象转为响应式的
                // 更新通知订阅者
                dep.notify();
            }
        })
    }
}