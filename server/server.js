const express = require('express')
const app = express()

const PORT = 1337

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



let objectURL = {
    js: [['Ссылка на методы массивов', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array'],['Ссылка на методы объектов', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object'],['Ссылка на Javascript', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript']],
    wiki: [['Сслыка на главную страницу Wikipedia', 'https://en.wikipedia.org/wiki/Main_Page'],['Ссылка на страницу wiki - Африка', 'https://en.wikipedia.org/wiki/Africa'],['Ссылка на страницу wiki - Сибирь', 'https://en.wikipedia.org/wiki/Siberia']],
    html: [['Сслыка на главную страницу по HTML', 'https://developer.mozilla.org/ru/docs/Learn/Getting_started_with_the_web/HTML_basics'],['HTML - Мультимедиа и встраивание', 'https://developer.mozilla.org/ru/docs/Learn/HTML/Multimedia_and_embedding'],['HTML - Таблицы', 'https://developer.mozilla.org/ru/docs/Learn/HTML/Tables']],
    noLink: [['для этого ссылка не была создана', 'error! no link!']]
}

const keyWords = ['js', 'wiki', 'html']

app.get('/', (req, res) => {
    console.log('request!')
    res.send(`app is running on port ${PORT}!!!`)
})

app.post('/', (req,res)=>{
    let sentWord = req.body.text    
    if(keyWords.includes(sentWord)){
        for(let i of Object.entries(objectURL)){
            if(i[0] == sentWord){
                res.send({
                    'links': i[1]
                })
                break
            }
        }
    } else {
        res.send({
            'links': objectURL.noLink
        })
    }
})

app.post('/links', (req,res)=>{
    var request = require('request');
    var URL = req.body.text;
    request(URL, function (err, resp, body) {
        if (err) throw err;
        res.send({"result": body})
    });
})

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`)
})