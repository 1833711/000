const exp = require('express'),
    bodyparser = require('body-parser'),
    Task = require('./db.js')
const app = exp()
app.use(exp.static('www'))
app.use(bodyparser.json())

//查询数据
app.get('/tasks/:time',(req,res)=>{
    var time = req.params.time
    console.log(time)
    //查询获取该日期下的数据，返回客户端
    //根据index字段排序 1 升序 ； -1 降序
    Task.find({time:time}).sort({index:'1'}).then(function(data){
        data = data.map(function(item,index,arr){
            return{
                id:item._id.toString(),
                content:item.content,
                complete:item.complete,
                time:item.time,
                index:item.index
            }
        })
        res.json({result:1,data:data})
    }).catch(function(error){
        res.json({result:0,message:error.message})
    })
})
//保存数据
app.post('/tasks/:time',(req,res)=>{
    ////查询数据是否存在，如果存在就修改数据，如果不存在就添加数据
    //Task.findById(req.body._id).then(function(task){
    //    console.log(task)
    //    if(task){
    //        //查询到数据，更新
    //        Task.findByIdAndUpdate(req.body._id,{complete:req.body.complete})
    //    }else{
    //        //查询不到数据，添加
    //        var newTask = new Task(req.body)
    //        newTask.save().then(function(){
    //            res.json({result:1,message:'保存数据库成功'})
    //        }).catch(function(){
    //            res.json({result:0,message:error.message})
    //        })
    //    }
    //}).catch(function(error){
    //    console.log(error)
    //})
    var task = new Task(req.body)
    task.save().then(function(){
        res.json({result:1,message:'保存数据成功'})
    }).catch(function(error){
        res.json({result:0,message:error.message})
    })
})

//更新数据
app.put('/tasks/:time/:id',(req,res)=>{
    //console.log(req.params.id)
    Task.findByIdAndUpdate(req.params.id,{complete:req.body.complete,index:req.body.index})
.then(function(){
        console.log('成功')
        res.json({result:1})
    }).catch(function(error){
        console.log(error)
        res.json({result:0})
    })
})
//删除数据
app.delete('/tasks/:time/:id',(req,res)=>{
    Task.findByIdAndRemove(req.params.id)
.then(function(){
        res.json({result:1})
    }).catch(function(error){
        res.json({result:0})
    })
})


app.listen(3000,()=>console.log('running'))