$(function(){
	/*轮播图*/
	var index = 0;
	var timer = setInterval(autoPlay,3000);
	function autoPlay(){
		index++;
		$("#box > li").eq(index).fadeIn(500).siblings().fadeOut(500);
		$("#nav_ol > li").eq(index).addClass("current").siblings().removeClass("current");
		if (index == $("#box > li").length - 1) {
			index = -1;
		}
	};
	$("#banner").hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval(autoPlay,3000);
	})
	$("#nav_ol > li").mouseenter(function(){
		index = $(this).index() - 1;
		autoPlay();
	});
	$(".prev").click(function(){
		if (index == 0) {
			index =7;
		}else{
			index--;
		};
		$("#box > li").eq(index).fadeIn(500).siblings().fadeOut(500);
		$("#nav_ol > li").eq(index).addClass("current").siblings().removeClass("current");
	});
	$(".next").click(function(){
		autoPlay();
	});
	/*轮播图旁选项卡*/
	$("#category-block > ul > li >span").mouseenter(function(){
	$(this).parent().parent().css("border-radius","10px 0 0 10px").css("opacity","1");
		$("#xx > li").eq($(this).parent().index()).show();
	}).mouseleave(function(){
		$(this).parent().parent().css("border-radius","10px").css("opacity","0.95");
		$("#xx > li").eq($(this).parent().index()).hide();
	});
	$("#xx > li").hover(function(){
		$("#category-block > ul").css("border-radius","10px 0 0 10px").css("opacity","1");
		$(this).show();
	},function(){
		$("#category-block > ul").css("border-radius","10px").css("opacity","0.95");
		$(this).hide();
	})
	
	
	/*公告*/
	var ggIndex = 0;
	var ggTimer = setInterval(ggAuto,2000);
	function ggAuto(){
		if (ggIndex == 5) {
			$(".p-notice-list").css("top","0");
			ggIndex = 1;
		} else{
			ggIndex++;
		}		
		$(".p-notice-list").animate({
			top:-ggIndex*43
		})
	}
	$(".p-notice-list").hover(function(){
		clearInterval(ggTimer);
	},function(){
		ggTimer = setInterval(ggAuto,2000);
	})
	
	
	
	/*精品推荐*/
	var jptjIndex = 0;
	$(".jptj_next").click(function(){
		if (jptjIndex != 4) {
			jptjIndex++;	
			$(".jptj_prev").show();
		}
		$(".grid-list").animate({
			left : -jptjIndex*1210
		})
		if (jptjIndex == 4) {		
			$(this).hide();
		}
	})
	$(".jptj_prev").click(function(){
		if (jptjIndex != 0) {
			jptjIndex--;
			$(".jptj_next").show();
		}
		$(".grid-list").animate({
			left : -jptjIndex*1210
		})
		if (jptjIndex == 0) {		
			$(this).hide();
        }
    })
});