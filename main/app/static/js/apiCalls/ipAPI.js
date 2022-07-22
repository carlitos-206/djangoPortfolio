$.ajax({
  type: "GET",
  url: "/",
  context: document.body
}).done(
  function confirmCookies() {
  let userConfirmation = window.confirm(`see url `)
  if(userConfirmation){
    return new Promise(function(resolve, reject){
      $.get(`/ipKey`, function(response){
          if(response){
            resolve(response)
          }else{
            reject('ERRKey')
          }
        }, 'json')
      }).then(function(result){
          console.log(result)
        }
      ).catch(function(error){
        console.log(error)
      })
    }
  }
);