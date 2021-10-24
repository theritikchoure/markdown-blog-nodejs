const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const methodOverride = require('method-override');
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const articleRouter = require('./routes/articles')

const app = express();

mongoose.connect('mongodb://ritikchoure_ritikchouremarkd:Ritik%401234@mongo.db.mdbgo.com:8604/ritikchoure_ritikchouremarkdownblog', {useNewUrlParser: true, useUnifiedTopology: true})

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))

app.get('/', async (req, res, next) => {
    const articles = await Article.find().sort({createdAt: 'desc'})
    res.render('articles/index', { articles: articles});
})

app.use('/articles', articleRouter)


app.listen(process.env.PORT || 3000)