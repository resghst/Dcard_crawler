var request = require("request")
var fs = require("fs")
var cheerio = require("cheerio")
var download = require('image-downloader')
var pageline = 1

let board = '' //board name

var d=new Date()
var day=d.getDate()
var month=d.getMonth() + 1
var year=d.getFullYear()
let daynow = year + "-" + month + "-" + day
if (!fs.existsSync('./img/'+ daynow)) fs.mkdirSync('./img/'+ daynow)


request({
	url: "https://www.dcard.tw/f/" + board,
	mathod: "GET"
}, 
(e, r, b)=>{ 	 //e => error		r => request		b => body
  if( e || !b ){ return }
  var $ = cheerio.load(b)
	var titles = $('.PostEntry_root_V6g0r')
  for(var i=0; i < titles.length; i++){
		var link = titles[i].attribs.href
		request({
			url: encodeURI("https://www.dcard.tw" + link),
			mathod: "GET"
		}, 
		(e, r, b)=>{ 	 //e => error		r => request		b => body
			if( e || !b ){ return }
			var $ = cheerio.load(b)
			var img = $('.GalleryImage_image_3lGzO')
			for(var j=0; j < titles.length; j++){
				if(img[j]) downfile(img[j].attribs.src)
			}
		})
	}
})


// // Download to a directory and save with the original filename
var downfile = (imgurl)=>{
	const options = {
		url: imgurl,
		dest: './img/'+ daynow  // Save to /path/to/dest/image.jpg
	}
	download.image(options)
	.then(({ filename, image }) => {
		console.log('File saved to '+ filename )
	}).catch((err) => {
		throw err
	})
}

request({
	url: "https://www.dcard.tw/f/"+board+"?latest=true",
	mathod: "GET"
}, 
(e, r, b)=>{ 	 //e => error		r => request		b => body
  if( e || !b ){ return }
  var $ = cheerio.load(b)
	var titles = $('.PostEntry_root_V6g0r')
  for(var i=0; i < titles.length; i++){
		var link = titles[i].attribs.href
		request({
			url: encodeURI("https://www.dcard.tw" + link),
			mathod: "GET"
		}, 
		(e, r, b)=>{ 	 //e => error		r => request		b => body
			if( e || !b ){ return }
			var $ = cheerio.load(b)
			var img = $('.GalleryImage_image_3lGzO')
			for(var j=0; j < titles.length; j++){
				if(img[j]) downfile(img[j].attribs.src)
			}
		})
	}
})