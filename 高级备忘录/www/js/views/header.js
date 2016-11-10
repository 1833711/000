/**
 * Created by Administrator on 2016/11/8.
 */
//定义header对应的视图类
define(['backbone','jquery-ui'],function(B){
    return B.View.extend({
        el:'header',
        //初始化操作
        initialize:function(){
            //设置单选的按钮组
            this.$('#radio').buttonset()
            //设置日历
            this.$('#radio6').datepicker()
        //    设置h1的初始值
            var now = new Date()
            var week = this.getWeek(now.getDay())
            this.$('h1').text(now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日'+' 星期'+week)
        },
        getWeek:function(num){
            var week = ['日','一','二','三','四','五','六']
            return week[num]
        },
        events:{
            //监听输入事件，修改日期
            //点击日历的时候 没有修改日期
            'input input:not(#radio6)':'changeDate',
            //选择日历上的日期（也就是输入框上的日历发生改变了），调用changeDate
            'change #radio6':'changeDate'
        },
        changeDate:function(){
            console.log('changeDate')
        //    如果只是点击日历，没有选择日历中某一天，不需要重置h1
            console.log(arguments)
        //    根据选择的日期，修改h1
        //    找到选中的这个input是第几个input
            var index = this.$('input:checked').index()/2
            console.log(index)
            var now = new Date()
            now.setDate(now.getDate() - 1 )
            //昨天加上index就是选中的日期
            now.setDate(now.getDate()+ index)
            console.log(now)
            if(index == 5){
            //    选中的是日历
                now = this.$('#radio6').datepicker('getDate')
            }
          //重新轩染h1
            console.log(now)
            var week = this.getWeek(now.getDay())
            this.$('h1').text(now.getFullYear()+'年'+(now.getMonth()+1)+'月'+now.getDate()+'日'+' 星期'+week)

        //    记录选中的日期
            this.shareData.date = now
        //    触发改变日期的事件
            this.shareData.trigger('changeDate')
        }
    })
})