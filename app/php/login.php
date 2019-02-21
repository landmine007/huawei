<?php
    // 设置utf-8 格式
    header("Content-type: text/html; charset=utf8");
    // 连接数据库
    $conn = new mysqli('localhost', 'root', '', 'huawei', 3306);
    // 设置utf-8
    mysqli_set_charset($conn, 'utf8');
    $phone = $_POST['phone'];
    $pwd = $_POST['password'];
    

    $sql = "SELECT * FROM userinfo WHERE phone='$phone' AND password='$pwd'";
    $query = $conn -> query($sql);
    $arr = array();
    while($result = $query -> fetch_Object()){
        array_push($arr, $result);
    }
    if(count($arr) > 0){
        echo '登陆成功';
    }else{
        echo "账号或密码不正确，登录失败!";
    }
?>