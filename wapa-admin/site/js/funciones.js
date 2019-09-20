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

	/* Creamos el menu de la izquierda */
	var items = [
			{"name" : "Nubes",
			 "img" : "images/menu_nubes.png",
			 "action" : pantalla_listaNubes,
			 "params" : null},

			{"name" : "Usuarios",
			 "img" : "images/menu_usuarios.png",
			 "action" : pantalla_listaUsuarios,
			 "params" : null},

			{"name" : "Planes",
			 "img" : "images/menu_planes.png",
			 "action" : pantalla_listaPlanes,
			 "params" : null}
		    ]
	make_menu_iz(items)

	/* Inicializamos el menu de agregado */
	var datos = [["Usuario","menu_usuarios.png","form_add_user"],["Planes","menu_planes.png","form_add_plan"]]
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

function modal_susc_del(event){
	alert("modal_susc_del = " + event.data.susc_id)
	$( "#dialog-form" ).attr("title","Borrar suscripcion")
	dialog = $( "#dialog-form" ).dialog({
		autoOpen: false,
		height: 200,
		width: 300,
		modal: true,
		buttons: {
			"Aceptar": function(){ $(this).dialog("close"); del_susc(event.data.user_id,event.data.susc_id)}
			},
		Cancel: function(){$(this).dialog("close")}
	})
	$("#dialog-form").empty();
	$("#dialog-form").append("<div>Esta seguro de borar la suscripcion y todos sus datos?</div>");
	dialog.dialog( "open" )
}

function modal_user_del(event){
	alert("modal_user_del = " + event.data.user_id)
	$( "#dialog-form" ).attr("title","Borrar usuario")
	dialog = $( "#dialog-form" ).dialog({
		autoOpen: false,
		height: 200,
		width: 300,
		modal: true,
		buttons: {
			"Aceptar": function(){ $(this).dialog("close"); del_user(event.data.user_id)}
			},
		Cancel: function(){$(this).dialog("close")}
	})
	$("#dialog-form").empty();
	$("#dialog-form").append("<div>Esta seguro de borar el usuario y todos sus datos?</div>");
	dialog.dialog( "open" )
}

function modal_susc_add(event){
	$( "#dialog-form" ).attr("title","Agregar suscripcion")
	dialog = $( "#dialog-form" ).dialog({
		autoOpen: false,
		height: 200,
		width: 300,
		modal: true,
		buttons: {
			"Aceptar": function(){ $(this).dialog("close"); susc_add()}
			},
		Cancel: function(){$(this).dialog("close")}
	})
	$("#dialog-form").empty();
	$("#dialog-form").append("Agregamos suscripcion");
	$("#dialog-form").append("<form><fieldset id=\"dialog-form-fields\"></fieldset></fieldset></form>")
	$("#dialog-form-fields").append("<input type=\"hidden\" id=\"user_id\" value=\"" + event.data.user_id + "\">")
	$("#dialog-form-fields").append("<label for=\"name\">Plan</label><BR>")
	$("#dialog-form-fields").append("<select id=\"select_plans\"></select>")
	$("#dialog-form-fields").append(select_plans())
	dialog.dialog( "open" )
}

function modal_user_pass(user_id){
	dialog = $( "#dialog-form" ).dialog({
		autoOpen: false,
		height: 600,
		width: 350,
		modal: true,
		buttons: {
			"Aceptar": change_user_password
		}
	})
	$("#dialog-form").empty();
	$("#dialog-form").append("<form><fieldset id=\"dialog-form-fields\"></fieldset></fieldset></form>")
	$("#dialog-form-fields").append("<label for=\"name\">Password</label><BR>")
	$("#dialog-form-fields").append("<input type=\"password\" name=\"name\" id=\"name\" class=\"text ui-widget-content ui-corner-all\"><BR>")
	$("#dialog-form-fields").append("<label for=\"name\">Password Again</label><BR>")
	$("#dialog-form-fields").append("<input type=\"password\" name=\"name\" id=\"name\" class=\"text ui-widget-content ui-corner-all\">")
      	dialog.dialog( "open" )
}


/*********************************
 *	FORMS ADD		 *
 *********************************/
