<?php
include_once 'inc/toDoList_db_csv.php';

if (
    isset($_POST['numero'], $_POST['name'], $_POST['categorie'], $_POST['task-add'], $_POST['deadLine']) &&
    $_SERVER['REQUEST_METHOD'] === "POST"
) {
    $important = isset($_POST['important']) ? 'true' : 'false';
    $do = isset($_POST['do']) ? 'true' : 'false';

    AddProduits(
        numero: $_POST['numero'],
        name: $_POST['name'],
        categorie: $_POST['categorie'],
        important: $important,
        dateAdd: $_POST['task-add'],
        deadLine: $_POST['deadLine'],
        do: $do
    );
    header('Location: insertTask.php');
    exit;
}

?>
<!doctype html>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Add task</title>
</head>

<body>
    <H1>Ajout d'un article</H1>

    <form method="POST" action="insertTask.php">

        <label for="numero">Numéro</label>
        <input type="text" name="numero" id="numero" placeholder="Numéro">

        <label for="name">Nom</label>
        <input type="text" name="name" id="name" placeholder="Nom">

        <label>Catégorie</label>
        <select name="categorie">
            <option selected>Aucune</option>
            <option>école</option>
            <option>personnel</option>
            <option>ménage</option>
            <option>loisir</option>
        </select>

        <label for="Important">Important</label>
        <input type="checkbox" name="important">

        <label for="dateAdd">Date d'ajout</label>
        <input type="date" id="add" name="task-add" />

        <label for="deadLine">Date Limite</label>
        <input type="date" id="deadLine" name="deadLine" />

        <label for="do">fait</label>
        <input type="checkbox" name="do">

        <button type="submit">Ajouter</button>
        <a href="index.php" role="button">Annuler</a>
    </form>



</body>

</html>