/*!
 * eazyDanmuku v1.0.0
 * (c) 2020 Peng Pan
 * @license MIT
 */
/**
 *  @class eazyDanmuku
 *  @param { object }params
 *  {
 *      //弹幕初始化属性
 *      el:DOM,                //父容器 | danmaku Parent container
 *      wrapperStyle:string,   //弹幕样式 | danmaku style
 *      line :number           //弹幕行数(默认10行) | danmaku lines(default ten line)
 *      speed:number           //弹幕速度(默认5) | danmaku speed(default five 5)
 *      colourful:boolean      //彩色弹幕(默认false) | colourful danmaku(default false) 
 *      runtime:number         //播放时长 | running time
 *      loop:boolean           //是否循环播放 |whether  loop play
 *      coefficient:number     //弹幕密度系数(默认1.38) | danmaku Density factor
 *      hover:boolean          //鼠标hover时是否暂停播放弹幕 | mouse hover pause the danmaku
 *      //弹幕事件
 *      onComplete:function    //批量弹幕播放完后 | When the danmaku ends
 *      onHover:function       //鼠标悬停
 *  }
 *  @version 1.0.0
 */
class eazyDanmaku {
    constructor(params) {
        this.container = this.checkParams(params);                       //弹幕容器 | danmaku Parent container
        this.wrapperStyle = params.wrapperStyle || null;                 //弹幕样式 | danmaku style
        this.line = params.line || 10;                                   //弹幕总行数 | danmaku lines(default ten line)
        this.speed = params.speed || 5;                                  //单条弹幕速度 | danmaku speed(default five 5)
        this.runtime = params.runtime || 10;                             //弹幕列表播放时长,单位为秒 | running time
        this.colourful = params.colourful || false;                      //彩色弹幕 | colourful danmaku(default false) 
        this.loop = params.loop || false;                                //是否循环播放 | loop play
        this.hover = params.hover || false;                              //鼠标悬停是否暂停 | hover pause
        this.originIndex = 0;                                            //弹幕列表起始下标 | danmaku Density factor
        this.originList = null;                                          //备用列表  | Alternate list
        this.offsetValue = this.container.offsetHeight / this.line;      //弹幕排列偏移量 | danmaku offsetValue
        this.vipIndex = 0;                                               //vip弹幕下标 | vip danmaku subscript
        this.coefficient = params.coefficient|| 1.38;                    //同时刻弹幕系数  | danmaku Density factor
        this.overflowArr=[];                                             //溢出队列  | danmaku overflow Array
        this.clearIng = false;                                           //是否正在处理溢出弹幕 | whether  handle overflow danmaku
        this.init();
        this.handleEvents(params);                                       //事件注册 | handle Event
    }
    /**
     * @description 事件注册
     * @param {object} params 事件
     */
    handleEvents (params){
        this.onComplete = params.onComplete || null;
        this.onHover = params.onHover || null;
    }
    /**
     * @description eazyDanmaku初始化 设置弹幕容器基础样式，初始化弹幕赛道
     */
    init(){
        this.aisle = [];
        this.container.style.overflow = 'hidden';
        
        if(this.hover)this.handleMouseHover();
        if(this.getStyle(this.container,'position') !== 'relative' && this.getStyle(this.container,'position') !== 'fixed' ){
            this.container.style.position = 'relative';
        }
        for (let i = 0; i < this.line; i++) {
            this.aisle.push({
                normalRow: true,
                vipRow: true
            });
        }
    }
    /**
     * 类型校验
     * @param {object} 初始化参数
     * @returns {HTMLElement} 弹幕容器 
     */
    checkParams(params){
        if(!document.querySelector(params.el))throw `Could not find the ${params.el} element`
        if(params.wrapperStyle && typeof params.wrapperStyle !== 'string')throw `The type accepted by the wrapperStyle parameter is string`
        if(params.line && typeof params.line !== 'number')throw `The type accepted by the line parameter is number`
        if(params.speed && typeof params.speed !== 'number')throw `The type accepted by the speed parameter is number`
        if(params.colourful && typeof params.colourful !== 'boolean')throw `The type accepted by the colourful parameter is boolean`
        if(params.runtime && typeof params.runtime !== 'number')throw `The type accepted by the runtime parameter is number`
        if(params.loop && typeof params.loop !== 'boolean')throw `The type accepted by the loop parameter is boolean`
        if(params.coefficient && typeof params.coefficient !== 'number')throw `The type accepted by the coefficient parameter is number`
        if(params.hover && typeof params.hover !== 'boolean')throw `The type accepted by the hover parameter is boolean`
        if(params.onComplete && typeof params.onComplete !== 'function')throw `The type accepted by the onComplete parameter is function`
        if(params.onHover && typeof params.onHover !== 'function')throw `The type accepted by the onHover parameter is function`
        return document.querySelector(params.el)
    }
    /**
     * @description 获取元素样式 (内部使用)
     * @param {string} el 获取样式的节点 
     * @param {string} attr 获取的样式名
     */
    getStyle(el,attr){
        return window.getComputedStyle(el,null)[attr];
    }
    /**
     * @param {string} content 弹幕内容
     * @param {string} normalClass 弹幕默认样式
     * @param {function} callback 弹幕播放结束后的回调函数 @returns {object} 本条弹幕的一些基本信息
     * @description 单条弹幕发送 批量弹幕使用batchSend方法(对外)
     */
    send(content, normalClass=null,callback=null) {
        if(content.length<1)return
        let sheet = document.createElement('div');
        let index = 0;
        let speed = this.speed;
        let timer = null;
        let origin = 0;
        sheet.innerHTML = content;
        sheet.style.display = 'inline-block';
        sheet.classList.add('default-style')
        if (normalClass || this.wrapperStyle){
            sheet.classList.add(normalClass || this.wrapperStyle);
        }
        containerAppendChild.call(this);
        function containerAppendChild() {
            index = Math.round( Math.random() * (this.line - 1) );
            if (this.aisle[index].normalRow) {
                this.aisle[index].normalRow = false;
                this.container.appendChild(sheet);
                speed += sheet.offsetWidth / sheet.parentNode.offsetWidth * 2;
                sheet.style.cssText = `
                    text-align:center;
                    min-width:130px;
                    will-change: transform;
                    position:absolute;
                    right: -${sheet.offsetWidth+130}px;
                    transition: transform ${speed}s linear;
                    transform: translateX(-${sheet.parentNode.offsetWidth + sheet.offsetWidth + 130}px);
                    top: ${index * this.offsetValue}px;
                    line-height:${this.offsetValue}px;
                    color:${this.colourful?'#'+('00000'+(Math.random()*0x1000000<<0).toString(16)).substr(-6):void(0)}
                `
                //开启弹幕通道
                let unit = (sheet.parentNode.offsetWidth + sheet.offsetWidth) / speed / 60;
                timer = setInterval(()=>{
                    origin += unit;
                    if(origin > sheet.offsetWidth * this.coefficient){
                        this.aisle[index].normalRow = true;
                        clearInterval(timer);
                    }
                },16.66)

                // 删除已播放弹幕
                setTimeout(() => {
                    if(sheet.getAttribute('relieveDel') == 1)return
                    if(callback)callback({
                        runtime:speed,
                        target:sheet,
                        width:sheet.offsetWidth
                    });
                    sheet.remove();
                }, speed * 1000);
            }
            else {
                // 重新选择通道
                let some = this.aisle.some(item => item.normalRow === true);
                some ? containerAppendChild.call(this)  : (()=>{
                    this.overflowArr.push({
                        content,
                        normalClass
                    });
                    if(!this.clearIng){
                        //开始清理溢出弹幕
                        this.clearOverflowDanmakuArray();  
                    }
                })() 
            }
        }
    }
    /**
     * @description 批量发送弹幕 (对外)
     * @param {Array} list
     * @param {Boolean} hasAvatar 是否包含头像
     * @param {string} normalClass 此批弹幕样式
     */
    batchSend(list,hasAvatar = false,normalClass=null) {
        this.runtime = list.length * 1.23;
        this.originList = list;
        let timer = setInterval(()=>{
            if(this.originIndex>list.length-1){
                clearInterval(timer);
                this.originIndex = 0;
                if(this.onComplete) this.onComplete();
                if(this.loop) this.batchSend(this.originList);
            }else{
                if(hasAvatar){
                    this.send(`<img src=${list[this.originIndex].avatar}>
                        <p>${list[this.originIndex].content}</p>
                    `,normalClass || this.wrapperStyle);
                }else{
                    this.send(list[this.originIndex],normalClass||this.wrapperStyle);
                }
                this.originIndex++;
            }
        },this.runtime / list.length * 1000)
    }