function form_add_user(parental){
	$("#" + parental).empty()
	$("#" + parental).append("<form>" + 
			 "<div class=\"form-row\">" +
			 "<div class=\"form-label\">Username</div><div class=\"form-input\">" +
			 "<input class=\"text ui-widget-content ui-corner-all\" type=\"text\" name=\"name\" id=\"name\"></div>" + 
			 "</div>" +

			 "<div class=\"form-row\">" +
			 "<div class=\"form-label\">Email</div><div class=\"form-input\">" +
			 "<input class=\"text ui-widget-content ui-corner-all\" type=\"text\" name=\"email\" id=\"email\"></div>" + 
			 "</div>" +
			
			 "<div class=\"form-row\">" +
			 "<div class=\"form-label\">Contrase&ntilde;a</div><div class=\"form-input\">" +
			 "<input class=\"text ui-widget-content ui-corner-all\" type=\"text\" name=\"pass\" id=\"pass\"></div>" + 
			 "</div>" +
			 
			 "<div class=\"form-row\">" +
			 "<div class=\"form-label\">Reingrese contrase&ntilde;a</div><div class=\"form-input\">" +
			 "<input class=\"text ui-widget-content ui-corner-all\" type=\"text\" name=\"pass2\" id=\"pass2\"></div>" + 
			 "</div></div>" +
			 "<div class=\"form-button\"><button onClick=\"add_user()\">Agregar</div>" + 
			 "</form>")

}


function form_add_plan(){
}

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

function lista_planes(){
	/* Genera el listado de planes */
	$.ajax({
		type: "GET",
		url: webpage + "/api_admin_call.php?action=plan_list",
		beforeSend: function(){
			$("#body").empty();
			$("#body").append("<img id=\"wait_user_list\" src=\"images/wait.gif\" style=\"width:60px\">");
		},
		success : function(data){
			var obj = JSON.parse(data)
			if(!obj){
				alert("ERROR")
			} else {
				$("#body").empty()
				var acciones = []
				/*
				acciones[0] = {"name": "del_user","icon":"images/trash.png","onclick":"del_user"}
				acciones[1] = {"name": "change_user_pass","icon":"images/password.png","onclick":"change_user_pass"}
				*/
				listado_crear("body","lista_planes",{"Nombre":"name","Estado":"status"},obj.info,{},planes_actions)
			}
		},
		error: function(){alert("task_id: ERROR AJAX" + webpage + "/api_admin_call.php?action=plan_list")}
	})
}

function lista_servers_cloud(cloudid){
	$.ajax({
		type: "GET",
		url: webpage + "/api_admin_call.php?action=server_list&id=" + cloudid,
		beforeSend: function(){
			$("#body").empty();
			$("#body").append("<img id=\"wait_clud_list\" src=\"images/wait.gif\" style=\"width:60px\">");
		},
		success : function(data){
			var obj = JSON.parse(data)
			if(!obj){
				alert("ERROR")
			} else {
				$("#body").empty()
				if(obj.code == "200"){
					var acciones = []
					listado_crear("body","lista_servers",{"Nombre":"name","Rol":"rol","Status":"status"},obj.info,null,null)
				} else {
					alert("error en nube")
				}
			}
		},
		error: function(){alert("task_id: ERROR AJAX" + webpage + "/api_admin_call.php?action=server_list")}
	})

}
function lista_sitios_cloud(cloudid){
	$.ajax({
		type: "GET",
		url: webpage + "/api_admin_call.php?action=site_list&id=" + cloudid,
		beforeSend: function(){
			$("#body").empty();
			$("#body").append("<img id=\"wait_site_list\" src=\"images/wait.gif\" style=\"width:60px\">");
		},
		success : function(data){
			var obj = JSON.parse(data)
			if(!obj){
				alert("ERROR")
			} else {
				$("#body").empty()
				if(obj.code == "200"){
					var acciones = []
					listado_crear("body","lista_sitios",{"Nombre":"name","Estado":"status"},obj.info,site_actions)
				} else {
					alert("error en nube")
				}
			}
		},
		error: function(){alert("task_id: ERROR AJAX" + webpage + "/api_admin_call.php?action=site_list")}
	})

}



function user_info(user_id){

	$("#body").empty()
	$("#body").append("<div id=\"menu_h_contenedor\" class=\"menu_h_contenedor\"></div><div id=\"data\" class=\"data\"></div>");

	submenu("menu_h_contenedor",{"Info":"user_info2","Suscripciones":"lista_suscripciones","Sitios":"lista_sitios_user"},user_id)
}

