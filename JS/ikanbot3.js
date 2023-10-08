var 二级=`js:
try {
    VOD={};
    let html1 = request(input);
    pdfh = jsp.pdfh;
    VOD.vod_id = pdfh(html1, "#current_id&&value");
    VOD.vod_name = pdfh(html1, "h2&&Text");
  	// VOD.vod_pic = pdfh(html1, ".item-root&&img&&src");
  	VOD.vod_pic = pdfh(html1, ".item-root&&img&&data-src");
  	// VOD.vod_actor = pdfh(html1, ".celebrity&&Text");
  	VOD.vod_actor = pdfh(html1, ".meta:eq(4)&&Text");
  	// VOD.vod_area = pdfh(html1, ".country&&Text");
  	VOD.vod_area = pdfh(html1, ".meta:eq(3)&&Text");
  	// VOD.vod_year = pdfh(html1, ".year&&Text");
  	VOD.vod_year = pdfh(html1, ".meta:eq(2)&&Text");
    VOD.vod_remarks = "";
    VOD.vod_director = "";
    VOD.vod_content = "";
    log(VOD);
    var v_tks = '';
	// let script = pdfa(html1,'script').find(it=>it.includes('v_tks+=')).replace(/<script>|<\\/script>/g,'');
    // eval(script);
	input = "https://www.aikanbot.com/api/getResN?videoId=" + input.split("/").pop() + "&mtype=2&token="+v_tks;
    // input = "https://www.ikanbot.com/api/getResN?videoId=" + input.split("/").pop() + "&mtype=2";
	let html = request(input, {
        headers: {
			// 'User-Agent':'PC_UA',
            // 'User-Agent':'MOBILE_UA',
            'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
            'Referer': input,
        }
    });
    print(html);
    html = JSON.parse(html);
    let episodes = html.data.list;
    let playMap = {};
    if (typeof play_url === "undefined") {
        var play_url = ""
    }
    let map = {}
    let arr = []
    episodes.forEach(function(ep) {
        let data = JSON.parse(ep["resData"]);
        data.map(val => {
            if(!map[val.flag]){
                map[val.flag] = [val.url.replaceAll('##','#')]
            } else {
                map[val.flag].push(val.url.replaceAll('##','#'))
            }
        })
    });
    
    for(var key in map){
        if('myValues'==key){arr.push()}
        else if('values'==key){arr.push()}
        else if('jsm3u8'==key){arr.push({flag:'极速',url: map[key],sort:1})}
        else if('bfzym3u8'==key){arr.push({flag:'暴风',url: map[key],sort:2})}
        else if('lzm3u8'==key){arr.push({flag:'量子',url: map[key],sort:3})}
        else if('ffm3u8'==key){arr.push({flag:'非凡',url: map[key],sort:4})}
        else if('zuidam3u8'==key){arr.push({flag:'最大',url: map[key],sort:5})}
        else if('kuaikan'==key){arr.push({flag:'快看',url: map[key],sort:6})}
        else if('tkm3u8'==key){arr.push({flag:'天空',url: map[key],sort:7})}
        else if('wjm3u8'==key){arr.push({flag:'无极',url: map[key],sort:8})}
        else if('kcm3u8'==key){arr.push({flag:'快车',url: map[key],sort:9})}
        else if('sdm3u8'==key){arr.push({flag:'闪电',url: map[key],sort:10})}
        else if('1080zyk'==key){arr.push({flag:'1080',url: map[key],sort:11})}
        else if('wolong'==key){arr.push({flag:'卧龙',url: map[key],sort:12})}
        else if('gsm3u8'==key){arr.push({flag:'光速',url: map[key],sort:13})}
        else if('xlm3u8'==key){arr.push({flag:'新浪',url: map[key],sort:14})}
        else if('jinyingm3u8'==key){arr.push({flag:'金鹰',url: map[key],sort:15})}
        else if('fsm3u8'==key){arr.push({flag:'飞速',url: map[key],sort:16})}
        else if('ukm3u8'==key){arr.push({flag:'U酷',url: map[key],sort:17})}
        else if('yhm3u8'==key){arr.push({flag:'樱花',url: map[key],sort:18})}
        else if('lem3u8'==key){arr.push({flag:'鱼乐',url: map[key],sort:19})}
        else if('dbm3u8'==key){arr.push({flag:'百度',url: map[key],sort:20})}
        else if('snm3u8'==key){arr.push({flag:'索尼',url: map[key],sort:21})}
        else if('tpm3u8'==key){arr.push({flag:'淘片',url: map[key],sort:22})}
        else if('ikm3u8'==key){arr.push({flag:'爱坤',url: map[key],sort:23})}
        else if('M3U8'==key){arr.push({flag:'M3U8',url: map[key],sort:24})}
        else if('bjm3u8'==key){arr.push({flag:'八戒',url: map[key],sort:25})}
        else if('qhm3u8'==key){arr.push({flag:'奇虎',url: map[key],sort:26})}
        else if('68zy_m3u8'==key){arr.push({flag:'68',url: map[key],sort:27})}
        else{arr.push({flag: key,url: map[key],sort:27})}
  }
    arr.sort((a, b) => a.sort - b.sort);
    
    let playFrom = [];
    let playList = [];

    arr.map(val => {
        playFrom.push(val.flag);
        playList.push(val.url);
    })
    let vod_play_from = playFrom.join("$$$");
    let vod_play_url = playList.join("$$$");
    VOD["vod_play_from"] = vod_play_from;
    VOD["vod_play_url"] = vod_play_url;
    log(VOD);
} catch (e) {
    log("获取二级详情页发生错误:" + e.message)
}
`;

