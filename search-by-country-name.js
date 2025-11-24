// selecting the elements from the dom
const searchInput = document.getElementById('search-input')
const searchBtn = document.querySelector('.search-Btn')
const infoDivAboutCountries = document.querySelector('.info-div-about-country')
let caretColor = getComputedStyle(document.documentElement).getPropertyValue('--blue-color').trim()
let Flags;
//
searchInput.addEventListener('click',RemoveThePlaceHolderTextFunc)
function RemoveThePlaceHolderTextFunc(){
    searchInput.style.borderBottomColor = 'var(--blue-color)'
    searchInput.placeholder = ''
    searchInput.style.caretColor= caretColor
}
// search button 
searchBtn.addEventListener('click',searchBtnEventFunc)

function searchBtnEventFunc(){
    let countryName = searchInput.value.trim()
    let contriesUrl = `https://restcountries.com/v3.1/all?fields=name,translations,capital,corrency,flags,population,currencies,languages,continents,maps`
    fetch(contriesUrl)
    .then(response=> {
        if(!response.ok){
            throw new Error(`state from fetch ddin't go well`);
        }
        return response.json()
    })
    .then(res=>{
        return handleTypedCountryNameFunc(res,countryName)
    })
    .then(response =>{
        const html = displayItemsFunc(response)
        infoDivAboutCountries.innerHTML = html
        let flagHolder = document.querySelector('.flag-holder img')
        // let langauges = document.querySelector('languages span')
        flagHolder.src= Flags[1]

    }).catch(response=>{
        console.error('error',response)
    })
}
// function to display items 
function displayItemsFunc(data){
    let Currencies = Object.values(data.currencies)
    let Languages = Object.values(data.languages)
    let GoogleMaps = Object.values(data.maps)
    let lang = ''
    if(Languages.length > 1){
        lang = Languages.join(' , ')
    }else{
        lang = Languages[0]
    }
    let names = Object.values(data.name)
    Flags = Object.values(data.flags)
    let htmlcountries = `<div>
                            <div class='FlagAndNameHolder'>  
                                    <div class ='flag-holder'>
                                        <img src="" alt="">
                                    </div>
                                    <P class ='countryName'>${names[0]}</P>
                            </div>
                            <div class = 'infoDiv'>
                                    <div>
                                        <p>capital :</p><span>${data.capital[0]}</span>
                                    </div>
                                    <div>
                                        <p>continent :</p><span>${data.continents[0]}</span>
                                    </div>
                                    <div>
                                        <p>population :</p><span>${data.population}</span>
                                    </div>
                                    <div>
                                        <p>currency :</p><span>${Currencies[0].name} - ${Currencies[0].symbol}</span>
                                    </div>
                                    <div class = 'languages'>
                                        <p>common languages :</p>
                                        <span>${lang}</span>
                                    </div>
                                    <div class = 'maps'>
                                        <p>google maps link:</p>
                                        <span>
                                          <a href="${GoogleMaps[0]}">open map</a></span>
                                    </div>
                            </div>
                        </div>
                        `
        // adding the flag
        return htmlcountries
}
function handleTypedCountryNameFunc(data,typedName){
    const result = data.find(country =>{
        if(country.name.common.toLowerCase() === typedName.toLowerCase()) return true;
        return Object.values(country.translations).some(countryCommonName=>{
            return countryCommonName.common.toLowerCase() === typedName.toLowerCase()
        })
    })
    return result
}
// function HandleInputNameFunc(nameTyped){
//     let urlall = "https://restcountries.com/v3.1/all?fields=name,population,translations"
//     fetch(urlall).then(response=> response.json()).then(res=> {
//         let dataResived = Object.values(res).find(itm=>{
//             if(itm.name.common.toLowerCase() === nameTyped.toLowerCase()) return true
//             return Object.values(itm.translations).some(itm=>{
//                     return itm.common === nameTyped
//             })
//         })
//         return dataResived
//     }).then(res=>{console.log(res)})
// }

// HandleInputNameFunc("ونس")

