<?php

	/*if (isset($_POST['submit'])) {*/

		$host="localhost";
		$dbAgnecy="agnecypage";
		$user="root";
		$password="Edvayzer1";
		$options=array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
		$dsn="mysql:host=$host;dbname=$dbAgnecy";
		try {

		$linkDB = new PDO($dsn, $user, $password,$options);

		$linkCheck=$linkDB->prepare('SELECT * FROM subscribers WHERE email=?');
		$linkCheck->execute(array($_POST['email']));
		$selRow=NULL;
		$selRow = $linkCheck->fetch();

		if ($_POST['email']==$selRow['email']) {
			echo "Your email " . $_POST['email'] ." already subsribed";
			
			
	/*$linkPrep=$linkDB->prepare("SELECT id FROM subscribers where email=?");
	echo "Your id in database is " . $linkPrep->execute(array('vlas.d78@gmail.com'));*/
 $linkCheck=NULL;
	$linkDB=NULL;} else {
	$linkCheck=NULL;

	$linkPrep=$linkDB->prepare("INSERT INTO subscribers (email) VALUES (?)");
	
	$linkPrep->execute(array($_POST['email']));
		$linkPrep=NULL;
		$linkDB=NULL;
		echo "Your email " . $_POST['email'] . " successfully subscribed !";
}
}

catch (PDOException $error) {
	echo "Error occures" . $error.getMessage();
}
/*} else {
	echo "Hi, it was not submitted !"; }*/
	?>
