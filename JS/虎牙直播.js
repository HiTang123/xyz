// 道长 drpy仓库 https://gitcode.net/qq_32394351/dr_py
// 道长 drpy安卓本地搭建说明 https://code.gitlink.org.cn/api/v1/repos/hjdhnx/dr_py/blob/master/%E5%AE%89%E5%8D%93%E6%9C%AC%E5%9C%B0%E6%90%AD%E5%BB%BA%E8%AF%B4%E6%98%8E.md
// 道长 drpy写源 模板规则说明 https://gitcode.net/qq_32394351/dr_py#%E6%A8%A1%E6%9D%BF%E8%A7%84%E5%88%99%E8%AF%B4%E6%98%8E
// 道长 drpy写源 套模模版 https://ghproxy.net/https://raw.githubusercontent.com/hjdhnx/dr_py/main/js/%E6%A8%A1%E6%9D%BF.js
// 道长 drpy写源 相关视频教程 https://www.youtube.com/watch?v=AK7cN-fcwm4
// 道长 drpy写源 写源教学视频 https://t.me/fongmi_offical/54080/63553
// 海阔下载 https://haikuo.lanzoui.com/u/GoldRiver
// 影视TV 官方TG Drpy群 https://t.me/fongmi_offical/63689
// 影视TV 官方TG 下载 https://t.me/fongmi_release

var rule = {
    title:'虎牙直播',
    host:'https://www.huya.com',
    homeUrl:'',//用于"分类获取"和"推荐获取" /cache.php?m=LiveList&do=getLiveListByPage&gameId=2168&tagAll=0&page=1
    url:'/cache.php?m=LiveList&do=getLiveListByPage&gameId=fyfilter&tagAll=0&page=fypage',
    class_name:'一起看',
    class_url:'8',
    detailUrl:'https://m.huya.com/fyid',//二级详情拼接链接(json格式用)
    filterable: 1,
    filter_url: '{{fl.area}}',
    filter_def:{
        8:{area:'2135'}
    },
    filter:{
        "8":[{"key":"area","name":"分类","value":[{"n":"一起看","v":"2135"}]}]
    },
    searchUrl:'https://search.cdn.huya.com/?m=Search&do=getSearchContent&q=**&uid=0&v=4&typ=-5&livestate=0&rows=40&start=0',
    searchable:2,
    quickSearch:0,
    headers:{
        'User-Agent':'MOBILE_UA'
    },
    timeout:5000,
    limit:8,
    play_parse:true,
    // lazy:"js:let rid=input.match(/\\/(\\d+)/)[1];log(rid);let purl=JSON.parse(request('https://mp.huya.com/cache.php?m=Live&do=profileRoom&roomid='+rid)).data.stream.baseSteamInfoList[0].sStreamName;log(purl);let rurl='http://txtest-xp2p.p2p.huya.com/src/'+purl+'.xs?ratio=4000';input={jx:0,url:rurl,parse:0}",
    lazy:"js:let rid=input.match(/\\/(\\d+)/)[1];function getRealUrl(live_url){let[i,b]=live_url.split('?');let r=i.split('/').pop();let s=r.replace(/\.(flv|m3u8)/,'');let c_tmp=b.split('&').filter(n=>n);let n={};let c_tmp2=[];c_tmp.forEach(function(tmp,index){if(index<3){n[tmp.split('=')[0]]=tmp.split('=')[1]}else{c_tmp2.push(tmp)}});let tmp2=c_tmp2.join('&');n[tmp2.split('=')[0]]=tmp2.split('=')[1];let fm=decodeURIComponent(n.fm).split('&')[0];let u=base64Decode(fm);let p=u.split('_')[0];let f=new Date().getTime()+'0000';let ll=n.wsTime;let t='0';let h=[p,t,s,f,ll].join('_');let m=md5(h);return(i+'?wsSecret='+m+'&wsTime='+ll+'&u='+t+'&seqid='+f+'&'+c_tmp2.pop()).replace('hls','flv').replace('m3u8','flv')}let purl=JSON.parse(request('https://mp.huya.com/cache.php?m=Live&do=profileRoom&roomid='+rid)).data.stream.flv.multiLine[0].url;input={jx:0,url:getRealUrl(purl),parse:0,header:JSON.stringify({'user-agent':'Mozilla/5.0'})}",
    推荐:'*',
    一级:'json:data.datas;introduction;screenshot;nick;profileRoom',
    二级:'*',
    搜索:'json:response.3.docs;game_roomName;game_screenshot;game_nick;room_id',
}