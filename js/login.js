var login = (function(){
    // 获取dom
    var $selNation = $('.sel-nation');
    var $nation = $('.nation-list');
    var $phone = $('.tele input');
    return {
        init: function(){
            this.event();
        },
        event(){
            //国家选择
            $selNation.on("click", function(){
                $(this).next().css("display", 'block');
            })
            $nation.on('click', 'li', function(){
                $selNation.children().eq(0).text($(this).text());
                $selNation.next().css("display", 'none');
            });
            // 手机号码验证
            $phone.on('blur', function() {
                console.log(1);
                var reg = /^1[34578]\d{9}$/;
                if(reg.test($(this).val())){
                    $(this).parent().css('borderColor', 'red')
                           .next().css("display", 'block')
                           .html('手机号码格式不正确');
                }
            });
        }
    }
}());