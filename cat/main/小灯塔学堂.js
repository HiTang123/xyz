import { _ } from "assets://js/lib/cat.js";
let key = '小灯塔学堂';
let homeName = '小灯塔学堂科学实验';
let HOST = 'https://api.bilibili.com';
let siteKey = '';
let siteType = 0;
let searchable= 0;//searchable=1 启用搜索
const PC_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.361";
let cookie = "https://mirror.ghproxy.com/https://raw.githubusercontent.com/HiTang123/xyz/master/main/cookie.txt";
async function request(reqUrl) {
  const res = await req(reqUrl, {
      headers: getMb(),
  });
  return res.content;
}

async function init(cfg) {
  siteKey = cfg.skey;
  siteType = cfg.stype;
  if (cookie.startsWith('http')) cookie = await request(cookie);
  // console.debug('我的哔哩 cookie =====>' + cookie); // js_debug.log
}

async function home(filter) {
  let classes = [
	//科学
		{"type_name":"科学","type_id": "小灯塔.剑桥数学启蒙课（全）"},
		//{"type_name":"奇趣科学实验室","type_id": "小灯塔奇趣科学实验室"},
		//{"type_name":"剑桥数学启蒙课","type_id": "小灯塔剑桥数学启蒙课"},
		//{"type_name":"宇宙探秘之旅","type_id": "小灯塔十大主题宇宙探秘之旅"},
		//{"type_name":"跟动物老师学发明","type_id": "小灯塔跟动物老师学发明"},
		//{"type_name":"天才发明家","type_id": "小灯塔天才发明家"},
		//{"type_name":"剑桥博士讲物理","type_id": "小灯塔剑桥博士讲物理"},
		//{"type_name":"STEM奇妙科学课","type_id": "小灯塔STEM奇妙科学课"},
		//{"type_name":"出发吧，月球！","type_id": "小灯塔出发吧，月球！"},
		//{"type_name":"十大世界未解之谜","type_id": "小灯塔探秘十大世界未解之谜"},
		//{"type_name":"神奇的气象魔法","type_id": "小灯塔神奇的气象魔法"},
		//{"type_name":"了不起的新科技","type_id": "小灯塔了不起的新科技"},
	//百科
		{"type_name":"百科","type_id": "10天玩转世界top10博物馆"},
		//{"type_name":"世界博物馆","type_id": "玩转世界博物馆第二季"},
		//{"type_name":"探秘恐龙世界","type_id": "【合集】带孩子探秘恐龙世界 中文版"},
		//{"type_name":"奇趣生物大百科","type_id": "奇趣生物大百科"},
		//{"type_name":"动物世界","type_id": "玩转奇妙的动物世界"},
		//{"type_name":"植物启蒙","type_id": "【小灯塔】给孩子的植物启蒙课"},
		//{"type_name":"物种百科","type_id": "小灯塔给孩子的物种百科"},
		//{"type_name":"昆虫记","type_id": "昆虫记"},
		//{"type_name":"探秘故宫角落","type_id": "探秘故宫角落"},
		//{"type_name":"top10名校","type_id": "10天游遍世界top10名校"},
		//{"type_name":"top10名画","type_id": "看懂世界top10名画"},
		//{"type_name":"地球","type_id": "【全8集】舌尖上的地球"},
	//地理
		{"type_name":"地理","type_id": "给孩子的第一堂海洋课【完结】"},
		//{"type_name":"海底世界","type_id": "穿越奇妙海底世界"},
		//{"type_name":"地球生命史","type_id": "小灯塔地球生命史"},
		//{"type_name":"探秘地球南北极","type_id": "小灯塔探秘地球南北极"},
		//{"type_name":"世界十大名胜","type_id": "小灯塔探秘世界十大名胜"},
		//{"type_name":"环球之旅","type_id": "小灯塔奇妙的环球之旅"},
		//{"type_name":"华夏地理","type_id": "小灯塔探秘华夏地理"},
		//{"type_name":"自然地理","type_id": "小灯塔自然地理大巡游"},
		//{"type_name":"出发啦！ 敦煌","type_id": "小灯塔出发啦！ 敦煌"},
		//{"type_name":"冲出亚马逊","type_id": "小灯塔冲出亚马逊"},
		//{"type_name":"走进美国","type_id": "小灯塔走进美国"},
		//{"type_name":" 非洲大冒险","type_id": "小灯塔 非洲大冒险"},

	//国学
		{"type_name":"国学","type_id": "神奇的汉字故事 全20集"},
		//{"type_name":"唐诗大世界","type_id": "穿越唐诗大世界"},
		//{"type_name":"诗词大会","type_id": "【小灯塔】诗词大会"},
		//{"type_name":"三字经","type_id": "三字经幼儿启蒙(56集超清全)"},
		//{"type_name":"西游记","type_id": "30集西游记精选故事 给孩子看的经典神话"},
		//{"type_name":"经典神话","type_id": "30集西游记精选故事 给孩子看的经典神话"},
		//{"type_name":"成语故事","type_id": "【100集全】成语故事动画 小灯塔成语动画"},
		//{"type_name":"中华名人故事","type_id": "【小灯塔】中华名人故事"},
		//{"type_name":"山海经","type_id": "20集全【给孩子的山海经】小灯塔趣味动画"},
		//{"type_name":"三国动画","type_id": "三国动画故事（24节全）"},
		//{"type_name":"春节习俗","type_id": "【小灯塔】春节习俗追根溯源立春节"},
		//{"type_name":"少儿版三国演义","type_id": "小灯塔少儿版三国演义"},
		//{"type_name":"十二生肖","type_id": "【小灯塔】十二生肖"},
		//{"type_name":"中华上下五千年","type_id": "【小灯塔】中华上下五千年"}
];
  let filterObj = {
		//百科
		"10天玩转世界top10博物馆":[
			{"key":"tid","name":"分类","value":[
				{"n":"【小灯塔】10天玩转世界top10博物馆卢浮宫博物馆","v":"【小灯塔】10天玩转世界top10博物馆卢浮宫博物馆"},
				{"n":"玩转世界博物馆第二季","v":"玩转世界博物馆第二季"},
				{"n":"【合集】带孩子探秘恐龙世界 中文版","v":"【合集】带孩子探秘恐龙世界 中文版"},
				{"n":"【小灯塔】带孩子探秘恐龙世界宇宙的起源(英文版)","v":"【小灯塔】带孩子探秘恐龙世界宇宙的起源(英文版)"},
				{"n":"奇趣生物大百科","v":"奇趣生物大百科"},
				{"n":"玩转奇妙的动物世界","v":"玩转奇妙的动物世界"},
				{"n":"【小灯塔】给孩子的植物启蒙课","v":"【小灯塔】给孩子的植物启蒙课"},
				{"n":"昆虫记","v":"昆虫记"},
				{"n":"【小灯塔】昆虫记走进昆虫世界","v":"【小灯塔】昆虫记走进昆虫世界"},
				{"n":"探秘故宫角落","v":"探秘故宫角落"},
				{"n":"10天游遍世界top10名校","v":"10天游遍世界top10名校"},
				{"n":"看懂世界top10名画","v":"看懂世界top10名画"},
				{"n":"【全8集】舌尖上的地球","v":"【全8集】舌尖上的地球"}
				]},
			{"key": "duration","name": "时长","value": [
				{"n": "100~200分钟","v": "0"},
				{"n": "60~100分钟","v": "1"},
				{"n": "40~60分钟","v": "2"},
				{"n": "200分钟以上","v": "3"},
				{"n": "40分钟以下","v": "4"}]}],
		//国学
		"神奇的汉字故事 全20集":[
			{"key":"tid","name":"分类","value":[
				{"n":"神奇的汉字故事 全20集","v":"神奇的汉字故事 全20集"},
				{"n":"穿越唐诗大世界","v":"穿越唐诗大世界"},
				{"n":"【小灯塔】诗词大会","v":"【小灯塔】诗词大会"},
				{"n":"三字经幼儿启蒙(56集超清全)","v":"三字经幼儿启蒙(56集超清全)"},
				{"n":"30集西游记精选故事 给孩子看的经典神话","v": "30集西游记精选故事 给孩子看的经典神话"},
				{"n":"【100集全】成语故事动画 小灯塔成语动画","v": "【100集全】成语故事动画 小灯塔成语动画"},
				{"n":"【小灯塔】中华名人故事","v": "【小灯塔】中华名人故事"},
				{"n":"20集全【给孩子的山海经】小灯塔趣味动画","v": "20集全【给孩子的山海经】小灯塔趣味动画"},
				{"n":"三国动画故事（24节全）","v": "三国动画故事（24节全）"},
				{"n":"【小灯塔】春节习俗追根溯源立春节","v": "【小灯塔】春节习俗追根溯源立春节"},
				{"n":"【小灯塔】十二生肖","v": "【小灯塔】十二生肖"},
				{"n":"【小灯塔】中华上下五千年","v": "【小灯塔】中华上下五千年"}
				]},
			{"key": "duration","name": "时长","value": [
				{"n": "100~200分钟","v": "0"},
				{"n": "60~100分钟","v": "1"},
				{"n": "40~60分钟","v": "2"},
				{"n": "200分钟以上","v": "3"},
				{"n": "40分钟以下","v": "4"}]}],
		//地理
		"给孩子的第一堂海洋课【完结】":[
			{"key":"tid","name":"分类","value":[
				{"n":"给孩子的第一堂海洋课【完结】","v": "给孩子的第一堂海洋课【完结】"},
				{"n":"穿越奇妙海底世界","v": "穿越奇妙海底世界"},
				{"n":"【小灯塔】地球生命史","v": "【小灯塔】地球生命史"},
				{"n":"探秘地球南北极","v": "小灯塔探秘地球南北极"},
				{"n":"世界十大名胜","v": "小灯塔探秘世界十大名胜"},
				{"n":"环球之旅","v": "小灯塔奇妙的环球之旅"},
				{"n":"华夏地理","v": "小灯塔探秘华夏地理"},
				{"n":"自然地理","v": "小灯塔自然地理大巡游"},
				{"n":"出发啦！ 敦煌","v": "小灯塔出发啦！ 敦煌"},
				{"n":"冲出亚马逊","v": "小灯塔冲出亚马逊"},
				{"n":"走进美国","v": "小灯塔走进美国"},
				{"n":" 非洲大冒险","v": "小灯塔 非洲大冒险"}
				]},
			{"key": "duration","name": "时长","value": [
				{"n": "100~200分钟","v": "0"},
				{"n": "60~100分钟","v": "1"},
				{"n": "40~60分钟","v": "2"},
				{"n": "200分钟以上","v": "3"},
				{"n": "40分钟以下","v": "4"}]}],
		//科学
		"小灯塔.剑桥数学启蒙课（全）":[
			{"key":"tid","name":"分类","value":[
				{"n":"小灯塔.剑桥数学启蒙课（全）","v": "小灯塔.剑桥数学启蒙课（全）"},
				{"n":"奇趣科学实验室","v": "小灯塔奇趣科学实验室"},
				{"n":"剑桥数学启蒙课","v": "小灯塔剑桥数学启蒙课"},
				{"n":"宇宙探秘之旅","v": "小灯塔十大主题宇宙探秘之旅"},
				{"n":"跟动物老师学发明","v": "小灯塔跟动物老师学发明"},
				{"n":"天才发明家","v": "小灯塔天才发明家"},
				{"n":"剑桥博士讲物理","v": "小灯塔剑桥博士讲物理"},
				{"n":"STEM奇妙科学课","v": "小灯塔STEM奇妙科学课"},
				{"n":"出发吧，月球！","v": "小灯塔出发吧，月球！"},
				{"n":"十大世界未解之谜","v": "小灯塔探秘十大世界未解之谜"},
				{"n":"神奇的气象魔法","v": "小灯塔神奇的气象魔法"},
				{"n":"了不起的新科技","v": "小灯塔了不起的新科技"}
				]},
			{"key": "duration","name": "时长","value": [
				{"n": "100~200分钟","v": "0"},
				{"n": "60~100分钟","v": "1"},
				{"n": "40~60分钟","v": "2"},
				{"n": "200分钟以上","v": "3"},
				{"n": "40分钟以下","v": "4"}]}],
		//人文
		"给孩子的第一堂性教育课":[
			{"key":"tid","name":"分类","value":[
				{"n":"给孩子的第一堂性教育课","v": "给孩子的第一堂性教育课"},
				{"n":"小灯塔安全教育课","v": "小灯塔安全教育课"},
				{"n":"影响十万少年的人际沟通课","v": "影响十万少年的人际沟通课"},
				{"n":"跟着棋圣学围棋","v": "小灯塔跟着棋圣学围棋"},
				{"n":"小灯塔财商启蒙课","v": "小灯塔财商启蒙课"},
				{"n":"小灯塔人体奥秘","v": "小灯塔人体奥秘"},
				
				{"n":"讲给孩子的人类简史","v": "小灯塔讲给孩子的人类简史"},
				{"n":"讲给孩子的希腊神话故事","v": "小灯塔讲给孩子的希腊神话故事"}
				]},
			{"key": "duration","name": "时长","value": [
				{"n": "100~200分钟","v": "0"},
				{"n": "60~100分钟","v": "1"},
				{"n": "40~60分钟","v": "2"},
				{"n": "200分钟以上","v": "3"},
				{"n": "40分钟以下","v": "4"}]}]
};
  return JSON.stringify({
      class: classes,
      filters: filterObj,
  });
}

