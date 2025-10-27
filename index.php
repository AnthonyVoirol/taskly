<?php
session_start();


function message()
{
    if (isset($_SESSION['flash_message'])) {
        $msg = json_encode($_SESSION['flash_message']);
        echo "<script>showNotification($msg);</script>";
        unset($_SESSION['flash_message']);
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do-List</title>
    <link rel="stylesheet" href="assets/css/style.css">

</head>

<body>
    <header>
        <h1>To-Do-List</h1>
    </header>

    <main>
        <a href="assets/php/signIn.php">test</a>
        <section id="main">
            <!-- tâche -->
        </section>
    </main>

    <footer>
        <p>Fait par Ant.V</p>
        <p>Version 1</p>
    </footer>
    <script src="assets/js/script.js"></script>
    <?php message(); ?>
</body>

</html>