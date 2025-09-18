<?php
define('task_csv', './data/task.csv');


function GetAllTask()
{
    $task = array();
    $myTask = array();

    $f = fopen(task_csv, 'r') or exit('File not found or not exist');
    $line = fgets($f);
    $line = rtrim($line);
    while ($line !== "") {
        $tab = explode(',', $line);
        $myTask['id'] = $tab[0];
        $myTask['nom'] = $tab[1];
        $myTask['categorie'] = $tab[2];
        $myTask['important'] = $tab[3];
        $myTask['dateAdd'] = $tab[4];
        $myTask['deadLine'] = $tab[5];
        $myTask['do'] = $tab[6];

        array_push($task, $myTask);

        $line = fgets($f);
        $line = rtrim($line);

    }
    fclose($f);
    return $task;
}

function AddProduits($numero, $name, $categorie, $important, $dateAdd, $deadLine, $do)
{
    $f = fopen(task_csv, 'a') or exit('File not found or not exist');

    $line = $numero . ',' . $name . ',' . $categorie . ',' . $important . ',' . $dateAdd . ',' . $deadLine . ',' . $do . PHP_EOL;
    fwrite($f, $line);
    fclose($f);
}