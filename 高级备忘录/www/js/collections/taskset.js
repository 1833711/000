/**
 * Created by Administrator on 2016/11/8.
 */
define(['backbone','../models/task'],function(B,Task){
    return B.Collection.extend({
        model:Task,
        //把日期作为url的一部分发送到服务端
        //活的url需要写成方法的返回值
        url:function(){
            var date  = this.shareData.date
            return '/tasks/' + (date.getFullYear()*10000 + (date.getMonth() + 1)*100 + date.getDate())
        },
        //数据解析
        parse:function(data){
            return data.data
        }
    })
})
