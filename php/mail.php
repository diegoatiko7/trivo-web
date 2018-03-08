<?php
require 'PHPMailer/PHPMailerAutoload.php';

$mail = new PHPMailer;

parse_str($_POST['data'], $params);

$mail->isSMTP();
$mail->Host = 'smtp.mailgun.org';
$mail->SMTPAuth = true;
$mail->Username = 'postmaster@connectiplyapp.com';
$mail->Password = 'a7dcc7f89f1b153dc64b604db97a23a5'; 
$mail->SMTPSecure = 'tls';
$mail->Port = 587;

$mail->From = 'admin@trivo.net';
$mail->FromName = 'trivo';

$mail->addAddress('admin@trivo.net');
$mail->isHTML(true);

$body = '<p>Nombre: '.$params['name'].'</p>'.
		'<p>E-mail: '.$params['email'].'</p>'.
		'<p>Telefono: '.$params['phone'].'</p>'.
		'<p>Mensaje: '.$params['message'].'</p>';

$mail->Subject = 'Persona interesada';
$mail->Body    = utf8_decode($body);

if(!$mail->send()) {
    echo json_encode(array('error','Su mensaje no pudo ser enviado'));
} else {
    echo json_encode(array('success','Su mensaje ha sido enviado exitosamente!'));
}