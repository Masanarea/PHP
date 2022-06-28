<?php

require_once(__DIR__ . '/../app/config.php');

use MyApp\Database;
use MyApp\Todo;
use MyApp\Utils;

$pdo = Database::getInstance();

$todo = new Todo($pdo);
$todo->processPost();
$todos = $todo->getAll();


// $todos = getTodos($pdo);
// var_dump($todos);
// exit;

?>

<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="utf-8">
  <title>My Todos</title>
  <link rel="stylesheet" href="css/styles.css">
</head>

<body>
  <!-- CUDRのたびにトークンをやるのではなくてmainタグで送ってしまう -->
  <main data-token="<?= Utils::h($_SESSION['token']); ?>">

    <header>
      <span class="purge">
        Purge
      </span>
    </header>

    <h1>Todos</h1>

    <!-- このファイル自身にデータを飛ばすので、最初はaction="" -->
    <form>
      <input type="text" name="title" placeholder="Type new todo.">
    </form>

    <ul>
      <?php foreach ($todos as $todo) : ?>
        <li data-id="<?= Utils::h($todo->id); ?>">
          <!-- このファイル自身にデータを飛ばすので、最初はaction="" -->
          <!-- 動機処理の場合 -->

          <!-- <form action="?action=toggle" method="post">
            <input type="checkbox" <= $todo->is_done ? 'checked' : ''; ?>>
            <input type="hidden" name="id" value="<= Utils::h($todo->id); ?>">
            <input type="hidden" name="token" value="<= Utils::h($_SESSION['token']); ?>">
          </form> -->

          <!-- 非同期処理の場合 -->
          <input type="checkbox" <?= $todo->is_done ? 'checked' : ''; ?>>
          <span><?= Utils::h($todo->title); ?></span>
          <span class="delete">x</span>
        </li>
      <?php endforeach; ?>
    </ul>
  </main>

  <script src="js/main.js"></script>
</body>

</html>