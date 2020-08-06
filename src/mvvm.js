import Observer from './observer'
import Compile from './compile'

export default class MVVM {
    constructor(options){
        this.$options = options
        this.$data = options.data;
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el

        this.proxyKeys(this.$data)

        if(options.methods && Object.keys(options.methods).length){
            Object.keys(options.methods).forEach(item => {
                this[item] = options.methods[item]
            })
        }

        new Observer(this.$data)
        new Compile(this)
    }

    // 把data数据绑定到this上
    proxyKeys(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                configurable: true,
                enumerable: true,
                get(){
                    return this.$data[key]
                },
                set(value){
                    this.$data[key] = value
                }
            })
        })
    }
}