async function homeVod() {
  let html = HOST + '/x/web-interface/search/type?search_type=video&keyword='+homeName;
  let data = JSON.parse(await request(html)).data.result;
  let videos = [];
  data.forEach(function(it) {
      if(it.bvid!==""){       videos.push({
          vod_id: it.aid,
          vod_name: stripHtmlTag(it.title),
          vod_pic: 'http:'+it.pic,
          vod_remarks: turnDHM(it.duration) || ''})};
  });
  return JSON.stringify({
      list: videos,
  });
}

async function category(tid, pg, filter, extend) {
  let html = HOST + '/x/web-interface/search/type?search_type=video&page=' + pg + '&keyword=' + (extend.tid || tid) + '&duration=' + (extend.duration || '') + '&order=' + (extend.order || '');
  let data = JSON.parse(await request(html)).data;
  let videos = [];
  data.result.forEach(function(it) {
      if(it.bvid!==""){       videos.push({
          vod_id: it.aid,
          vod_name: stripHtmlTag(it.title),
          vod_pic: 'https:' + it.pic,
          vod_remarks: turnDHM(it.duration) || ''})};
  });
  return JSON.stringify({
      page: parseInt(data.page),
      pagecount: data.numPages,
      limit: 20,
      total: data.numResults,
      list: videos,
  });
}

