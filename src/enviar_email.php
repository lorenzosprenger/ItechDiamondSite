<?php
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Verifica se os campos necessários estão preenchidos
    if (!isset($_POST["nome"], $_POST["email"], $_POST["assunto"], $_POST["mensagem"])) {
        echo json_encode(["success" => false, "error" => "Campos obrigatórios ausentes."]);
        exit;
    }

    $nome = htmlspecialchars(trim($_POST["nome"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $assunto = htmlspecialchars(trim($_POST["assunto"]));
    $mensagem = htmlspecialchars(trim($_POST["mensagem"]));

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "error" => "Email inválido."]);
        exit;
    }

    $to = "lorenzosprenger@gmail.com"; // Substitua pelo seu email
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $body = "Nome: $nome\n";
    $body .= "Email: $email\n";
    $body .= "Mensagem:\n$mensagem\n";

    // Tentativa de enviar o email
    if (mail($to, $assunto, $body, $headers)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "Falha ao enviar email."]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Método inválido."]);
}
?>
