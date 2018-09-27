var request = require("request")
var fs = require("fs")
var cheerio = require("cheerio")
var download = require('image-downloader')
var pageline = 1

var d=new Date()
var day=d.getDate()
var month=d.getMonth() + 1
var year=d.getFullYear()
var daynow = year + "-" + month + "-" + day
if (!fs.existsSync('./img/'+ daynow)) fs.mkdirSync('./img/'+ daynow)

