<?php
ini_set('display_errors', 0);
     //--- 获取url接口加密或解密和sub接口合并参数值 两者二选一 ---//
$url = isset($_GET['url']) ? $_GET['url'] : ''; //接口加密或解密  
$jm = isset($_GET['jm']) ? $_GET['jm'] : '-1';  // -1(默认可不填)：解密接口 1：加密接口(sub合并接口也可用) 加密参数（下列）
$m = isset($_GET['m']) ? $_GET['m'] : '0';  //加密方式：m=0(不填时使用内置默认) >>json转图片，m=1 >>单pk密码，m=2 >>2423免pk密码，m=3 >>2423+转图片
$key = isset($_GET['key']) ? $_GET['key'] : '默认'; //自定义秘钥
$iv = isset($_GET['iv']) ? $_GET['iv'] : '默认';  //自定义偏移量（不填时使用内置默认）
$img = isset($_GET['img']) ? $_GET['img'] : '默认';  //自定义图片（不填时使用内置默认）
//-###----***----***---***----***----###-//
$sub = isset($_GET['sub']) ? $_GET['sub'] : 'subs.json';  //站源*直播源添加 1时使用内置默认
$dx = isset($_GET['dx']) ? $_GET['dx'] : '0'; //其他对象修改添加 1:是 其他:无
// 删除合并的接口配置中的对象（下列）
$wp = isset($_GET['wp']) ? $_GET['wp'] : '0'; //壁纸
$ru = isset($_GET['ru']) ? $_GET['ru'] : '0';  //rules广告规则
$as = isset($_GET['as']) ? $_GET['as'] : '0';  //ads广告规则
$ps = isset($_GET['ps']) ? $_GET['ps'] : '0';  //解析
$sp = isset($_GET['sp']) ? $_GET['sp'] : '0';  //爬虫
$dh = isset($_GET['dh']) ? $_GET['dh'] : '0';  //DOH
$st = isset($_GET['st']) ? $_GET['st'] : '0';  //站源
$lv = isset($_GET['lv']) ? $_GET['lv'] : '0';  //直播源
$jsons = "";
if (!empty($url)) { //接口解密或解密  
    if ($jm == -1) { //接口解密 
        $result = jiemi($url, $key);
        $data = $result['data'];      
        echo $data;
        exit;
    }
    if ($jm == 1) { //接口加密
        $result = jiami($url, $iv, $key, $img, $m, $jsons);
        $data = $result['data'];
        
        echo $data;
        exit;
    }
}
  
