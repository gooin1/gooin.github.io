##加载底图

    参考完整代码

-----
##单圈缓冲区分析

> - 创建裁剪分析对象
```javascript
//            创建裁剪分析对象
        var clipAnalysis = new Zondy.Service.ClipByPolygon({
            ip: "127.0.0.1",//服务器ip
            port: "6163"   //端口
        });
```
> - 设置必要参数
```javascript
//      设置被裁减图层url
        clipAnalysis.srcInfo = "gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界河流";
//        设置裁剪结果的保存路径及文件名,添加获取当前时间函数防止重名
        clipAnalysis.desInfo = "gdbp://MapGisLocal/OpenLayerVecterMap/sfcls/裁剪结果" + getCurrentTime();
//         多边形点坐标串。strPos为STRING格式，内容是多边形几个点坐标：x1,y1,x2,y2....
        clipAnalysis.strPos = "-97,16,-31,16,-29,-32,-96,-29";
```

> - 执行裁剪分析
```javascript
//       执行裁剪并调用回调函数
        clipAnalysis.execute(AnalysisSuccess);
```


> - 回调函数
```javascript
//        回调函数
        function AnalysisSuccess(data) {
//          如果获取到结果
            if (data.results) {
//                如果获取的结果数组元素数量不为0
                if (data.results.length != 0) {
//                    新建图层
                    var resultLayer = new Zondy.Map.Layer("裁剪结果" + getCurrentTime(), ["gdbp://MapGisLocal/OpenLayerVecterMap/sfcls/" + data.results[0].Value], {
                        ip: "127.0.0.1",//ip
                        port: "6163",   //端口
                        isBaseLayer: false //不为基础图层
                    });
                    map.addLayer(resultLayer); //将图层添加到地图容器中
                    alert("裁剪成功");//弹窗提醒
                }
            } else {
                alert('裁剪失败');//弹窗提醒
            }
        }
```

---------
获取当前时间函数
```javascript
//    获取当前时间函数
    function getCurrentTime() {
        //实例化一个日期对象
        var now = new Date();

        var year = now.getFullYear();	//四位数字返回年份。
        var month = now.getMonth() + 1; //月份 (0 ~ 11)。
        var day = now.getDate();        //一个月中的某一天 (1 ~ 31)

        var hh = now.getHours();        //获取小时 0-23
        var mm = now.getMinutes();      //获取分钟 0-59
        var ss = now.getSeconds();      //获取秒 0-59

//            定义一个对象存储时间
        var clock = year + "-";   //2016-

//            如果月份小于10则在月份前加0
        if (month < 10) clock += "0";
        clock += month + "-";      //2016-07-
//            如果天数小于10则在天数前加0
        if (day < 10) clock += "0";
        clock += day + "-";         //2016-07-27-
//            如果小时小于10则在小时前加0
        if (hh < 10) clock += "0";
        clock += hh;                //2016-07-27-21
//            如果分钟小于10则在分钟前加0
        if (mm < 10) clock += "0";
        clock += mm;                //2016-07-27-2135
//            如果秒数小于10则在秒数前加0
        if (ss < 10) clock += "0";
        clock += ss;                //2016-07-27-213523
//            返回clock的值
        return (clock);
    }
```

##完整代码
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

