<?php

// ３つのマジナイ
session_start();

// 定数化
define('DSN', 'mysql:host=db;dbname=myapp;charset=utf8mb4');
define('DB_USER', 'myappuser');
define('DB_PASS', 'myapppass');
// define('SITE_URL', 'http://localhost:8562');
define('SITE_URL', 'http://' . $_SERVER['HTTP_HOST']);

spl_autoload_register(function ($class) {
    // MyApp\Database が $class として渡されてしまう
    // MyApp\\ を消去して、クラス部分のみ得る
    $prefix = 'MyApp\\';

    if (strpos($class, $prefix) === 0) {
        // MyApp\Database
        // $fileName = sprintf(__DIR__ . '/%s.php', substr($class, 6));
        $fileName = sprintf(__DIR__ . '/%s.php', substr($class, strlen($prefix)));

        if (file_exists($fileName)) {
            require($fileName);
        } else {
            echo 'File not found: ' . $fileName;
            exit;
        }
    }
});