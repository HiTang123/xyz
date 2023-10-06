// 搜索功能需登录使用
var rule = {
    title: 'JustLive',
    host: 'http://live.yj1211.work',
    // homeUrl: '/api/live/getRecommend?page=1&size=20',//网站的首页链接,用于分类获取和推荐获取
    homeUrl: '',//网站的首页链接,用于分类获取和推荐获取
    url: '/api/live/getRecommendByPlatformArea?platform=fyclass&area=fyfilter&page=fypage&size=20', //网站的分类页面链接
    class_name: yslb_conf.分类名,
    class_url: yslb_conf.分类id,
    filterable: 1,
    filter_url: '{{fl.area}}',
    filter:yslb_conf.自定义筛选,
    filter_def:yslb_conf.默认显示,
    // detailUrl: '/index/liveRoom?platform=fyclass&roomId=fyid',//二级详情拼接链接(json格式用)
    detailUrl: '/api/live/getRoomInfo?uid=843186b3fad84f2899bbaf09f17a6266&platform=fyclass&roomId=fyid',//二级详情拼接链接(json格式用)
    //searchUrl: '/api/live/search?platform=all&keyWords=**&isLive=0',
    searchUrl: '/api/live/search?platform=all&keyWords=**&isLive=0&uid=843186b3fad84f2899bbaf09f17a6266',
    searchable: 0,
    quickSearch: 0,
    headers: {
        'User-Agent': 'MOBILE_UA'
        //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
    },
    timeout: 5000,
    play_parse: true,
    //lazy: '',
    lazy:`js:
        let purl = input.split("|")[0];
        let pfrom = input.split("|")[1];
        let cid = input.split("|")[2];
        print("purl:" + purl);
        print("pfrom:" + pfrom);
        print("cid:" + cid);
        let dan = 'https://api.bilibili.com/x/v1/dm/list.so?oid=' + cid;
        if (/bilibili/.test(pfrom)){
            let result = {};
            result['parse'] = 0;
            result['playUrl'] = '';
            result['url'] = unescape(purl);
            result['header'] = {
                Referer: 'https://live.bilibili.com',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36'
            };
            result['danmaku'] = dan;
            if (/h5/.test(purl)) {
                result['contentType'] = '';
                input = result
            } else {
                result['contentType'] = 'video/x-flv';
                input = result
            }
        } else {
            input = purl
        }
    `,
    limit: 6,
    推荐: '*',
    一级: 'json:data;roomName;roomPic;ownerName;roomId',
    // 二级: 'js:var d=[];var jo=JSON.parse(request(input)).data;VOD={vod_id:jo.roomId,vod_name:jo.roomName,vod_pic:jo.roomPic,type_name:jo.platForm.replace("huya","虎牙").replace("douyu","斗鱼").replace("cc","网易CC").replace("bilibili","哔哩哔哩")+"."+jo.categoryName,vod_content:"🏷分区："+jo.platForm.replace("huya","虎牙").replace("douyu","斗鱼").replace("cc","网易CC").replace("bilibili","哔哩哔哩")+"·"+jo.categoryName+" 🏷UP主："+jo.ownerName+" 🏷人气："+jo.online+(jo.isLive===1?" 🏷状态：正在直播":"状态：未开播")};var playurl=JSON.parse(request("http://live.yj1211.work/api/live/getRealUrl?platform="+jo.platForm+"&roomId="+jo.roomId)).data;var name={"OD":"原画","FD":"流畅","LD":"标清","SD":"高清","HD":"超清","2K":"2K","4K":"4K","FHD":"全高清","XLD":"极速","SQ":"普通音质","HQ":"高音质"};Object.keys(playurl).forEach(function(key){if(!/ayyuid|to/.test(key)){d.push({title:name[key],url:playurl[key]})}});VOD.vod_play_from="选择画质";VOD.vod_play_url=d.map(function(it){return it.title+"$"+it.url}).join("#");setResult(d)',
    二级: `js:
        var d = [];  
        input = /platform=&/.test(input) ? input.replace("platform=", "platform=bilibili") : input;
        var jo = JSON.parse(request(input)).data;
        VOD = {
            vod_id: jo.roomId,
            vod_name: jo.roomName,
            vod_pic: jo.roomPic,
            vod_remarks:'',
            vod_director:(jo.isLive === 1 ? "🟢" : "🔴")+jo.ownerName+"&nbsp &nbsp "+"人气：" + jo.online,
            type_name: jo.platForm.replace("huya", "🐯虎牙").replace("douyu", "🦈斗鱼").replace("cc", "🕸️网易CC").replace("bilibili", "🅱️哔哩哔哩") + "·" + jo.categoryName,
            vod_content: ''
        };
        var playurl = JSON.parse(request("http://live.yj1211.work/api/live/getRealUrl?platform=" + jo.platForm + "&roomId=" + jo.roomId)).data;
        var name = {
            "OD": "原画",
            "FD": "流畅",
            "LD": "标清",
            "SD": "高清",
            "HD": "超清",
            "2K": "2K",
            "4K": "4K",
            "FHD": "全高清",
            "XLD": "极速",
            "SQ": "普通音质",
            "HQ": "高音质"
        };
        Object.keys(playurl).forEach(function(key) {
            if (!/ayyuid|to/.test(key)) {
                d.push({
                    title: name[key],
                    url: playurl[key]
                })
            }
        });
        if(jo.platForm.includes("douyu")){
            d.push({
                    title: "斗鱼解析",
	                url: "push://http://159.75.85.63:35455/douyu/" + jo.roomId
                }
            );
        };
        if(jo.platForm.includes("huya")){
            d.push({
                    title: "虎牙解析",
	                url: "push://http://159.75.85.63:35455/huya/" + jo.roomId
                }
            );
        };
        if(jo.platForm.includes("bili")){
            d.push({
                    title: "哔哩解析",
	                url: "push://http://159.75.85.63:35455/bilibili/" + jo.roomId
                }
            );
        };
        
        VOD.vod_play_from = "选择画质";
            VOD.vod_play_url = d.map(function(it) {
                return it.title + "$" + it.url
            }).join("#"); 
        setResult(d)
    `,
    搜索: `json:data;nickName;headPic;platform;roomId`,
}