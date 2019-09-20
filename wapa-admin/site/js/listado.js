function listado_crear(padre,nombre,columnas,datos,select,argSelect){
	/* padre: Nombre objeto padre donde se creara el listado. Generalmente un <div>*/
	/* nombre: Nombre del listado */
	/* columnas: array asociativo donde la key es el nombre de la columna y el valor es el nombre del dato dentro de datos */
	/* datos: Array de array con los datos del listado. Deben cotener si o si un campo id para la funcion click*/
	/* select: funcion a llamar cuando se selecciona una fila*/
	/* argSelect: array de argumentos para la funcion select. Se le concatena al inicio el id del elemento seleccionado */

	aux = "<table><tr>"
	for(var key in columnas){
		aux = aux + "<td>" + key + "</td>"
	}
	aux = aux + "</tr></table>"

	$("#" + padre).append("<div id=\"" + nombre + "\" class=\"listado\">" +
			     "<div class=\"listado-cabecera\">" +
				aux +
			     "</div>" +
			     "<div class=\"listado-cuerpo\">" +
				"<table id=\"listado-items-" + nombre + "\"></table>" +
			     "</div>" +
			     "<div id=\"listado-acciones-" + nombre + "\" class=\"listado-actions\">" +
			     "</div>" +
			  "</div>");

	var arrayLength = datos.length

	for(var i=0; i<arrayLength; i++){
		fila = ""
		id = datos[i].id
		for(var key in columnas){
			fila = fila + "<TD>" + datos[i][columnas[key]] + "</TD>"
		}
		$("#listado-items-" + nombre).append("<TR iid=\"" + id + "\" id=\"listado-item-" + nombre +
					"-" + id + "\">" + fila + "</tr>")

		$("#listado-item-" + nombre + "-" + id).on("click",{
			"pariente": "listado-acciones-" + nombre,
			"id":id,
			"select":select,
			"nombre":nombre,
			"argSelect": [id].concat(argSelect)
			},function(event){
				nombre = event.data.nombre
				id = event.data.id
				$("#listado-items-" + nombre + " tr").removeClass("listado-selected")
				$("#listado-item-" + nombre + "-" + id).addClass("listado-selected")
				event.data.select.apply(this,event.data.argSelect)
			}
		)
	}
}

function listado_change_actions(nombre,id,select){
	/*Desseleccionamos en alterior */
	$("#listado-items-" + nombre + " tr").removeClass("listado-selected")

	/*seleccionamos el actual */
	$("#listado-item-" + nombre + "-" + id).addClass("listado-selected")

	/* llamamos a la funcion de seleccion */
	window[select](id,nombre)
}
