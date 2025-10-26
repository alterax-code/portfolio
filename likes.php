<?php

header('Content-Type: application/json');


$likes_file = 'likes.json';


if (!file_exists($likes_file)) {
    file_put_contents($likes_file, json_encode([
        'site-recettes' => 0,
        'jeu-pygame' => 0,
        'jeu-unreal' => 0
    ]));
}


$likes = json_decode(file_get_contents($likes_file), true);


$action = $_GET['action'] ?? '';
$project = $_GET['project'] ?? '';

if ($action === 'get') {

    echo json_encode(['success' => true, 'likes' => $likes]);
    
} elseif ($action === 'like' && !empty($project)) {
    

    if (!isset($likes[$project])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Projet inconnu']);
        exit;
    }
    

    $cookie_name = 'liked_' . $project;


    if (isset($_COOKIE[$cookie_name])) {
        echo json_encode([
            'success' => false, 
            'message' => 'Vous avez déjà liké ce projet',
            'likes' => $likes[$project]
        ]);
        exit;
    }
    
    
    $likes[$project]++;
    

    file_put_contents($likes_file, json_encode($likes));
    

    setcookie($cookie_name, '1', time() + (30 * 24 * 60 * 60), '/');
    
    echo json_encode([
        'success' => true, 
        'message' => 'Like ajouté !',
        'likes' => $likes[$project]
    ]);
    
} else {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Action invalide']);
}
?>