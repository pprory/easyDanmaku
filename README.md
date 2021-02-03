# easyDanmaku <a href="https://www.npmjs.com/package/easyDanmaku"><img src="https://img.shields.io/npm/l/easy-danmaku-js" alt="License"></a>   <img src="https://img.shields.io/npm/types/easy-danmaku-js"></a>

## 介绍
A Danmaku plugin for the web,一个用于web端的弹幕插件
## 特点
支持``TypeScript``、使用简单、使用css3过渡动画实现，弹幕流畅不卡顿、核心代码压缩后仅7kb。
## 安装
1. LINK
```html
<!-- 未压缩 -->
<script src="https://pprory.github.io/easyDanmaku/demo/easy-Danmaku.js"></script>
<!-- 压缩后编译成es5版本 -->
<script src="https://pprory.github.io/easyDanmaku/demo/easy-Danmaku.min.js"></script>
```
2. NPM
```sh 
$  npm install easy-danmaku-js --save
```
### Demo[预览地址](https://pprory.github.io/easyDanmaku/demo/index.html)
</br>

### 弹幕初始化属性

|    属性           |       类型       |        说明                      |默认值|
| ---               |       ---       |       ---                   |     --          |
|  el               |      string     |  弹幕所挂载的父节点          |      -          |
|  wrapperStyle     |      string     |  所有弹幕初始样式            |   default-style |
|  line             |      number     |  弹幕行数                   |        10        |
|  speed            |      number     |  弹幕速度                   |        5         |
|  colourful        |      boolean    |  彩色弹幕                   |      false       |
|  runtime          |      number     |  循环弹幕播放时长           |        10         |
|  loop             |      boolean    |  是否循环播放               |       false       |
|  coefficient      |      number     |  弹幕密度系数               |       1.38        |
|  hover            |      boolean    |  鼠标hover时是否暂停播放弹幕 |       false       |

### 弹幕事件

|    事件           |       回调参数                |        返回值     | 说明 |
| ---               |       ---                |       ---         | --- |
|   onComplete      |      void                 |     void          | 循环播放一轮或者批量弹幕插入完毕触发 |
|   onHover         |     所hover的dom对象  |      void         | 鼠标hover在弹幕上时触发  |

### 弹幕方法
| 方法名  | 说明         |      参数                  | 例子 |
| --     |  --          |              --              | -- |
|  send  |  发送单条弹幕(弹幕内容可用HTML标签包裹使用data-**标识特定数据) |    弹幕内容,弹幕样式,回调函数        |  send('内容','container-style',function(e){})  |
|  centeredSend  |  发送居中弹幕 |   弹幕内容, 弹幕样式, 持续时间(ms), 回调函数     |centeredSend('内容','container-style',3000,function(e){})|
|  batchSend  |  发送批量弹幕(不包含头像)  | 弹幕内容数组例,是否包含头像,默认样式   | batchSend(['内容一','内容二'],false,'container-style')   |
|  batchSend  |  发送批量弹幕(包含头像)  | 弹幕内容数组例,是否包含头像,默认样式   | batchSend([{avatar:url,content:'弹幕内容'}],true,'container-style')   |
|  play  |   播放屏幕中所有弹幕     |-|-|
|  pause  |  暂停屏幕中所有弹幕     |-|-|
</br>

## 例子
**ps** : *更多细节可查阅包文件夹中的demo*
### 在Vue中使用(React,Angular中使用方式类似)
- [循环播放](#loop)
- [发送单条弹幕](#sendasingle)
- [多次批量插入](#batchsend)
- [居中弹幕](#centeredsend)

<p id="loop">循环播放</p>

```html
<template>
    <div id='container'></div>
</template>
<script>
    import easyDanmaku from 'easy-danmaku-js';
    export default {
        //~~~
        mounted() {
            const Danmaku = new easyDanmaku({
                el:'#container',                        //弹幕挂载节点
                colourful:true,                         //彩色弹幕
                line:10,                                //弹幕行数
                wrapperStyle:'danmaku-wrapper',         //默认弹幕样式
                speed:5,                                //弹幕播放速度
                runtime:3,                              //播放一次的时常
                loop:true,                              //开启循环播放
                hover:true,                             //鼠标移入悬停
                onComplete:()=> {                       //播放结束
                    console.log('end');
                },                                      //hover时 参数为该悬停元素
                onHover:(dom) => {
                    console.log(dom);
                }
            })
            const data = ['danmaku1','danmaku2','danmaku3','danmaku4','danmaku5','danmaku6']
            Danmaku.batchSend(data)
        }
        // ~~~
    };
</script>
<style>
#container{
    width:600px;
    height:400px;
    margin:0 auto;
}
.danmaku-wrapper{
    background: greenyellow;
    border-radius: 8px;
}
</style>
```


<p id="sendasingle">发送单条弹幕</p>

```javascript
    // 弹幕内容, 弹幕样式, 回调函数
    Danmaku.send('弹幕内容','danmaku-wrapper',(e)=>{
        alert('end!');
        console.log(e);
    })

```

<p id="batchsend">多次批量发送弹幕</p>

```javascript
    const Danmaku2 = new EasyDanmaku({
        el:'#container2',
        colourful:true,
        line:10,
        wrapperStyle:'danmaku-wrapper',
        speed:3,
        hover:true,
        onComplete:function(){
            console.log('单次批量弹幕插入完毕');
            send();
        }
    })
    function send(){
        const data = ['danmaku1','danmaku2','danmaku3','danmaku4','danmaku5','danmaku6']
        Danmaku2.batchSend(data)
    }
    send();

```

<p id="centeredsend">居中弹幕发送</p>

```javascript
    Danmaku.centeredSend('弹幕内容','danmaku-wrapper',1000,(e)=>{
        alert('end!');
        console.log(e);
    })

```
---

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020-present, Peng Pan
