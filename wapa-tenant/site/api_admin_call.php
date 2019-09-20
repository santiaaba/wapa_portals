<?php

include "../etc/config.php";

function task_get($api_admin_url,$task_id){
	/* Solicita al core el resultado de un task */
	$endloop = 0;	// No tenemos aun el resultado
	$times = 10;

	while(!$endloop && $times > 0){
		$curl = curl_init($api_admin_url . "/task/" . $task_id);
		curl_setopt($curl,CURLOPT_RETURNTRANSFER,1);
		$result = curl_exec($curl);
		$obj = json_decode($result,true);
		if(!$obj)
			echo "{\"code\":\"500\",\"info\":\"JSON code error\"}";
		if($obj{'status'} == "waiting" or $obj{'status'} == "todo"){
			sleep(2);
			$times--;
		} else {
			$endloop = 1;
		}
		curl_close($curl);
	}
	if($obj{'status'}== "done"){
		return json_encode($obj{'data'});
	} else {
		echo "NO<BR>";
	}
}

function task_get_send($api_admin_url,$string){

	$curl = curl_init("$api_admin_url/$string");
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,1);
	$result = curl_exec($curl);
	curl_close($curl);

	if($result){
		$obj = json_decode($result);
		//echo "Buscando resultado " + $obj->{'task'} + "\n";
		echo task_get($api_admin_url,$obj->{'task'});
	} else {
		echo "{\"code\":\"500\",\"info\":\"API no responde\"}";
	}
}

/* Main */

switch ($_GET['action']){
	case 'user_info':
		task_get_send($api_admin_url,"users/" . $_GET['id']);
		break;
	case 'user_site_list':
		user_site_list($_GET['id']);
		break;
	case 'user_susc':
		task_get_send($api_admin_url,"users/" . $_GET['id'] . "/susc");
		break;
	default:
		echo "error";
}
?>
