import Dep from "./dep";

export default class Watcher {
    constructor(vm, key, cb){
        this.vm = vm;
        this.key = key;
        this.cb = cb;
        this.value = this.get(); // 把自己添加到订阅器中
    }

    get(){
        Dep.target = this; 
        // 强制执行get方法，把自己添加到订阅器中
        const value = this.vm[this.key] 
        Dep.target = null // 释放自己
        return value
    }

    update(){
        this.value = this.vm[this.key];
        this.cb.call(this.vm, this.value)
    }
}