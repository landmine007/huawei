<?php
    // 设置utf-8 格式
    header("Content-type: text/html; charset=utf8");
    // 连接数据库
    $conn = new mysqli('localhost', 'root', '', 'huawei', 3306);
    // 设置utf-8
    mysqli_set_charset($conn, 'utf8');
    $phone = $_POST['phone'];
    $mail = $_POST['mail'];
    $pwd = $_POST['password'];
    

    $sql = "select phone from userinfo where phone='$phone'";
    $query = $conn -> query($sql);
    $arr = array();
    while($result = $query -> fetch_Object()){
        array_push($arr, $result);
    }
    if(count($arr) > 0){
        echo "用户已存在";
    }else{
        $user_in = "INSERT INTO userinfo (phone, mail, password) VALUES ('$phone', '$mail', '$pwd')";
        $rows = $conn -> query($user_in);
        echo json_encode($rows);
    }
?>