//2016.4.28 
//1.解决类名的兼容函数
//classname: 所要找的类名
//father: 通过父元素来找这个类名
function getClass(classname,father){//兼容函数
    father=father||document;
    //1. 判断浏览器
    if(father.getElementsByClassName){//条件为真时，代表就是FF和chrome
        return father.getElementsByClassName(classname);
    }else{//条件为假时，代表是IE
      //ID  Tag  name
      var all=father.getElementsByTagName("*");//所有的
      /*[<html></html>,<head></head>,<body></body>,<div class="box"></div>,<div class="one">111</div>,<div class="one">222</div>,<div class="one">333</div>]*/
      var newarr=[];
      //遍历数组
      for (var i = 0; i < all.length; i++) {
      	//"one fi".split()["one","fi"]  "one"
      	  //if(all[i].className==classname){//如果条件相等，表示找见
      	  if(checkRep(all[i].className,classname)){
            newarr.push(all[i]);
      	  }
      };
      return newarr;
    }
  }
  function checkRep(str,classname){//"two one three" "one"  ["two","fi","three"]  判断str与classname是否一样
    var arr=str.split(" ");//以空格做分隔符转换数组
    for(var i in arr){//遍历数组
    	if(arr[i]==classname){//判断元素与classname是否相同，相同时返回true
    		return true;
    	}
    }
    return false;// 所有比较以后，没有找到返回false
  }



// ************************************************************
 // 2016.5.3
 // 2纯文本的兼容函数
 //obj:对象
 //val:要设置的内容(纯文本)
function getText(obj,val){
  if (val!=undefined) {//val有值，表示要设置
    if (obj.textContent) {
      obj.textContent=val;
    }else{
       obj.innerText=val;
    }
  }  
else{
  // val没有值，表示获取

    if (obj.textContent) {
      return obj.textContent;
    }else{
       return innerText;
    }
}
}
// ***********************************************************
// 对象属性
// obj:对象；
// attr:"属性"
function getStyle (obj,attr) {
  if (obj.currentStyle) {
    return parseInt(obj.currentStyle[attr]);
  } else{
    return parseInt(getComputedStyle(obj,null)[attr]);
  };
}
// ************************************************************
// 2016年5月5日
// 获取元素的兼容函数
// *$(".box")
// *$("#box")
// *$("li")
// selector表示选择器，与css的选择器一样
// father 通过父容器
function $(selector,father){
    // 给父容器设置默认值
    father=father||document;
    // 对selector做判断
    if (typeof selector=="string") {
    //判断是否是字符串
      selector=selector.replace(/^\s*|\s*$/g,"")
      //去除字符串中左右空格
      if (selector.charAt(0)==".") {
        //条件为真时，字符串为真
       return getClass(selector.slice(1),father)

      }else if(selector.charAt(0)=="#"){
        return father.getElementById(selector.slice(1))
      }else if (/^[a-zA-Z1-6]{1,6}$/.test(selector)) {
        //标签名
        return father.getElementsByTagName(selector);
        };
    }else if (typeof selector=="function") {
      // 是一个函数，执行window.onload事件
      window.onload=function(){
        selector();
      }
    };
}
/***************************************************/
//2016.5.6
//5.获取子元素的兼容函数
function getChild(father,type){
  type=type||"a";
  var all=father.childNodes;
  var arr=[];
  for (var i = 0; i < all.length; i++) {
      if(type=="a"){
        if(all[i].nodeType==1){
        arr.push(all[i]);
      }
    }else if(type=="b"){
      if(all[i].nodeType==1 || all[i].nodeValue.replace(/^\s*|\s*$/g,"")!="" && all[i].nodeType==3){
        arr.push(all[i]);
      }
    }
    
  };
  return arr;
}
//6.获得子节点中的最后一个
function getFirst(father){
  return getChild(father)[0];
}
//7.获得子节点中的最后一个
function getLast(father){
  return getChild(father)[getChild(father).length-1];
}
//8.通过指定下标来获得子节点中的一个
function getNum(father,type,num){
  return getChild(father,type)[num];
}
/*******************************************************/
//2016.5.7
//9.获取上一个兄弟节点的兼容函数
//obj:一个元素节点
function getUp(obj){
  var up=obj.previousSibling;//上一个null
  if(up==null){
    return false;
  }
  while(up.nodeType==8 || (up.nodeType==3 && up.nodeValue.replace(/^\s*|\s*$/g,"")=="")){
    //条件满足时，接着再找(条件为注释节点或者字本节点中为空字符串时，条件满足)
      up=up.previousSibling;
        if(up==null){
      return false;
    }
  }
  return up;
}
/*******************************************************/
//2016.5.7
//10.获取下一个兄弟节点的兼容函数
//obj:一个元素节点
function getNext(obj){
  var next=obj.nextSibling;
   if(next==null){
    return false;
  }
  while(next.nodeType==8 || (next.nodeType==3 && next.nodeValue.replace(/^\s*|\s*$/g,"")=="")){
      next=next.nextSibling;
        if(next==null){
      return false;
    }
  }
  return next;
}
/*******************************************************/
//2016.5.7
//11.插入到某个对象之后
function insertAfter(father,newNode,obj){
  var next=getNext(obj);
  if(next){
    father.insertBefore(newNode,next);
   }else{
    father.appendChild(newNode);
   }
}
/*******************************************************/
//2016.5.9
//12.事件绑定的兼容函数
function addEvent(obj,event,fun){
   if(obj.addEvent){//IE
      obj.addEvent("on"+event,function(){
        fun.call(obj);
      })
   }else{
    obj.addEventListener(event,fun,false);
   }
}
/*******************************************************/
//2016.5.9
//13.解除绑定事件
function deleteEvent(obj,event,fun){
   if(obj.detachEvent){//IE
      obj.detachEvent("on"+event,function(){
        fun.call(obj);
      })
   }else{//FF
    obj.removeEventListener(event,fun,false);
   }
}
/*******************************************************/
//2016.5.9
//14.滚轮事件
function mouseWheel(obj,up,down){
  if(obj.attachEvent){
  obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
  }else if(obj.addEventListener){
  obj.addEventListener("mousewheel",scrollFn,false);
  //chrome,safari -webkit-
  obj.addEventListener("DOMMouseScroll",scrollFn,false);
  //firefox -moz-
  }
  function scrollFn(e){
    var ev=e||window.event;
    var val=ev.detail||ev.wheelDelta;
    if (ev.preventDefault ){ev.preventDefault()}//阻止默认浏览器动作(W3C)
      else{ev.returnValue = false;
          }//IE中阻止函数器默认动作的方式
    if(val==-3||val==120){
      if(up){
        up();
      }
    }else if(val==3||val==-120){
       if(down){
        down();
      }    
    }
  }
}
/********************************/
//15.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/