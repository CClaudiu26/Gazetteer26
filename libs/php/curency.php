


<?php



$url = 'https://api.exchangeratesapi.io/latest?base=' . $_REQUEST['base'] . '';



$ch = curl_init();

curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL,$url);


$result = curl_exec($ch);


curl_close($ch);

	

$decode = json_decode($result,true);	

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
    $output['data'] = $decode;
    
    echo json_encode($output); 

	






?>