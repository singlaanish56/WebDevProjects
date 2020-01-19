//check off todos when clicked 
//on event can only be wriiten for a existing tag so defined on ul 
//but added a secong arg for dynamic li
$("ul").on("click","li",function(){
	$(this).toggleClass("completed");
});

//remove todos when cross is clicked
$("ul").on("click","span",function(event){
	$(this).parent().fadeOut(500,function(){
		$(this).remove();
	});//removes the li not the span
	event.stopPropagation();//stops event bubbling

});

//adding new todo from input
$("input[type='text']").keypress(function(event){
	if(event.which === 13){//13 for enter checks when enter is pressed
		var text = $(this).val();
		$(this).val("");//clear the input area	
		// create a new li with the text
		$("ul").append("<li><span><i class='fa fa-trash'></i></span>"+" "+text+"</li>");
	}
	

});

$(".fa-plus").click(function(){
	$("input[type='text']").fadeToggle();
});