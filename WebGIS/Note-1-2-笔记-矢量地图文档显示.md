## 1. 步骤

#### 1) 全局变量
```javascript
        var map, vectorMapdoc;
```

#### 2) 添加地图容器
```javascript
            <!--'map1'为html中要显示地图div的id-->
            map = new OpenLayers.Map('map1',

                    {
                        <!--添加控件-->
                        controls: [
                            new OpenLayers.Control.PanZoomBar(),                 //缩放面板的工具控件
                            new OpenLayers.Control.LayerSwitcher(),                //图层切换控件
                            new OpenLayers.Control.Navigation(),                   //此控件处理伴随鼠标事件的地图浏览
                            new OpenLayers.Control.MousePosition(),                //此控件显示鼠标移动时，所在点的地理坐标
                            new OpenLayers.Control.OverviewMap()                    //鹰眼
                        ]
                    }
            );
            
```

#### 3) 添加矢量图层
```javascript
                    <!--'MyMap'为自定义的图层名-->
                    <!--'WorldMKT'为已经发布的地图-->
            vectorMapdoc = new Zondy.Map.Doc("MyMap", "WorldMKT",
                    {
                        ip: "127.0.0.1",   //ip
                        port: "6163",      //端口
                        isBaseLayer: true   //设为基础图层
                    });
```

#### 4) 将图层添加到地图容器中
```javascript                
                     map.addLayers([vectorMapdoc]);
```

#### 5) 设置地图显示中心坐标,地图缩放等级
```javascript
           <!--设置地图显示中心坐标,地图缩放等级-->
           map.setCenter(new OpenLayers.LonLat(0, 0), 3);
```

**注:雷同代码不再做注释,如有不懂请参阅前面发布的文章**

## 2.完整代码
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <link href="../css/mapDefault.css" type="text/css" rel="stylesheet"/>

    <script src="../libs/jquery-1.11.2.min.js" type="text/javascript"></script>
    <script src="../libs/OpenLayers.js" type="text/javascript"></script>
    <script src="../libs/zdclient.js" type="text/javascript"></script>
    <script type="text/javascript">


        var map, vectorMapdoc;
        function init() {
//            添加地图容器
            map = new OpenLayers.Map('map1',

                    {
                        controls: [
                            new OpenLayers.Control.PanZoomBar(),                 //缩放面板的工具控件
                            new OpenLayers.Control.LayerSwitcher(),                //图层切换控件
                            new OpenLayers.Control.Navigation(),                   //此控件处理伴随鼠标事件的地图浏览
                            new OpenLayers.Control.MousePosition(),                //此控件显示鼠标移动时，所在点的地理坐标
                            new OpenLayers.Control.OverviewMap()                    //鹰眼
                        ]
                    }
            );
//              添加图层
            vectorMapdoc = new Zondy.Map.Doc("MyMap", "WorldMKT",
                    <!--'MyMap'为自定义的图层名-->
                    <!--'WorldMKT'为已经发布的地图-->
                    {
                        ip: "127.0.0.1",   //ip
                        port: "6163",      //端口
                        isBaseLayer: true   //设为基础图层
                    });
//            将图层添加到地图容器中
            map.addLayers([vectorMapdoc]);
            <!--设置地图显示中心坐标,地图缩放等级-->
            map.setCenter(new OpenLayers.LonLat(0, 0), 3);

        }

    </script>
    <meta charset="UTF-8">
    <title>Title</title>
</head>

<!--在页面栽入时调用init()函数-->
<body onload="init()">

<div id="header">
    <h1>Example</h1>
    <p>show map</p>
</div>

<div id="map1">

</div>
</body>
</html>
```
