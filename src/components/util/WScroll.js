/*
1.顶部出现在可视区域事件
2.底部出现在可视区域事件
*/
;
//获得元素的可视高度 容器高度，不包括滚动条和边框，不传参数表示浏览器窗口的可视高度
function getClientHeight(_elem){
    if(!!_elem){
        return _elem.clientHeight;
    }else{
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }
};
//获得元素的可视高度 容器高度，包括滚动条和边框，不传参数表示浏览器窗口的可视高度
function getOffsetHeight(_elem){
    if(_elem){
        return _elem.offsetHeight;
    }else{
        return document.documentElement.offsetHeight || document.body.offsetHeight;
    }
};
//获得元素的内容高度，包括显示的内容和隐藏的内容，不传参数表示页面整个文档的高度
function getScrollHeight(_elem){
    if(_elem){
        return _elem.scrollHeight;
    }else{
        return document.documentElement.scrollHeight || document.body.scrollHeight;
    }
};

//获得元素距离父元素的顶端的距离
function getOffsetTop(_elem){
    return _elem.offsetTop;
};
//获得元素距离文档顶端的距离
function getOffsetToDoc(_elem){
	var offset = {top:0,left:0};
	do{
		offset.top += _elem.offsetTop;
		offset.left += _elem.offsetLeft;
	}while(_elem = _elem.offsetParent);
	return offset;
}
//获得元素中滚动条纵向滚动的距离，不传参数表示浏览器滚动条的纵向滚动距离
function getScrollTop(_elem){
    if(!!_elem){
        return _elem.scrollTop;
    }else{
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    }
};

//函数只执行一次,需复位才能执行下一次
function OneTimeFunction(fun){
	this.active = true;
	this.fun = fun;
	this.isfreeze = false;
	this.isVirtualScroll = false;
}

OneTimeFunction.prototype.callout = function(){
	if(this.isfreeze || this.isVirtualScroll) return;
	var t;
	this.active && typeof this.fun === 'function' && (t = this.fun.apply(arguments[arguments.length-1],arguments));
	this.active =false;
	return t;
}

OneTimeFunction.prototype.reset = function(){
	if(this.isfreeze) return ;
	this.active = true;
}
//冰冻当前对象,让callout 和 reset 执行
OneTimeFunction.prototype.freeze = function(){
	this.isfreeze = true;
}




//回调函数数组
//{active:true,callback}
var _callbacks = [],
	_wscrolls = [];

//判断一个js对象是否是DOM元素
 var isDOM =( typeof HTMLElement === 'object' ) ?
            function(obj){
                return obj instanceof HTMLElement;
            } :
            function(obj){
                return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
            }

//初始化滚动计数
function _initScroll(initScrollTop){
	var oldSTop = typeof initScrollTop === 'number' ? initScrollTop : 0,//旧的滚动距离
		oldDir = '';
	return function(scrollTop){
		var newSTop = typeof scrollTop === 'number' ? scrollTop : 0,//旧的滚动距离
			newDir = '',
			change = false;
		if(newSTop - oldSTop > 0) newDir =  'up';
		if(newSTop - oldSTop < 0) newDir =  'down';
		change = oldDir === '' ? false : oldDir !== newDir;
		oldSTop = newSTop;
		oldDir = newDir;
		return {
			dir:newDir,
			change:change
		};
	}
}

