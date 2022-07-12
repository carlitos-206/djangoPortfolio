function randomRGB(){
  let rgbLine = document.getElementsByClassName('rgbLine')
  for(let i = 0 ; i < rgbLine.length; i++ ){
      rgbLine[i].setAttribute('style', `background-color: rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)});
                                        -webkit-box-shadow: 3px 3px 5px 6px #${Math.floor(Math.random()*16777215)};
                                        -moz-box-shadow:    3px 3px 5px 6px #${Math.floor(Math.random()*16777215)};
                                        box-shadow:         3px 3px 5px 6px #${Math.floor(Math.random()*16777215)};`)
  }
  let bootStrapClasses = ['btn-outline-primary', 'btn-outline-secondary', 'btn-outline-success', 'btn-outline-danger', 'btn-outline-warning', 'btn-outline-info', 'btn-outline-light', 'btn-outline-dark' ]
  let btns = document.getElementsByClassName('btn')
  for(let i = 0 ; i<btns.length; i++){
    btns[i].setAttribute('style', `border-color: rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)} `)
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
