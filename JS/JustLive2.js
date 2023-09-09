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
    detailUrl: '/api/live/getRoomInfo?uid=&platform=fyclass&roomId=fyid',//二级详情拼接链接(json格式用)
    //searchUrl: '/api/live/search?platform=all&keyWords=**&isLive=0',
    searchUrl: '/api/live/search?platform=all&keyWords=**&isLive=0',
    // searchable: 2,
    searchable: 0,
    quickSearch: 1,
    headers: {
        'User-Agent': 'MOBILE_UA'
        //'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
    },
    timeout: 5000,
    play_parse: true,
    lazy: '',
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
            type_name: jo.platForm.replace("huya", "虎牙").replace("douyu", "斗鱼").replace("cc", "网易CC").replace("bilibili", "哔哩哔哩") + "." + jo.categoryName,
            vod_content: "🏷分区：" + jo.platForm.replace("huya", "虎牙").replace("douyu", "斗鱼").replace("cc", "网易CC").replace("bilibili", "哔哩哔哩") + "·" + jo.categoryName + " <br/>🏷UP主：" + jo.ownerName + " <br/>🏷人气：" + jo.online + "<br/>"+(jo.isLive === 1 ? " 🏷状态：正在直播" : "状态：未开播")
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
        d.push({{
	                title: "斗鱼解析",
	                url: "http://159.75.85.63:35455/douyu/" + jo.roomId
                });
        VOD.vod_play_from = "选择画质";
        VOD.vod_play_url = d.map(function(it) {
            return it.title + "$" + it.url
        }).join("#");
        setResult(d)
    `,
    搜索: '*',
}