<?php
$_POST = json_decode(file_get_contents("php://input"), true); // эта строка позволяла работь с JSON в XMLRequest
echo var_dump($_POST);