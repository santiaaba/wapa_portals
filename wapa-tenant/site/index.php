<?php

include "../php/genericas.php";

?>
<HTML>
	<HEAD>
		<script src="js/jquery-3.3.1.min.js"></script>
		<script src="js/jquery-ui.min.js"></script>
		<script src="js/config.js"></script>
		<script src="js/tasks.js"></script>
		<script src="js/listado.js"></script>
		<script src="js/funciones.js"></script>
		<script src="js/sidenav.min.js"></script>
		<script src="js/solapas.js"></script>
		<script src="js/menuAdd.js"></script>
		<script src="js/action_menu.js"></script>

		<link rel="stylesheet" type="text/css" href="css/sidenav.css">
		<link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css">
		<link rel="stylesheet" type="text/css" href="css/jquery-ui.structure.min.css">
		<link rel="stylesheet" type="text/css" href="css/jquery-ui.theme.css">
		<link rel="stylesheet" type="text/css" href="css/estilos.css">
		<link rel="stylesheet" type="text/css" href="css/listado.css">
		<link rel="stylesheet" type="text/css" href="css/menu_acciones.css">
		<link rel="stylesheet" type="text/css" href="css/menu_iz.css">

		<script>
			var dialog
			$(function(){inicializar()})
		</script>

	</HEAD>
	<BODY>

		<!-- Para el popup -->
		<div id="dialog-form"></div>

		<!-- Pagina principal -->
		<div id="container" class="mainGrid">
			<div class="header"> Tenant </div>

			<div id="menu_izquierda" class="menu_izquierda"></div>

			<div id="add" class="add"> <img src="images/add.png"> </div>

			<div id="body" class="body"></div>
		</div>

		<!-- Para el div del menu de adicion -->
		<div id="menuAdd" class="menuAdd">
                	<div id="menuAdd_menu" class="menuAdd_menu">
				<div id="menuAdd_main"></div>
				<div id="menuAdd_extras"></div>
			</div>
			<div id="menuAdd_data" class="menuAdd_data"></div>
		</div>

		<!-- Para los mensajes -->
		<div class="notif" id="notif">
			<div class="notif_indicador noselect ui-corner-top" id="notif_indicador">
				Mensajes
			</div>
			<div class="notif_contenido" id="notif_contenido">
				<img src="images/cancelar.png" onclick="remove_all()">
			</div>
		</div>
	</BODY>
</HTML>
