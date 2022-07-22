let html = document.getElementsByTagName('html')
let btns = document.getElementsByClassName('btn')
let onRaveMode = false

function randomRGB(){
  onRaveMode = true
  let rgbLine = document.getElementsByClassName('rgbLine')
  for(let i = 0 ; i < rgbLine.length; i++ ){
      rgbLine[i].setAttribute('style', `background-color: rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)});
                                        -webkit-box-shadow: 3px 3px 5px 6px #${Math.floor(Math.random()*16777215)};
                                        -moz-box-shadow:    3px 3px 5px 6px #${Math.floor(Math.random()*16777215)};
                                        box-shadow:         3px 3px 5px 6px #${Math.floor(Math.random()*16777215)};`)
  }
  for(let i = 0 ; i<btns.length; i++){
    btns[i].setAttribute('style', `border-color: rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)} `)
    html[0].setAttribute('style', `background-color: rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)} `)
  }
}
function raveMode() {
  if(onRaveMode){
    onRaveMode = false
    html[0].setAttribute('onmousemove', '')
  }else{
    html[0].setAttribute('onmousemove', 'randomRGB()')
  }
}

const watchId = () => {
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    document.cookie = `arrivalLocation=${latitude}, ${longitude}`
  });
  navigator.geolocation.watchPosition(position =>{
    const {latitude, longitude} = position.coords;
    document.cookie = `watchingLocation=${latitude}, ${longitude}`
  })
}
watchId()
