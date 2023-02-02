console.log('public js loaded')

const weatherdata = document.querySelector('form')
const searchTerm = document.querySelector('input')
const locationText = document.querySelector('#w-location')
const temparatureText = document.querySelector('#w-temparature')
const errorText = document.querySelector('#w-error')

weatherdata.addEventListener('submit',(e)=>{
    e.preventDefault()

    if(searchTerm.value){
        fetch('http://localhost:3000/weather?address='+searchTerm.value).then((response) =>{
            response.json().then((data)=>{
                if(data.error){
                    errorText.textContent = 'Error : '+data.error;
                    temparatureText.textContent = '';
                    locationText.textContent = '';
                }
                else{
                    errorText.textContent = '';
                    temparatureText.textContent = 'Temperature : ' +data.forecast.temperature +' F';
                    locationText.textContent = 'Location : ' +data.location;
                }
            })
        })
    }
})