



## 1. 加载地图
##### 1) 加载底图
```javascript
        var map, layer;
        var drawLayer = null;//定义高亮的图层

        function init() {
//            添加地图容器
            map = new OpenLayers.Map('map1',
                    {
                        controls: [
                            new OpenLayers.Control.PanZoomBar(),
                            new OpenLayers.Control.LayerSwitcher(),
                            new OpenLayers.Control.Navigation(),
                            new OpenLayers.Control.MousePosition()
                        ]
                    }
            );

//            添加图层
            layer = new Zondy.Map.Doc('MDZZ', 'WorldMKT', {
                ip: "127.0.0.1",
                port: '6163',
                isBaseLayer: true
            });
            map.addLayers([layer]);
            map.setCenter(new OpenLayers.LonLat(11544046, 4312771), 3);
        }
```
##### 2) 创建图层用于高亮显示
```javasript
        function initDrawLayer() {
            drawLayer = new OpenLayers.Layer.Vector("Highlight");
            map.addLayer(drawLayer);
        }
```


## 2.查询
**查询5步曲**

##### a.创建查询结构
``` javascript
            //创建查询结构
            var queryStruct = new Zondy.Service.QueryFeatureStruct(
                    {
                        //要查询的信息
                        IncludeGeometry: true, //几何图形信息
                        IncludeAttribute: true,//属性
                        IncludeGraphic: true  //图形参数
                    }
            );

```

##### b.创建查询形状(点 图形)
```javasript
<!--指定查询点的坐标-->
            var pointObj = new Zondy.Object.PointForQuery(11544046, 4312771);
//            var lineObj = [new Zondy.Object.PointForQuery(11544046, 4312771), new Zondy.Object.PointForQuery(1623478, 5003018)];
//            lineObj[0] = new Zondy.Object.PointForQuery(11544046, 4312771);
//            lineObj[1] = new Zondy.Object.PointForQuery(1623478,5003018);
//            var polyLine = new Zondy.Object.PolyLineForQuery(lineObj);

//            地图容差  在点的0.3范围内可被选取
//            pointObj.nearDis = 0.3;

```
##### c. 创建查询参数
```javascript
            var queryParm = new Zondy.Service.QueryParameter(
                    {
                        geometry: pointObj,  //查询点
//                      geometry: polyLine,  //查询线
                        resultFormat: "json", //输出结果格式为json
                        struct: queryStruct   //指定查询结构
                    }
            );
```
##### d.创建查询服务
```javasript
     var queryService = new Zondy.Service.QueryDocFeature(
                    queryParm/*调用查询参数函数*/,
                    "WorldMKT", 1/*查询图层索引号*/,
                    {
                        ip: "127.0.0.1",
                        port: "6163"
                    }
            );

```    

##### e.开始查询
```javascript
        //  实现查询操作,querySuccess回调函数
        queryService.query(onSuccess);
```

### 回调函数 onSuccess
```javascript

        function querySuccess(result) {
            var FormatData = JSON.stringify(result);
            Process(FormatData, 1, "resultTable"/*将结果插入到'resultTable'中 'resultTable'为div的id*/);

//          初始化高亮图层
            initDrawLayer();

//            新建对象存储要读取的数据
            var format = new Zondy.Format.PolygonJSON();
 //                读取查询到的数据并添加到要素中
            var features = format.read(result);
//              将高粱图层设为可见
            drawLayer.setVisibility(true);
//                向图层添加查询到的要素
            drawLayer.addFeatures(features);
        }
```

## 3.代码
```javascript

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link href="../css/mapDefault.css" type="text/css" rel="stylesheet"/>

    <script src="../libs/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="../libs/OpenLayers.js" type="text/javascript"></script>
    <script src="../libs/zdclient.js" type="text/javascript"></script>
    <script src="../libs/jsonformat/json2.js" type="text/javascript"></script>
    <script src="../libs/jsonformat/jsonExtend.js" type="text/javascript"></script>


    <script type="text/javascript">
        var map, layer;
        var drawLayer = null;//定义高亮的图层

        function init() {
//            添加地图容器
            map = new OpenLayers.Map('map1',
                    {
                        controls: [
                            new OpenLayers.Control.PanZoomBar(),
                            new OpenLayers.Control.LayerSwitcher(),
                            new OpenLayers.Control.Navigation(),
                            new OpenLayers.Control.MousePosition()
                        ]
                    }
            );

//            添加图层
            layer = new Zondy.Map.Doc('MDZZ', 'WorldMKT', {
                ip: "127.0.0.1",
                port: '6163',
                isBaseLayer: true
            });
            map.addLayers([layer]);
            map.setCenter(new OpenLayers.LonLat(11544046, 4312771), 3);
        }

        //        初始化要高亮的图层
        function initDrawLayer() {
            drawLayer = new OpenLayers.Layer.Vector("Highlight");
            map.addLayer(drawLayer);
        }

        function QueryByPNT() {
            //创建查询结构
            var queryStruct = new Zondy.Service.QueryFeatureStruct(
                    {
                        //要查询的信息
                        IncludeGeometry: true, //几何图形信息
                        IncludeAttribute: true,//属性
                        IncludeGraphic: true  //图形参数
                    }
            );

//            创建查询形状(点)
            var pointObj = new Zondy.Object.PointForQuery(11544046, 4312771);
//            var lineObj = [new Zondy.Object.PointForQuery(11544046, 4312771), new Zondy.Object.PointForQuery(1623478, 5003018)];
//            lineObj[0] = new Zondy.Object.PointForQuery(11544046, 4312771);
//            lineObj[1] = new Zondy.Object.PointForQuery(1623478,5003018);
//            var polyLine = new Zondy.Object.PolyLineForQuery(lineObj);

//            地图容差  在点的0.3范围内可被选取
//            pointObj.nearDis = 0.3;

//            创建查询参数
            var queryParm = new Zondy.Service.QueryParameter(
                    {
                        geometry: pointObj,  //查询点
//                        geometry: polyLine,  //查询线
                        resultFormat: "json", //输出结果格式为json
                        struct: queryStruct   //查询结构
                    }
            );


//            创建被查询对象 服务
            var queryService = new Zondy.Service.QueryDocFeature(
                    queryParm/*调用查询参数函数*/,
                    "WorldMKT", 1/*查询图层索引号*/,
                    {
                        ip: "127.0.0.1",
                        port: "6163"
                    }
            );


            //  实现查询操作,querySuccess回调函数
            queryService.query(querySuccess);

        }
        function querySuccess(result) {
            var FormatData = JSON.stringify(result);
            Process(FormatData, 1, "resultTable"/*存放查询结果id位置*/);

            //初始化高亮图层
            initDrawLayer();

//            新建对象存储要读取的数据
            var format = new Zondy.Format.PolygonJSON();
 //                读取查询到的数据并添加到要素中
            var features = format.read(result);
//              将高粱图层设为可见
            drawLayer.setVisibility(true);
//                向图层添加查询到的要素
            drawLayer.addFeatures(features);
        }


    </script>
</head>
<body onload="init()">
<div class="ToolLib">
    <input type="button" class="ButtonLib" value="HighLight And Show Details" onclick="QueryByPNT()"/>
    

</div>
<div id="map1"></div>


<aside id="resultTable">

</aside>

</body>
</html>
```