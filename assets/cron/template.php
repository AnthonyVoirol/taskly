<?php
require_once __DIR__ . '/../php/dbConfig.php';

$APP_ID = "";
$REST_API_KEY = "";

$tomorrow = date('Y-m-d', strtotime('+1 day'));

file_put_contents(__DIR__ . "/log.txt",
    "\n=== CRON DÉMARRÉ: " . date("Y-m-d H:i:s") . " ===\n",
    FILE_APPEND
);

file_put_contents(__DIR__ . "/log.txt",
    "Recherche des tâches pour: $tomorrow\n",
    FILE_APPEND
);

$query = $conn->prepare("
    SELECT tasks.id, tasks.task, tasks.deadLine, users.id AS user_id
    FROM tasks
    JOIN users ON tasks.user_id = users.id
    WHERE DATE(tasks.deadLine) = ?
");

$query->bind_param("s", $tomorrow);
$query->execute();
$result = $query->get_result();

$count = 0;

while ($task = $result->fetch_assoc()) {
    $count++;
    $userId = $task['user_id'];
    $taskName = $task['task'];

    file_put_contents(__DIR__ . "/log.txt",
        "Tâche trouvée: $taskName (user_id: $userId)\n",
        FILE_APPEND
    );

    $payload = [
        "app_id" => $APP_ID,
        "include_aliases" => [
            "external_id" => [ (string)$userId ]
        ],
        "target_channel" => "push",
        "headings" => ["fr" => "Rappel de tâche"],
        "contents" => ["fr" => "Votre tâche \"$taskName\" arrive à échéance demain !"],
        "priority" => 10
    ];

    file_put_contents(__DIR__ . "/log.txt",
        "Payload envoyé: " . json_encode($payload, JSON_PRETTY_PRINT) . "\n",
        FILE_APPEND
    );

    $ch = curl_init("https://api.onesignal.com/notifications");

    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json; charset=utf-8",
        "Authorization: Basic $REST_API_KEY"
    ]);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    file_put_contents(__DIR__ . "/log.txt",
        "HTTP Code: $httpCode\n",
        FILE_APPEND
    );

    if ($curlError) {
        file_put_contents(__DIR__ . "/log.txt",
            "Erreur CURL: $curlError\n",
            FILE_APPEND
        );
    }

    file_put_contents(__DIR__ . "/log.txt",
        "Réponse OneSignal: $response\n\n",
        FILE_APPEND
    );
}

file_put_contents(__DIR__ . "/log.txt",
    "=== CRON TERMINÉ: $count tâche(s) trouvée(s) ===\n",
    FILE_APPEND
);

echo "CRON OK - $count notification(s) envoyée(s)";
?>