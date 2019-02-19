$(function(){
	/*返回顶部按钮*/
	$(window).scroll(function(e){
		var top = parseInt($(this).scrollTop());
		if ( top > "500") {
			$(".hungBar-top").css("display","block");
			
		} else{
			$(".hungBar-top").hide();
		}
	})
	$(".hungBar-top").click(function(){
		var topTimer = setInterval(function(){
			var top = parseInt($("body,html").scrollTop());
			if (top > 0) {
				$("body,html").scrollTop(top-15);
			} else{
				clearInterval(topTimer);
			}
		},1);
	})
	/*购物车*/
	$("#gouwuche").hover(function(){
		$(".gwc").css("display","block");
	},function(){
		$(".gwc").css("display","none");
	})
	/*搜索*/
	$("input[type=text]").focus(function(){
		$(".logo_navf > a").css("display","none");
	});
	$("input[type=text]").blur(function(){
		if($(this).val() == ""){
		$(".logo_navf > a").css("display","block");
		}
	});
	/*网页底部*/
	var footerIndex = 0;
	$(".btn_next").click(function(){
		if (footerIndex != 3) {
			footerIndex++;
			$(".ol_list").animate({
				left : -footerIndex*158
			})
			$(".btn_prev").removeClass("btn_prev_disable");
		}
		if (footerIndex == 3) {
			$(this).addClass("btn_next_disable");
		}
	})
	$(".btn_prev").click(function(){
		if (footerIndex != 0) {
			footerIndex--;
			$(".ol_list").animate({
				left : -footerIndex*158
			})
			$(".btn_next").removeClass("btn_next_disable");
		}
		if (footerIndex == 0) {
			$(this).addClass("btn_prev_disable");
		}
	})
})