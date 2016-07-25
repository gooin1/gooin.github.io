## 1. 步骤

#### 1) 全局变量
```javascript
           var map, layer0;
           var layer1;
           var layer2;
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
            //添加控件的第二种方法
            map.addControl(new OpenLayers.Control.OverviewMap);

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

            //            添加图层1
            layer1 = new Zondy.Map.GoogleLayer("Google Map ROAD",
                    {
//                        添加GoogleMap的道路图层
                        layerType: Zondy.Enum.GoogleLayerType.ROAD,
                        isBaseLayer: false
                    }
            );

            //            添加图层2
            layer2 = new Zondy.Map.GoogleLayer("Google Map RASTER",
                    {
//                        添加GoogleMap的栅格图层
                        layerType: Zondy.Enum.GoogleLayerType.RASTER,
                        isBaseLayer: false
                    }
            );

```

#### 4) 将图层添加到地图容器中
```javascript
          map.addLayers([layer0,layer1,layer2]);
```

#### 5) 设置地图显示中心坐标,地图缩放等级
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
        var map, layer0;
        var layer1;
        var layer2;

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
//            添加图层0
            layer0 = new Zondy.Map.GoogleLayer("Google Map VEC",
                    {
//                        添加GoogleMap的矢量图层
                        layerType: Zondy.Enum.GoogleLayerType.VEC,
//                        设为底图
                        isBaseLayer: true
                    }
            );

            //            添加图层1
            layer1 = new Zondy.Map.GoogleLayer("Google Map ROAD",
                    {
//                        添加GoogleMap的道路图层
                        layerType: Zondy.Enum.GoogleLayerType.ROAD,
                        isBaseLayer: false
                    }
            );

            //            添加图层2
            layer2 = new Zondy.Map.GoogleLayer("Google Map RASTER",
                    {
//                        添加GoogleMap的栅格图层
                        layerType: Zondy.Enum.GoogleLayerType.RASTER,
                        isBaseLayer: false
                    }
            );


//            将图层添加到地图中
            map.addLayers([layer0,layer1,layer2]);

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

