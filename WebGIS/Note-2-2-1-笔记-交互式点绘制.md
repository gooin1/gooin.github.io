点击**点绘制**按钮后,可在地图任意位置画点
## 1. 步骤
#### 1) 全局变量
```javascript
        var map, layer;
        var drawControl; //笔
        var vecLayer; //纸
```

#### 2) 加载地图
```javascript
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

//            添加图层0
            layer0 = new Zondy.Map.GoogleLayer("Google Map VEC",
                    {
//                        添加GoogleMap的矢量图层
                        layerType: Zondy.Enum.GoogleLayerType.VEC,
//                        设为底图
                        isBaseLayer: true
                    }
            );

//            将图层添加到地图中
            map.addLayers([layer0]);
//            设置地图显示中心和缩放级别
            map.setCenter(new OpenLayers.LonLat(0, 0), 2);

        }
```

#### 3) //创建一个矢量图层用于交互式绘制
```javascript
        function initDrawControl() {
//            创建图层
            vecLayer = new OpenLayers.Layer.Vector("DrawLayer");
//            添加到地图中
            map.addLayer(vecLayer);
//            创建绘制**点**工具
            drawControl = new OpenLayers.Control.DrawFeature(vecLayer, OpenLayers.Handler.Point);
//            将绘图工具添加到控件中
            map.addControl(drawControl);
        }
```

#### 4) 开始绘制函数
```javascript
                  function StarDraw() {
                      //如果绘图图层不存在
                      if (vecLayer == null) {
          //                初始化绘图
                          initDrawControl();
          
                      }
                      drawControl.activate();//激活绘图控件
                      
```
#### 5) 清除图层
```javascript
         function clearMap() {
             if (vecLayer) {
 //                移除绘图图层
                 map.removeLayer(vecLayer);
             }
 //            绘图图层赋值为空
             vecLayer = null;
 //            关闭绘图控件
             drawControl.deactivate();
         }         
```



**注:雷同代码不再做注释,如有不懂请参阅前面发布的文章**

## 2.完整代码
```javascript
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <!--如果中文乱码则缺少此行代码-->
    <meta charset="UTF-8">

    <title>几何图形绘制</title>

    <link href="../css/mapDefault.css" type="text/css" rel="stylesheet"/>

    <script src="../libs/jquery-1.11.2.min.js" type="text/javascript"></script>
    <script src="../libs/OpenLayers.js" type="text/javascript"></script>
    <script src="../libs/zdclient.js" type="text/javascript"></script>
    <script type ="text/javascript">

        var map, layer;
        var drawControl; //笔
        var vecLayer; //纸
        //加载一个图层
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

//            添加图层0
            layer0 = new Zondy.Map.GoogleLayer("Google Map VEC",
                    {
//                        添加GoogleMap的矢量图层
                        layerType: Zondy.Enum.GoogleLayerType.VEC,
//                        设为底图
                        isBaseLayer: true
                    }
            );

//            将图层添加到地图中
            map.addLayers([layer0]);
//            设置地图显示中心和缩放级别
            map.setCenter(new OpenLayers.LonLat(0, 0), 2);

        }
        //创建一个矢量图层用于交互式绘制
        function initDrawControl() {
//            创建图层
            vecLayer = new OpenLayers.Layer.Vector("DrawLayer");
//            添加到地图中
            map.addLayer(vecLayer);
//            创建绘制**点**工具
            drawControl = new OpenLayers.Control.DrawFeature(vecLayer, OpenLayers.Handler.Point);
//            将绘图工具添加到控件中
            map.addControl(drawControl);
        }
        //        开始绘制函数
        function StarDraw() {
            //如果绘图图层不存在
            if (vecLayer == null) {
//                初始化绘图
                initDrawControl();

            }
            drawControl.activate();//激活绘图控件


            //激活控件
        }

        //清除图层
        function clearMap() {
            if (vecLayer) {
//                移除绘图图层
                map.removeLayer(vecLayer);
            }
//            绘图图层赋值为空
            vecLayer = null;
//            关闭绘图控件
            drawControl.deactivate();
        }
    </script>
    
</head>
<body onload="init()">
<div  class="ToolLib">
    <!--添加按钮-->
    <input  type ="button" class="ButtonLib" value="绘制点" onclick="StarDraw()" />
    <input  type ="button" class="ButtonLib" value="清除绘制" onclick="clearMap()" />
</div>
<div id="map1"></div>
</body>
</html>

```

