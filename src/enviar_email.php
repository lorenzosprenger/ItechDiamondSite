<?php
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!isset($_POST["nome"], $_POST["email"], $_POST["tipo"], $_POST["assunto"], $_POST["mensagem"])) {
        echo json_encode(["success" => false, "error" => "Campos obrigatórios ausentes."]);
        exit;
    }

    $nome = htmlspecialchars(trim($_POST["nome"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $tipo = htmlspecialchars(trim($_POST["tipo"]));
    $assunto = htmlspecialchars(trim($_POST["assunto"]));
    $mensagem = htmlspecialchars(trim($_POST["mensagem"]));

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "error" => "Email inválido."]);
        exit;
    }

    $to = "vendas@itechdiamond.com.br";
    $subject = "Nova mensagem de contato via site - " . ucfirst($tipo);
    
    // Nova formatação do corpo do email usando PHP_EOL para quebras de linha consistentes
    $message_body = array(
        str_repeat("=", 50),
        "NOVA MENSAGEM DE CONTATO",
        str_repeat("=", 50),
        "",
        "TIPO DE CONTATO: " . strtoupper($tipo),
        "NOME: " . $nome,
        "EMAIL: " . $email,
        "ASSUNTO: " . $assunto,
        "",
        "MENSAGEM:",
        str_repeat("-", 50),
        $mensagem,
        str_repeat("-", 50),
        "",
        "Enviado através do formulário de contato do site"
    );
    
    // Junta todas as linhas com quebra de linha apropriada
    $body = implode(PHP_EOL, $message_body);

    // Configura os headers para garantir a codificação correta
    $email_headers = 
    "From: $nome <$email>\r\n" . 
    "Reply-To: $email\r\n" . 
    "X-Mailer: PHP/" . phpversion() . "\r\n" . 
    "Content-Type: text/plain; charset=UTF-8\r\n" . 
    "MIME-Version: 1.0\r\n";

    // Tenta enviar o email
    if (mail($to, $subject, $body, $email_headers)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "Falha ao enviar email."]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Método inválido."]);
}
?>