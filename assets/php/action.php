<?php
    header('Content-Type: application/json');
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    include("dbConfig.php");

    $sql = "SELECT * FROM taches WHERE id = 1";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
    // Retourner la ligne sous forme de tableau associatif
    $row = $result->fetch_assoc();
    echo json_encode($row);
    } else {
        echo json_encode(["error" => "Aucune donnée trouvée."]);
    }

$conn->close();
?>