    /**
     * @description 居中发送弹幕 （对外）
     * @param {string} content 
     * @param {string} normalClass
     * @param {number} duration
     * @param {function} callback
     */
    centeredSend(content, normalClass,duration = 3000,callback = null) {
        
        let sheet = document.createElement('div');
        let index = 0;
        sheet.innerHTML = content;
        if (normalClass || this.wrapperStyle){
            sheet.classList.add(normalClass || this.wrapperStyle);
        }
        containerAppendChild.call(this);

        function containerAppendChild(){
            if(this.aisle[index].vipRow){
                this.container.appendChild(sheet);
                sheet.style.cssText = `
                    position:absolute;
                    left:50%;
                    transform:translateX(-50%);
                    top: ${index * this.offsetValue}px;
                `
                this.aisle[index].vipRow = false;
                setTimeout(()=>{
                    if(callback)callback({
                        duration:duration,
                        target:sheet,
                        width:sheet.offsetWidth
                    });
                    sheet.remove();
                    this.aisle[index].vipRow = true;
                },duration)

            }else{

                index++;
                if(index > this.line - 1) return
                containerAppendChild.call(this);
            }
        }
        
    }
    /**
     * @description 事件委托（内部使用）
     * @param {string}   parent 被事件委托对象
     * @param {string}   childClassName  事件委托的对象类名
     * @param {string}   EventName  所委托的事件名
     * @param {function} callBackFn 触发事件的回调(e:触发事件的元素)
     */
    eventDelegation(parent,childName,EventName,callBackFn){
        parent.addEventListener(EventName, (e) => {
            const containerDom = e.target;
            if(containerDom.className.includes(childName)){
                callBackFn(containerDom)
            }
        })
    }
    /**
     * @description 鼠标移入悬停
     */
    handleMouseHover() {
        const reg = /-(\S*),/;
        this.eventDelegation(this.container,'default-style','mouseover',(activeDom)=>{
            const translateX = this.getStyle(activeDom,'transform').match(reg)[1];
            activeDom.style['transition'] = 'transform 0s linear';
            activeDom.style['transform'] = `translateX(-${translateX}px)`;
            activeDom.setAttribute('relieveDel',1);
            if(this.onHover)this.onHover(activeDom)
        })
        this.eventDelegation(this.container,'default-style','mouseout',(activeDom)=>{
            clearTimeout(activeDom.timer)
            const translateX = this.getStyle(activeDom,'transform').match(reg)[1];
            activeDom.style['transition'] = `transform ${this.speed}s linear`;
            activeDom.style['transform'] = `translateX(-${activeDom.parentNode.offsetWidth + parseInt(translateX) + activeDom.offsetWidth + 130}px)`;
            activeDom.timer = setTimeout(() => {
                activeDom.remove();
            }, this.speed * 1000);
        })
    }

    /**
     * @description 内部方法 用于处理溢出弹幕
     */
    clearOverflowDanmakuArray() {
        this.clearIng = true;
        let timerLimit = 0;
        const timer = setInterval(()=>{
            if(this.overflowArr.length === 0){
                timerLimit ++;
                
                if(timerLimit > 20){
                    // 无新入溢出弹幕关闭清理
                    clearInterval(timer);
                    this.clearIng = false;
                }
            }else{
                this.send(this.overflowArr[0].content,this.wrapperStyle);
                this.overflowArr.shift();
            }
        },500)
    }
}

export default eazyDanmaku