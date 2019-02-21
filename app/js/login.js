$(function(){
    //注册
    var sigin = (function(){
        // 获取dom
        var $selNation = $('.sel-nation');
        var $nation = $('.nation-list');
        var $phone = $('.phone input');
        var $verify = $('.verify');
        var $pwd = $('.pwd input');
        var $pwdAgain = $('.pwd-again input');
        var $vCode = $('.verify-code input');
        var $mail = $('.mail input');
        var $mailCode = $('.mail-code input');
        var $sub = $('.sub');
        var timer = null;
        return {
            init: function(){
                this.event();
            },
            event(){
                var self = this;
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
                $phone.on('focus', function() { self.focu($(this)) });
                $phone.on('blur', function() {
                    var reg = /^1[34578]\d{9}$/;
                    if(!reg.test($(this).val())){
                        $(this).parent().css('borderColor', '#FB948B')
                        $(this).parent().next().css("display", 'block')
                        if($(this).val() == ''){
                            $(this).parent().next().html('请输入手机号码');
                        }else {
                            $(this).parent().next().html('手机号码不正确');
                        }
                    }else {
                        $(this).parent().next().html('正确');
                    }
                });
                // 邮箱验证
                $mail.on('focus', function() { self.focu($(this)) });
                $mail.on('blur', function() {
                    var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                    if(!reg.test($(this).val())){
                        $(this).parent().css('borderColor', '#FB948B')
                        $(this).parent().next().css("display", 'block')
                        if($(this).val() == ''){
                            $(this).parent().next().html('请输入邮件地址');
                        }else {
                            $(this).parent().next().html('邮件地址不正确');
                        }
                    }else {
                        $(this).parent().next().html('正确');
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
                        if(!this.timer){
                            var count = 60;
                            this.timer = setInterval(() => {
                                $(this).html(`重新获取(${count})`);
                                count--;
                                if(count < 0){
                                    clearInterval(this.timer);
                                    this.timer = null;
                                    $(this).html(`获取验证码`);
                                }
                            }, 1000)
                        }
                    }else {
                        $phone.blur();
                    } 
                });
                $vCode.on('focus', function() {
                    self.focu($(this));
                });
                $vCode.on('blur', function() {
                    var $val = $(this).val();
                    if($val == ''){
                        $(this).parent().next().css("display", 'block').html('验证码不能为空');
                        $(this).parent().css('borderColor', '#FB948B');
                    }else {
                        $(this).parent().next().html('正确');
                    }
                });
                // 获取邮件验证码
                $('.mail-code a').on('click', function() {
                    var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                    if(reg.test($mail.val())){
                        if(!this.timer){
                            var count = 60;
                            this.timer = setInterval(() => {
                                $(this).html(`重新获取(${count})`);
                                count--;
                                if(count < 0){
                                    clearInterval(this.timer);
                                    this.timer = null;
                                    $(this).html(`获取验证码`);
                                }
                            }, 1000)
                        }
                    }else {
                        $mail.blur();
                    } 
                });
                $mailCode.on('focus', function() {
                    self.focu($(this));
                });
                $mailCode.on('blur', function() {
                    var $val = $(this).val();
                    if($val == ''){
                        $(this).parent().next().css("display", 'block').html('验证码不能为空');
                        $(this).parent().css('borderColor', '#FB948B');
                    }else {
                        $(this).parent().next().html('正确');
                    }
                });
                // 密码验证
                $pwd.on('focus', function() {
                    $(this).next().css('display', 'block');
                    self.focu($(this));
                });
                $pwd.on('keyup', function() {
                    var $val = $(this).val();
                    var flag = self.verify($val);
                    var $i = $(this).next().find('i');
                    var $span = $(this).next().find('span');
                    if(flag.len){
                        $i.eq(1).css('backgroundPosition', '-15px 0');
                        $span.eq(1).css('color', '#41CE48');
                    }else{
                        $i.eq(1).css('backgroundPosition', '-1px 0');
                        $span.eq(1).css('color', '#7f7f7f');
                    }
                    if(flag.spac){
                        $i.eq(0).css('backgroundPosition', '-15px 0');
                        $span.eq(0).css('color', '#41CE48');
                    }else{
                        $i.eq(0).css('backgroundPosition', '-1px 0');
                        $span.eq(0).css('color', '#7f7f7f');
                    }
                    if(flag.inc){
                        $i.eq(2).css('backgroundPosition', '-15px 0');
                        $span.eq(2).css('color', '#41CE48');
                    }else{
                        $i.eq(2).css('backgroundPosition', '-1px 0');
                        $span.eq(2).css('color', '#7f7f7f');
                    }
                });
                $pwd.on('blur', function() {
                    $(this).next().css('display', 'none');
                    var $val = $(this).val();
                    var flag = self.verify($val);
                    if($val == ''){
                        $(this).parent().next().css('display', 'block').html('密码不能为空');
                        $(this).parent().css('borderColor', '#FB948B');
                        return;
                    }else if(!flag.spac){
                        $(this).parent().next().css('display', 'block').html('密码不能包含空格');
                        $(this).parent().css('borderColor', '#FB948B');
                        return;
                    }else if(!flag.len){
                        $(this).parent().next().css('display', 'block').html('密码必须大于8位');
                        $(this).parent().css('borderColor', '#FB948B');
                        return;
                    }else if(!flag.inc){
                        $(this).parent().next().css('display', 'block').html('密码至少包含字母，数字，字符中的两种');
                        $(this).parent().css('borderColor', '#FB948B');
                        return;
                    }else {
                        $(this).parent().next().html('正确');
                    }
                });
                // 再次输入密码
                $pwdAgain.on('focus', function() {
                    self.focu($(this));
                });
                $pwdAgain.on('blur', function() {
                    var $pwdVal = $pwd.val();
                    var $va = $(this).val();
                    if($va == ''){
                        $(this).parent().next().css('display', 'block').html('密码不能为空');
                        $(this).parent().css('borderColor', '#FB948B');
                    }else if($va != $pwdVal){
                        $(this).parent().next().css('display', 'block').html('两次输入密码不一致');
                        $(this).parent().css('borderColor', '#FB948B');
                    }else {
                        $(this).parent().next().html('正确');
                    }
                });
                
                $sub.on('click', function(e) {
                    // 阻止默认行为
                    e.preventDefault();
                    var $hint = $('.hint');
                    var flag = true;
                    for(var i = 0; i < $hint.length; i++){
                        if($hint.eq(i).html() != '正确'){
                            $hint.eq(i).prev().children('input').blur();
                            return;
                        }
                    }
                    if(flag){
                        var obj = {};
                        obj.phone = $phone.val();
                        obj.mail = $mail.val() || null;
                        obj.password = $pwd.val();
                        $.post('php/sigin.php',obj, function(data){
                            if(data == true){
                                window.location.href = 'http://localhost:8888/huawei/app/'; 
                            }else if(data == '用户已存在'){
                                if(confirm('用户已存在,立即登陆！')){
                                    window.location.href = 'http://localhost:8888/huawei/app/login.html';
                                }
                            }else{
                                alert('注册失败，请重试');
                            }
                        });
                    }
                });
            },
            // 密码验证
            verify(str){
                var reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{1,}$/;
                var spac = /\s/;
                var obj = {};
                obj.len = str.length >= 8? true: false;
                obj.spac = spac.test(str)? false: true;
                obj.inc = reg.test(str)? true: false;
                return obj;
            },
            // 获取焦点
            focu(obj){
                obj.parent().next().css("display", 'none').html('');
                obj.parent().css('borderColor', '#ccc');
            }
        }
    }());
    sigin.init();

})