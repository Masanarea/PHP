<?php

require_once(__DIR__ . '/config.php');

// package
// - Composer

use Abraham\TwitterOAuth\TwitterOAuth;

$connection = new TwitterOAuth(
    CONSUMER_KEY,
    CONSUMER_SECRET,
    ACCESS_TOKEN,
    ACCESS_TOKEN_SECRET
);
// $content = $connection->get("account/verify_credentials");
// $content = $connection->get("statuses/home_timeline", [ "count" => 3]);
$res = $connection->post("statuses/update", [
    'status' => 'プログラミングやってて思った事

教材がめっちゃ安い
始めにプロゲート、ドットインストールをみんなすすめるけど月1000円位で始めやすいし種類も豊富でさらに質も高い！。大学受験塾の東◯とかセットで数10万円なのに、ちなみにTwitter APIで投稿しています。
#プログラミング学習　#プログラミング初心者　#エンジニア'
]);

var_dump($res);

if ($connection->getLastHttpCode() === 200) {
    echo 'Success!' . PHP_EOL;
} else {
    // echo 'Error!' . $res->errors[0]->message . PHP_EOL;
    echo 'Error!' . $res->errors[0]->message . PHP_EOL;
}



// var_dump($content);

?>

<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="utf-8">
    <title>簡易掲示板</title>
</head>

<body>
    <h1>簡易掲示板</h1>
    <form>
        message: <input type="text" name="message">
        user: <input type="text" name="user">
        <input type="submit" value="投稿">
    </form>
    <h2>投稿一覧（0件）</h2>
    <ul>
        <li>まだ投稿はありません。</li>
    </ul>
</body>

</html>