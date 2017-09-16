<?php
header("Access-Control-Allow-Origin: *");

$content = $_POST["content"];
$name = $_POST["name"];
echo $content;
echo $name;
if (!empty($content)){
  $myfile = fopen($name, "w");
  fwrite($myfile, $content);
  fclose($myfile);
}
?>
