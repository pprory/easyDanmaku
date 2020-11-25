interface eazyDanmakuParameters{
    el:HTMLElement,        //父容器 | danmaku Parent container
    wrapperStyle:string,   //弹幕样式 | danmaku style
    line:number            //弹幕行数(默认10行) | danmaku lines(default ten line)
    speed:number           //弹幕速度(默认5) | danmaku speed(default five 5)
    colourful:boolean      //彩色弹幕(默认false) | colourful danmaku(default false) 
    runtime:number         //播放时长 | running time
    loop:boolean           //是否循环播放 |whether  loop play
    coefficient:number     //弹幕密度系数(默认1.38) | danmaku Density factor
    hover:boolean          //鼠标hover时是否暂停播放弹幕 | mouse hover pause the danmaku
    //弹幕事件
    onComplete:function    //批量弹幕播放完后 | When the danmaku ends
    onHover:function       //鼠标悬停
}

declare class EazyDanmaku<eazyDanmakuParameters>{
    
    constructor(params: eazyDanmakuParameters);
    
    public send<T>(content: T, normalClass: string,callback: function): void;

    public batchSend(list: array,hasAvatar: boolean,normalClass: string): void;
    
    public centeredSend<T>(content: T, normalClass: string, duration: number, callback: function): void;
    
    private handleEvents(params:function): void;

    private init(): void;

    private getStyle(el: HTMLElement,attr: string): void;

    private eventDelegation(parent: HTMLElement,childName: string, EventName: string,callBackFn: function): void;
    
    private handleMouseHover(): void;

    private clearOverflowDanmakuArray(): void;
}