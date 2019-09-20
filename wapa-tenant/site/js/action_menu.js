function action_menu_create(padre,item_id,acciones){
	/* Crea un menu de acciones donde:
  		padre: es el id del contenedor
  		item_id: es el id que identifica el item al cual aplicarle la accion
  		acciones: es array de estructuras {"nombre": string nombre de la accion,
					           "imagen": string path de la imagen,
					           "funcion: funcion de la accion que espera
					                     recibir el item_id}
	*/
	
	$("#" + padre).empty()
	$("#" + padre).append("<div id='menu_acciones_main' class='menu_acciones_main'></div>")
	
	$.each(acciones,function(index,value){
		var rid = Math.floor(Math.random() * 100000) + 1
		$("#menu_acciones_main").append("<div id='action" + rid + "'><img src='" +
		value.imagen + "'><BR>" + value.nombre + "</div>")

		$("#action" + rid).on("click",function(event){
			value.funcion.apply(this,[item_id])
		})
	})
}

function action_menu_add(contenedor,item_id,image,f,p){
	/* Donde f es una funcion y p un array de parametros */
	alert("action menu add");
	$("#" + contenedor).append("<div id=\"" + contenedor + "_" + item_id + "\"><img src=\"" + image + "\"></div>")
	$("#" + contenedor + "_" + item_id).on("click",p,f)
}

function action_menu_del(contenedor,item_id){
	alert("action menu del");
	$("#" + contenedor + "_" + item_id).remove()
}
