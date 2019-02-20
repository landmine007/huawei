$(function(){
	var moveX,moveY;
	$('.h li img').bind('click',change);
//	划片移动
	$('.big img').bind('mousemove',zoon);
	$('.zoon').bind('mousemove',zoon);
//	$('.zoon').show();
//	$('.big_r').bind('mousemove',big_r);
//	$('.big_r').show();
	
	function zoon(e){
	if(e.pageY-50>=0 && e.pageY+50<=450){
		moveY=e.pageY-50;}
//		鼠标中间位置,边界处理
		if(e.pageX-50>=0 && e.pageX+50<=450){
		moveX=e.pageX-50;}
		$(".zoon").css({top:moveY,left:moveX});
	$('.big_r img').css({top:-moveY*.9,left:-moveX*.9})	
	}
//	切换小图片
	function change(){
	$(".h li img").css({borderColor:'#fff'});
	var $src=$(this).prop('src');
	var $big_r=$src.split('ul_');
//	console.log($big_r);
//	console.log($big_r.join(''));
//	$('.big_r img').prop('src')
	$('.big img:first').prop('src',$big_r.join(''));
	$('.big_r img:first').prop('src',$big_r.join(''));
	}
});
//$('.big img').bind('mouseout',zoon);
//	$('.zoon').bind('mouseout',zoon);
//	$('.zoon').hide();
//	$('.big_r').bind('mouseout',big_r);
//	$('.big_r').hide();