if (!empty($sub) && empty($url)) {
    if ($sub == 1) {  //默认饭总接口
        $url = "http://饭太硬.top/tv";
        $result = jiemi($url, $key);
        $data = $result['data'];
        $datas = jshex($data);
    } else { 
        $datas = []; //初始化合并接口
        $data = file_get_contents($sub);
        $jsonObj = jshex($data); //$sub多接口合并json文件转数组
        $subArray = $jsonObj['sub'];
        for ($i = 0; $i < count($subArray); $i++) {
            $subObj = $subArray[$i];
            $url = $subObj['url'];
            $wsite = $subObj['wsite'];
            $bsite = $subObj['bsite'];
            $jar = $subObj['jar'];
            $bname = $subObj['bname'];
            $wlive = $subObj['wlive'];
            $blive = $subObj['blive'];
            $add = $subObj['add'];
            if ($i == 0) { //设置第一条接口
                $result = jiemi($url, $key);
                $data = $result['data'];
                #echo $data;
                #preg_match('/{(.*)}/s', $data, $matches);
                #$data = json_decode($matches[0]);
                $data = jshex($data);
                          #print_r($data);
                $datas = $data;
                If (!empty($jsonObj['spider'])) { //自定义爬虫
                    $datas['spider'] = $jsonObj['spider'];
                }
                //站点参数修改
                $datas['sites'] = sitelist($data, $wsite, $bsite, $jar, $bname);
                //直播参数修改
                $datas['lives'] = livelist($data, $wlive, $blive);
            } else {
                if ($add == 1) { //合并需要合并的接口站点
                    $result = jiemi($url, $key);
                    $data = $result['data'];
                    $data = jshex($data);
                    $data['sites'] = sitelist($data, $wsite, $bsite, $jar, $bname);
                    $datas['sites'] = array_merge($datas['sites'], $data['sites']);  
                }
              #print_r($datas);
                if ($add == 2) { //合并需要合并的接口站点和直播
                    $result = jiemi($url, $key);
                    $data = $result['data'];
                    $data = jshex($data);
                    $data['sites'] = sitelist($data, $wsite, $bsite, $jar, $bname);
                    $datas['sites'] = array_merge($datas['sites'], $data['sites']); 
                    $data['lives'] = livelist($data, $wsite, $bsite, $jar, $bname);
                    $datas['lives'] = array_merge($datas['lives'], $data['lives']);
                }
                if ($add == 3) { //合并需要合并的接口直播
                    $result = jiemi($url, $key);
                    $data = $result['data'];
                    $data = jshex($data); 
                    $data['lives'] = livelist($data, $wsite, $bsite, $jar, $bname);
                    $datas['lives'] = array_merge($datas['lives'], $data['lives']);
                    
                }
            }
        }
        // 删除重复的key键站点，只取第一条
        $datahex = []; // 初始化 $datahex 数组为空数组
        $foundKeys = []; // 用于存储已找到的键值
        foreach ($datas['sites'] as $site) {
            $ky = $site['key'];
            if (!in_array($ky, $foundKeys)) {
                $foundKeys[] = $ky; // 将已找到的键值添加到 $foundKeys 数组中
                $datahex[] = $site; // 将第一条匹配的元素添加到 $datahex 数组中心
            }
        }
        $datas['sites'] = $datahex;
      
        $site = $datas['sites'];//点播修改添加开始
        $dbArray = $jsonObj['tihdb'];
        $sites = [];
        for ($i = 0; $i < count($site); $i++) {
            $sts = $site[$i];  //对象列表
            $stk = $sts['key']; //源名：key
            for ($p = 0; $p < count($dbArray); $p++) { 
                $tihs = $dbArray[$p];
                $spei =$tihs['key']; //适配源参数：key
                $jians =$tihs['jian'];  //修改或添加的参数
                $uns = $tihs['un'];  //删除适配源的键参数
                for ($k = 0; $k < count($jians); $k++) {
                    $jian = $jians[$k]; //修改或添加列表参数
                    $names = $jian['name']; //修改或添加的键名
                    $zhi_th = $jian['key']; //修改或赋予键值
                        if ($stk == $spei) {  //源名=适配源
                            $sts[$names] = $zhi_th; //键与键值修改或添加
                            if (!empty($uns)) {
                                for ($j = 0; $j < count($uns); $j++) {
                                    $un = $uns[$j]; //删除适配源的键列表
                                    unset($sts[$un]); //删除适配源的键
                                }
                            }
                        } 
                    $sites[$i] = $sts;
                }
            }
        }
        $datas['sites'] = $sites; 
        $live = $datas['lives']; //直播修改添加开始
        $zbArray = $jsonObj['tihzb'];
        $lives = [];
        for ($i = 0; $i < count($live); $i++) {
            $lvs = $live[$i];  //对象列表
            $nlv = $lvs['name']; //源名：name
            for ($p = 0; $p < count($zbArray); $p++) { 
                $tihs = $zbArray[$p];
                $spei =$tihs['name']; //适配源参数：name
                $jians =$tihs['jian'];  //修改或添加的参数
                $uns = $tihs['un'];  //删除适配源的键参数
                for ($k = 0; $k < count($jians); $k++) {
                    $jian = $jians[$k]; //修改或添加列表参数
                    $names = $jian['name']; //修改或添加的键名
                    $zhi_th = $jian['key']; //修改或赋予键值
                        if ($nlv == $spei) {  //源名=适配源
                            $lvs[$names] = $zhi_th; //键与键值修改或添加
                            if (!empty($uns)) {
                                for ($j = 0; $j < count($uns); $j++) {
                                    $un = $uns[$j]; //删除适配源的键列表
                                    unset($lvs[$un]); //删除适配源的键
                                }
                            }
                        } 
                    $lives[$i] = $lvs;
                }
            }
        }
        $datas['lives'] = $lives;

            //其他对象修改添加
        if ($dx == 1) {
            $fileArray = $jsonObj['files'];
            for ($i = 0; $i < count($fileArray); $i++) {
                $fileObj = $fileArray[$i];
                $url = $fileObj['url'];
                $add = $fileObj['add'];
                if ($add == 1) {
                    $result = jiemi($url, $key);
                    $data = $result['data'];
                    $jsx = jshex($data);
                    if (array_key_exists('doh', $jsx)){
                        $datas['doh'] = $jsx['doh'];
                    }
                    if (array_key_exists('parses', $jsx)) {
                        $datas['parses'] = $jsx['parses'];
                    }
                    if (array_key_exists('flags', $jsx)) {
                        $datas['flags'] = $jsx['flags'];
                    }
                    if (array_key_exists('rules', $jsx)) {
                        $datas['rules'] = $jsx['rules'];
                    }
                    if (array_key_exists('wallpaper', $jsx)) {
                        $datas['wallpaper'] = $jsx['wallpaper'];
                    }
                    if (array_key_exists('ads', $jsx)) {
                        $datas['ads'] = $jsx['ads'];
                    }
                }
            }
        }
    } 
        
    //删除 对象
    if ($as == 1) {
        unset($datas['ads']);
    }
    if ($ps == 1) {
        unset($datas['parses']);
    }
    if ($ru == 1) {
        unset($datas['rules']);
    }
    if ($wp == 1) {
        unset($datas['wallpaper']);
    }
    if ($sp == 1) {
        unset($datas['spider']);
    }
    if ($dh == 1) {
        unset($datas['doh']);
    }
    if ($st == 1) {
        unset($datas['sites']);
    }
    if ($lv == 1) {
        unset($datas['lives']);
    }

    // 定义自定义排序顺序
    $keyOrder = ['spider', 'lives', 'sites', 'doh', 'parses', 'rules', 'flags', 'wallpaper', 'ads'];
    uksort($datas, 'customSort'); // 对合并后的对象进行排序

    // 转换回 JSON 格式，去掉反斜杠，保留中文字符
    $jsons = json_encode($datas, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    $jsons = js($jsons); //转自定义json格式

    if ($jm == 1) { //合并的接口json数据加密开始
        $result = jiami($sub, $iv, $key, $img, $m, $jsons);
        $data = $result['data'];
       
        echo $data;
        exit;               
    } else { //合并的接口json数据加密结束 <<<--   
          
        header('Content-Type: application/json; charset=utf-8'); // 设置响应头
        echo $jsons; // 输出合并结果
        exit;
    }
}

        //---下面全部是PHP调用的函数 请勿随意改动---//
function jiemi($url, $key) {   //接口解密函数    
        $ds = jsurl($url);
        if (strpos($ds, '**') === false && strpos($ds, '2423') !== 0 && !is_json($ds)) {
            //小苹果解密
            $k = 'XXPGXXPGXXPGXXPG';   // 密钥
            $iv = 'GPXXGPXXGPXXGPXX';   // 偏移量
            $data = aes_XPG($ds, $k, $iv);
            if (is_json($data)) { 
                $data = js($data);
                $message = "解密方式：小苹果";
                header('Content-Type: application/json; charset=utf-8'); // 设置响应头
                
            } else { //未知解密
                $k = 'y1u21fuSl329o4Xr';   // 密钥
                $iv = '9Amg1OE5L5zYJY01';   // 偏移量
                $data = aes_CBC($ds, $k, $iv);
                if (is_json($data)) {
                    $data = js($data);
                    $message = "解密方式：未知";
                    header('Content-Type: application/json; charset=utf-8'); // 设置响应头
                    
                } else { //pk密码解密
                    $key = str_pad($key, 16, '0');  // 补齐密钥
                    $data = aes_ECB($ds, $key);
                    if (is_json($data)) {
                        $data = js($data);
                        $message = "解密方式：pk密码";
                        header('Content-Type: application/json; charset=utf-8'); // 设置响应头
                        
                    } 
                }
            }
        } else if (strpos($ds, '**') !== false) { //图床解密
            // 以最后"**"字符为分隔符，获取后半部分内容
            $data_start = strrpos($ds, "**");
            $data = substr($ds, $data_start + 2);
            // 将Base64编码的数据解码为UTF-8文本
            $data = base64_decode($data);
            $data = js($data);
            // 搜索是否以2423为首
            if (is_json($data)) { 
                $data = js($data);
                $message = "解密方式：图床";
                header('Content-Type: application/json; charset=utf-8'); // 设置响应头
                
               
            } else if (strpos($data, '2423') === 0) { //2423解密
                $data = mpk($data);
                if (is_json($data)) { 
                    $data = js($data);
                    $message = "解密方式：2423➕图床";
                    header('Content-Type: application/json; charset=utf-8'); // 设置响应头
                    
                    
                } 
            } else { //图床jar还原
            $message = "解密方式：jar还原";
            $file = 'spider.jar'; // 文件路径
            header('Content-Description: File Transfer');
            header('Content-Type: application/java-archive');
            header('Content-Disposition: attachment; filename=' . basename($file));
            header('Content-Transfer-Encoding: binary');
            header('Content-Length: ' . filesize($file));
            readfile($file);
            
                
            }          
        } else if (strpos( $ds, '2423') === 0) { //2423解密
            $data = mpk($ds);
            if (is_json($data)) { 
                $data = js($data);
                $message = "解密方式：2423";
                header('Content-Type: application/json; charset=utf-8'); // 设置响应头
                  
            } 
        } else if (is_json($ds)) { //明文接口 直接输出
            #$data = jsdiy($ds);
            $data = $ds;
            $message = "解密方式：明文";                      
            header('Content-Type: application/json; charset=utf-8'); // 设置响应头
               
        }
    return array('data' => $data, 'message' => $message);

}

function jiami($url, $iv, $key, $img, $m, $jsons) { //接口加密函数
    if (!empty($jsons)) {
        $data = $jsons;
    } else {
        $data = jsurl($url);
    }        
    $zc = substr(str_shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 8);  //随机获得8位字符 作为图床接口连接字串
    if ($iv == "默认") {
        $iv = getMillisecond();   //获取当前13位时间戳 
    } else {
        $iv = str_pad($iv, 13, '0');  // 补齐13位偏移量
    }
    if ($img == "默认") {
    // 图片路径
    $imgPath = 'cat.jpg';
    } else {
    // 图片路径
    $imgPath = $img;
    }
    $v = $iv;  //赋值给tg的偏移量
    $k = $key; //赋值给tg的密钥               
    if ($m == 0) { //直转图床
        $imgdata = file_get_contents($imgPath); // 读取图片数据
        $data64 = base64_encode($data); // Base64 编码加密
        $data = $imgdata . $zc . '**' . $data64; // 在图片数据中插入配置内容
        header('Content-Type: image/jpeg');  // 设置 HTTP 响应头
         //输出加密的图片
        $y = "直转图床模式"; //赋值给tg的加密转换模式 下面推送到tg
        $message = "加密方式：$y\n图片链接：$img"; 
    }
    if ($m == 1) { //pk密码
        $key = str_pad($key, 16, '0');  // 补齐密钥
        $data = aesECB($data, $key); //pk密码加密
        header('Content-Type: text/plain; charset=utf-8'); // 设置 HTTP 响应头
         //输出加密的文本
        $y = "pk密码模式"; //赋值给tg的加密转换模式 下面推送到tg
        $message = "加密方式：$y\n秘钥：$k";
    }
    if ($m == 2) { //单2423
        $niv = bin2hex($iv); //转16进制 
        $iv = str_pad($iv, 16, '0');  // 补齐16位偏移量
        $nkey= bin2hex($key); //转16进制
        $key = str_pad($key, 16, '0');  // 补齐密钥
        $data = aesCBC($data, $key, $iv); //免pk密码加密 
        $data = "2423" . $nkey . "2324" . $data . $niv; //拼接解密内容
        header('Content-Type: text/plain; charset=utf-8'); //设置 HTTP 响应头
         //输出加密的文本
        $y = "单2423模式"; //赋值给tg的加密转换模式 下面推送到tg
        $message = "加密方式：$y\n秘钥：$k\n偏移量：$v";
    }
    if ($m == 3) { //2423➕图床
        $niv = bin2hex($iv); //转16进制 
        $iv = str_pad($iv, 16, '0');  // 补齐16位偏移量
        $nkey= bin2hex($key); //转16进制
        $key = str_pad($key, 16, '0');  // 补齐密钥
        $data = aesCBC($data, $key, $iv); //免pk密码加密 
        $data = "2423" . $nkey . "2324" . $data . $niv; //拼接解密内容
        $data64 = base64_encode($data); // Base64 编码加密
        $imgdata = file_get_contents($imgPath);//读取图片数据
        $data = $imgdata . $zc . '**' . $data64; // 在图片数据中插入配置内容
        header('Content-Type: image/jpeg'); //设置 HTTP 响应头
         //输出加密的图片
        $y = "2324➕图床模式"; //赋值给tg的加密转换模式 下面推送到tg
        $message = "加密方式：$y\n秘钥：$k\n偏移量：$v\n图片链接：$img";
    }
    return array('data' => $data, 'message' => $message);

}



function customSort($a, $b) { // 自定义对象排序函数
    global $keyOrder;
    $aIndex = array_search($a, $keyOrder);
    $bIndex = array_search($b, $keyOrder);
    if ($aIndex === false && $bIndex === false) {
        return 0;
    } elseif ($aIndex === false) {
        return 1;
    } elseif ($bIndex === false) {
        return -1;
    } else {
        return $aIndex - $bIndex;
    }
}

function jshex($json) { // 提取JSON的有效内容并转换为数组
    // 删除注释行（包括 /* */ 和 // 注释）
    $json = preg_replace('/\/\*.*?\*\//s', '', $json);
    $json = preg_replace('/^\s*\/\/.*$/m', '', $json);
    // 删除每一行中的注释，但仅在 // 前面不是 : 时删除注释内容
    $json = preg_replace('/(?<![\w\d:])\s*\/\/.*$/m', '', $json);
    # $json = preg_replace('/\/\/[^\\n]*$/', '', $json);
                  
    // 提取JSON 的有效内容
    preg_match('/{(.*)}/s', $json, $matches);
    // 将 JSON 数据解码为数组                  
    $data = json_decode($matches[0], true);
    if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
        $data = [];
    } 
    
    return $data;
}


