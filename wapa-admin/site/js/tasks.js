/* Array que representara los tasks */
/* Cada elemento del array es un array asociativo con los siguientes datos
 * 	task_id:   	id_del task tal como lo indica la API
 * 	operacion:	operacion del task
 * 	status:		estado actual del task
 * 	result:		resultado informado por la api
 * 	detalle:	etalles extra del resultado. No reportados por api
 */

var tasks = {}

function add_task(task_id,operacion){
	/* Agrega un task a la cola */
	var task = {"operacion":operacion, "status":"todo", "result":"", "detalle":""}
	tasks[task_id] = task
	//alert("agregamos" + task + "---" + task_id)

	/* Agregamos el task visiblemente a la lista de mensajes */
	$("#notif_contenido").append("<div class=\"task_tarea\" id=\"task_" + 
            task_id + "\"><div id=\"task_" + task_id + "_mensaje\" class=\"task_mensaje\">" + operacion +
	    "</div><div class=\"task_status\" id=\"task_" + task_id + "_status\"><img src=\"images/loading.gif\"></div></div>");
	
}

function remove_task(task_id){
	/* elimina el elemento indicado */
	//alert("eliminamos")
	$("#task_" + task_id).animate({
		opacity: 0.1
		},200, function(){
			$(this).remove();
		}
	)
	delete tasks[task_id]
}

function remove_all(){
	/* Elimina todos los mensajes */
	//alert("remove all")
	$.each(tasks, function(key, value){
		remove_task(key)
	})
}

function review_pending_tasks(){
	/* Recorre la cola. Por cada task que encuentra
	   consulta por API al servidor para conocer
	   el estado */
	//alert("Revisando")
	$.each(tasks, function(key, value) {
		//alert("Revisando " + key + " - " + value["status"])
		/* Si esta pendiente .... */
		if(value["status"] == "todo" ){
			/* Consultamos la API */
			$.ajax({
				type: "GET",
				url: apiurl + "/task/" + key,
				beforeSend: function(){
					//alert("chequeando " + key)
					value["status"] = "checking"
				},
				success: function(data){
					//alert(data)
					var obj = JSON.parse(data)
					if(!obj){
						alert("ERROR")
					} else {
						if(obj.status == "done"){
							value["status"] = "done"
							$("#task_" + key + "_status" ).replaceWith("<div class=\"task_status\">" + 
								"<img src=\"images/cancelar.png\" onclick=\"remove_task('" + key + "')\"></div>")
							$("#task_" + key + "_mensaje" ).append("<div class=\"task_resultado\">"+ obj.data.info + "</div>")
						} else if(obj.status == "INEXIST"){
							value["status"] = "done"
							$("#task_" + key + "_status" ).replaceWith("<div class=\"task_status\">" +
								"<img src=\"images/cancelar.png\" onclick=\"remove_task('" + key + "')\"></div>")
							$("#task_" + key + "_mensaje" ).append("<div class=\"task_resultado\">Tarea ya no existe</div>")
						} else {
							/* Sigue pendiente */
							value["status"] = "todo"
						}
					}
				},
				error: function(jqXHR,textStatus,errorThrown ){
					/* El task no existe */
					alert("El error: " + textStatus + " | " + errorThrown)
				}
			})
		}
	})
}
