import { _ } from "assets://js/lib/cat.js";
let key = '影视解说';
let homeName = '影视解说';
let HOST = 'https://api.bilibili.com';
let siteKey = '';
let siteType = 0;
let searchable= 1;//searchable=1 启用搜索
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
      "type_name":"影视解说",
      "type_id": "影视解说"
    },
  
    {
      "type_name": "木鱼水心",
      "type_id": "木鱼水心"
    },
    {
      "type_name": "史君说剧",
      "type_id": "史君说剧"
    },
    {
      "type_name": "百晓生说剧",
      "type_id": "百晓生说剧"
    },
    {
      "type_name": "low君",
      "type_id": "low君"
    },
    {
      "type_name": "小片片",
      "type_id": "小片片"
    },
   {
      "type_name": "刘哔电影",
      "type_id": "刘哔电影"
    },
    {
      "type_name": "刘老师说电影",
      "type_id": "刘老师说电影"
    },
    {
      "type_name": "电影最TOP",
      "type_id": "电影最TOP"
    },
    {
      "type_name": "阿斗归来了",
      "type_id": "阿斗归来了"
    },
    {
      "type_name": "老邪说电影",
      "type_id": "老邪说电影"
    },

{
      "type_name": "大蓝雀",
      "type_id": "大蓝雀"
    },
    {
      "type_name": "big笑工坊",
      "type_id": "big笑工坊"
    },
     {
      "type_name": "虫哥说电影",
      "type_id": "虫哥说电影"
    },
     {
      "type_name": "蔡老板家的长工",
      "type_id": "蔡老板家的长工"
    },
     {
      "type_name": "牛叔万岁万岁万万岁",
      "type_id": "牛叔万岁万岁万万岁"
    },
     {
      "type_name": "嘻咦啊看",
      "type_id": "嘻咦啊看"
    },
    {
      "type_name": "我是怪异君",
      "type_id": "我是怪异君"
    },
    {
      "type_name": "UFC",
      "type_id": "UFC"
    }
];
  let filterObj = {
"影视解说": [
{"key": "order","name": "排序","value": [
{"n": "综合排序","v": "0"},
{"n": "最多点击","v": "click"},
{"n": "最新发布","v": "pubdate"},
{"n": "最多弹幕","v": "dm"},
{"n": "最多收藏","v": "stow"}
]
},
   {
        "key": "tid",
        "name": "分类",
        "value": [
          {
            "n": "全部",
            "v": "影视解说"
          },
          {
            "n": "阿斗归来了",
            "v": "阿斗归来了"
            },

               {
            "n": "UFC",
            "v": "UFC"
          },
          {
            "n": "木鱼水心",
            "v": "木鱼水心"
          },
          {
            "n": "刘哔电影",
            "v": "刘哔电影"
          },
          {
            "n": "史君说剧",
            "v": "史君说剧"
          },
          {
            "n": "百晓生说剧",
            "v": "百晓生说剧"
          },
          {
            "n": "low君",
            "v": "low君"
          },
          {
            "n": "小片片",
            "v": "小片片"
          },
          {
            "n": "刘老师说电影",
            "v": "刘老师说电影"
          },
          {
            "n": "电影最TOP",
            "v": "电影最TOP"
          },
          {
            "n": "老邪说电影",
            "v": "老邪说电影"
          },
          {
            "n": "大蓝雀",
            "v": "大蓝雀"
          },
          {
            "n": "big笑工坊",
            "v": "big笑工坊"
          },
          {
            "n": "虫哥说电影",
            "v": "虫哥说电影"
          },
          {
            "n": "蔡老板家的长工",
            "v": "蔡老板家的长工"
          },
          {
            "n": "牛叔万岁万岁万万岁",
            "v": "牛叔万岁万岁万万岁"
          },
          {
            "n": "我是怪异君",
            "v": "我是怪异君"
          },
              {
            "n": "嘻咦啊看",
            "v": "嘻咦啊看"
          },
          {
            "n": "持续更新",
            "v": "0"
          }
            ]
            },

{"key": "duration","name": "时长","value": [
{"n": "全部时长","v": "0"},
{"n": "60分钟以上","v": "4"},
{"n": "30~60分钟","v": "3"},
{"n": "10~30分钟","v": "2"},
{"n": "10分钟以下","v": "1"}

]
}
],




"low局": [
{"key": "order","name": "排序","value": [
{"n": "综合排序","v": "0"},
{"n": "最多点击","v": "click"},
{"n": "最新发布","v": "pubdate"},
{"n": "最多弹幕","v": "dm"},
{"n": "最多收藏","v": "stow"}
]
},
{"key": "duration","name": "时长","value": [
{"n": "全部时长","v": "0"},
{"n": "60分钟以上","v": "4"},
{"n": "30~60分钟","v": "3"},
{"n": "10~30分钟","v": "2"},
{"n": "10分钟以下","v": "1"}

]
}
],

"木鱼水心": [
{"key": "order","name": "排序","value": [
{"n": "综合排序","v": "0"},
{"n": "最多点击","v": "click"},
{"n": "最新发布","v": "pubdate"},
{"n": "最多弹幕","v": "dm"},
{"n": "最多收藏","v": "stow"}
]
},
{"key": "duration","name": "时长","value": [
{"n": "全部时长","v": "0"},
{"n": "60分钟以上","v": "4"},
{"n": "30~60分钟","v": "3"},
{"n": "10~30分钟","v": "2"},
{"n": "10分钟以下","v": "1"}

]
}
],



"小片片": [
{"key": "order","name": "排序","value": [
{"n": "综合排序","v": "0"},
{"n": "最多点击","v": "click"},
{"n": "最新发布","v": "pubdate"},
{"n": "最多弹幕","v": "dm"},
{"n": "最多收藏","v": "stow"}
]
},
{"key": "duration","name": "时长","value": [
{"n": "全部时长","v": "0"},
{"n": "60分钟以上","v": "4"},
{"n": "30~60分钟","v": "3"},
{"n": "10~30分钟","v": "2"},
{"n": "10分钟以下","v": "1"}

]
}
],


"刘哔电影": [
{"key": "order","name": "排序","value": [
{"n": "综合排序","v": "0"},
{"n": "最多点击","v": "click"},
{"n": "最新发布","v": "pubdate"},
{"n": "最多弹幕","v": "dm"},
{"n": "最多收藏","v": "stow"}
]
},
{"key": "duration","name": "时长","value": [
{"n": "全部时长","v": "0"},
{"n": "60分钟以上","v": "4"},
{"n": "30~60分钟","v": "3"},
{"n": "10~30分钟","v": "2"},
{"n": "10分钟以下","v": "1"}

]
}
],

"刘老师说电影": [
{"key": "order","name": "排序","value": [
{"n": "综合排序","v": "0"},
{"n": "最多点击","v": "click"},
{"n": "最新发布","v": "pubdate"},
{"n": "最多弹幕","v": "dm"},
{"n": "最多收藏","v": "stow"}
]
},
{"key": "duration","name": "时长","value": [
{"n": "全部时长","v": "0"},
{"n": "60分钟以上","v": "4"},
{"n": "30~60分钟","v": "3"},
{"n": "10~30分钟","v": "2"},
{"n": "10分钟以下","v": "1"}

]
}
],

"电影最TOP": [
{"key": "order","name": "排序","value": [
{"n": "综合排序","v": "0"},
{"n": "最多点击","v": "click"},
{"n": "最新发布","v": "pubdate"},
{"n": "最多弹幕","v": "dm"},
{"n": "最多收藏","v": "stow"}
]
},
{"key": "duration","name": "时长","value": [
{"n": "全部时长","v": "0"},
{"n": "60分钟以上","v": "4"},
{"n": "30~60分钟","v": "3"},
{"n": "10~30分钟","v": "2"},
{"n": "10分钟以下","v": "1"}

]
}
],

"阿斗归来了": [
{"key": "order","name": "排序","value": [
{"n": "综合排序","v": "0"},
{"n": "最多点击","v": "click"},
{"n": "最新发布","v": "pubdate"},
{"n": "最多弹幕","v": "dm"},
{"n": "最多收藏","v": "stow"}
]
},
{"key": "duration","name": "时长","value": [
{"n": "全部时长","v": "0"},
{"n": "60分钟以上","v": "4"},
{"n": "30~60分钟","v": "3"},
{"n": "10~30分钟","v": "2"},
{"n": "10分钟以下","v": "1"}

]
}
],

"老邪说电影": [
{"key": "order","name": "排序","value": [
{"n": "综合排序","v": "0"},
{"n": "最多点击","v": "click"},
{"n": "最新发布","v": "pubdate"},
{"n": "最多弹幕","v": "dm"},
{"n": "最多收藏","v": "stow"}
]
},
{"key": "duration","name": "时长","value": [
{"n": "全部时长","v": "0"},
{"n": "60分钟以上","v": "4"},
{"n": "30~60分钟","v": "3"},
{"n": "10~30分钟","v": "2"},
{"n": "10分钟以下","v": "1"}

]
}
],

"大蓝雀": [
{"key": "order","name": "排序","value": [
{"n": "综合排序","v": "0"},
{"n": "最多点击","v": "click"},
{"n": "最新发布","v": "pubdate"},
{"n": "最多弹幕","v": "dm"},
{"n": "最多收藏","v": "stow"}
]
},
{"key": "duration","name": "时长","value": [
{"n": "全部时长","v": "0"},
{"n": "60分钟以上","v": "4"},
{"n": "30~60分钟","v": "3"},
{"n": "10~30分钟","v": "2"},
{"n": "10分钟以下","v": "1"}

]
}
],

"big笑工坊": [
{"key": "order","name": "排序","value": [
{"n": "综合排序","v": "0"},
{"n": "最多点击","v": "click"},
{"n": "最新发布","v": "pubdate"},
{"n": "最多弹幕","v": "dm"},
{"n": "最多收藏","v": "stow"}
]
},
{"key": "duration","name": "时长","value": [
{"n": "全部时长","v": "0"},
{"n": "60分钟以上","v": "4"},
{"n": "30~60分钟","v": "3"},
{"n": "10~30分钟","v": "2"},
{"n": "10分钟以下","v": "1"}

]
}
],


"虫哥说电影": [
{"key": "order","name": "排序","value": [
{"n": "综合排序","v": "0"},
{"n": "最多点击","v": "click"},
{"n": "最新发布","v": "pubdate"},
{"n": "最多弹幕","v": "dm"},
{"n": "最多收藏","v": "stow"}
]
},
{"key": "duration","name": "时长","value": [
{"n": "全部时长","v": "0"},
{"n": "60分钟以上","v": "4"},
{"n": "30~60分钟","v": "3"},
{"n": "10~30分钟","v": "2"},
{"n": "10分钟以下","v": "1"}

]
}
],


"蔡老板家的长工": [
{"key": "order","name": "排序","value": [
{"n": "综合排序","v": "0"},
{"n": "最多点击","v": "click"},
{"n": "最新发布","v": "pubdate"},
{"n": "最多弹幕","v": "dm"},
{"n": "最多收藏","v": "stow"}
]
},
{"key": "duration","name": "时长","value": [
{"n": "全部时长","v": "0"},
{"n": "60分钟以上","v": "4"},
{"n": "30~60分钟","v": "3"},
{"n": "10~30分钟","v": "2"},
{"n": "10分钟以下","v": "1"}

]
}
],


"牛叔万岁万岁万万岁": [
{"key": "order","name": "排序","value": [
{"n": "综合排序","v": "0"},
{"n": "最多点击","v": "click"},
{"n": "最新发布","v": "pubdate"},
{"n": "最多弹幕","v": "dm"},
{"n": "最多收藏","v": "stow"}
]
},
{"key": "duration","name": "时长","value": [
{"n": "全部时长","v": "0"},
{"n": "60分钟以上","v": "4"},
{"n": "30~60分钟","v": "3"},
{"n": "10~30分钟","v": "2"},
{"n": "10分钟以下","v": "1"}

]
}
],


"嘻咦啊看": [
{"key": "order","name": "排序","value": [
{"n": "综合排序","v": "0"},
{"n": "最多点击","v": "click"},
{"n": "最新发布","v": "pubdate"},
{"n": "最多弹幕","v": "dm"},
{"n": "最多收藏","v": "stow"}
]
},
{"key": "duration","name": "时长","value": [
{"n": "全部时长","v": "0"},
{"n": "60分钟以上","v": "4"},
{"n": "30~60分钟","v": "3"},
{"n": "10~30分钟","v": "2"},
{"n": "10分钟以下","v": "1"}

]
}
],


"我是怪异君": [
{"key": "order","name": "排序","value": [
{"n": "综合排序","v": "0"},
{"n": "最多点击","v": "click"},
{"n": "最新发布","v": "pubdate"},
{"n": "最多弹幕","v": "dm"},
{"n": "最多收藏","v": "stow"}
]
},
{"key": "duration","name": "时长","value": [
{"n": "全部时长","v": "0"},
{"n": "60分钟以上","v": "4"},
{"n": "30~60分钟","v": "3"},
{"n": "10~30分钟","v": "2"},
{"n": "10分钟以下","v": "1"}

]
}
],






"UFC": [
      {
        "key": "tid",
        "name": "分类",
        "value": [
          {
            "n": "全部",
            "v": "UFC"
          },
          {
            "n": "康纳",
            "v": "康纳"
          },
          {
            "n": "李景亮",
            "v": "李景亮"
          },
          {
            "n": "骨头",
            "v": "乔恩琼斯"
          },
           {
            "n": "狼王",
            "v": "奇马耶夫"
          },
          {
            "n": "白大拿",
            "v": "白大拿"
          },
          {
            "n": "张伟丽",
            "v": "张伟丽"
          },
           {
            "n": "小鹰",
            "v": "UFC小鹰"
          },
          {
            "n": "钻石",
            "v": "UFC钻石"
          },
          {
            "n": "持续更新",
            "v": "0"
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

    "1年级语文": [
      {
        "key": "tid",
        "name": "分类",
        "value": [
          {
            "n": "全部",
            "v": "0"
          },
          {
            "n": "沪教版",
            "v": "沪教版1年级语文"
          },
          {
            "n": "人教版",
            "v": "人教版1年级语文"
          },
          {
            "n": "北师大版",
            "v": "北师大版1年级语文"
          },
          
          {
            "n": "苏教版",
            "v": "苏教版1年级语文"
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
