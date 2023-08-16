// 搜索功能需登录使用
var rule = {
    title: 'JustLive',
    host: 'http://live.yj1211.work',
    // homeUrl: '/api/live/getRecommend?page=1&size=20',//网站的首页链接,用于分类获取和推荐获取
    homeUrl: '',//网站的首页链接,用于分类获取和推荐获取
    url: '/api/live/getRecommendByPlatformArea?platform=fyclass&area=fyfilter&page=fypage&size=20', //网站的分类页面链接
    class_name: '虎牙&哔哩&斗鱼',
    class_url: 'huya&bilibili&douyu',
    filterable: 1,
    filter_url: '{{fl.area}}',
    filter: {
        "douyu":[{"key":"area","name":"分区","value":[{"n":"原创IP","v":"原创IP"}]}],
        "huya":[{"key":"area","name":"分区","value":[{"n":"一起看","v":"一起看"}]}],
        "bilibili":[{"key":"area","name":"分区","value":[{"n":"搞笑","v":"搞笑"}]}]
    },
    filter_def:{
        douyu:{area:'原创IP'},
        huya:{area:'一起看'},
        bilibili:{area:'搞笑'},
    },
    // detailUrl: '/index/liveRoom?platform=fyclass&roomId=fyid',//二级详情拼接链接(json格式用)
    detailUrl: '/api/live/getRoomInfo?uid=&platform=fyclass&roomId=fyid',//二级详情拼接链接(json格式用)
    searchUrl: '/api/live/search?platform=all&keyWords=**&isLive=0',
    // searchable: 2,
    searchable: 1,
    quickSearch: 0,
    headers: {
        'User-Agent': 'MOBILE_UA'
    },
    timeout: 5000,
    play_parse: true,
    lazy: '',
    limit: 6,
    推荐: '*',
    一级: 'json:data;roomName;roomPic;ownerName;roomId',
    // 二级: 'js:var d=[];var jo=JSON.parse(request(input)).data;VOD={vod_id:jo.roomId,vod_name:jo.roomName,vod_pic:jo.roomPic,type_name:jo.platForm.replace("huya","虎牙").replace("douyu","斗鱼").replace("cc","网易CC").replace("bilibili","哔哩哔哩")+"."+jo.categoryName,vod_content:"🏷分区："+jo.platForm.replace("huya","虎牙").replace("douyu","斗鱼").replace("cc","网易CC").replace("bilibili","哔哩哔哩")+"·"+jo.categoryName+" 🏷UP主："+jo.ownerName+" 🏷人气："+jo.online+(jo.isLive===1?" 🏷状态：正在直播":"状态：未开播")};var playurl=JSON.parse(request("http://live.yj1211.work/api/live/getRealUrl?platform="+jo.platForm+"&roomId="+jo.roomId)).data;var name={"OD":"原画","FD":"流畅","LD":"标清","SD":"高清","HD":"超清","2K":"2K","4K":"4K","FHD":"全高清","XLD":"极速","SQ":"普通音质","HQ":"高音质"};Object.keys(playurl).forEach(function(key){if(!/ayyuid|to/.test(key)){d.push({title:name[key],url:playurl[key]})}});VOD.vod_play_from="选择画质";VOD.vod_play_url=d.map(function(it){return it.title+"$"+it.url}).join("#");setResult(d)',
    二级: 'js:var d=[];input=/platform=&/.test(input)?input.replace("platform=","platform=bilibili"):input;var jo=JSON.parse(request(input)).data;VOD={vod_id:jo.roomId,vod_name:jo.roomName,vod_pic:jo.roomPic,type_name:jo.platForm.replace("huya","虎牙").replace("douyu","斗鱼").replace("cc","网易CC").replace("bilibili","哔哩哔哩")+"."+jo.categoryName,vod_content:"🏷分区："+jo.platForm.replace("huya","虎牙").replace("douyu","斗鱼").replace("cc","网易CC").replace("bilibili","哔哩哔哩")+"·"+jo.categoryName+" 🏷UP主："+jo.ownerName+" 🏷人气："+jo.online+(jo.isLive===1?" 🏷状态：正在直播":"状态：未开播")};var playurl=JSON.parse(request("http://live.yj1211.work/api/live/getRealUrl?platform="+jo.platForm+"&roomId="+jo.roomId)).data;var name={"OD":"原画","FD":"流畅","LD":"标清","SD":"高清","HD":"超清","2K":"2K","4K":"4K","FHD":"全高清","XLD":"极速","SQ":"普通音质","HQ":"高音质"};Object.keys(playurl).forEach(function(key){if(!/ayyuid|to/.test(key)){d.push({title:name[key],url:playurl[key]})}});VOD.vod_play_from="选择画质";VOD.vod_play_url=d.map(function(it){return it.title+"$"+it.url}).join("#");setResult(d)',
    搜索: '*',
}