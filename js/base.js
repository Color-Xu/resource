//列表内多图左右无缝循环滚动
var oneSlide=function(wrap,imgul,pre,next,t){
	var imgli=$(imgul).find('li');
	imgli.clone().appendTo(imgul);
	imgli=$(imgul).find('li');
	var	len=imgli.length;
	var	wd=imgli.eq(0).outerWidth(true);
	var	time=null;
	$(imgul).css('width',wd*len+'px');

	$(pre).click(function(){
		if(!$(imgul).is(':animated')){
			$(imgul).stop(false,true).animate({left:-wd},500,function(){
				$(this).children().eq(0).clone().appendTo(imgul);
				$(this).children().eq(0).remove();
				$(this).css('left','0px');
			});
		}
	});
	$(next).click(function(){
		if(!$(imgul).is(':animated')){
			$(imgul).css({left:-wd});
			$(imgul).children().last().clone().prependTo(imgul);
			$(imgul).children().last().remove();
			$(imgul).stop(false,true).animate({left:'0px'});
		}
	});
	if(t=='false'){
		clearInterval(time);
	}else{
		time=setInterval("$("+"'"+pre+"'"+").click()",t);
	}
	$(wrap).hover(function(){
			console.log('停止');
			clearInterval(time);	
	},function(){
			time=setInterval("$("+"'"+pre+"'"+").click()",t);
			console.log('开始')	;	
	});
};

//列表内多图左右无缝循环滚动第二种方案
var oneSlide2=function(wrap,imgul,pre,next,t){
	var imgli=$(imgul).find('li');
		len=imgli.length;
		wd=imgli.eq(0).outerWidth(true);
		time=null;
	$(imgul).css('width',wd*len+'px');

	$(pre).click(function(){
		$(imgul).stop(true,true).animate({'margin-left':-wd},function(){
			$(imgul).children().eq(0).appendTo(imgul);
			$(imgul).css('margin-left','0px');
		});
	});
	$(next).click(function(){
		$(imgul).css('margin-left',-wd);
		$(imgul).find('li:last').prependTo(imgul);
		$(imgul).stop(true,true).animate({'margin-left':0},function(){			
			
		});
	});
	if(t=='false'){
		clearInterval(time);
	}else{
		time=setInterval("$("+"'"+pre+"'"+").click()",t);
	}
	$(wrap).hover(function(){
			clearInterval(time);	
	},function(){
			time=setInterval("$("+"'"+pre+"'"+").click()",t);	
	});
};

//轮播
function carousel(pid, imgul, cir, pre, next, curr, t) {
	var index = 0;
		time = null;
		imgli = $(imgul).find('li');
		len = imgli.length;
		wd = imgli.width();
	$(imgul).width(wd * len);
	//自动添加位置图标cir
	var cirhtml = '<li></li>';
	if (!$(cir).find('li').length > 0) {
		for (var i = 0; i < len - 1; i++) {
			cirhtml += '<li></li>';
		}
		$(cir).append(cirhtml);
	}
	var cirli = $(cir).find('li');
	//鼠标移上cir切换
	cirli.hover(function() {
		index = cirli.index(this);
		move(index);
	}, function() {
		cirli.stop();
	}).eq(0).trigger('mouseover');

	//上一页按钮
	$(pre).click(function() {
		index--;
		if (index == -1) {
			index = len - 1;
		}
		move(index);
	});
	//下一页按钮
	$(next).click(function() {
		index++;
		if (index == len) {
			index = 0;
		}
		move(index);
	});
	//初始化自动
	time = setInterval(function() {
		index++;
		if (index == len) {
			index = 0;
		}
		move(index);
	}, t);
	//鼠标滑进焦点图时停止自动播放
	$(pid).mouseenter(function() {
		clearInterval(time);
	}).mouseleave(function() {
		clearInterval(time);
		time = setInterval(function() {
			index++;
			if (index == len) {
				index = 0;
			}
			move(index);
		}, t);
	});
	//t为false不设置自动播放
	if (t == false) {
		clearInterval(time);
		$(pid).mouseenter(function() {
			clearInterval(time);
		}).mouseleave(function() {
			clearInterval(time);
		});
	}
	//动画主体事件
	function move() {
		$(imgul).stop(true, true).animate({
			left: -index * wd
		});
		cirli.eq(index).addClass(curr).siblings().removeClass(curr);
	}
}