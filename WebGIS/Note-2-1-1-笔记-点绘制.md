## 1. 步骤

#### 1) 全局变量
```javascript
          var map, layer0, pointLayer;
```

#### 2) 添加地图容器
```javascript
//            创建地图容器
            map = new OpenLayers.Map('map1',
                    {
                        controls: [
                            new OpenLayers.Control.PanZoomBar(),//缩放面板的工具控件
                            new OpenLayers.Control.LayerSwitcher(), //图层切换控件
                            new OpenLayers.Control.Navigation(),    //此控件处理伴随鼠标事件的地图浏览
                            new OpenLayers.Control.MousePosition()//此控件显示鼠标移动时，所在点的地理坐标
                        ]
                    }
            );


```

#### 3) 添加第三方地图图层
```javascript
//            添加图层0
            layer0 = new Zondy.Map.GoogleLayer("Google Map VEC",
                    {
//                        添加GoogleMap的矢量图层
                        layerType: Zondy.Enum.GoogleLayerType.VEC,
//                        设为底图
                        isBaseLayer: true
                    }
            );

```

#### 4) 将图层添加到地图容器中
```javascript
          map.addLayers([layer0,layer1,layer2]);
```
#### 5) 在地图上创建点图层
```javascript
          pointLayer = new OpenLayers.Layer.Vector("MDZZ");
```

#### 6) 创建几何点并生成点要素
```javascript
         //传入坐标创建几何点           
          var pointGeom = new OpenLayers.Geometry.Point(858585,154654) ;
          //生成点要素
          var pointFeature = new OpenLayers.Feature.Vector(pointGeom);
 
          var pointGeom1 = new OpenLayers.Geometry.Point(9893585,4344069);//创建几何点
          var pointFeature1 = new OpenLayers.Feature.Vector(pointGeom1);//生成点要素

          var pointGeom2 = new OpenLayers.Geometry.Point(9314310, 3717894);//创建几何点
          var pointFeature2 = new OpenLayers.Feature.Vector(pointGeom2);//生成点要素
 
```

#### 7) 将点添加到图层中
```javascript
          pointLayer.addFeatures([pointFeature,pointFeature1,pointFeature2]);//点添加到图层中        
```
#### 8)
```javascript
        //将点图层添加到地图上
        map.addLayer(pointLayer);
```   

#### 6) 设置地图显示中心坐标,地图缩放等级
```javascript
           <!--设置地图显示中心坐标,地图缩放等级-->
           map.setCenter(new OpenLayers.LonLat(0, 0), 2);
```

**注:雷同代码不再做注释,如有不懂请参阅前面发布的文章**

## 2.完整代码
```javascript

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Google Map</title>
    <link href="../css/mapDefault.css" type="text/css" rel="stylesheet"/>

    <script src="../libs/OpenLayers.js" type="text/javascript"></script>
    <script src="../libs/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="../libs/zdclient.js" type="text/javascript"></script>
    <script type="text/javascript">
        var map, layer0, pointLayer;

        function init() {
//            创建地图容器
            map = new OpenLayers.Map('map1',
                    {
                        controls: [
                            new OpenLayers.Control.PanZoomBar(),//缩放面板的工具控件
                            new OpenLayers.Control.LayerSwitcher(), //图层切换控件
                            new OpenLayers.Control.Navigation(),    //此控件处理伴随鼠标事件的地图浏览
                            new OpenLayers.Control.MousePosition()//此控件显示鼠标移动时，所在点的地理坐标
                        ]
                    }
            );
            //添加控件的第二种方法
            map.addControl(new OpenLayers.Control.OverviewMap);
//            添加图层
            layer0 = new Zondy.Map.GoogleLayer("Google Map VEC",
                    {
//                        添加GoogleMap的矢量图层
                        layerType: Zondy.Enum.GoogleLayerType.VEC,
                        isBaseLayer: true
                    }
            );


            map.addLayers([layer0]);


            //在地图上创建点图层
            pointLayer = new OpenLayers.Layer.Vector("MDZZ");
            pointLayer.styleMap.styles["default"].defaultStyle.strokeColor = "#1d75b3";



            var pointGeom = new OpenLayers.Geometry.Point(858585,154654) ;//创建几何点
            var pointFeature = new OpenLayers.Feature.Vector(pointGeom);//生成点要素

            var pointGeom1 = new OpenLayers.Geometry.Point(9893585,4344069);//创建几何点
            var pointFeature1 = new OpenLayers.Feature.Vector(pointGeom1);//生成点要素

            var pointGeom2 = new OpenLayers.Geometry.Point(9314310, 3717894);//创建几何点
            var pointFeature2 = new OpenLayers.Feature.Vector(pointGeom2);//生成点要素


            pointLayer.addFeatures([pointFeature,pointFeature1,pointFeature2]);//点添加到图层中
            map.addLayer(pointLayer);//将图层添加到地图上

            <!--设置地图显示中心坐标,地图缩放等级-->
            map.setCenter(new OpenLayers.LonLat(0, 0), 2);


        }


    </script>
</head>
<body onload="init()">

<div id="map1">
</div>

</body>
</html>
```

