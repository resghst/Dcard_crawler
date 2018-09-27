let fs = require('fs')
let request = require("request")
let cheerio = require("cheerio")
let download = require('image-downloader')
// let Promise = require('bluebird')

let board = '' //board name

let date = new Date()
let year = date.getYear()+1900
let month = date.getMonth()+1 
let day = date.getDay()+1
let daynow = year + "-" + month + "-" + day
let ans = {}, i=0, last=0

if (!fs.existsSync(daynow)) fs.mkdirSync(daynow)

let addData = (object)=>{
  object.forEach(element => {
    if(element.media.length!=0){
      ans[i]={}
      if(element.id!=null) ans[i].id = element.id
      if(element.title!=null) ans[i].title = element.title
      if(element.media.length!=0) ans[i].media = element.media
      i++;
    }
  })
}

var sleep = (second)=>{
  console.log("sleep "+second)
  var start = new Date().getTime()
  while(1)
    if ((new Date().getTime() - start) > second*1000) break
}



var requestfun = (last)=>{
  if(last!=""){
    console.log("first")
    request({
      url: "https://www.dcard.tw/_api/forums/"+board+"/posts?",
      mathod: "GET"
    }, 
    (e, r, b)=>{ 	 //e => error		r => request		b => body
      if( e || !b ){ return }
      let res = JSON.parse(b)
      last = res[0].id 
      addData(res) 
      console.log(last)    
      // return last
    })
  }
  else{
    console.log("other")
    request({
      url: "https://www.dcard.tw/_api/forums/"+board+"/posts?",
      mathod: "GET"
    }, 
    (e, r, b)=>{ 	 //e => error		r => request		b => body
      if( e || !b ){ return }
      let res = JSON.parse(b)
      last = res[0].id 
      addData(res)
      console.log(last)
    })
  }
  // sleep(10)
  return last
}

console.log(last)
last = requestfun()
console.log(last)
last = requestfun(last)
console.log(last)
last = requestfun(last)
console.log(last)
console.log(ans)