//监测页面上的某个元素相对于document的垂直滚动
/*
//回调函数的this都指向顶层
this.opts={
	topOffset:正值,正值表示超过浏览器底部才触发show
	show:fucntion(scrollTop){},
	bottomOffset:正值,表示超过浏览器顶部才出发hide
	hide:function(scrollTop){}
}
*/
export function WScroll(ele,opts){
	if(!isDOM(ele)){
		console.log("not avaliable dom element")
		return null;
	}
	this.ele = ele;
	this.getScrollDirection = _initScroll();
	this.offset = getOffsetToDoc(this.ele);
	this.clientHeight = getClientHeight(this.ele);
	this.docClientHeight = getClientHeight();

	//console.log("this.offset",this.offset);
	//console.log("this.clientHeight",this.clientHeight);
	//console.log("this.docClientHeight",this.docClientHeight);
	this.opts = opts;
	this.opts.up = this.opts.up || {};
	this.opts.down = this.opts.down || {};

	this.opts.topOffset = typeof this.opts.topOffset === 'number' ? Math.max(0,this.opts.topOffset) : 0 ;
	this.opts.bottomOffset = typeof this.opts.bottomOffset === 'number' ? Math.max(0,this.opts.bottomOffset) : 0 ;
	
	this.opts.up.topShowInB = new OneTimeFunction(this.opts.up.topShowInB);
	this.opts.up.bottomShowInB = new OneTimeFunction(this.opts.up.bottomShowInB);
	this.opts.up.topHideInT = new OneTimeFunction(this.opts.up.topHideInT);
	this.opts.up.bottomHideInT = new OneTimeFunction(this.opts.up.bottomHideInT);

	this.opts.down.topShowInT = new OneTimeFunction(this.opts.down.topShowInT);
	this.opts.down.bottomShowInT = new OneTimeFunction(this.opts.down.bottomShowInT);
	this.opts.down.topHideInB = new OneTimeFunction(this.opts.down.topHideInB);
	this.opts.down.bottomHideInB = new OneTimeFunction(this.opts.down.bottomHideInB);

	this.opts.down.topShowInT.active=false;
	this.opts.down.bottomShowInT.active=false;
	this.opts.down.topHideInB.active=false;
	this.opts.down.bottomHideInB.active=false;


	var _this = this;
	this.callback = {
		active:true,
		callback:function(scrollTop){
			var dir = _this.getScrollDirection(scrollTop);
			if(dir.dir === 'up'){
				//向上滚动,上边界出现在底部
				if(scrollTop > _this.offset.top - _this.docClientHeight + _this.opts.topOffset){
					//console.log("向上滚动,上边界出现在底部");
					if(!_this.opts.down.topHideInB.active){
						var t = _this.opts.up.topShowInB.callout(scrollTop,_this.ele);//
						_this.opts.down.topHideInB.reset();
						
						if(t !== undefined && t !==true)
							_this.opts.up.topShowInB.freeze();
					}
					

				}
				//向上滚动,上边界消失在顶部
				if(scrollTop > _this.offset.top + _this.opts.topOffset){
					//console.log("向上滚动,上边界消失在顶部");
					if(!_this.opts.down.topShowInT.active){
						var t = _this.opts.up.topHideInT.callout(scrollTop,_this.ele);
						_this.opts.down.topShowInT.reset();
						if(t !== undefined && t !==true) _this.opts.up.topHideInT.freeze();
							
					}
					
				}
				//向上滚动,下边界出现在底部
				
				if(scrollTop > _this.offset.top - _this.docClientHeight + _this.clientHeight + _this.opts.bottomOffset){
					//console.log("向上滚动,下边界出现在底部")
					if(!_this.opts.down.bottomHideInB.active){
						var t = _this.opts.up.bottomShowInB.callout(scrollTop,_this.ele);
						_this.opts.down.bottomHideInB.reset();
						if(t !== undefined && t !==true) _this.opts.up.bottomShowInB.freeze();
							
					}
					
				}

				//向上滚动,下边界消失在顶部
				if(scrollTop > _this.offset.top + _this.clientHeight + _this.opts.bottomOffset){
					//console.log("向上滚动,下边界消失在顶部")
					if(!_this.opts.down.bottomShowInT.active){
						var t = _this.opts.up.bottomHideInT.callout(scrollTop,_this.ele);
						_this.opts.down.bottomShowInT.reset();
						if(t !== undefined && t !==true) _this.opts.up.bottomHideInT.freeze();
							
					}
					
				}


			}else if(dir.dir === 'down'){
				//向下滚动,上边界出现在顶部
				if(scrollTop <= _this.offset.top + _this.opts.topOffset){
					//console.log("向下滚动,上边界出现在顶部");
					if(!_this.opts.up.topHideInT.active){
						var t = _this.opts.down.topShowInT.callout(scrollTop,_this.ele);
						_this.opts.up.topHideInT.reset();
						if(t !== undefined && t !==true) _this.opts.down.topShowInT.freeze();
							
					}
					
				}

				//向下滚动,上边界消失在底部
				if(scrollTop <= _this.offset.top - _this.docClientHeight + _this.opts.topOffset){
					//console.log("向下滚动,上边界消失在底部");
					if(!_this.opts.up.topShowInB.active){
						var t = _this.opts.down.topHideInB.callout(scrollTop,_this.ele);
						_this.opts.up.topShowInB.reset();//
						if(t !== undefined && t !==true) _this.opts.down.topHideInB.freeze();
							
					}
					
				}

				//向下滚动,下边界出现在顶部
				if(scrollTop <= _this.offset.top + _this.clientHeight + _this.opts.bottomOffset){
					//console.log("向下滚动,下边界出现在顶部");
					if(!_this.opts.up.bottomHideInT.active){
						var t = _this.opts.down.bottomShowInT.callout(scrollTop,_this.ele);
						_this.opts.up.bottomHideInT.reset();
						if(t !== undefined && t !==true) _this.opts.down.bottomShowInT.freeze();
							
					}
					
				}
				//向下滚动,下边界消失在底部
				if(scrollTop <= _this.offset.top - _this.docClientHeight + _this.clientHeight + _this.opts.bottomOffset){
					//console.log("向下滚动,下边界消失在底部")
					//console.log("向下滚动,下边界消失在底部",_this.opts.down.bottomHideInB.active);
					if(!_this.opts.up.bottomShowInB.active){
						var t = _this.opts.down.bottomHideInB.callout(scrollTop,_this.ele);
						_this.opts.up.bottomShowInB.reset();
						if(t !== undefined && t !==true) _this.opts.down.bottomHideInB.freeze();
							
					}
					
				}

			}	
		}
	};
	_callbacks.push(this.callback);
	_wscrolls.push(this);

}
//重新计算这个元素的offset 和 clientHeight 以及document的clientHeight
//建议在页面删除或者增加元素后,或者window.resize之后调用这个函数重新计算基准值
//读取元素和定位长度有关的属性都会引起reflow
WScroll.prototype.recount = function(){
	//当前的scrollTop
	var currentScrollTop = getScrollTop();
	this.offset = getOffsetToDoc(this.ele);
	this.ClientHeight = getClientHeight(this.ele);
	this.docClientHeight = getClientHeight();
	//console.log("recount");
	//console.log("this.offset",this.offset);
	//console.log("this.clientHeight",this.clientHeight);
	//console.log("this.docClientHeight",this.docClientHeight);
	this.isVirtualScroll  = true;//虚拟滚动,不触发callback事件

	//先滚动到0 
	this.callback.callback(0);
	//在滚动到当前
	this.callback.callback(currentScrollTop);
	this.isVirtualScroll = false;
	

}
//监听滚动事件
var handler = function(e){
	var docScrollTop = getScrollTop();
	//console.log("docScrollTop",docScrollTop);
	_callbacks.forEach(function(item,index){
		item.active && item.callback(docScrollTop);
	})
};
(function(){
	
	if(document.addEventListener){
	//DOM2 级别;
	console.log("2");
	window.addEventListener("scroll",handler);

	}else{
		//DOM0 级别
		window.attachEvent('onscroll',handler);
	}
	
	
})();


WScroll.allRecount = function(){
	_wscrolls.forEach(function(item,index){
		item.recount();
	})
}