async function detail(id) {
  let data = JSON.parse(await request(HOST + '/x/web-interface/view?aid=' + id)).data;
  let vod = {
      vod_id: data.aid,
      vod_name: stripHtmlTag(data.title),
      vod_pic: data.pic,
      type_name: data.tname,
      vod_year: new Date(data.pubdate*1000).getFullYear(),
      vod_remarks: '',
      vod_director: data.owner.name,
      vod_content: stripHtmlTag(data.desc),
  };
  let episodes = data.pages;
  let playurls = [];
  episodes.forEach(function(it) {
    let cid = it.cid;
    let part = it.part.replace('#', '﹟').replace('$', '﹩');
    playurls.push(
        part + '$' + data.aid + '_' + cid
    )
  });
  let playUrl = playurls.join('#');
  vod.vod_play_from = 'B站';
  vod.vod_play_url = playUrl;
  return JSON.stringify({
    list: [vod],
  });
}

async function play(flag, id, flags) {
  let ids = id.split('_');
  let html = HOST + '/x/player/playurl?avid=' + ids[0] + '&cid=' + ids[1] + '&qn=116';
  let data = JSON.parse(await request(html)).data.durl;
  let maxSize = -1;
  let position = -1;  const dan = 'https://api.bilibili.com/x/v1/dm/list.so?oid=' + ids[1];
  data.forEach(function(it, i) {
      if (maxSize < Number(it.size)) {
          maxSize = Number(it.size);
          position = i
      }
  });
  let purl = '';
  if (data.length > 0) {
    if (position === -1) {
        position = 0
    }
    purl = data[position].url
  }
  // console.debug('我的哔哩 purl =====>' + purl); // js_debug.log
  return JSON.stringify({
    parse: 0,
    url: purl,    danmaku: dan, 
    header: getMb(),
  });
}