function is_json($json) {
  // 删除注释行（包括 /* */ 和 // 注释）
    $json = preg_replace('/\/\*.*?\*\//s', '', $json);
    $json = preg_replace('/^\s*\/\/.*$/m', '', $json);
    // 删除每一行中的注释，但仅在 // 前面不是 : 时删除注释内容
    $json = preg_replace('/(?<!:)\s*\/\/.*$/m', '', $json);
  $data = json_decode($json, true);
  return true;
}

function sitelist($data, $wsite, $bsite, $jar, $bname) { // 站点列表黑白名单函数
    $hasKey = false; // 初始化标志变量为 false
    if (array_key_exists('sites', $data)) {
        if (empty($wsite) && empty($bsite)) {  // 如果白名单和黑名单数组都为空，则保留所有站点
            foreach ($data['sites'] as $site) {
                if (array_key_exists('key', $site)) { 
                $hasKey = true;
                $datahex[] = $site;
                }
            }
        }
        if (!empty($wsite)) { // 如果白名单数组不为空，则只提取白名单中的站点
            foreach ($data['sites'] as $site) {
                if (in_array($site['key'], $wsite) && array_key_exists('key', $site)) {
                    $hasKey = true;
                    $datahex[] = $site;
                
                } 
            }
            if ($site == null) {
                $datahex = [];
            }
        }
        if (empty($wsite) && !empty($bsite)) {  // 如果白名单数组为空，则根据黑名单提取站点
            foreach ($data['sites'] as $site) {
                if (!in_array($site['key'], $bsite) && array_key_exists('key', $site)) {
                    $hasKey = true;
                    $datahex[] = $site;
                }
            }
        }
        if (!$hasKey) {
        $datahex = []; // 如果标志变量为 false，将 $datahex 数组设置为空数组
        }
        if ($jar == 1){
            $jar = $data['spider'];  //提取jar
            // 遍历每个站点对象，添加 "jar" 键值对（仅当键不存在时）
            foreach ($datahex as &$site) {
                if (!isset($site['jar'])) {
                    $site['jar']= $jar;
                    #$datahex[] = $site;
                }
            }
        }
        if (!empty($bname)){  //站点名前添加别名
            foreach ($datahex as &$site) {
                    $site['name']= $bname . $site['name'];
                    #$datahex[] = $site;
            }
        }
    } else {
   $datahex = []; 
    }
    return $datahex; 
}

