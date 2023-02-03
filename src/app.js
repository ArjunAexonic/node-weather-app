const express = require('express')
const path = require('path')
const hbs = require('hbs')
const getGeoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const publicPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.use(express.static(publicPath))
hbs.registerPartials(partialsPath)

app.get('',(req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Arjun',
        weatherText : 'Weather text'
    })
})

app.get('/about',(req, res)=>{
    res.render('about', {
        title: 'About App',
        name: 'Arjun',
        aboutText : 'About text'
    })
})

app.get('/help',(req, res)=>{
    res.render('help', {
        title: 'Help App',
        helpText: 'Help text',
        name : 'Arjun'
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        res.send({
            error : 'enter an address!'
        })
    }
    else {
        getGeoCode(req.query.address, (error, {latitude, longitude, location} ={}) =>{
            if(error !== undefined) {
                res.send({ 
                    error : error
                })
            }
            else{
                forecast(latitude, longitude, (error, forecastReposnse) => {
                    if(error){
                        res.send({ 
                            error : error
                        })
                    }
                    else {
                        res.send({
                            latitude,
                            longitude,
                            location,
                            forecast : forecastReposnse,
                        })
                    }
                })
            } 
        })
    }
})

app.get('/product',(req, res)=>{
    if(!req.query.search) {
        res.send({
            error: 'Search term is mandatory'
        })
    }   
    else {
        res.send([
            {location:'test loaction'},
            {forecast:'Test forecast'}
        ])
    }
    
})

app.get('/help/*',(req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Arjun',
        errorText : 'Help article not found'
    })
})

app.get('*',(req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Arjun',
        errorText : 'Page not found'
    })
})





app.listen(port, () =>{
    console.log('server started on port 3000')
})