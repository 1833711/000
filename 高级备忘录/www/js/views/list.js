/**
 * Created by Administrator on 2016/11/8.
 */
//定以展示任务的视图类
define(['backbone','template','jquery-ui'],function(B,T){
    return B.View.extend({
        el:'section',
        events:{
            'click label':'changeCompleteState'
        },
        changeCompleteState:function(ev){
            console.log('1111')
        //    修改这条数据的complete字段
        //    找到点击的label对应的input的id
            console.log(ev)
            var label = ev.currentTarget
            var id = this.$(label).prev().attr('id')
            console.log(id)
        //    找到id对应的数据
            var task = this.model.find(function(item){
                return item.get('id') == id
            })
            console.log(task)
            //根据input是否选中，修改这条数据的complete
            //(注意：attr 与 prop 获取属性值的区别)
            var complete = this.$(label).prev().prop('checked')
            console.log(complete)
            task.set('complete',!complete)
        //    把修改保存到服务端
            task.save({complete:!complete})
        },
        initialize:function(){
            this.render()
            //监听add事件，重新渲染页面
            this.listenTo(this.model,'add',this.render)
            // 设置排序
            this.$('ul').sortable({
                //设置占位符：值是占位li的样式类
                placeholder:'placeholder',
                start:function(){
                    console.log('开始排序了')
                    $('footer>span').removeClass('fa-plus-circle fa-3x').addClass('fa-trash fa-3x')
                },
                stop:function(){
                    console.log('结束排序了')
                    $('footer>span').removeClass('fa-trash fa-3x').addClass('fa-plus-circle fa-3x')
                },
                //与另一个区域产生联系，可以跨区域跑许
                //（注意：另一个区域也要支持排序）
                //值：另一个区域的选择器
                connectWith:'footer',
               // 保存排序的位置
            //    只修改移动的数据A的index，其他数据的index不变
            //    如果A跑到了ul的外面，就无操作
            //    如果A在ul的内部，就以下三种情况：
            //    1)如果A移动到最上面，index修改为A下面的数据的index - 1
            //    2)如果A移动到中间，index修改为A上下两个index的和取平均值
            //    3)如果A移动到最下面，index修改为A上面的数据的index + 1
            //    当被移动元素重新放在一个位置时，会触发的事件
            //    para1：事件对象
            //    ui:事件涉及到的界面元素
            //    其中有item属性，是一个jquery对象
                update:function(event,ui){
                    console.log(arguments)
                    console.log('调整顺序了')
                //    找到被移动的元素
                    var li = ui.item
                    //
                    if(li.parent()[0]!=this.$('ul')[0]){
                        return
                    }
                //    移动到最上面
                    if(li.index() == 0){
                        console.log('移动到最上面')
                    //    找到下一个标签,找到id，找到对应的数据
                        var id = li.next().find('input').attr('id')
                        //根据id找到数据
                        var nextTask = this.model.find(function(item){
                            return item.get('id') == id
                        })
                        //从数据中获取index
                        var nextIndex = nextTask.get('index')
                        //当前数据的index
                        var index = nextIndex - 1
                    }
                    if(li.index()>0 && li.index()<this.$('ul li').length - 1){
                        console.log('移动到中间了')
                        //上一个数据的index
                        var prevId = li.prev().find('input').attr('id')
                        var prevTask = this.model.find(function(item){
                            return item.get('id') == prevId
                        })
                        var prevIndex = prevTask.get('index')
                        //下一个数据的index
                        var nextId = li.next().find('input').attr('id')
                        var nextTask = this.model.find(function(item){
                            return item.get('id') == nextId
                        })
                        var nextIndex = nextTask.get('index')
                        var index = (prevIndex + nextIndex)/2
                    }
                    if(li.index() == this.$('ul li').length - 1){
                        console.log('移动到最下面了')
                        var nextId = li.prev().find('input').attr('id')
                        var nextTask = this.model.find(function(item){
                            return item.get('id') == nextId
                        })
                        var nextIndex = nextTask.get('index')
                        var index = nextIndex + 1
                    }
                    //    找到当前数据，然后修改index
                    var currentId = li.find('input').attr('id')
                    var task = this.model.find(function(item){
                        return item.get('id') == currentId
                    })
                    //console.log(task)
                    task.set('index',index)
                    //    保存
                    task.save()
                }.bind(this)

            })
        },
        render:function(){
            console.log('监听到changeDate事件了')
            //var html = T('moban',{data:this.model.toJSON()})
            //this.$('section').html(html)
            //  获取当前日期的数据进行展示
            this.model.fetch().done(function(){
                //console.log(this.model.toJSON())
                //    展示页面\
                var html = T('list',{arr:this.model.toJSON()})
                 //console.log(html)
                this.$('ul').html(html)
                //this.render()
            }.bind(this)).fail(function(){
                alert('请尝试再次刷新页面')
            })
        }
    })
})