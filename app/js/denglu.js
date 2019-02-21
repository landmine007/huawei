$(function(){
	$(".ipt").keydown(function(){
		$(this).parent().find("label").hide();
		$(".userAccountLogin-errorTipsDiv").css("visibility","hidden").html("<i class='loginErrorInfo'></i>");
	}).blur(function(){
		if (!$(this).val()) {
			$(this).parent().find("label").show();
		}
	})
	
	$('#btn').on('click', function(){
		$("form").submit(function(){
			return false;
		});
		var obj = {};
		obj.phone = $(".phone").val();
		obj.password = $(".pwd").val();
		console.log($("#userName"), obj);
		var dom = $(".userAccountLogin-errorTipsDiv");
		if(obj.phone == ''){
			dom.css("visibility","visible").html("<i class='loginErrorInfo'></i>请输入您的帐号");
		}else if(obj.password == ''){
			dom.css("visibility","visible").html("<i class='loginErrorInfo'></i>请输入您的密码");
		}else{
			$.post('php/login.php', obj, function(data) {
				if(data == '登陆成功'){
					window.location.href = 'http://localhost:8888/huawei/app/'; 
				}else {
					dom.css("visibility","visible").html("<i class='loginErrorInfo'></i>账号或密码不正确，登录失败!");
				}
			})
		}
	})	
	
})