function user_info2(user_id){
	/* Arma el formulario con todos los datos del usuario */
	$.ajax({
		type: "GET",
		url: webpage + "/api_admin_call.php?action=user_info&id=" + user_id,
		beforeSend: function(){
			$("#data").empty();
			$("#data").append("<img id=\"wait_user_list\" src=\"images/wait.gif\">");
		},
		success : function(data){
			var obj = JSON.parse(data)
			if(!obj){
				alert("ERROR")
			} else {
				$("#data").empty();
				$("#data").append("<INPUT value=\"" + obj.name + "\">")
				$("#data").append("<INPUT value=\"" + obj.email + "\">")
			}
		},
		error: function(){alert("task_id: ERROR AJAX")}
	})
}

function lista_suscripciones(user_id){
	$.ajax({
		type: "GET",
		url: webpage + "/api_admin_call.php?action=user_susc&id=" + user_id,
		beforeSend: function(){
			$("#data").empty();
			$("#data").append("<img id=\"wait_site_list\" src=\"images/wait.gif\" style=\"width:60px\">");
		},
		success : function(data){
			//alert(data)
			var obj = JSON.parse(data)
			if(!obj){
				alert("ERROR")
			} else {
				$("#data").empty()
				if(obj.code == "200"){
					var acciones = []
					listado_crear("data","lista_susc",{"Nombre":"name","Plan":"plan_name","Estado":"status"},obj.info,susc_actions)

					/* Armamos el menu de acciones sobre las suscripciones */
					action_menu_add("lista_susc",
							"susc_add",
							"images/add.png",
							modal_susc_add,
							{"user_id":user_id})
				} else {
					alert("error en nube")
				}
			}
		},
		error: function(){alert("task_id: ERROR AJAX" + webpage + "/api_admin_call.php?action=user_susc&id=" + user_id)}
	})
}

/****************************************
 * 		PANTALLAS		*
 * 	Crea las distintas pantallas    *
 * 	segun las acciones		*
****************************************/

function pantalla_listaUsuarios(){

	/* Crea la pantalla que muestra el listado
 	 * de usuarios */
	$("#body").empty()
	$("#body").append("<div id='pLista'></div>")
	ajax_listado(	"lista_suarios",
			"pLista",
			"/api_admin_call.php?action=user_list",
			user_actions,
			{"Nombre":"name","Email":"email","Estado":"status"},
			["acciones_lista_usuarios"])
	$("#body").append("<div id='acciones_lista_usuarios'></div>")
}

function pantalla_listaNubes(){
	$("#body").empty()
	$("#body").append("<div id='pLista'></div>")
	ajax_listado(	"lista_nubes",
			"pLista",
			"/api_admin_call.php?action=cloud_list",
			cloud_actions,
			{"Nombre":"name","Email":"email","Estado":"status"},
			["acciones_lista_nubes"])
	$("#body").append("<div id='acciones_lista_nubes'></div>")
}
 
function pantalla_listaPlanes(){
	$("#body").empty()
	$("#body").append("<div id='pLista'></div>")
	ajax_listado(	"lista_planes",
			"pLista",
			"/api_admin_call.php?action=plan_list",
			null,
			{"Nombre":"name","Estado":"status"},
			["acciones_lista_planes"])
	$("#body").append("<div id='acciones_lista_planes'></div>")
}

function pantalla_nube(cloud_id){
	$("#body").empty()

	$.ajax({
		type: "GET",
		url: webpage + "/api_admin_call.php?action=cloud_info&id=" + cloud_id,
		beforeSend: function(){
			$("#contuserlist").empty();
			$("#contuserlist").append("<img id=\"wait_user_list\" src=\"images/wait.gif\">");
		},
		success : function(data){
			var obj = JSON.parse(data)
			if(!obj){
				alert("ERROR")
			} else {
				/* Armamos la pantalla */
				$("#body").append('<div id="solapas"></div><div id="contenido_solapa" style="padding-top:10px"></div>')
				solapas_init("solapas",[
					{"nombre":"Info",
					 "funcion":infoCloud,
					 "args":["contenido_solapa",cloud_id]},
					{"nombre":"Servidores",
					 "funcion":servidoresCloud,
					 "args":["contenido_solapa",cloud_id]},
					{"nombre":"Sitios",
					 "funcion":sitiosCloud,
					 "args":["contenido_solapa",cloud_id]}
				])
			}
		},
		error: function(){alert("task_id: ERROR AJAX")}
	})
}

function sitiosCloud(padre,cloud_id){
	alert("Implementar. Cloudid=" + cloud_id)
}

