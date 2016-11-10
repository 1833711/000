require.config({
    paths:{
        'jquery':'libs/jquery',
        'jquery-ui':'libs/jquery-ui',
        'underscore':'libs/underscore-min',
        'template':'libs/template',
        'backbone':'libs/backbone-min'
    },
    shim:{
        'jquery-ui':['jquery'],
        'backbone':['underscore','jquery']
    }
})
//导入视图类，新建header对象
require(['views/header','views/footer','collections/taskset','views/list','underscore','backbone'],function(Header,Footer,Taskset,List,_,B){
    //shareData用来去保存header、footer共用的数据
    //采用shareData中data属性记录选中的日期
    //注意：在header中changeDate时，需要修改shareData.date
    //继承自B.events,就具有了触发事件的能力
    var shareData = _.extend({date:new Date()}, B.Events)
    var header = new Header()
    var taskset = new Taskset()
    //把集合与视图关联
    var footer = new Footer({model:taskset})



    header.shareData = shareData
    footer.shareData = shareData
    taskset.shareData = shareData
    //list.shareData = shareData
    var list = new List({model:taskset})
    //    监听changeDate事件，重新渲染页面
    console.log(list)
    console.log(list.render)
    console.log(list.render())
    list.listenTo(shareData,'changeDate',list.render)
})