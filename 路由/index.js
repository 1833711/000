/**
 * Created by Administrator on 2016/11/8.
 */
//通过路由实现切换页面
//客户端路由：地址片段与页面的映射机制
//支持链接、分享、收藏；

 var Router = Backbone.Router.extend({
    //路由映射
    //路由片段---action
    routes:{
        'desktop':'showDesktop',
        'android':'showAndroid',
        'ios':'showIos'
    },
    showDesktop:function(){
        console.log('showDesktop')
        $('section').css('display','none')
        $('section').eq(0).css('display','block')

    },
    showAndroid:function(){
        console.log('showAndroid')
        $('section').css('display','none')
        $('section').eq(1).css('display','block')
    },
    showIos:function(){
        console.log('showIos')
        $('section').css('display','none')
        $('section').eq(2).css('display','block')
    }
})
//创建路由对象
new Router()
//开始监视地址栏的变化
Backbone.history.start()