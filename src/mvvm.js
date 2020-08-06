import { observe } from './observer'
import watcher from './watcher'
import dep from './dep'

export default class MVVM {
    constructor(options){
        this.options = options
        this.$data = options.data;
        console.log(this.options)

        Object.keys(this.$data).forEach(key=>{
            this.proxyKeys(key)
        })

        observe(this.$data)
    }

    // 把data数据绑定到this上
    proxyKeys(key) {
        let self = this
        Object.defineProperty(this, key, {
            configurable: true,
            enumerable: true,
            get(){
                return self.$data[key]
            },
            set(value){
                self.$data[key] = value
            }
        })
        // const data = new Proxy(this.$data, {
        //     get(target, key){
        //         Reflect(target, key)
        //     },
        //     set(target, key, value){
        //         Reflect(target, key, value)
        //     }
        // })
    }
}