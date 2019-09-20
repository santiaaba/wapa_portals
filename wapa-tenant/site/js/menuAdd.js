function menuAdd_init(data){
	/* data es un array donde cada elemento consta de tres campos
 		nombre: Nombre a mostrar
		img: Imagen a mostrar
		accion: accion a mostrar
 	*/
	/* Iniciamos el tamano */
	$("#menuAdd").css("top",$( window ).height())
	$("#menuAdd").css("height",$( window ).height())
	$("#add").on("click",function(){
		menuAdd_show()
	})

	for(var key in data){
		$("#menuAdd_main").append("<div class=\"menuAdd_item\" onclick=\"form_add_user('menuAdd_data')\"><span><img src=\"images/" +
		data[key][1] + "\"></span><span style=\"padding-left:20px\">" +
		data[key][0] + "</span></div>")
	}
}

function menuAdd_add_extra(section_name,name,data){
	/* Agrega opciones particulares al menu. */
	$("#menuAdd_extras").append("<div id=\"" + section_name + "\" class=\"menuAdd_add\">" + name + "</div>")
	for(var key in data){
		$("#menuAdd_add").append("<div class=\"menuAdd_item\" onclick=\"form_add_user('menuAdd_data')\"><span><img src=\"images/" +
		data[key][1] + "\"></span><span style=\"padding-left:20px\">" +
		data[key][0] + "</span></div>")
	}
}

function menuAdd_del_all(section_name){
	$("#menuAdd_extras").empty();
}

function menuAdd_del(section_name){
	$("#menuAdd_extras").remove(section_name);
}

function menuAdd_show(){
	$("#menuAdd_icon").off("click")
	//alert("altura: " + $( window ).height())
	$("#menuAdd").animate({
		//height: "+=" + $( window ).height(),
		top: "-=" + $( window ).height(),
		},{
		done: function(){
			$("#menuAdd_menu").children().addClass('hover')
			$(window).keydown(function(e){
				if(e.key === "Escape"){
					menuAdd_hidden()
				}
			})
		}
	})
}

function menuAdd_hidden(){
	$(window).unbind("keydown")
	$("#menuAdd_icon").on("click",function(){
		menuAdd_show()
	})
	$("#menuAdd_data").empty()
	$("#menuAdd").animate({
		top: "+=" + $( window ).height(),
		//height: "-=" + $( window ).height(),
		},{
		start: function(){
			$("#menuAdd_menu").children().removeClass('hover')
			}
		}
	)
}
