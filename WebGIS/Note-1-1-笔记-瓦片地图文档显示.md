## 1. 步骤

#### - 全局变量
```javascript
        var map, tile;
```

#### - 添加地图容器
```javascript
            <!--'map1'为html中要显示地图div的id-->
            map = new OpenLayers.Map('map1');
```

#### - 添加瓦片图层
```javascript
            <!--'MDZZ'为自定义的图层名-->
            <!--'WORLDMKT'为已经发布的瓦片地图名-->
            tile = new Zondy.Map.TileLayer('MDZZ', 'WORLDMKT', {
                ip: "127.0.0.1", //本机ip
                port: '6163',    //端口号
                isBaseLayer: true /设为默认图层
            });
```

#### - 将图层添加到地图容器中
```javascript                
            map.addLayers([tile]);
```

#### - 设置地图显示中心坐标,地图缩放等级
```javascript
           <!--设置地图显示中心坐标,地图缩放等级-->
           map.setCenter(new OpenLayers.LonLat(0, 0), 3);
```
## 2.完整代码
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">

    <title>Title</title>
    <!--必要的库引用-->
    
    <!--引用css样式-->
    <link href="../css/mapDefault.css" type="text/css" rel="stylesheet"/>
    <!--地图显示所必需的库 注意先后顺序-->
    <script src="../libs/OpenLayers.js" type="text/javascript"></script>
    <script src="../libs/jquery-1.7.1.min.js" type="text/javascript"></script>
    <script src="../libs/zdclient.js" type="text/javascript"></script>
    <script type="text/javascript">
        var map, tile;
        function init() {
 //            添加地图容器
            map = new OpenLayers.Map('map1');
//              添加瓦片图层
            tile = new Zondy.Map.TileLayer('MDZZ', 'WORLDMKT', {
                ip: "127.0.0.1",
                port: '6163',
                isBaseLayer: true
            });
 //            将图层添加到地图容器中
            map.addLayers([tile]);
            <!--设置地图显示中心坐标,地图缩放等级-->
            map.setCenter(new OpenLayers.LonLat(0, 0), 3);
        }
    </script>
</head>

<!--添加onload事件,网页载入时.调用init()函数初始化地图并显示-->
<body onload="init()">

<!--要显示地图的区块 id要与**添加地图容器**步骤中的id一致-->
<div id="map1">

</div>

</body>
</html>           
```