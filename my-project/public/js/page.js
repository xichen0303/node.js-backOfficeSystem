

function left_nav(){
	$(".wrap_ul").children().mouseenter(function(){
		$(this).css("background-color","#454545");
	}).mouseleave(function(){
		$(this).css("background-color","#575757");
	})
	$(".wrap_ul").children().click(function(){
		if( $(this).find("ul").css("display") == "block" ){
			$(this).removeClass("bgColor454545").css("background","#454545 url(../images/menu_1.png) 9px 0 no-repeat").find("ul").css("display","none");
		}else{
			$(this).addClass("bgColor454545").css("background","#454545 url(../images/menu1_1.png) 9px 0 no-repeat").find("ul").css("display","block");
			$(this).siblings().removeClass("bgColor454545").find("ul").css("display","none");
		}
	})

	$(".wrap_ul").children().find("li").click(function(e){
		e.stopPropagation?e.stopPropagation():e.cancelBubble = true;
		$(this).parent().parent().parent().find("li").removeClass("bgColor797979");
		$(this).addClass("bgColor797979").siblings().removeClass("bgColor797979");
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

