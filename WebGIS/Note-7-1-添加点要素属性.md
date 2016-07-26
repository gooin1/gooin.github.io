

## 1. 加载地图
##### 1) 加载底图
```javascript
        var map, layer;
        function init() {
//            添加地图容器
            map = new OpenLayers.Map("map1", {
                controls: [
                    new OpenLayers.Control.MousePosition(),//此控件显示鼠标移动时，所在点的地理坐标
                    new OpenLayers.Control.LayerSwitcher(),//图层切换控件
                    new OpenLayers.Control.Navigation()//此控件处理伴随鼠标事件的地图浏览
                ]
            });
//              添加矢量图层
            layer = new Zondy.Map.Layer("MDZZ",
//                    传入矢量地图的url参数
                    ["gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/主要城市"],
                    {
                        ip: "127.0.0.1",//ip
                        port: "6163",//端口
                        isBaseLayer: true //设为基础图层 !此项不写地图无法加载
                    });
//            将图层添加到地图容器中
            map.addLayer(layer);
            <!--设置地图显示中心坐标,地图缩放等级-->
            map.setCenter(new OpenLayers.LonLat(0, 0), 1);
        }
```



## 2.添加 删除 更新 点

### 一.点添加：
  
#### 1.构建一个要素

###### 几何信息 
```javascript
                var fGeom = new Zondy.Object.FeatureGeometry({PntGeom: [gPoint]});
```

###### 图形信息
```javascript
                var webGraphicInfo = new Zondy.Object.WebGraphicsInfo({
                                InfoType: 1, //图形参数为点类型 1为点,2为线,3为区
                                PntInfo: pointInfo //传入点的符号参数信息(Zondy.Object.CPointInfo)
                            });
```
###### 属性信息 
```javascript
                var attValue = ['湖蓝', 'CHINA', 1.0];
```
###### 创建点要素 
```javascript
                var feature = new Zondy.Object.Feature({
                                fGeom: fGeom,               //传入几何信息
                                GraphicInfo: webGraphicInfo,//传入图形信息
                                AttValue: attValue          //传入属性信息
                            });
```

              
#### 2.设置要素为点要素

```javascript
                feature.setFType(1);//设置要素为点要素  1为点,2为线,3为区              
```
                
                
       
#### 3.

###### 创建一个要素数据集
```javascript
            var featureSet = new Zondy.Object.FeatureSet();                          
```
###### 设置属性结构(可在前面定义)
```javascript
             var attStruct = new Zondy.Object.CAttStruct({
                             FldName: ["Cname", "CNTRY_NAME", "POPULATION"],//属性名
                             FldNumber: 3,                                  //属性数量
                             FldType: ["string", "string", "double"]        // 属性类型数组
                          });                                      
```
###### 将设置的属性结构赋给要素数据集
```javascript
            featureSet.AttStruct = attStruct;                              
```
###### 添加要素到数据集中
```javascript
            featureSet.addFeature(feature);                                       
```

#### 4. 
######创建一个编辑服务对象
```javascript
            var editService = new Zondy.Service.EditLayerFeature("gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/主要城市",
                    {
                        ip: "127.0.0.1", //服务器ip
                        port: "6163"       //端口
                    });                              
```

######将要素集添加到图层中并执行回调函数
```javascript
             editService.add(featureSet, onSuccess);                   
```

#### 5.回调函数提示用户是否添加成功
```javascript
         function onSuccess(result) {
 //            如果添加成功则返回结果
             if(result){
                 alert("添加成功");//弹窗提示
 //                刷新地图
                 map.baseLayer.redraw(true);
             }else{
                 alert("添加失败");//弹窗提示
             }
         }                             
```
   
             
### 二.点删除          
根据IOD删除,直接创建编辑服务类.调用deletes(OID,onSuccess)方法删除              
``` javascript    
       function delPoint() {

//            添加要删除的点的OID 数组形式删除一组点
//            var featureIds=[599,600,601];

//            添加要删除的点的OID 字符串形式删除一组点
//            var featureIds="599,600,601";

//            添加要删除的点的OID
            var featureIds = 602;
//            创建一个编辑服务类
            var delService = new Zondy.Service.EditLayerFeature("gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/主要城市", {
                ip: "127.0.0.1",//服务器ip
                port: "6163"    //端口
            });
//          将要素集从图层中删除并执行回调函数
            delService.deletes(featureIds, onSuccess);
        }
```


