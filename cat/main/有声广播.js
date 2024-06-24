import { _ } from "assets://js/lib/cat.js";
let key = '有声广播';
let homeName = '多人有声广播剧';
let HOST = 'https://api.bilibili.com';
let siteKey = '';
let siteType = 0;
let searchable=0;
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
		{"type_name": "有声小说","type_id": "多人有声小说"},
		{"type_name": "广播剧","type_id": "广播剧有声剧"},
		{"type_name": "故事会","type_id": "故事会"},
		{"type_name": "电台","type_id": "电台"}
	];
	let filterObj = {
		"广播剧有声剧": [{"key":"tid","name":"分类","value":[{"n":"全部","v":"0"},{"n":"言情","v":"完整广播剧言情"},{"n":"悬疑","v":"完整广播剧悬疑"},{"n":"穿越","v":"完整广播剧穿越"},{"n":"纯爱","v":"完整广播剧纯爱"},{"n":"动漫","v":"完整广播剧动漫"},{"n":"仙侠","v":"完整广播剧仙侠"},{"n":"架空","v":"完整广播剧架空"},{"n":"科幻","v":"完整广播剧科幻"},{"n":"武侠","v":"完整广播剧武侠"},{"n":"奇幻","v":"完整广播剧奇幻"},{"n":"都市","v":"完整广播剧都市"}]},{"key": "order","name": "排序","value": [{ "n": "综合排序","v": "0"},{"n": "最多点击","v": "click"},{"n": "最新发布","v": "pubdate"},{"n": "最多弹幕","v": "dm"},{"n": "最多收藏","v": "stow"}]},{"key": "duration","name": "时长","value": [{"n": "全部","v": "0"},{"n": "60分钟以上","v": "4"},{"n": "30~60分钟","v": "3"},{"n": "10~30分钟","v": "2"},{"n": "10分钟以下","v": "1"}]}],
		"多人有声小说": [{"key":"tid","name":"分类","value":[{"n":"全部","v":"0"},{"n":"影视原著","v":"有声影视原著"},{"n":"军事","v":"多人有声小说军事"},{"n":"文学","v":"多人有声文学作品"},{"n":"历史","v":"多人有声小说历史"},{"n":"穿越","v":"多人有声小说穿越"},{"n":"重生","v":"多人有声小说重生"},{"n":"奇幻","v":"多人有声小说奇幻"},{"n":"悬疑","v":"多人有声小说悬疑"},{"n":"灵异","v":"多人有声小说灵异"},{"n":"武侠","v":"多人有声小说武侠"},{"n":"都市","v":"多人有声小说都市"},{"n":"玄幻","v":"多人有声小说玄幻"},{"n":"游戏","v":"多人有声小说游戏"},{"n":"科幻","v":"多人有声小说科幻"},{"n":"仙侠","v":"多人有声小说仙侠"},{"n":"幻想言情","v":"多人有声小说幻想言情"},{"n":"浪漫青春","v":"多人有声小说浪漫青春"},{"n":"现代言情","v":"多人有声小说现代言情"},{"n":"古风言情","v":"多人有声小说古风言情"},{"n":"爱情悬疑","v":"多人有声小说爱情悬疑"}]},{"key": "order","name": "排序","value": [{ "n": "综合排序","v": "0"},{"n": "最多点击","v": "click"},{"n": "最新发布","v": "pubdate"},{"n": "最多弹幕","v": "dm"},{"n": "最多收藏","v": "stow"}]},{"key": "duration","name": "时长","value": [{"n": "全部","v": "0"},{"n": "60分钟以上","v": "4"},{"n": "30~60分钟","v": "3"},{"n": "10~30分钟","v": "2"},{"n": "10分钟以下","v": "1"}]}],
		"电台": [{"key":"tid","name":"分类","value":[{"n":"全部","v":"0"},{"n":"情感","v":"情感电台"},{"n":"深夜","v":"深夜电台"},{"n":"助眠","v":"助眠电台"},{"n":"音乐","v":"音乐电台"}]},{"key": "order","name": "排序","value": [{ "n": "综合排序","v": "0"},{"n": "最多点击","v": "click"},{"n": "最新发布","v": "pubdate"},{"n": "最多弹幕","v": "dm"},{"n": "最多收藏","v": "stow"}]},{"key": "duration","name": "时长","value": [{"n": "全部","v": "0"},{"n": "60分钟以上","v": "4"},{"n": "30~60分钟","v": "3"},{"n": "10~30分钟","v": "2"},{"n": "10分钟以下","v": "1"}]}],
		"故事会": [{"key":"tid","name":"分类","value":[{"n":"全部","v":"0"},{"n":"合集","v":"故事会合集"},{"n":"睡前故事","v":"睡前故事合集"},{"n":"短篇鬼故事","v":"短篇恐怖灵异鬼故事"},{"n":"短篇小说","v":"有声短篇小说"}]},{"key": "order","name": "排序","value": [{ "n": "综合排序","v": "0"},{"n": "最多点击","v": "click"},{"n": "最新发布","v": "pubdate"},{"n": "最多弹幕","v": "dm"},{"n": "最多收藏","v": "stow"}]},{"key": "duration","name": "时长","value": [{"n": "全部","v": "0"},{"n": "60分钟以上","v": "4"},{"n": "30~60分钟","v": "3"},{"n": "10~30分钟","v": "2"},{"n": "10分钟以下","v": "1"}]}]
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
      if(it.bvid!==""){
       videos.push({
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
      if(it.bvid!==""){
       videos.push({
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
  let position = -1;
  const dan = 'https://api.bilibili.com/x/v1/dm/list.so?oid=' + ids[1];
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
    url: purl,
    danmaku: dan,    
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
    if(it.bvid!==""){
       videos.push({
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
