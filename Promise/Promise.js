/**
 * 首先Promise基本是个类
 */

function Promise(){
    //初始化state为等待态
    this.state = 'pending'
    //成功的值
    this.value = undefined
    //失败的原因
    this.reason = undefined
    //存放fn1的回调
    this.fn1Callback = []
    //存放fn2的回调
    this.fn2Callback = []

    //成功
    let resolve = (value)=>{
        //state改变,resolve调用就会失败
        if(this.state==='pending'){
            
            //resolve调用后,state转化为成功态
            this.state = 'fulfilled'
            this.value = value
        }
    }

    //失败
    let reject = (reason)=>{
        if(this.state === 'pending'){
            this.state = 'rejected'
            this.reason = reason
        }
    }
    //立即执行
    try {
        executor(resolve,reject)
    } catch (error) {
        reject(error)
    }
   
}

Promise.prototype.then = function(fn1, fn2){
    let self = this
    let promise2

    //首先对入参fn1,fn2做判断
    fn1 = typeof fn1==='function'?fn1:function(v){}
    fn2 = typeof fn2 ==='function' ? fn2 : function(v) {}

    if(self.status ==='resolved') {
        return promise2 = new Promise(function(resolve,reject){

            try {
                let x = fn1(self.data)
                resolve(x)
            } catch (error) {
                reject(error)
            }
        })
    }

    if(self.status ==='rejected'){
        return promise2 = new Promise(function(resolve,reject){
            try {
                let x = fn2(self.data)
                reject(x)
            } catch (error) {
                reject(error)
            }
        })
    }

    if(self.status === 'pending'){
        return promise2 = new Promise(function(resolve,reject){
            this.fn1Callback.push(function(value){
                try {
                    let x = fn1(self.data)
                    resolve(x)
                } catch (error) {
                    reject(error)
                }
            })

            this.fn2Callback.push(function(value){
                try {
                    let x  = fn2(self.data)
                    reject(x)
                } catch (error) {
                    reject(error)
                }
            })
        })
    }
}