var rule = {
    title:'爱看机器人2',
    host:'https://www.aikanbot.com',
    url:'/hot/index-fyclass-fyfilter-p-fypage.html[/hot/index-fyclass-fyfilter.html]',
    //https://www.ikanbot.com/search?q=%E6%96%97%E7%BD%97%E5%A4%A7&p=2
    // searchUrl:'/search?q=**&p=fypage',
    searchUrl:'/search?q=**',
    searchable:2,
    quickSearch:0,
    filterable:1,
    filter_url:'{{fl.tag}}',
    // 图片来源:'@Referer=https://api.douban.com/@User-Agent=Mozilla/5.0%20(Windows%20NT%2010.0;%20Win64;%20x64)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/113.0.0.0%20Safari/537.36',
	  图片来源:'@Referer=https://www.ikanbot.com/@User-Agent=Mozilla/5.0%20(Windows%20NT%2010.0;%20Win64;%20x64)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/113.0.0.0%20Safari/537.36',
    filter:{
        "movie":[{"key":"tag","name":"标签","value":[{"n":"热门","v":"热门"},{"n":"最新","v":"最新"},{"n":"经典","v":"经典"},{"n":"豆瓣高分","v":"豆瓣高分"},{"n":"冷门佳片","v":"冷门佳片"},{"n":"华语","v":"华语"},{"n":"欧美","v":"欧美"},{"n":"韩国","v":"韩国"},{"n":"日本","v":"日本"},{"n":"动作","v":"动作"},{"n":"喜剧","v":"喜剧"},{"n":"爱情","v":"爱情"},{"n":"科幻","v":"科幻"},{"n":"悬疑","v":"悬疑"},{"n":"恐怖","v":"恐怖"},{"n":"治愈","v":"治愈"},{"n":"豆瓣top250","v":"豆瓣top250"}]}]
        ,"tv":[{"key":"tag","name":"标签","value":[{"n":"热门","v":"热门"},{"n":"美剧","v":"美剧"},{"n":"英剧","v":"英剧"},{"n":"韩剧","v":"韩剧"},{"n":"日剧","v":"日剧"},{"n":"国产剧","v":"国产剧"},{"n":"港剧","v":"港剧"},{"n":"日本动画","v":"日本动画"},{"n":"综艺","v":"综艺"},{"n":"纪录片","v":"纪录片"}]}]
    },
    filter_def:{
		movie:{tag:'热门'},
		tv:{tag:'国产剧'},
	},
    filter获取方法:`
    let value = [];
    $('ul').eq(2).find('li').each(function() {
      // console.log($(this).text());
      let n = $(this).text().trim();
      value.push({
      'n': n, 'v': n
      });
    });
    // 电影执行:
    let data = {'movie': [{'key': 'tag', 'name': '标签', 'value': value}]};
    console.log(JSON.stringify(data));
    
    //剧集执行:
    let data = {'tv': [{'key': 'tag', 'name': '标签', 'value': value}]};
    console.log(JSON.stringify(data));
    `,
    headers:{'User-Agent':'PC_UA',},
    class_name:'电影&剧集',
    class_url:'movie&tv',
  	play_parse:true,
	  double:true,
    推荐:'.v-list;div.item;*;*;*;*', //这里可以为空，这样点播不会有内容
    // 一级:'.v-list&&div.item;p&&Text;img&&src;;a&&href', //一级的内容是推荐或者点播时候的一级匹配
	  一级:'.v-list&&div.item;p&&Text;img&&data-src;;a&&href', //一级的内容是推荐或者点播时候的一级匹配
    二级:二级,
    // 搜索:'#search-result&&.media;h5&&a&&Text;a&&img&&data-src;.label&&Text;a&&href',//第三个是描述，一般显示更新或者完结
	搜索:'.col-md-8&&.media;h5&&a&&Text;a&&img&&data-src;.label&&Text;a&&href',//第三个是描述，一般显示更新或者完结
}