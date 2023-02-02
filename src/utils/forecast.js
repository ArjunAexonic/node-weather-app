const request = require('request')

const forecast = (lat, lon, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=0c9f9cc56a467d0630a1167ecbc264fd&units=f&query='+lat+','+lon

    request({url, json : true}, function(error , {body}) {
        if(error){
            callback('something went wrong',undefined)
        }
        else if(body.error){ 
            callback(body.error.info, undefined)
        }
        else{
            callback(undefined, body.current)
        }
    })
}

module.exports = forecast