async function search(wd, quick, pg) {
  if(searchable==1){
  if (pg <= 0 || typeof(pg) == 'undefined') pg = 1;
  let html = HOST + '/x/web-interface/search/type?search_type=video&keyword=' + wd + '&page=' + pg;
  let data = JSON.parse(await request(html)).data;
  let videos = [];
  data.result.forEach(function(it) {
    if(it.bvid!==""){       videos.push({
        vod_id: it.aid,
        vod_name: stripHtmlTag(it.title),
        vod_pic: 'https:' + it.pic,
        vod_remarks: turnDHM(it.duration) || '',
    })};
  });
  return JSON.stringify({
      page: parseInt(data.page),
      pagecount: data.numPages,
      limit: 20,
      total: data.numResults,
      list: videos,
  });
  }else{
	  return null;
  }
}

function getHeader(cookie) {
  let header = {};
  header['cookie'] = cookie;
  header['User-Agent'] = PC_UA;
  header['Referer'] = 'https://www.bilibili.com';
  return header;
}

function getMb() {
  return getHeader(cookie);
}

function stripHtmlTag(src) {
  return src
      .replace(/<\/?[^>]+(>|$)/g, '')
      .replace(/&.{1,5};/g, '')
      .replace(/\s{2,}/g, ' ');
}

function turnDHM(duration) {
  let min = duration.split(':')[0];
  let sec = duration.split(':')[1];
  if (min == 0) {
      return sec + '秒';
  } else if (0 < min && min < 60) {
      return min + '分';
  } else if (60 <= min && min < 1440) {
      if (min % 60 == 0) {
          let h = min / 60;
          return h + '小时';
      } else {
          let h = min / 60;
          h = (h + '').split('.')[0];
          let m = min % 60;
          return h + '小时' + m + '分';
      }
  } else if (min >= 1440) {
      let d = min / 60 / 24;
      d = (d + '').split('.')[0];
      let h = min / 60 % 24;
      h = (h + '').split('.')[0];
      let m = min % 60;
      let dhm = '';
      if (d > 0) {
          dhm = d + '天'
      }
      if (h >= 1) {
          dhm = dhm + h + '小时'
      }
      if (m > 0) {
          dhm = dhm + m + '分'
      }
      return dhm;
  }
  return null;
}

export function __jsEvalReturn() {
  return {
      init: init,
      home: home,
      homeVod: homeVod,
      category: category,
      detail: detail,
      play: play,
      search: search,
  };
}
