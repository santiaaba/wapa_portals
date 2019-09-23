function determinaNubes(){
	/* Determina el tipo de nubes que posee el usuario.
 	   Este dato es relevante por ejemplo para crear los menus */

	var nubes = [];

	$.ajax({
                type: "GET",
                url: webpage + "/users/" + UserId "/susc",
                success : function(data){
			/* De cada suscripcion determinarmos sus nubes */
			var obj = JSON.parse(data)
			$.each(obj.data,function(index,value){
				$.ajax({
					type: "GET",
					url: webpage + "/plans/" + planId,
					success : function(data){
						var obj2 = JSON.parse(data)
						$.each(obj2.data,function(index,value){
							nubes.add(value.tipo)
						})
					}
				})
			})
		}
	})
	return nubes
}

function make_menu_iz(items){
	
	/* items es una lista de tuplas con los siguietnes datos
 	   {	"name":<string nombre>,
		"img":<string imagen>,
		"action":funcion,
		"params":array de parametros para action
	   }
 	 */

	$("#menu_izquierda").append('<ul class="menuRoot" id="menu"></ul>')

	$.each(items,function(index,value){
		$("#menu").append('<li><a id="menu_' + value.name +
				  '"><div class="menuRoot_img"><img src="' + value.img +
				  '"></div><div class="menuRoot_text">' + value.name +
				  '</div></a></li>')

		$("#menu_" + value.name).on("click",
			value.params,
			function(event){
				value.action.apply(this,value.params)
			})
	})
}

function showmessages(){

	/* Anima la solapa de mensajes para que se muestre */

	if($("#notif").attr("show") == 0){
		$("#notif_indicador").off("click")
		$("#notif_indicador").on("click",function(){
			 hidemessages()
		})
		$("#notif").animate({
			bottom: "+=360",
		})
		$("#notif").attr("show",1)
	}
}

function hidemessages(){

	/* Anima la solapa de mensajes para que se oculte */

	if($("#notif").attr("show") == 1){
		$("#notif_indicador").off("click")
		$("#notif_indicador").on("click",function(){
			showmessages()
		})
		$("#notif").animate({
			bottom: "-=360",
		})
		$("#notif").attr("show",0)
	}
}

function inicializar(){

	/* Inicializa el sitio */

	/* Creamos el menu de la izquierda. Algunos items
 	   dependeran de la suscripcion del usuario. */
	var items = [
			{"name" : "Mi cuenta",
			 "img" : "images/persona.png",
			 "action" : pantalla_micuenta,
			 "params" : null},
		    ]
	make_menu_iz(items)

	/* Inicializamos el menu de agregado. Algunos de los items
           dependeran de las nubes a las que este suscripto el usuario */
	//var datos = [["Usuario","menu_usuarios.png","form_add_user"],["Planes","menu_planes.png","form_add_plan"]]
	var datos = []
	menuAdd_init(datos)

	/* Inicializacion del menu */
	$('[data-sidenav]').sidenav()

	/* Inicializacion de mensajes */
	$("#notif").attr("show",0)
	$("#notif_indicador").on("click",function(){
		showmessages()
	})

	/*Iniciamos el script que busca resutlados por API */
	setInterval(review_pending_tasks,5000)
}

/**********************************
 * 		MODALS		  *
**********************************/

/*********************************
 *	Llamadas a la API	 *
 *********************************/

function make_bottom_menu(prefix, myarray){
	$("#acciones").empty()
	var arrayLength = myarray.length
	for(var i=0; i<arrayLength; i++){
		$("#acciones").append("<DIV id=\"" + prefix + myarray[i] + "\" class=\"action\"><IMG src=\"images/" + myarray[i]+ ".png\"></DIV>")
	}
}

/*************************************
 * 		LISTADOS	     *
 *************************************/

function ajax_listado(nombre,contenedor,url,select,columnas,arg_select){
	/* Obtiene la informacion necesaria para armar un listado
	   y luego crea el listado */
	
	$.ajax({
		type: "GET",
		url: webpage + url,
		beforeSend: function(){
			$("#" + contenedor).empty();
			$("#" + contenedor).append("<img id=\"wait_clud_list\" src=\"images/wait.gif\" style=\"width:60px\">");
		},
		success : function(data){
			var obj = JSON.parse(data)
			if(!obj){
				alert("ERROR")
			} else {
				$("#" + contenedor).empty()
				if(obj.code == "200"){
					listado_crear(contenedor,nombre,columnas,obj.info,select,arg_select)
				} else {
					alert("Error de nube");
				}
			}
		},
		error: function(){alert("task_id: ERROR AJAX" + webpage + url)}
	})


}

/****************************************
 * 		PANTALLAS		*
 * 	Crea las distintas pantallas    *
 * 	segun las acciones		*
****************************************/

function pantalla_micuenta(){

	$("#body").empty()
	alert("Implementar")
}

/****************************************
 * 		ACCIONES		*
 ****************************************/
