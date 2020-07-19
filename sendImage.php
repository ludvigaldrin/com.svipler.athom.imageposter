<?php

ini_set("log_errors", 1);
ini_set("error_log", "sendImage-error.log");

$id = uniqid();
$file = 'sendImage-log.txt';
file_put_contents($file, "\n" . date("h:i:sa") . " (" . $id . ") " . "-> Start Receive", FILE_APPEND | LOCK_EX);

if (isset($_FILES['image'])) {
    $errors = array();
    //$file_name = $_FILES['image']['name'];

    $file_size = $_FILES['image']['size'];
    $file_tmp = $_FILES['image']['tmp_name'];
    $file_type = $_FILES['image']['type'];
    $file_ext = strtolower(end(explode('.', $_FILES['image']['name'])));

    $file_name = time() . "-" . $id . "." . $file_ext;

    $extensions = array("jpeg", "jpg", "png");

    if (in_array($file_ext, $extensions) === false) {
        $errors[] = "extension not allowed, please choose a JPEG or PNG file.";
    }
/**
if ($file_size > 2097152) {
$errors[] = 'File size must be excately 2 MB';
}
 **/
    if (empty($errors) == true) {
        move_uploaded_file($file_tmp, "images/" . $file_name);
        file_put_contents($file, "\n" . date("h:i:sa") . " (" . $id . ") " . "-> Success: File Uploaded: " . $file_name, FILE_APPEND | LOCK_EX);
        echo "Success";
    } else {
        file_put_contents($file, "\n" . date("h:i:sa") . " (" . $id . ") " . "-> Error: " . $errors, FILE_APPEND | LOCK_EX);
        echo "Error";
    }
} else {
    file_put_contents($file, "\n" . date("h:i:sa") . " (" . $id . ") " . "-> Error: No Image attached", FILE_APPEND | LOCK_EX);
    echo "Error";
}

file_put_contents($file, "\n" . date("h:i:sa") . " (" . $id . ") " . "-> End Receive", FILE_APPEND | LOCK_EX);
