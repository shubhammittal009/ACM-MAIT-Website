<?php 
	$name = $_POST['name'];
	$email = $_POST['email'];
	$message = $_POST['message'];

	$to = "meghansh.work@gmail.com";
	$subject = "New Message from ".$name;

	$final_message = "Name: ".$name."\nEmail: ".$email."\nMessage: ".$message;

	if(mail($to, $subject, $final_message, "From: ".$name)){
		echo ("<p>Mail Sent.</p>");
	}
	else{
		echo ("<p>Email delivery failed…</p>");
	}

?>
