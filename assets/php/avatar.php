<?php
session_start();

header("Content-Type: application/json");

if (!empty($_FILES['avatar'])) {

    if ($_FILES['avatar']['type'] !== "image/png") {
        http_response_code(400);
        echo json_encode(["error" => "PNG only"]);
        exit;
    }

    $targetDir = "../avatars/";

    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0777, true);
    }

    $fileName = $_SESSION["username"] . ".png";
    $targetFile = $targetDir . $fileName;

    if (move_uploaded_file($_FILES["avatar"]["tmp_name"], $targetFile)) {

        $publicPath = "../avatars/" . $fileName;

        echo json_encode([
            "success" => true,
            "newPath" => $publicPath
        ]);
    } else {
        echo json_encode(["error" => "Upload failed"]);
    }
}
?>
