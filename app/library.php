<?php
function addSubscriber($linkDB,$email) {
	
	$linkPrep=$linkDB->prepare("INSERT INTO subscribers (email) VALUES (?)");
	$linkPrep->execute(array($email));
	$linkPrep->close();

?>