</head>
<link href="../css/mapDefault.css" type="text/css" rel="stylesheet"/>
<script src="../libs/jquery-1.11.2.min.js" type="text/javascript"></script>
<script src="../libs/OpenLayers.js" type="text/javascript"></script>
<script src="../libs/zdclient.js" type="text/javascript"></script>
<script type="text/javascript">

    var map, layer0, layer1;
    function init() {
        //            添加地图容器
        map = new OpenLayers.Map('map1', {
            controls: [
                new OpenLayers.Control.MousePosition(),//此控件显示鼠标移动时，所在点的地理坐标
                new OpenLayers.Control.Navigation(),//此控件处理伴随鼠标事件的地图浏览
                new OpenLayers.Control.LayerSwitcher(),//图层切换控件
                new OpenLayers.Control.OverviewMap() //鹰眼
            ]
        });
        //创建图层
        layer0 = new Zondy.Map.Layer("Map", ["gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界河流"], {
            ip: "127.0.0.1", //ip
            port: "6163",//端口
            isBaseLayer: false //不作为底图
        });
        layer1 = new Zondy.Map.Layer("Line", ["gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/背景图层"], {
            ip: "127.0.0.1",//ip
            port: "6163",//端口
            isBaseLayer: true //设为基础图层 !此项不写地图无法加载
        });
//      将两个图层添加到地图中
        map.addLayers([layer0, layer1]);
//        设置地图显示中心及缩放级别
        map.setCenter(new OpenLayers.LonLat(0, 0), 2);

    }

    /******************************裁剪分析****************************************/
    function clipAnalysisByPolygon() {
//            创建裁剪分析对象
        var clipAnalysis = new Zondy.Service.ClipByPolygon({
            ip: "127.0.0.1",//服务器ip
            port: "6163"   //端口
        });

//      设置被裁减图层url
        clipAnalysis.srcInfo = "gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/世界河流";
//        设置裁剪结果的保存路径及文件名,添加获取当前时间函数防止重名
        clipAnalysis.desInfo = "gdbp://MapGisLocal/OpenLayerVecterMap/sfcls/裁剪结果" + getCurrentTime();
//         多边形点坐标串。strPos为STRING格式，内容是多边形几个点坐标：x1,y1,x2,y2....
        clipAnalysis.strPos = "-97,16,-31,16,-29,-32,-96,-29";
//       执行裁剪并调用回调函数
        clipAnalysis.execute(AnalysisSuccess);
//     
    }

    //        回调函数
    function AnalysisSuccess(data) {
//          如果获取到结果
        if (data.results) {
//                如果获取的结果数组元素数量不为0
            if (data.results.length != 0) {
//                    新建图层
                var resultLayer = new Zondy.Map.Layer("裁剪结果" + getCurrentTime(), ["gdbp://MapGisLocal/OpenLayerVecterMap/sfcls/" + data.results[0].Value], {
                    ip: "127.0.0.1",//ip
                    port: "6163",   //端口
                    isBaseLayer: false //不为基础图层
                });
                map.addLayer(resultLayer); //将图层添加到地图容器中
                alert("裁剪成功");//弹窗提醒
            }
        } else {
            alert('裁剪失败');//弹窗提醒
        }
    }


//    获取当前时间函数
    function getCurrentTime() {
        //实例化一个日期对象
        var now = new Date();

        var year = now.getFullYear();	//四位数字返回年份。
        var month = now.getMonth() + 1; //月份 (0 ~ 11)。
        var day = now.getDate();        //一个月中的某一天 (1 ~ 31)

        var hh = now.getHours();        //获取小时 0-23
        var mm = now.getMinutes();      //获取分钟 0-59
        var ss = now.getSeconds();      //获取秒 0-59

//            定义一个对象存储时间
        var clock = year + "-";   //2016-

//            如果月份小于10则在月份前加0
        if (month < 10) clock += "0";
        clock += month + "-";      //2016-07-
//            如果天数小于10则在天数前加0
        if (day < 10) clock += "0";
        clock += day + "-";         //2016-07-27-
//            如果小时小于10则在小时前加0
        if (hh < 10) clock += "0";
        clock += hh;                //2016-07-27-21
//            如果分钟小于10则在分钟前加0
        if (mm < 10) clock += "0";
        clock += mm;                //2016-07-27-2135
//            如果秒数小于10则在秒数前加0
        if (ss < 10) clock += "0";
        clock += ss;                //2016-07-27-213523
//            返回clock的值
        return (clock);
    }

</script>


<body onload="init()">
<div>
    <input type="button" class="ButtonLib" value="裁剪图层" onclick="clipAnalysisByPolygon()">
</div>
<div id="map1">

</div>

</body>
</html>


```
