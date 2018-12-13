<?php
	$recepEmail = $_POST['mail'];
	$fName = $_POST['fname'];
	$msg = $_POST['msg'];
	$subject = "Message from User ( Website's contact-form )";
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= "Content-type:multipart/form-data;charset=UTF-8" . "\r\n";
	$headers .= 'From: '. $recepEmail . "\r\n";
	$to = "vlas.d78@gmail.com";
	$msg = "Mail from {$fName}" . "\r\n" . $msg;

	mail($to, $subject, $msg, $headers);
?>