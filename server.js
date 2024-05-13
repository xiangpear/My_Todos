const express = require('express');
const fs = require('fs');

const app = express();
// 托管静态页面
app.use(express.static(__dirname + '/static'));
// 解析 POST 提交过来的表单数据
app.use(express.urlencoded({ extended: false }));

// 获取数据
app.get('/api/getTodoList', (req, res) => {
    fs.readFile('./todoList.json', 'utf-8', (err, data) => {
        if (err) {
            console.log('读取文件失败');
            return;
        }
        let jsonData;
        try {
            if (!data) {
                jsonData = {};
            } else {
                jsonData = JSON.parse(data);
            }
        } catch (e) {
            console.log('数据格式错误');
            res.status(500).send('Internal Server Error');
            return;
        }
        if (!jsonData) {
            jsonData = {};
        }
        res.send({
            state: 200,
            data: jsonData
        });
    });
});

// 添加todo
app.post('/api/addTodo', (req, res) => {
    var todoList = req.body.todoList;
    fs.writeFile('./todoList.json', todoList, (err) => {
        if (err) {
            console.log('写入文件失败');
            return;
        }
        res.send({
            state: 200,
            data: '添加成功'
        });
    });
});

// 监听指定的端口
app.listen(3333, (err) => {
    if (!err) console.log('服务器启动成功！');console.log('http://localhost:3333');
});
