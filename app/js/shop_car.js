var shop_car = (function(){
    var $box = document.querySelector('.list_main');
return{
    init(){
        this.getJson();
        this.event();
    },
     event(){
        var self = this;
        $box.addEventListener ('click',function(e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            if(target.nodeName === 'BUTTON') {
                var index = target.parentNode.parentNode.getAttribute('index');
                self.shopList.splice(Number(index),1)
                self.setData()
                self.insertData(self.shopList);
            }
            if(target.innerHTML === '+') {
                var $value = target.parentNode.previousElementSibling.value
                $value = Number($value) + 1
                target.classList.remove('current2')
                var index = target.parentNode.parentNode.parentNode.getAttribute('index');
                self.shopList[index].count = $value;
                self.setData();
                self.insertData(self.shopList);
            }
            if(target.innerHTML === '-') {
                var $value = target.parentNode.previousElementSibling.value
                if($value > 1){
                target.classList.remove('current2')
                $value = Number($value) - 1
                var index = target.parentNode.parentNode.parentNode.getAttribute('index');
                self.shopList[index].count = $value;
            }
               if($value == 1){
                   target.classList.add('current2')
                }
                self.setData();
                self.insertData(self.shopList); 
            }
          },false)
          $box.onchange = function(e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            if(target.nodeName === 'INPUT') {
                var index = target.parentNode.parentNode.getAttribute('index');
                self.shopList[index].count = target.value;
                self.setData();
                self.insertData(self.shopList);                
            }
        }
        },
    getJson(){
        var shopList = localStorage.shopList || '[]';
        shopList = JSON.parse(shopList);
        this.insertData(shopList);
    },
    insertData(shopList){
        this.shopList = shopList;
        var $arr = [];
            for(var i = 0; i < shopList.length; i++) {
                 var item = shopList[i];
                $arr.push(`<ul index=${i}>
                    <li><input type="checkbox" class="inp" value="${Number(item.count)}"></li>
                    <li><img src="images/pic${item.id}.png"></li>
                    <li>&nbsp;华为mate 20&nbsp;${item.color}&nbsp;&nbsp;${item.configure}</li>
                    <li>￥${item.price}.00</li>
                    <li><input class="shop_count" type="txt" value="${item.count}"/>
                    <p class="stock"><a href="javascript:;">+</a><a href="javascript:;">-</a></p></li>
                    <li>￥${item.price*item.count}.00</li>
                    <li><button class="btn shop-btn-del">删除</button></li>
                </ul>`);
            }
            $box.innerHTML = $arr.join('');

        },
        setData() {
            localStorage.shopList = JSON.stringify(this.shopList);
        }
    }
}());
shop_car.init();