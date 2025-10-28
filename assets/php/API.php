<?php
// tasks_api.php
header('Content-Type: application/json');
session_start();

// Vérifie si l'utilisateur est connecté
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'User not logged in.']);
    exit;
}

$user_id = $_SESSION['user_id'];

// Prépare et exécute la requête pour récupérer les tâches
$stmt = $conn->prepare('SELECT id, title, description, status FROM tasks WHERE user_id = ?');
$stmt->bind_param('i', $user_id);
$stmt->execute();
$result = $stmt->get_result();

$tasks = [];
while ($row = $result->fetch_assoc()) {
    $tasks[] = $row;
}

$stmt->close();

// Retourne les tâches au format JSON
echo json_encode(['tasks' => $tasks]);
?>
