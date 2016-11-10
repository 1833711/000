const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/tast-8')
mongoose.Promise = global.Promise
var db = mongoose.connection
db.on('error',(error)=>{console.log(error)})
db.once('open',()=>{console.log('打开数据库')})
const schema = mongoose.Schema({
    content:String,
    time:String,
    complete:Boolean,
    index:Number
})
const Task = mongoose.model('task',schema)
module.exports = Task