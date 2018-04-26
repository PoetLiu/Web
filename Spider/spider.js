"use strict";
var URL="https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&page_limit=50&page_start=0"
let superagent = require('superagent'), 
    cheerio = require('cheerio'),       
    eventproxy = require('eventproxy'), 
    assert = require('assert'),         
    async = require('async');           

superagent.get(URL)
	.end((err, res) => {
		let _pageUrls = [];
		let data = JSON.parse(res.text);
		//console.log(data)
		data.subjects.forEach((val) => {
			_pageUrls.push(val.url);
		});
		ep.emit('pageUrls', _pageUrls);	// 监听相关实例，完成之后告诉pageUrls
	})

let ep = eventproxy.create('pageUrls', (pageUrls) => {      //创建一个监听实例
    let _http = (url, callback) => {
        let _delay = parseInt((Math.random() * 30000000) % 1000, 10);   //随机延时请求
        superagent.get(url)
            .end((err, res) => {
                var $ = cheerio.load(res.text);     //用cheerio获取整个页面DOM对象
                var _data = {title:'', type: '', directories: '', scriptwriter: '', actors: ''};
                _data.title = $('#content h1 span').text();
                _data.directories = $('#info .attrs').eq(0).text();
                _data.scriptwriter = $('#info .attrs').eq(1).text();
                _data.actors = $('#info .attrs').eq(2).text();
                $('span[property="v:genre"]').each(function (index) {
                    _data.type += ($(this).text() + (index == $('span[property="v:genre"]').length - 1 ? '' : '、'));
                });
                //console.log(_data);
            });
        setTimeout(() => {
            callback(null, url);
        }, _delay);
    };
    async.mapLimit(pageUrls, 3, (url, callback) => {  
	//用async 的 mapLimit(arr, limit, iterator, callback) 接口控制请求并发量为3
        _http(url, callback);
    }, (err, res) => {
        assert.equal(err, null);
    })
});