### 三.点更新
构建要素的过程与点添加相同, 两行代码不同.
需要设置被更新点的OID
```javascript
//          设置要素为点要素  1为点,2为线,3为区
            newFeature.setFType(1);

             <!--此处与添加点区别-->
//           设置需要更新点的OID
            newFeature.setFID(602);


//           创建一个要素集
            var featureSet = new Zondy.Object.FeatureSet();
```
在创建编辑服务类后执行update(要素数据集,回调函数)
```javascript
//            创建编辑服务类
            var editService = new Zondy.Service.EditLayerFeature("gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/主要城市",
                    {
                        ip: "127.0.0.1",//服务器ip
                        port: "6163"     //端口
                    });

//          更新要素集信息中并执行回调函数
            editService.update(featureSet,onSuccess);
        }
```



## 3.代码
#### 1.添加点
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>添加点要素</title>
    <link href="../css/mapDefault.css" type="text/css" rel="stylesheet">
    <script src="../libs/jquery-1.11.2.min.js" type="text/javascript"></script>
    <script src="../libs/OpenLayers.js" type="text/javascript"></script>
    <script src="../libs/zdclient.js" type="text/javascript"></script>
    <script type="text/javascript">
        var map, layer;
        function init() {
//            添加地图容器
            map = new OpenLayers.Map("map1", {
                controls: [
                    new OpenLayers.Control.MousePosition(),//此控件显示鼠标移动时，所在点的地理坐标
                    new OpenLayers.Control.LayerSwitcher(),//图层切换控件
                    new OpenLayers.Control.Navigation()//此控件处理伴随鼠标事件的地图浏览
                ]
            });
//              添加矢量图层
            layer = new Zondy.Map.Layer("MDZZ",
//                    传入矢量地图的url参数
                    ["gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/主要城市"],
                    {
                        ip: "127.0.0.1",//ip
                        port: "6163",//端口
                        isBaseLayer: true //设为基础图层 !此项不写地图无法加载
                    });
//            将图层添加到地图容器中
            map.addLayer(layer);
            <!--设置地图显示中心坐标,地图缩放等级-->
            map.setCenter(new OpenLayers.LonLat(0, 0), 1);
        }

        function addPoint() {
//          创建一个点形状
            var gPoint = new Zondy.Object.GPoint(78, -35);
//          设置当前点要素的几何信息
            var fGeom = new Zondy.Object.FeatureGeometry({PntGeom: [gPoint]});
//           描述点要素的符号参数信息
            var pointInfo = new Zondy.Object.CPointInfo({
                Angle: 0, //旋转角度
                Color: 23,//颜色
                Space: 0,//间距
                SymHeight: 12,//点的高度
                SymWidth: 12,//点的宽度
                SymID: 7     //符号id
            });
//            设置当前点要素的图形参数
            var webGraphicInfo = new Zondy.Object.WebGraphicsInfo({
                InfoType: 1, //图形参数为点类型 1为点,2为线,3为区
                PntInfo: pointInfo //传入点的符号参数信息
            });
//          设置属性结构
            var attStruct = new Zondy.Object.CAttStruct({
                FldName: ["Cname", "CNTRY_NAME", "POPULATION"],//字段名称
                FldNumber: 3,                                  //属性数量
                FldType: ["string", "string", "double"]        // 属性类型数组
            });
//            设置添加点要素的属性
            var attValue = ['湖蓝', 'CHINA', 1.0];
//            创建点要素
            var feature = new Zondy.Object.Feature({
                fGeom: fGeom,               //传入几何信息
                GraphicInfo: webGraphicInfo,//传入图形信息
                AttValue: attValue          //传入属性信息
            });
            feature.setFType(1);//设置要素为点要素  1为点,2为线,3为区
//            创建一个要素数据集
            var featureSet = new Zondy.Object.FeatureSet();
//            清空要素集
            featureSet.clear();
//            给要素集添加数据结构
            featureSet.AttStruct = attStruct;
//            添加要素到数据集中
            featureSet.addFeature(feature);

//            创建一个编辑服务类
            var editService = new Zondy.Service.EditLayerFeature("gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/主要城市",
                    {
                        ip: "127.0.0.1", //服务器ip
                        port: "6163"       //端口
                    });
//          将要素集添加到图层中并执行回调函数
            editService.add(featureSet, onSuccess);
        }
        function onSuccess(result) {
//            如果添加成功则返回结果
            if(result){
                alert("添加成功");//弹窗提示
//                刷新地图
                map.baseLayer.redraw(true);
            }else{
                alert("添加失败");//弹窗提示
            }
        }


    </script>

