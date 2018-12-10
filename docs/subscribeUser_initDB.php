<?php

try { 
	$host="localhost;dbname=test1";
	$user="root";
	$password="Edvayzer1";
	$options=array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
	$linkDB = new PDO("mysql:host=$host", $user, $password,$options);
	$sql = file_get_contents("data/init.sql");
	$linkDB->exec($sql);

	echo "It was done without problem ! Yeahh !";

}  catch (PDOException $error) {
      
    echo $error->getMessage();
}
	?>
