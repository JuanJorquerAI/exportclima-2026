<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: contacto.html');
    exit;
}

$to      = 'jalamos@exportclima.cl';
$nombre  = strip_tags(trim($_POST['nombre']   ?? ''));
$empresa = strip_tags(trim($_POST['empresa']  ?? ''));
$email   = filter_var(trim($_POST['email']    ?? ''), FILTER_VALIDATE_EMAIL);
$telefono= strip_tags(trim($_POST['telefono'] ?? ''));
$servicio= strip_tags(trim($_POST['servicio'] ?? ''));
$industria=strip_tags(trim($_POST['industria']?? ''));
$mensaje = strip_tags(trim($_POST['mensaje']  ?? ''));

if (!$nombre || !$email) {
    header('Location: contacto.html?error=1');
    exit;
}

$subject = "=?UTF-8?B?" . base64_encode("Cotización ExportClima — {$nombre} ({$empresa})") . "?=";

$body = "Nueva solicitud de cotización desde exportclima.cl\n\n"
      . "Nombre:    {$nombre}\n"
      . "Empresa:   {$empresa}\n"
      . "Email:     {$email}\n"
      . "Telefono:  {$telefono}\n"
      . "Servicio:  {$servicio}\n"
      . "Industria: {$industria}\n\n"
      . "Mensaje:\n{$mensaje}\n";

$headers = implode("\r\n", [
    "From: no-reply@exportclima.cl",
    "Reply-To: {$email}",
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: 8bit",
]);

$sent = mail($to, $subject, $body, $headers);

header($sent ? 'Location: contacto.html?enviado=1' : 'Location: contacto.html?error=1');
exit;