function livelist($data, $wlive, $blive) {  // 直播列表黑白名单函数
    if (array_key_exists('lives', $data)) {
        $hasKey = false; // 初始化标志变量为 false
        if (empty($wlive) && empty($blive)) {  // 如果白名单和黑名单数组都为空，则保留所有直播
            foreach ($data['lives'] as $live) {
                if (array_key_exists('name', $live)) {
                    $hasKey = true;
                    $livehex[] = $live;
                }
            }
        }
        if (!empty($wlive)) { // 如果白名单数组不为空，则只提取白名单中的直播
            foreach ($data['lives'] as $live) {
                if (in_array($live['name'], $wlive) && array_key_exists('name', $live)) {
                    $hasKey = true;
                    $livehex[] = $live;
                }
            }
        }
        if (empty($wlive) && !empty($blive)) {  // 如果白名单数组为空，则根据黑名单提取直播
            foreach ($data['lives'] as $live) {
                if (!in_array($live['name'], $blive) && array_key_exists('name', $live)) {
                    $hasKey = true;
                    $livehex[] = $live;
                }
            }
        } 
        if (!$hasKey) {
            $livehex = []; // 如果标志变量为 false，将 $datahex 数组设置为空数组
        }
   } else {
        $livehex = [];
   }
    return $livehex;
}
                                 
 function jsurl($url) { // 解析URL并获取url数据函数
    if (strpos($url, "http://") !== 0 && strpos($url, "https://") !== 0) {
        $data = file_get_contents($url);
    } else {
        $domainPath = dirname($url); // 获取域名路径
        $parsedUrl = parse_url($url);
        // 将中文域名转换为 Punycode 格式
        if (isset($parsedUrl['host'])) {
            $host = $parsedUrl['host'];
            $asciiHost = idn_to_ascii($host);
            $parsedUrl['host'] = $asciiHost;
        }
        // 重构URL
        $reconstructedUrl = '';
        if (isset($parsedUrl['scheme'])) {
            $reconstructedUrl .= $parsedUrl['scheme'] . '://';
        }
        if (isset($parsedUrl['user'])) {
            $reconstructedUrl .= $parsedUrl['user'];
        }
        if (isset($parsedUrl['pass'])) {
            $reconstructedUrl .= ':' . $parsedUrl['pass'];
        }
        if (isset($parsedUrl['user']) || isset($parsedUrl['pass'])) {
            $reconstructedUrl .= '@';
        }
        if (isset($parsedUrl['host'])) {
            $reconstructedUrl .= $parsedUrl['host'];
        }
        if (isset($parsedUrl['port'])) {
            $reconstructedUrl .= ':' . $parsedUrl['port'];
        }
        if (isset($parsedUrl['path'])) {
            $reconstructedUrl .= $parsedUrl['path'];
        }
        if (isset($parsedUrl['query'])) {
            $reconstructedUrl .= '?' . $parsedUrl['query'];
        }
        if (isset($parsedUrl['fragment'])) {
            $reconstructedUrl .= '#' . $parsedUrl['fragment'];
        }
        $userAgent = "okhttp/5.0.0-alpha.10";  // 自定义User-Agent
        // 设置请求头中的User-Agent
        $opts = [
            "http" => [
                "method" => "GET",
                "header" => "User-Agent: $userAgent\r\n"
            ]
        ];
        $context = stream_context_create($opts);
        $data = file_get_contents($reconstructedUrl, false, $context); // 发送HTTP请求并获取外部链接的内容
        $data = str_replace('./', $domainPath . '/', $data);
    }
    return $data;
}

