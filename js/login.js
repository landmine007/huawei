var login = (function(){
    // 获取dom
    var selNation = document.querySelector('.sel-nation');
    return {
        init: function(){
            this.event();
        },
        event(){
            //国家选择
            selNation.onclick = function(){
                this.nextElementSibling.style.display = 'block';
            }
        }
    }
}());