</head>
<body onload="init()">
<div>
    <input type="button" class="ButtonLib" value="坐标添加点" onclick="addPoint()">
</div>


<div id="map1"></div>
<aside id="resultTable"></aside>
</body>
</html>
```
   
   
#### 2.删除点
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link href="../css/mapDefault.css" type="text/css" rel="stylesheet">
    <script src="../libs/jquery-1.11.2.min.js" type="text/javascript"></script>
    <script src="../libs/OpenLayers.js" type="text/javascript"></script>
    <script src="../libs/zdclient.js" type="text/javascript"></script>
    <script type="text/javascript">
        var map, layer;
        function init() {
            //            添加地图容器
            map = new OpenLayers.Map("map1", {
                controls: [
                    new OpenLayers.Control.MousePosition(),//此控件显示鼠标移动时，所在点的地理坐标
                    new OpenLayers.Control.LayerSwitcher(),//图层切换控件
                    new OpenLayers.Control.Navigation()//此控件处理伴随鼠标事件的地图浏览
                ]
            });
 //              添加矢量图层
            layer = new Zondy.Map.Layer("MDZZ",
//                    传入矢量地图的url参数
                    ["gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/主要城市"],
                    {
                        ip: "127.0.0.1",//ip
                        port: "6163",//端口
                        isBaseLayer: true //设为基础图层 !此项不写地图无法加载
                    });
 //            将图层添加到地图容器中
            map.addLayer(layer);
            <!--设置地图显示中心坐标,地图缩放等级-->
            map.setCenter(new OpenLayers.LonLat(0, 0), 1);
        }

        function delPoint() {

//            添加要删除的点的OID 数组形式删除一组点
//            var featureIds=[599,600,601];

//            添加要删除的点的OID 字符串形式删除一组点
//            var featureIds="599,600,601";

//            添加要删除的点的OID
            var featureIds = 602;
//            创建一个编辑服务类
            var delService = new Zondy.Service.EditLayerFeature("gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/主要城市", {
                ip: "127.0.0.1",//服务器ip
                port: "6163"    //端口
            });
//          将要素集从图层中删除并执行回调函数
            delService.deletes(featureIds, onSuccess);
        }

        function onSuccess(result) {
//            如果删除成功则返回结果
            if (result) {
                map.baseLayer.redraw(true);
                alert("删除成功!");//弹窗提示
            } else {
                alert("删除失败");//弹窗提示
            }

        }


    </script>


</head>
<body onload="init()">
<div>
    <input type="button" class="ButtonLib" value="坐标删除点" onclick="delPoint()">
</div>


<div id="map1"></div>
<aside id="resultTable"></aside>
</body>
00
</html>
```
   
   
#### 3.更新点
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link href="../css/mapDefault.css" type="text/css" rel="stylesheet"/>
    <script src="../libs/jquery-1.11.2.min.js" type="text/javascript"></script>
    <script src="../libs/OpenLayers.js" type="text/javascript"></script>
    <script src="../libs/zdclient.js" type="text/javascript"></script>
    <script type="text/javascript">
        var map, layer;
        function init() {
            //            添加地图容器
            map = new OpenLayers.Map("map1", {
                controls: [
                    new OpenLayers.Control.MousePosition(),//此控件显示鼠标移动时，所在点的地理坐标
                    new OpenLayers.Control.LayerSwitcher(),//图层切换控件
                    new OpenLayers.Control.Navigation()//此控件处理伴随鼠标事件的地图浏览
                ]
            });
//              添加矢量图层
            layer = new Zondy.Map.Layer("MDZZ",
//                    传入矢量地图的url参数
                    ["gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/主要城市"],
                    {
                        ip: "127.0.0.1",//ip
                        port: "6163",//端口
                        isBaseLayer: true //设为基础图层 !此项不写地图无法加载
                    });
//            将图层添加到地图容器中
            map.addLayer(layer);
            <!--设置地图显示中心坐标,地图缩放等级-->
            map.setCenter(new OpenLayers.LonLat(0, 0), 1);
        }


        function updatePoint() {
//          创建一个点形状
            var gPoint = new Zondy.Object.GPoint(78, -35);
//          设置点要素的几何信息
            var fGeom = new Zondy.Object.FeatureGeometry({PntGeom: [gPoint]});
//          设置点要素的符号参数信息
            var pointInfo = new Zondy.Object.CPointInfo({
                Angle: 0,//旋转角度
                Color: 18,//颜色
                Space: 0,//间距
                SymHeight: 25,//点的高度
                SymWidth: 25,//点的宽度
                SymID: 8     //符号id
            });

//            设置点要素的图形参数信息
            var webGraphicsInfo = new Zondy.Object.WebGraphicsInfo({
                InfoType: 1,//图形参数为线类型 1为点,2为线,3为区
                PntInfo: pointInfo //传入点的符号参数信息
            });

//            设置属性结构
            var attStruct = new Zondy.Object.CAttStruct({
                FldName: ["Cname", "CNTRY_NAME", "NAME", "POPULATION"], // 属性名
                FldNumber: 4,                                           //属性数量
                FldType: ["string", "string","NAME",  "double"]         // 属性类型数组
            });

//            设置添加要素的属性
            var attValue = ['兰州', 'CHINA111',"LanZhou" ,2.0];

//            创建一个新要素
            var newFeature = new Zondy.Object.Feature({
                fGeom: fGeom,                   //传入几何信息
                GraphicInfo: webGraphicsInfo,   //传入图形信息
                AttValue: attValue              //传入属性信息
            });
//          设置要素为点要素  1为点,2为线,3为区
            newFeature.setFType(1);

             <!--此处与添加点区别-->
//           设置需要更新点的OID
            newFeature.setFID(602);



//           创建一个要素集
            var featureSet = new Zondy.Object.FeatureSet();

//            清空要素集
            featureSet.clear();

//            给要素集添加数据结构
            featureSet.AttStruct = attStruct;

//            添加要素到数据集中
            featureSet.addFeature(newFeature);


//            创建编辑服务类
            var editService = new Zondy.Service.EditLayerFeature("gdbp://MapGisLocal/OpenLayerVecterMap/ds/世界地图经纬度/sfcls/主要城市",
                    {
                        ip: "127.0.0.1",//服务器ip
                        port: "6163"     //端口
                    });

//          更新要素集信息中并执行回调函数
            editService.update(featureSet,onSuccess);
        }

        function onSuccess(result) {
 //            如果更新成功则返回结果
            if (result) {
//                刷新地图
                map.baseLayer.redraw(true);
                alert("更新成功");//弹窗提示
            } else {
                alert("更新失败");//弹窗提示
            }

        }


    </script>
</head>


<body onload="init()">
<div>
    <input type="button" class="ButtonLib" value="更新点信息" onclick="updatePoint()">
</div>
<div id="map1"></div>
</body>
</html>
```