function js($jsons) { //转换json内容为自定义格式函数
    // 删除注释行（包括 /* */ 和 // 注释）
    $jsons = preg_replace('/\/\*.*?\*\//s', '', $jsons);
    $jsons = preg_replace('/^\s*\/\/.*$/m', '', $jsons);
    // 删除每一行中的注释，但仅在 // 前面不是 : 时删除注释内容
    $jsons = preg_replace('/(?<!:)\s*\/\/.*$/m', '', $jsons);
    // 替换逗号和大括号后面的空格为逗号和换行符
    $jsons = preg_replace('/},\s*/', "},\n", $jsons);
    $jsons = preg_replace('/}],\s*/', "}\n],\n", $jsons);
    // 在指定键名前面加换行符
    $keys = ["flags", "wallpaper", "spider", "doh", "lives", "parses", "sites", "ads"];
    foreach ($keys as $key) {
        $jsons = preg_replace('/"' . $key . '":\s*/s', "\n\"$key\":", $jsons);
    }
    // 替换指定键名后面的空格为换行符，并处理数组的换行
    $keys = ["doh", "lives", "parses", "sites"];
    foreach ($keys as $key) {
        $jsons = preg_replace('/"' . $key . '":\[\s*/s', "\n\"$key\":[\n", $jsons);
    }
    $lastQuotePos = strrpos($jsons, '"'); // 搜索最好一个"引号
    $value = substr($jsons, $lastQuotePos + 1); // 取出最后一个引号后面的内容
    if ($value === '}') { // 在 } 前面加上一个换行符
        $jsons = substr_replace($jsons, "\n", $lastQuotePos + 1, 0);
    }
    if ($value === ']}') { // 在 } 前面加上一个换行符
        $lastBracketPos = strrpos($jsons, '}');
        $jsons = substr_replace($jsons, "\n", $lastQuotePos +2, 0); 
    }
    if ($value === '}]}') { // 在 ] 前面和后面都加上一个换行符
        $lastBracketPos = strrpos($jsons, ']');
        $jsons = substr_replace($jsons, "\n", $lastQuotePos + 2, 0);
        $jsons = substr_replace($jsons, "\n", $lastBracketPos + 2, 0);
    }
    if ($value === ']}]}') { // 在 ] 前面和后面都加上一个换行符
        $lastBracketPos = strrpos($jsons, '}]}');
        $jsons = substr_replace($jsons, "\n", $lastQuotePos + 3, 0);
        $jsons = substr_replace($jsons, "\n", $lastBracketPos + 3, 0);
    }
    $jsons = preg_replace('/^\h*\v+/m', '', $jsons); // 删除空行
    return $jsons;
}

