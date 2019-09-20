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

function user_site_list($user_id){
	/* La API no ofrece una llamada para listar los sitios de un usuario. Hay que realziar
	   dos pasos.
	   1° obtener las suscripciones del usuario
	   2° obtener los sitios de cada suscripcion
	*/

	$curl = curl_init("http://$api_admin_url:$api_admin_port/user/$user_id/susc");
	curl_setopt($curl,CURLOPT_RETURNTRANSFER,1);
	$result = curl_exec($curl);
	curl_close($curl);

	if($result){
		$obj = json_decode($result);
		$datos = task_get($api_admin_url,$api_admin_port,$obj->{'task'});
		$obj = json_decode($datos);
		/* Por cada suscripcion solicitamos los sitios */
		while(1 == 2){
			$curl = curl_init("http://$api_admin_url:$api_admin_port/user/$user_id/susc");
			curl_setopt($curl,CURLOPT_RETURNTRANSFER,1);
			$result = curl_exec($curl);
			curl_close($curl);
			if($result){
				$obj = json_decode($result);
				$datos = task_get($api_admin_url,$api_admin_port,$obj->{'task'});
				$obj = json_decode($datos);
				echo "IMPLEMENTAR!!!!!!!!!!!!!!";
			} else {
				echo "{\"code\":\"500\",\"info\":\"API no responde\"}";
				break;
			}
		}
	} else {
		echo "{\"code\":\"500\",\"info\":\"API no responde\"}";
	}
}

/* Main */

switch ($_GET['action']){
	case 'plan_list':
		task_get_send($api_admin_url,"plans");
		break;
	case 'user_list':
		task_get_send($api_admin_url,"users");
		break;
	case 'cloud_list':
		task_get_send($api_admin_url,"clouds");
		break;
	case 'cloud_info':
		task_get_send($api_admin_url,"clouds/" . $_GET['id']);
		break;
	case 'user_info':
		task_get_send($api_admin_url,"users/" . $_GET['id']);
		break;
	case 'server_list':
		task_get_send($api_admin_url,"webhosting/" . $_GET['id'] . "/servers");
		break;
	case 'user_site_list':
		user_site_list($_GET['id']);
		break;
	case 'user_susc':
		task_get_send($api_admin_url,"users/" . $_GET['id'] . "/susc");
		break;
	case 'site_list':
		task_get_send($api_admin_url,"webhosting/" . $_GET['id'] . "/sites");
		break;
	case 'plan_list':
		task_get_send($api_admin_url,"plans/" . $_GET['id']);
		break;
	default:
		echo "error";
}
?>