function infoCloud(padre,cloud_id){
	alert("Implementar. Cloudid=" + cloud_id)
}

function servidoresCloud(padre,cloud_id){
	$("#" + padre).empty()
	$("#" + padre).append("<div id='lista_servidores'></div><div id='acciones_lista_servers'></div>")
	ajax_listado(	"servers",
			"lista_servidores",
			"/api_admin_call.php?action=server_list&id=" + cloud_id,
			server_actions,
			{"Nombre":"name","Rol":"rol","Estado":"status"},
			["acciones_lista_servers"])
}

/****************************************
 * 		ACCIONES		*
 ****************************************/

function server_actions(server_id,pariente){
	action_menu_create(pariente,server_id,[
		{"nombre":"info","imagen":"images/info.png","funcion":null},
		{"nombre":"stop","imagen":"images/stop.png","funcion":null},
		{"nombre":"start","imagen":"images/start.png","funcion":null}
	])
}

function susc_actions(data,pariente){
	action_menu_del(pariente,"susc_del")
	action_menu_add(pariente,"susc_del","images/trash.png",modal_susc_del,{"user_id":data.user_id,"susc_id":data.susc_id})
}

function user_actions(user_id,pariente){
	action_menu_create(pariente,user_id,[
		{"nombre":"info","imagen":"images/info.png","funcion":null},
		{"nombre":"borrar","imagen":"images/trash.png","funcion":null},
		{"nombre":"password","imagen":"images/password.png","funcion":null}
	])
}

function cloud_actions(cloud_id,pariente){
	action_menu_create(pariente,cloud_id,[
		{"nombre":"info","imagen":"images/info.png","funcion":pantalla_nube}
	])
}

function susc_del(user_id,susc_id){
	$.ajax({
		type: "DELETE",
		url: apiurl + "/users/" + user_id + "/susc/" + susc_id,
		success: function(data){apiRespons(data,"Borrado suscripcion")}
	})
}

function del_user(user_id){
	//dialog.dialog( "close")

	$.ajax({
		type: "DELETE",
		url: apiurl + "/users/" + user_id,
		success: function(data){apiRespons(data,"Borrado usuario")}
	})
}

function apiRespons(data,task_name){
	var obj = JSON.parse(data)
	if(!obj){
		alert("ERROR: " + data)
	 } else {
		if(obj.status == "TODO"){
			showmessages()
			add_task(obj.task,task_name)
		} else if(obj.status == "ERROR"){
			alert(obj.data)
		}
	}
}

function susc_add(){
	plan_id = $("#select_plans").val()
	user_id = $("#user_id").val();
	alert("Agregando plan " + plan_id + " al usuario " + user_id);
	$.ajax({
		type: "POST",
		url: apiurl + "/users/" + user_id + "/susc",
		data: { "plan_id":plan_id , "user_id":user_id},
		success: function(data){apiRespons(data,"Alta suscripcion")}
	})
}

function add_user(){
	/* Enviamos el alta del usuario */
	/* Agregamos la tearea */
	name = $("#name").val()
	pass = $("#pass").val()
	email = $("#email").val()
	menuAdd_hidden()
	//alert(name + " | " + pass + " | " + email);
	$.ajax({
		type: "POST",
		url: apiurl + "/users",
		data: { "name":name , "pass":pass , "email":email},
		success: function(data){ apiRespons(data,"Alta usuario")},
		error: function(jqXHR, textStatus, errorThrown){ alert("Error add_user: " + textStatus + " | " + errorThrown) }
	})
}

function submenu(padre,opciones,id){

	aux = "<div id=\"menu_h\" class=\"menu_h\">"
	for(var key in opciones){
		aux = aux + "<span onclick=\"" + opciones[key] + "(" + id + ")\">" + key + "</a></span>"
	}
	aux = aux + "</div>"
	$("#" + padre).append(aux)
}

function select_plans(){
	/* Retorna el html de una seleccion de plan */
	$.ajax({
		type: "GET",
		url: webpage + "/api_admin_call.php?action=plan_list",
		beforeSend: function(){
		},
		success : function(data){
			var obj = JSON.parse(data)
			if(!obj){
				alert("ERROR")
			} else {
				$("#select_plans").empty();
				for(var key in obj.info){
					$("#select_plans").append("<option value=\"" + obj.info[key].id + "\">" + obj.info[key].name + "</option>");
				}
			}
		}
	})
}