function hex2str($hex) { //转16进制
    $str = '';
    for ($i = 0; $i < strlen($hex) - 1; $i += 2) {
        $str .= chr(hexdec($hex[$i] . $hex[$i+1]));
    }
    return $str;
}

function mpk($data) { //2423解密函数
    // 获取密钥
    $key_start = strpos($data, '2423') + 4;
    $key_end = strpos($data, '2324', $key_start);
    $key_hex = substr($data, $key_start, $key_end - $key_start);
    $key = hex2str($key_hex);
    $key = str_pad($key, 16, '0');  // 补齐密钥
    // 获取偏移量
    $iv_hex = substr($data, -27);
    $iv = hex2str($iv_hex);
    $iv = str_pad($iv, 16, '0');  // 补齐偏移量
    // 获取待解密配置数据
    $js_start = strpos($data, '2324') + 4;
    $js_end = strlen($data) - 27;
    $data = substr($data, $js_start, $js_end - $js_start);
    $data = aes_CBC($data, $key, $iv);
    return $data;
  }

function aes_ECB($data, $key) { //解密aes,ecb,128,hex编码,填充pk7
    $decodedData = hex2str($data);
    // 设置填充方式为PKCS7
    $decryptedData = openssl_decrypt($decodedData, 'AES-128-ECB', $key, OPENSSL_RAW_DATA | OPENSSL_NO_PADDING);
    // 去除填充字节
    $padLength = ord($decryptedData[strlen($decryptedData) - 1]);
    $decryptedData = substr($decryptedData, 0, -$padLength);
    return $decryptedData;
}

function aes_CBC($data, $key, $iv) { //解密aes,cbc,128,hex编码
    $decodedData = hex2str($data);
    $decryptedData = openssl_decrypt($decodedData, 'AES-128-CBC', $key, OPENSSL_RAW_DATA, $iv);
    return rtrim($decryptedData, "\0");
}

function aes_XPG($data, $key, $iv) { //解密aes,cbc,128,64编码 适用:小苹果
    $decodedData = base64_decode($data);
    $decryptedData = openssl_decrypt($decodedData, 'AES-128-CBC', $key, OPENSSL_RAW_DATA, $iv);
    return rtrim($decryptedData, "\0");
}
?>