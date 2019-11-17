var thumb = document.querySelectorAll(".fa")
thumb.forEach(function(el){
  el.addEventListener("click",function(){
    if(this.className[13]==="u"){//className is a string that holds all classes in order, need to target either "u" or "d" to distinguish difference
      var num = 1;
    }else if (this.className[13]==="d") {
      var num = -1;
    }
    const message = this.parentNode.parentNode.childNodes[1].innerText.substr(9)
    const score = Number(this.parentNode.parentNode.childNodes[3].innerText.substr(8))//had to get 8th because Grapes: was also in the span
    const newScore = score+num
    console.log(message,score,newScore)
    if (newScore==0){
      fetch('submission', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'msg': message,
          'score': score
        })
      })
      .then(function (response) {
        window.location.reload()
      })
    }else if (newScore>0) {
      fetch('submission', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          'msg': message,
          'score': score,
          'newScore': newScore
        })
      })
      .then(response => {
        if (response.ok) return response.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload()
      })
    }
  })
})
