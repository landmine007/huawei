$(function(){
	$(".ipt").keydown(function(){
		$(this).parent().find("label").hide();
		$(".userAccountLogin-errorTipsDiv").css("visibility","hidden").html("<i class='loginErrorInfo'></i>");
	}).blur(function(){
		if (!$(this).val()) {
			$(this).parent().find("label").show();
		}
	})
	
	var spaceReg = /\s/;
	$("form").submit(function(){
		var userNameVal = $("#userName").val();
		var pwdNameVal = $("#pwd").val();
		if (!spaceReg.test(userNameVal)  && userNameVal != "") {
			if (!spaceReg.test(pwdNameVal)  && pwdNameVal != "") {
				return true;
			} else{
				$(".userAccountLogin-errorTipsDiv").css("visibility","visible").html("<i class='loginErrorInfo'></i>请输入您的密码");
				return false;
			}
		} else{
			$(".userAccountLogin-errorTipsDiv").css("visibility","visible").html("<i class='loginErrorInfo'></i>请输入您的帐号");
			return false;
		}
	})
	
	
})