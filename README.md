# eazyDanmaku <a href="https://www.npmjs.com/package/eazyDanmaku"><img src="https://img.shields.io/npm/l/vue.svg?sanitize=true" alt="License"></a>


A Danmaku plugin for the web,一个用于web端的弹幕插件(支持``TypeScirpt``)

## 安装

``npm install easyDanmaku --save``

## 初始设置
### 弹幕初始化属性

|    属性           |       类型       |        值                            | 
| ---               |       ---       |       ---                             |
|  el               |      string     |  弹幕所挂载的父节点(弹幕将插入这个元素) |
|  wrapperStyle     |      string     |  所有弹幕初始样式                      |
|  line             |      number     |  弹幕行数(默认10行)                    |
|  speed            |      number     |  弹幕速度(默认5)(s)                    |
|  colourful        |      boolean    |  彩色弹幕(默认false)                   |
|  runtime          |      number     |  循环弹幕播放时长(s)                   |
|  loop             |      boolean    |  是否循环播放(默认false)               |
|  coefficient      |      number     |  弹幕密度系数(默认1.38)                |
|  hover            |      boolean    |  鼠标hover时是否暂停播放弹幕(默认false) |

### 弹幕事件

|    事件           |       参数                |        返回值     | 备注 |
| ---               |       ---                |       ---         | --- |
|   onComplete      |      void                 |     void          | 循环播放一轮或者批量弹幕插入完毕触发 |
|   onHover         |     所hover的dom对象  |      void         | 鼠标hover在弹幕上时触发  |
## 使用
**ps** : *可查阅包文件夹中的demo实例*
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
    import EazyDanmaku from 'eazyDanmaku';
    export default {
        //~~~
        mounted() {
            const Danmaku = new EazyDanmaku({
                el:'#container',//弹幕挂载节点
                colourful:true, //彩色弹幕
                line:10,        //弹幕行数
                wrapperStyle:'danmaku-wrapper', //默认弹幕样式
                speed:5,        //弹幕播放速度
                runtime:3, //播放一次的时常
                loop:true, //开启循环播放
                hover:true,//鼠标移入悬停
                onComplete:()=> { //播放结束
                    console.log('end');
                }, //hover时 参数为该悬停元素
                onHover:(dom) => {
                    console.log(dom);
                }
            })
            const data = ['danmaku1','danmaku2','danmaku3','danmaku4','danmaku5','danmaku6']
            //下面案例代码粘贴在此处
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
    Danmaku.send('123','danmaku-wrapper',(e)=>{
        alert('end!');
        console.log(e);
    })

```

<p id="batchsend">多次批量发送弹幕</p>

```javascript
    let set = new Set();
    setInterval( () => {
        for(let i = 0; i<10; i++) {
            set.add(Math.round(Math.random()*1000))
        }
                         //弹幕内容      是否包含头像   弹幕样式 
        Danmaku.batchSend(Array.from(set),false,'danmaku-wrapper');
        set.clear();
    },1000)

```

<p id="centeredsend">居中弹幕发送</p>

```javascript
    setTimeout(() => {
                           //弹幕内容  弹幕样式  持续时间(ms) 回调函数
        Danmaku.centeredSend('弹幕内容','danmaku-wrapper',1000,(e)=>{
            alert('end!');
            console.log(e);
        })
    },2000)

```

*有疑问可通过``1041138537@qq.com``联系我*
## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020-present, Peng Pan