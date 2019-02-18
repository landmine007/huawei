var shop=(function(){
    var $right = document.querySelector('.right')
    var allcolor = document.querySelectorAll('.parameter li')
    var allversion = document.querySelectorAll('.version li')
    var allset_meal = document.querySelectorAll('.set_meal li')
    var allproduct = document.querySelectorAll('.product i')
    var $show_price =document.querySelectorAll('.price em')
    var $prameter = document.querySelector('.parameter')
    var $version = document.querySelector('.version')
    var $set_meal = document.querySelector('.set_meal')
    var $count = document.querySelector('.count')
    var index,key,repertory = 0;
    return{
        init(){
            for(let i = 0; i <allcolor.length; i++) {
                allcolor[i].index = i;
            }
            for(let i = 0; i <allversion.length; i++) {
                allversion[i].key = i;
            }
            for(let i = 0; i <allset_meal.length; i++) {
                allset_meal[i].repertory = i;
            }
            this.event();
        },
        event(){
            var self =this;
            $prameter.addEventListener('click',function(e){
                    e = e ||window.event;
                    var target = e.target||e.srcElement;
                    if(target.nodeName === 'LI') {
                        index = target.index;
                        for(let i = 0; i < allcolor.length; i++) {
                            allcolor[i].classList.remove('current');
                        }
                        allcolor[index].classList.add('current');
                    }
                    switch(index){
                        case 0:allproduct[0].innerHTML="亮黑色";break;
                        case 1:allproduct[0].innerHTML="樱粉金";break;
                        case 2:allproduct[0].innerHTML="宝石蓝";break;
                        case 3:allproduct[0].innerHTML="翡冷翠";break;
                        case 4:allproduct[0].innerHTML="极光色";break;
                        default:break;
                    }
            },false)
            $version.addEventListener('click',function(e){
                e = e ||window.event;
                var target = e.target||e.srcElement;
                if(target.nodeName === 'LI') {
                    key = target.key;
                    for(let i = 0; i < allversion.length; i++) {
                        allversion[i].classList.remove('current');
                    }
                    allversion[key].classList.add('current');
                }
                switch(key){
                    case 0:allproduct[1].innerHTML="全网通 6+128GB";$show_price[1].innerHTML="3999";break;
                    case 1:allproduct[1].innerHTML="全网通 6+128GB";$show_price[1].innerHTML="4499";break;
                }
        },false) 
        $set_meal.addEventListener('click',function(e){
            e = e ||window.event;
            var target = e.target||e.srcElement;
            if(target.nodeName === 'LI') {
                repertory = target.repertory;
                for(let i = 0; i < allset_meal.length; i++) {
                    allset_meal[i].classList.remove('current');
                }
                allset_meal[repertory].classList.add('current');
            }
            switch(repertory){
                case 0:allproduct[3].innerHTML="单品";break;
                case 1:allproduct[3].innerHTML="贴心守护";break;
                case 2:allproduct[3].innerHTML="超级车充";break;
                case 3:allproduct[3].innerHTML="存储无忧护";break;
                case 4:allproduct[3].innerHTML="照片素印";break;
            }
    },false) 
    $right.onclick=function(e){
        e = e || window.event;
        var target = e.target || e.srcElement
        if(target.nodeName ==='BUTTON'){
            var obj ={};
            obj.color = allproduct[0].innerHTML
            obj.configure = allproduct[1].innerHTML
            obj.count = Number($count.value)
            obj.price = obj.count * ($show_price[1].innerHTML)
        }
        self.setData(obj);
    }
        },
        setData(obj){
            var shopList = localStorage.getItem('shopList') || '[]';
            shopList = JSON.parse(shopList);
            for(var i = 0; i < shopList.length; i++) {
                var item = shopList[i];
                if(item.configure == obj.configure && item.color == obj.color) {
                    item.count += obj.count;
                    break;
                } 
            }
            if(i == shopList.length) {
                shopList.push(obj);
            }
            localStorage.shopList = JSON.stringify(shopList); 
        }
}           
}())
shop.init();
