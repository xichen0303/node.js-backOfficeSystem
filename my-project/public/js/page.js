

function left_nav(){
	$(".wrap_ul").children().mouseenter(function(){
		$(this).css("background-color","#454545");
	}).mouseleave(function(){
		$(this).css("background-color","#575757");
	})
	$(".wrap_ul").children().click(function(){
		if( $(this).find("ul").css("display") == "block" ){
			$(this).css("background-color","#575757").find("ul").css("display","none");
		}else{
			$(this).css("background-color","#454545").find("ul").css("display","block");
			$(this).siblings().css("background-color","#575757").find("ul").css("display","none");
		}
	})

	$(".wrap_ul").children().find("li").click(function(e){
		e.stopPropagation?e.stopPropagation():e.cancelBubble = true;
		// $(this).parent().css("display","block");
		$(this).css("background-color","#797979").siblings().css("background-color","#575757");
	})

}
left_nav();



function right_nav(){
	$(".tab_div").find("span").click(function(){

		$index = $(this).index();
		$(this).addClass("tab-front").siblings().removeClass("tab-front");
		$(".tab_box1").eq($index).css("display","block")
					  .siblings(".tab_box1")
					  .css("display","none");
	})
}
right_nav();

