import {_} from "assets://js/lib/cat.js";
import {config} from "http://127.0.0.1:9978/file/tvbox/Bili源.js";

if(config.localable==0){

}else{

};

let key = "bili_diy",
	HOST = "https://api.bilibili.com",
	siteKey = "",
	siteType = 0;
const PC_UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.361";
let cookie = config.cookie;
async function request(e) {
	return (await req(e, {
		headers: getMb()
	})).content
}
async function init(e) {
	siteKey = e.skey, siteType = e.stype, cookie.startsWith("http") && (cookie = await request(cookie))
}
async function home(e) {
	return JSON.stringify({
		class: config.classes,
		filters: config.filterObj
	})
}
async function homeVod() {
	if(1 != config.homeSwitch) return null; {
		var e = HOST + "/x/web-interface/search/type?search_type=video&keyword=" + config.homeName,
			e = JSON.parse(await request(e)).data.result;
		let t = [];
		return e.forEach(function(e) {
			t.push({
				vod_id: e.aid,
				vod_name: stripHtmlTag(e.title),
				vod_pic: "http:" + e.pic,
				vod_remarks: turnDHM(e.duration) || ""
			})
		}), JSON.stringify({
			list: t
		})
	}
}
async function category(e, t, i, r) {
	t = HOST + "/x/web-interface/search/type?search_type=video&page=" + t + "&keyword=" + (r.tid || e) + "&duration=" + (r.duration || "") + "&order=" + (r.order || ""), e = JSON.parse(await request(t)).data;
	let a = [];
	return e.result.forEach(function(e) {
		a.push({
			vod_id: e.aid,
			vod_name: stripHtmlTag(e.title),
			vod_pic: "https:" + e.pic,
			vod_remarks: turnDHM(e.duration) || ""
		})
	}), JSON.stringify({
		page: parseInt(e.page),
		pagecount: e.numPages,
		limit: 20,
		total: e.numResults,
		list: a
	})
}
async function detail(e) {
	let i = JSON.parse(await request(HOST + "/x/web-interface/view?aid=" + e)).data;
	var e = {
			vod_id: i.aid,
			vod_name: stripHtmlTag(i.title),
			vod_pic: i.pic,
			type_name: i.tname,
			vod_year: new Date(1e3 * i.pubdate).getFullYear(),
			vod_remarks: i.duration || "",
			vod_director: i.owner.name,
			vod_content: stripHtmlTag(i.desc)
		},
		t = i.pages;
	let r = [];
	t.forEach(function(e) {
		var t = e.cid,
			e = e.part.replace("#", "﹟").replace("$", "﹩");
		r.push(e + "$" + i.aid + "_" + t)
	});
	t = r.join("#");
	return e.vod_play_from = "B站", e.vod_play_url = t, JSON.stringify({
		list: [e]
	})
}
async function play(e, t, i) {
	t = t.split("_"), t = HOST + "/x/player/playurl?avid=" + t[0] + "&cid=" + t[1] + "&qn=116", t = JSON.parse(await request(t)).data.durl;
	let r = -1,
		a = -1,
		n = (t.forEach(function(e, t) {
			r < Number(e.size) && (r = Number(e.size), a = t)
		}), "");
	return 0 < t.length && (-1 === a && (a = 0), n = t[a].url), JSON.stringify({
		parse: 0,
		url: n,
		header: getMb()
	})
}
async function search(e, t, i) {
	if(1 != config.searchable) return null; {
		(i <= 0 || void 0 === i) && (i = 1);
		e = HOST + "/x/web-interface/search/type?search_type=video&keyword=" + e + "&page=" + i, i = JSON.parse(await request(e)).data;
		let t = [];
		return i.result.forEach(function(e) {
			t.push({
				vod_id: e.aid,
				vod_name: stripHtmlTag(e.title),
				vod_pic: "https:" + e.pic,
				vod_remarks: turnDHM(e.duration) || ""
			})
		}), JSON.stringify({
			page: parseInt(i.page),
			pagecount: i.numPages,
			limit: 20,
			total: i.numResults,
			list: t
		})
	}
}

function getHeader(e) {
	var t = {};
	return t.cookie = e, t["User-Agent"] = PC_UA, t.Referer = "https://www.bilibili.com", t
}

function getMb() {
	return getHeader(cookie)
}

function stripHtmlTag(e) {
	return e.replace(/<\/?[^>]+(>|$)/g, "").replace(/&.{1,5};/g, "").replace(/\s{2,}/g, " ")
}

function turnDHM(t) {
	var i = t.split(":")[0],
		t = t.split(":")[1];
	if(0 == i) return t + "秒";
	if(0 < i && i < 60) return i + "分";
	if(60 <= i && i < 1440) return i % 60 == 0 ? i / 60 + "小时" : (i / 60 + "").split(".")[0] + "小时" + i % 60 + "分";
	if(1440 <= i) {
		var r, t = i % 60;
		let e = 0 < (r = (i / 60 / 24 + "").split(".")[0]) ? r + "天" : "";
		return 1 <= (r = (i / 60 % 24 + "").split(".")[0]) && (e = e + r + "小时"), e = 0 < t ? e + t + "分" : e
	}
	return null
}

function __jsEvalReturn() {
	return {
		init: init,
		home: home,
		homeVod: homeVod,
		category: category,
		detail: detail,
		play: play,
		search: search
	}
}
export {
	__jsEvalReturn
};