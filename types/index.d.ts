/* interface easyDanmakuOption{
    el:string              
    wrapperStyle?:string   
    line?:number           
    speed?:number          
    colourful?:boolean     
    runtime?:number        
    loop?:boolean          
    coefficient?:number    
    hover?:boolean         
    //弹幕事件
    onComplete?:()=>void   
    onHover?:(dom:HTMLElement)=>void
} */

declare class easyDanmaku{
    constructor(params: {
        el:string              //父容器 | danmaku Parent container
        wrapperStyle?:string    //弹幕样式 | danmaku style
        line?:number            //弹幕行数(默认10行) | danmaku lines(default ten line)
        speed?:number           //弹幕速度(默认5) | danmaku speed(default five 5)
        colourful?:boolean      //彩色弹幕(默认false) | colourful danmaku(default false) 
        runtime?:number         //播放时长 | running time
        loop?:boolean           //是否循环播放 |whether  loop play
        coefficient?:number     //弹幕密度系数(默认1.38) | danmaku Density factor
        hover?:boolean          //鼠标hover时是否暂停播放弹幕 | mouse hover pause the danmaku
        //弹幕事件
        onComplete?:()=>void    //批量弹幕播放完后 | When the danmaku ends
        onHover?:(dom:HTMLElement)=>void//鼠标悬停
    });
    public send<T>(content: T, normalClass?: string,callback?: Function): void;

    public batchSend<T>(list: T[],hasAvatar?: boolean,normalClass?: string): void;
    
    public centeredSend<T>(content: T, normalClass?: string, duration?: number, callback?: Function): void;
    
    private handleEvents(params:Function): void;

    private init(): void;

    private getStyle(el: HTMLElement,attr: string): void;

    private eventDelegation(parent: HTMLElement,childName: string, EventName: string,callBackFn: Function): void;
    
    private handleMouseHover(): void;

    private clearOverflowDanmakuArray(): void;
}

export default easyDanmaku;
  