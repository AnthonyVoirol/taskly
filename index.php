<?php
include_once './inc/toDoList_db_csv.php';
$task = GetAllTask();
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do-List</title>
    <link rel="stylesheet" href="css/style.css" type="text/css">
</head>

<body>
    <h1>To-Do-List</h1>

    <table>

        <head>
            <tr>
                <th>Id</th>
                <th>Nom</th>
                <th>Catégorie</th>
                <th>Important</th>
                <th>DateAjout</th>
                <th>DateLimite</th>
                <th>Fait</th>
            </tr>
        </head>
        <?php
        foreach ($task as $t) {
            echo '<tr>';
            foreach ($t as $key => $value) {
                if ($key === 'numero') {
                    $numTask = $value;
                }
                echo '<td>';
                /*if ($key === 'imgPath') {
                    echo '<img class="img-fluid" alt="Responsive image" src="' . $value . '" width="150" height="150" </img>';
                } else {
                    echo $value;
                }*/
                echo $value;

                echo '</td>';

            }
        }
        ?>
    </table>

</body>

</html>