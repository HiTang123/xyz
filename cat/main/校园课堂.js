import { _ } from "assets://js/lib/cat.js";
let key = '校园课堂';
let homeName = '中小学高效学习方法';
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
    {
      "type_name": "幼儿园",
      "type_id": "幼儿园"
    },
    {
      "type_name": "小学",
      "type_id": "小学"
    },
    {
      "type_name": "初中",
      "type_id": "初中"
    },
    {
      "type_name": "高中",
      "type_id": "高中"
    }
];
  let filterObj = {
    "幼儿园": [
      {
        "key": "order",
        "name": "排序",
        "value": [
          {
            "n": "综合排序",
            "v": "0"
          },
          {
            "n": "最多点击",
            "v": "click"
          },
          {
            "n": "最新发布",
            "v": "pubdate"
          },
          {
            "n": "最多弹幕",
            "v": "dm"
          },
          {
            "n": "最多收藏",
            "v": "stow"
          }
        ]
      },
	  {
        "key": "tid",
        "name": "分类",
        "value": [
          {
		    "n": "儿童早教",
		    "v": "儿童早教"
		  },
		  {
		    "n": "儿童启蒙故事",
		    "v": "儿童启蒙故事"
		  },
		  {
		    "n": "儿童英语启蒙",
		    "v": "儿童英语启蒙"
		  },
		  {
		    "n": "儿童歌曲",
		    "v": "儿童歌曲"
		  },
		  {
		    "n": "儿童绘画",
		    "v": "儿童绘画"
		  },
		  {
		    "n": "睡前故事",
		    "v": "睡前故事"
		  },
		  {
		    "n": "儿童动画",
		    "v": "儿童动画"
		  },
		  {
		    "n": "儿童音乐",
		    "v": "儿童音乐"
		  },
		  {
		    "n": "儿童安全教育",
		    "v": "儿童安全教育"
		  },
		  {
		    "n": "贝瓦儿歌",
		    "v": "贝瓦儿歌"
		  },
		  {
		    "n": "悟空识字",
		    "v": "悟空识字"
		  },
		  {
		    "n": "宝宝巴士",
		    "v": "宝宝巴士"
		  },
		  {
		    "n": "儿歌多多",
		    "v": "儿歌多多"
		  },
		  {
		    "n": "学而思",
		    "v": "学而思"
		  }          
        ]
      },
      {
        "key": "duration",
        "name": "时长",
        "value": [
          {
            "n": "全部",
            "v": "0"
          },
          {
            "n": "60分钟以上",
            "v": "4"
          },
          {
            "n": "30~60分钟",
            "v": "3"
          },
          {
            "n": "10~30分钟",
            "v": "2"
          },
          {
            "n": "10分钟以下",
            "v": "1"
          }
        ]
      }
    ],
	"小学": [
      {
        "key": "order",
        "name": "排序",
        "value": [
          {
            "n": "综合排序",
            "v": "0"
          },
          {
            "n": "最多点击",
            "v": "click"
          },
          {
            "n": "最新发布",
            "v": "pubdate"
          },
          {
            "n": "最多弹幕",
            "v": "dm"
          },
          {
            "n": "最多收藏",
            "v": "stow"
          }
        ]
      },
	  {
        "key": "tid",
        "name": "分类",
        "value": [
		{
		  "n": "1年级语文",
		  "v": "1年级语文"
		},
		{
		  "n": "1年级数学",
		  "v": "1年级数学"
		},
		{
		  "n": "1年级英语",
		  "v": "1年级英语"
		},
		{
		  "n": "2年级语文",
		  "v": "2年级语文"
		},
		{
		  "n": "2年级数学",
		  "v": "2年级数学"
		},
		{
		  "n": "2年级英语",
		  "v": "2年级英语"
		},
		{
		  "n": "3年级语文",
		  "v": "3年级语文"
		},
		{
		  "n": "3年级数学",
		  "v": "3年级数学"
		},
		{
		  "n": "3年级英语",
		  "v": "3年级英语"
		},
		{
		  "n": "4年级语文",
		  "v": "4年级语文"
		},
		{
		  "n": "4年级数学",
		  "v": "4年级数学"
		},
		{
		  "n": "4年级英语",
		  "v": "4年级英语"
		},
		{
		  "n": "5年级语文",
		  "v": "5年级语文"
		},
		{
		  "n": "5年级数学",
		  "v": "5年级数学"
		},
		{
		  "n": "5年级英语",
		  "v": "5年级英语"
		},
		{
		  "n": "6年级语文",
		  "v": "6年级语文"
		},
		{
		  "n": "6年级数学",
		  "v": "6年级数学"
		},
		{
		  "n": "6年级英语",
		  "v": "6年级英语"
		}		
        ]
      },
      {
        "key": "duration",
        "name": "时长",
        "value": [
          {
            "n": "全部",
            "v": "0"
          },
          {
            "n": "60分钟以上",
            "v": "4"
          },
          {
            "n": "30~60分钟",
            "v": "3"
          },
          {
            "n": "10~30分钟",
            "v": "2"
          },
          {
            "n": "10分钟以下",
            "v": "1"
          }
        ]
      }
    ],
	"初中": [
      {
        "key": "order",
        "name": "排序",
        "value": [
          {
            "n": "综合排序",
            "v": "0"
          },
          {
            "n": "最多点击",
            "v": "click"
          },
          {
            "n": "最新发布",
            "v": "pubdate"
          },
          {
            "n": "最多弹幕",
            "v": "dm"
          },
          {
            "n": "最多收藏",
            "v": "stow"
          }
        ]
      },
	  {
        "key": "tid",
        "name": "分类",
        "value": [
		{
		  "n": "7年级语文",
		  "v": "7年级语文"
		},
		{
		  "n": "7年级数学",
		  "v": "7年级数学"
		},
		{
		  "n": "7年级英语",
		  "v": "7年级英语"
		},
		{
		  "n": "7年级历史",
		  "v": "7年级历史"
		},
		{
		  "n": "7年级地理",
		  "v": "7年级地理"
		},
		{
		  "n": "7年级生物",
		  "v": "7年级生物"
		},
		{
		  "n": "8年级语文",
		  "v": "8年级语文"
		},
		{
		  "n": "8年级数学",
		  "v": "8年级数学"
		},
		{
		  "n": "8年级英语",
		  "v": "8年级英语"
		},
		{
		  "n": "8年级历史",
		  "v": "8年级历史"
		},
		{
		  "n": "8年级地理",
		  "v": "8年级地理"
		},
		{
		  "n": "8年级生物",
		  "v": "8年级生物"
		},
		{
		  "n": "8年级物理",
		  "v": "8年级物理"
		},
		{
		  "n": "9年级语文",
		  "v": "9年级语文"
		},
		{
		  "n": "9年级数学",
		  "v": "9年级数学"
		},
		{
		  "n": "9年级英语",
		  "v": "9年级英语"
		},
		{
		  "n": "9年级历史",
		  "v": "9年级历史"
		},
		{
		  "n": "9年级地理",
		  "v": "9年级地理"
		},
		{
		  "n": "9年级生物",
		  "v": "9年级生物"
		},
		{
		  "n": "9年级物理",
		  "v": "9年级物理"
		},
		{
		  "n": "9年级化学",
		  "v": "9年级化学"
		}                   
        ]
      },
      {
        "key": "duration",
        "name": "时长",
        "value": [
          {
            "n": "全部",
            "v": "0"
          },
          {
            "n": "60分钟以上",
            "v": "4"
          },
          {
            "n": "30~60分钟",
            "v": "3"
          },
          {
            "n": "10~30分钟",
            "v": "2"
          },
          {
            "n": "10分钟以下",
            "v": "1"
          }
        ]
      }
    ],
	"高中": [
      {
        "key": "order",
        "name": "排序",
        "value": [
          {
            "n": "综合排序",
            "v": "0"
          },
          {
            "n": "最多点击",
            "v": "click"
          },
          {
            "n": "最新发布",
            "v": "pubdate"
          },
          {
            "n": "最多弹幕",
            "v": "dm"
          },
          {
            "n": "最多收藏",
            "v": "stow"
          }
        ]
      },
	  {
        "key": "tid",
        "name": "分类",
        "value": [
		{
		  "n": "高一语文",
		  "v": "高一语文"
		},
		{
		  "n": "高一数学",
		  "v": "高一数学"
		},
		{
		  "n": "高一英语",
		  "v": "高一英语"
		},
		{
		  "n": "高一历史",
		  "v": "高一历史"
		},
		{
		  "n": "高一地理",
		  "v": "高一地理"
		},
		{
		  "n": "高一生物",
		  "v": "高一生物"
		},
		{
		  "n": "高一思想政治",
		  "v": "高一思想政治"
		},
		{
		  "n": "高一物理",
		  "v": "高一物理"
		},
		{
		  "n": "高一化学",
		  "v": "高一化学"
		},
		{
		  "n": "高二语文",
		  "v": "高二语文"
		},
		{
		  "n": "高二数学",
		  "v": "高二数学"
		},
		{
		  "n": "高二英语",
		  "v": "高二英语"
		},
		{
		  "n": "高二历史",
		  "v": "高二历史"
		},
		{
		  "n": "高二地理",
		  "v": "高二地理"
		},
		{
		  "n": "高二生物",
		  "v": "高二生物"
		},
		{
		  "n": "高二思想政治",
		  "v": "高二思想政治"
		},
		{
		  "n": "高二物理",
		  "v": "高二物理"
		},
		{
		  "n": "高二化学",
		  "v": "高二化学"
		},
		{
		  "n": "高三语文",
		  "v": "高三语文"
		},
		{
		  "n": "高三数学",
		  "v": "高三数学"
		},
		{
		  "n": "高三英语",
		  "v": "高三英语"
		},
		{
		  "n": "高三历史",
		  "v": "高三历史"
		},
		{
		  "n": "高三地理",
		  "v": "高三地理"
		},
		{
		  "n": "高三生物",
		  "v": "高三生物"
		},
		{
		  "n": "高三思想政治",
		  "v": "高三思想政治"
		},
		{
		  "n": "高三物理",
		  "v": "高三物理"
		},
		{
		  "n": "高三化学",
		  "v": "高三化学"
		},
		{
		  "n": "高中信息技术",
		  "v": "高中信息技术"
		},
		{
		  "n": "高中信息技术",
		  "v": "高中信息技术"
		}                    
        ]
      },
      {
        "key": "duration",
        "name": "时长",
        "value": [
          {
            "n": "全部",
            "v": "0"
          },
          {
            "n": "60分钟以上",
            "v": "4"
          },
          {
            "n": "30~60分钟",
            "v": "3"
          },
          {
            "n": "10~30分钟",
            "v": "2"
          },
          {
            "n": "10分钟以下",
            "v": "1"
          }
        ]
      }
    ]
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
