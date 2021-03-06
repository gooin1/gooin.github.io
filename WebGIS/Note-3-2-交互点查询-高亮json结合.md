

## 1. 加载地图
##### 1) 加载底图
```javascript
               var map;
               var layer;
               var drawLayer;
               var drawControl;
               var highLtLayer;

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
            
            <!--调用函数创建绘制图层-->
            initDraw();
        }
```
##### 2) 添加一个绘制图层
```javasript
        function initDraw() {
//            添加一个绘制图层
            drawLayer = new OpenLayers.Layer.Vector("DrawLayer");
            map.addLayer(drawLayer);
//          创建并添加控件  点
            drawControl = new OpenLayers.Control.DrawFeature(drawLayer, OpenLayers.Handler.Point);
            <!--调用callBack函数将查询到的要素添加到绘图控件中(可能不对..忘了)-->
            drawControl.featureAdded = callBack;
            <!--添加地图控件-->
            map.addControl(drawControl);
        }
```
##### 3) 创建图层用于高亮显示
```javasript
        function initHighLtLayer() {
//            添加一个用于高亮显示的图层
            highLtLayer = new OpenLayers.Layer.Vector("Highlight");
            map.addLayer(highLtLayer);
        }
```


## 2.查询
**查询5步曲**
a.创建查询结构
b.创建查询形状
c.创建查询参数
d.创建查询服务
e.开始查询


``` javascript
           function callBack(feature) {
   //            创建查询结构
               var queryStruct = new Zondy.Service.QueryFeatureStruct(
                       {
   //                        要查询的信息
                           IncludeGeometry: true,
                           IncludeAttribute: true,
                           IncludeGraphic: true
                       }
               );
   //          	创建查询形状
               var pointObj = new Zondy.Object.PointForQuery();
   //            传入OpenLayer的点的坐标
               pointObj.setByOL(feature.geometry);
   
   //            在点击下一个点时清除之前的点
               feature.destroy();
   //            创建查询参数
               var queryParm = new Zondy.Service.QueryParameter(
                       {
                           geometry:pointObj,
                           resultFormat:"json",
                           struct:queryStruct
                       });
   //            创建查询服务
               var queryService =new Zondy.Service.QueryDocFeature(queryParm,"WorldMKT",1,{
                   ip:"127.0.0.1",
                   port:"6163"
               });
   
   //          开始查询
               queryService.query(onSuccess);
   
           }         

```


### 查询按钮的点击事件
```javascript
        function startQuery() {
            if (drawControl) {
                drawControl.activate();//激活绘图控件
            }
        }
```

### 回调函数 onSuccess
```javascript
        function onSuccess(data) {
            var formatData = JSON.stringify(data);
            Process(formatData, 1, "resultTable");
//            如果存在已经高亮的图层则销毁,通过initHighLtLayer()重建要高亮显示的新图层
            if(highLtLayer) {
                highLtLayer.destroy();
            }


            //初始化高亮图层
            initHighLtLayer();
//            高亮显示
            var format = new Zondy.Format.PolygonJSON();
            var features = format.read(data);
            highLtLayer.setVisibility(true);//将图层设为可见
            highLtLayer.addFeatures(features);//将要素添加到图层中
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
        var map;
        var layer;
        var drawLayer;
        var drawControl;
        var highLtLayer;

        function init() {
//            创建地图容器
            map = new OpenLayers.Map("map1", {
//            添加控件
                controls: [
                    new OpenLayers.Control.Navigation(),
                    new OpenLayers.Control.MousePosition(),
                    new OpenLayers.Control.LayerSwitcher(),
                    new OpenLayers.Control.OverviewMap()
                ]
            });

            layer = new Zondy.Map.Doc("BaseLayer", "WorldMKT", {
                ip: "127.0.0.1",
                port: "6163",
                isBaseLayer: true
            });
//          添加图层
            map.addLayers([layer]);
//            设置显示中心和级别
            map.setCenter(new OpenLayers.LonLat(11544046, 4312771), 3);
            initDraw();
        }


        function initDraw() {
//            添加一个绘制图层
            drawLayer = new OpenLayers.Layer.Vector("DrawLayer");
            map.addLayer(drawLayer);
//          创建并添加控件  点
            drawControl = new OpenLayers.Control.DrawFeature(drawLayer, OpenLayers.Handler.Point);
            drawControl.featureAdded = callBack;
            map.addControl(drawControl);
        }
        function initHighLtLayer() {
//            添加一个用于高亮显示的图层
            highLtLayer = new OpenLayers.Layer.Vector("Highlight");
            map.addLayer(highLtLayer);
        }



        function callBack(feature) {
//            创建查询结构
            var queryStruct = new Zondy.Service.QueryFeatureStruct(
                    {
//                        要查询的信息
                        IncludeGeometry: true,
                        IncludeAttribute: true,
                        IncludeGraphic: true
                    }
            );
//          	创建查询形状
            var pointObj = new Zondy.Object.PointForQuery();
//            传入OpenLayer的点的坐标
            pointObj.setByOL(feature.geometry);

//            在点击下一个点时清除之前的点
            feature.destroy();
//            创建查询参数
            var queryParm = new Zondy.Service.QueryParameter(
                    {
                        geometry:pointObj,
                        resultFormat:"json",
                        struct:queryStruct
                    });
//            创建查询服务
            var queryService =new Zondy.Service.QueryDocFeature(queryParm,"WorldMKT",1,{
                ip:"127.0.0.1",
                port:"6163"
            });

//          开始查询
            queryService.query(onSuccess);

        }


        function startQuery() {
            if (drawControl) {
                drawControl.activate();//激活绘图控件
            }
        }


        function onSuccess(data) {
            var formatData = JSON.stringify(data);
            Process(formatData, 1, "resultTable");
//            如果存在已经高亮的图层则销毁,通过initHighLtLayer()重建要高亮显示的新图层
            if(highLtLayer) {
                highLtLayer.destroy();
            }


            //初始化高亮图层
            initHighLtLayer();
//            高亮显示
            var format = new Zondy.Format.PolygonJSON();
            var features = format.read(data);
            highLtLayer.setVisibility(true);//将图层设为可见
            highLtLayer.addFeatures(features);//将要素添加到图层中
        }


    </script>
</head>
<body onload="init()">
<div class="ToolLib">
    <input type="button" class="ButtonLib" value="开始查询" onclick="startQuery()"/>

</div>

<div id="map1"></div>


<aside id="resultTable">

</aside>

</body>
</html>
```