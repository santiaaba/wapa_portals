function solapas_init(padre,data){
	
	$("#" + padre).empty()
	$("#" + padre).append("<div id='solapas_main' class='solapas_main'></div>")

	$.each(data,function(index,value){
		var rid = Math.floor(Math.random() * 100000) + 1
		$("#solapas_main").append("<div id='solapa" + rid + "'>" + 
		value.nombre + "</div>")

		$("#solapa" + rid).on("click",function(event){
			value.funcion.apply(this,value.args)
		})
	})
}
