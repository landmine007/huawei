var login = (function(){
    // 获取dom
    var $selNation = $('.sel-nation');
    var $nation = $('.nation-list');
    var $phone = $('.phone input');
    var $verify = $('.verify');
    var $pwd = $('.pwd input');
    var timer = null;
    return {
        init: function(){
            this.event();
        },
        event(){
            //国家选择点击事件
            $selNation.on("click", function(){
                var $ol = $(this).next();
                if($ol.css('display') == 'none'){
                    $ol.css("display", 'block');
                    $(this).next().scrollTop(1050);
                }
            })
            // 选择国家
            $nation.on('click', 'li', function(){
                var $that = $(this);
                $selNation.text($(this).text());
                $selNation.next().css("display", 'none');
                // 发送ajax
                $.getJSON('json/nation.json', function(data) {
                    var i = $that.index();
                    $('.phone label').html(`+${data[i].code}(${$that.text()})`);
                });
            });
            // 手机号码验证
            $phone.on('focus', function() {
                $(this).parent().css('borderColor', '#ccc')
                    $(this).parent().next().css("display", 'none')
                           .html('');
            });
            $phone.on('blur', function() {
                var reg = /^1[34578]\d{9}$/;
                if(!reg.test($(this).val())){
                    $(this).parent().css('borderColor', 'red')
                    $(this).parent().next().css("display", 'block')
                    if($(this).val() == ''){
                        $(this).parent().next().html('请输入手机号码');
                    }else {
                        $(this).parent().next().html('手机号码不正确');
                    }
                }
            });
            // 验证按钮
            $verify.on('mouseenter', function() {
                var flag = true;
                function sport() {
                    var obj = {};
                    if(flag){
                        obj.width = 22;
                        obj.height = 22;
                    }else {
                        obj.width = 30;
                        obj.height = 30;
                    }
                    flag = !flag;
                    $('.gray').animate(obj, 500);
                }
                if($(this).children().eq(1).html() == '点击按钮进行验证'){
                    sport();
                    timer = setInterval(sport, 500);
                }
            });
            $verify.on('mouseleave', function() {
                clearInterval(timer);
                $('.gray').stop(true, true)
                    .css({
                    width: 30,
                    height: 30
                });
            });
            $verify.on('click', function() {
                clearInterval(timer);
                $(this).css({
                    'borderColor': '#26C267',
                    'background': '#EEFFF5'
                });
                $(this).children().eq(0).html('<h2></h2>');
                $(this).children().eq(1).html('验证成功').css('color', '#26C267');
            });
            // 获取短信验证码
            $('.verify-code a').on('click', function() {
                if(/^1[34578]\d{9}$/.test($phone.val())){
                    if(!$(this).timer){
                        var count = 60;
                        $(this).timer = setInterval(() => {
                            $(this).html(`重新获取(${count})`);
                            count--;
                            if(count < 0){
                                clearInterval($(this).timer);
                                $(this).timer = null;
                                $(this).html(`获取验证码`);
                            }
                        }, 1000)
                    }
                }else {
                    $phone.blur();
                } 
            });
            // 密码验证
            $pwd.on('focus', function() {
                $(this).next().css('display', 'block');
                $(this).parent().next().css("display", 'none').html('');
            });
            $pwd.on('change', function() {
                var val = $(this).val();
                var p = $(this).children('p');
                console.log(p);
                if(val.length >= 8){

                }
            });
        }
    }
}());