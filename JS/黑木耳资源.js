var rule = {
    title: '黑木耳资源',
    host: 'https://heimuer.tv',
    homeUrl: '/api.php/provide/vod/from/heimuer?ac=detail',
    searchUrl: '/api.php/provide/vod/from/heimuer?ac=detail&wd=**&pg=fypage',
    detailUrl: '/api.php/provide/vod/from/heimuer?ac=detail&ids=fyid', //非必填,二级详情拼接链接
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    play_parse: false,
    lazy: '',
    multi: 1,
    timeout: 5000,
    limit: 6,
    url: '/api.php/provide/vod/from/heimuer?ac=detail&t=fyclass&pg=fypage&f=',
    class_name: '短剧&国产剧&美剧&韩剧&动作片&科幻片&恐怖片&战争片&剧情片&喜剧片&爱情片&国漫&欧美动漫&日韩动漫',
    class_url: '27&13&30&15&7&25&12&34&6&10&23&60&57&58',
    //推荐: 'json:list;vod_name;vod_pic;vod_remarks;vod_id', // double: true, // 推荐内容是否双层定位
    推荐: '',
    // 一级: 'json:list;vod_name;vod_pic;vod_remarks;vod_id',
    一级: `js:
        function getParam(url,name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = url.split('?')[1].match(reg); //获取url中"?"符后的字符串并正则匹配
            var context = "";
            if (r != null)
                context = decodeURIComponent(r[2]);
            reg = null;
            r = null;
            return context == null || context == "" || context == "undefined" ? "" : context;
        }
        let d = [];
        // 忽略分类
        let cate_exclude = '';
        let type_id = getParam(input,'t');
        if(!cate_exclude.match(type_id)){
            let html = request(input);
            let list = JSON.parse(html).list;
            list.forEach(function (it){
                if(!cate_exclude.match(it.type_id)){
                    d.push({
                        title:it.vod_name,
                        img:it.vod_pic,
                        desc:it.vod_remarks,
                        url:it.vod_id
                    });
                }
            });
        }
        setResult(d);
        // log(input);
    `,
    /**
     * 资源采集站，二级链接解析
     */
    // 二级: `json:list;vod_name;vod_pic;vod_remarks;vod_id`,
    二级: `js:
        let html = request(input);
        let list = JSON.parse(html).list;
        if(list.length===1){
           VOD = list[0];
            VOD.vod_blurb = VOD.vod_blurb.replace(/　/g, '').replace(/<[^>]*>/g, '');
            VOD.vod_content = VOD.vod_content.replace(/　/g, '').replace(/<[^>]*>/g, '');
			VOD.vod_play_from = VOD.vod_play_from.replace('heimuer','👮‍勿信视频内广告');
        }
    `,
    /**
     * 搜索解析 过滤部分资源
     */
    // 搜索: 'json:list;vod_name;vod_pic;vod_remarks;vod_id',
    搜索: `js:
        let d = [];
        // 忽略分类
        let cate_exclude = '';
        let html = request(input);
        let list = JSON.parse(html).list;
        list.forEach(function (it){
            if(!cate_exclude.match(it.type_id)){
                d.push({
                    title:it.vod_name,
                    img:it.vod_pic,
                    desc:it.vod_remarks,
                    url:it.vod_id
                });
            }
        });
        setResult(d);
    `,
}
