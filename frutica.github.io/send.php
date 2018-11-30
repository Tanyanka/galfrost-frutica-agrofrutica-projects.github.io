<?php
/**
 * Created by PhpStorm.
 * User: Admin
 * Date: 14.07.2018
 * Time: 23:39
 */



    // Only process POST reqeusts.
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Get the form fields and remove whitespace.
        $name = strip_tags(trim($_POST["name"]));
        $name = str_replace(array("\r","\n"),array(" "," "),$name);
        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
        $message = trim($_POST["message"]);
        $theme = trim($_POST["theme"]);

        // Check that data was sent to the mailer.
        if ( empty($name) OR empty($message) OR empty($theme) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // Set a 400 (bad request) response code and exit.
            http_response_code(400);
            echo "Oops! There was a problem with your submission. Please complete the form and try again.";
            exit;
        }

        // Set the recipient email address.
        // FIXME: Update this to your desired email address.

        //if ($theme == 'Запит на купівлю продукції' || 'Raw materials offer') {
        //    $recipient = "sales@galfrost.com.ua";
//
        //} else if($theme == 'Пропозиція постачання сировини та матеріалів' || 'Equipment offer'){
        //    $recipient = "ruslan@galfrost.com.ua";
//
        //} else if($theme == 'Пропозиція постачання обладнання' || 'Cooperation and services offer'){
        //    $recipient = "bohdan@galfrost.com.ua";
//
        //} else  {
        //    $recipient = "info@galfrost.com.ua";
//
        //}
        $recipient = "info@galfrost.com.ua";
        // Set the email subject.
        $subject = "New contact from $name";

        // Build the email content.
        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n\n";
        $email_content .= "Theme: $theme\n\n";
        $email_content .= "Message:\n$message\n";

        // Build the email headers.
        $email_headers = "From: $name <$email>";

        // Send the email.
        if (mail($recipient, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            http_response_code(200);
            echo "Дякуємо! Ваше повідомлення відправленно.";
        } else {
            // Set a 500 (internal server error) response code.
            http_response_code(500);
            echo "Щось пішло не так. Спробуйте пізніше.";
        }

    } else {
        // Not a POST request, set a 403 (forbidden) response code.
        http_response_code(403);
        echo "Перевірте форму на наявність помилок.";
    }

?>