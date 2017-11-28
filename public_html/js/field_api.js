/*

	Dynamic fields API 
	@Author Jhonatan S. Souza (jhonatan.souza@argoninformatica.com.br)
	27/11/2017

*/


/*
		
	createFields({ container : "#container", 
		fields : 
			[ {
				label : "Exemplo",
				input : "text",
				name : "nome",
				validate : true
			  } 
			],
		buttons : [
			{
				label : "Texto",
				click : function(e){
					
				}
			}
		]
	});
	
	
*/

function createFields(config){
	
	if(!isNullOrBlank(config.container)){
		
		
		$.each(config.fields, function(index, field){
			console.log(field);
			
			$(config.container).append("<div id='"+field.name+"_container' class='row'><label>"+field.label+"</label></div>");
			
			$("#"+field.name+"_container").append($("<input>", {
				label : field.label,
				type : field.input,
				name : field.name,
				validate : field.validate,
				class : 'form-control'
			}));

		});
		
		$.each(config.buttons, function(index, value){
			let id = value.label+"_"+index;
			$(config.container).append("<div style='margin-top : 2%; float : right;' class='row'><button id='"+id+"' class='btn btn-primary'>"+value.label+"</button></div>");
			
			$("#"+id).click(function(e){
				value.click();
				if(value.hasOwnProperty("ajax")){
					$.ajax({
						url : value.ajax.url,
						contentType : "application/json; utf-8",
						method : value.ajax.method,
						data : retrieveFormData(config.fields),
						success : function(data){
							value.ajax.success(data);
						},
						error : function(er){
							value.ajax.error(er);
						}
					});
				}
			});
		});
		
		
	}
	
}


function retrieveFormData(fields){

 var form = [];
 $.each(fields, function(index, value){
	let v = $("input[name="+value.name+"]").val();
	form[value.name] = v;
 });
	
 console.log(form);
 return form;
		
}

function isNullOrBlank(t){
		return t === null || t === "" || t === undefined;	
}