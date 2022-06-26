<?php

namespace MyApp;

class Utils
{
    // static をつけてクラス内からしか使えないクラスメゾットを作る
    public static function h($str)
    {
        return htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
    }
}
