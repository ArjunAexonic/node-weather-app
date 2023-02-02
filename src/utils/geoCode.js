const request = require('request')

const getGeoCode = (address, callback) =>{
    const url = 'http://api.positionstack.com/v1/forward?access_key=a3efd5fe698daeaacae4f7ce3f08767c&query='+address
    request({url, json : true}, function(error, {body}){
        if(error){
            callback('something went wrong', undefined)
        }
        else if(body.error){ 
            callback(body.error.message, undefined)
        }
        else if(body.data.length === 0){
            callback('geo data not available', undefined)
        }
        else{
            callback(undefined , {
                latitude : body.data[0].latitude,
                longitude : body.data[0].longitude,
                location :  body.data[0].label
            }) 
        }
    })
}

module.exports = getGeoCode