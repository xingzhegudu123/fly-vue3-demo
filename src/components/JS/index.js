import Vue from 'vue';
import MessageBox from './MessageBox';
//  封装一个弹窗组件
export var messageBox = (function () {
    

    return function (opts) { // 配置参数

        var defaults = { // 默认值
            title: '',
            content: '',
            cancel: '',
            ok: '',
            handleCannel: null,
            handleOk: null,
        };
    
        var MyComponents = Vue.extend(MessageBox);




        for (var attr in opts) {
            defaults[attr] = opts[attr];
        }



        var vm = new MyComponents({
            el: document.createElement('div'),
            data: {
                title: defaults.title,
                content: defaults.content,
                cancel: defaults.cancel,
                ok: defaults.ok,

            },
            methods: {
                handleCannel() {
                   
                    defaults.handleCannel && defaults.handleCannel.call(this);
                    document.body.removeChild(vm.$el); // 删除弹窗
                },
                handleOk() {
                   
                    defaults.handleOk && defaults.handleOk.call(this);
                    document.body.removeChild(vm.$el);
                }
            }
        });
        document.body.appendChild(vm.$el); //创建一个弹窗
    };
})();
