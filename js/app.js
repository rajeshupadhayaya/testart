$(document).ready(function() {
    $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    });

});

function showdiv(divid){
	var current_class = $('#'+divid).attr('class');
	if (current_class == 'hide'){
		$('#'+divid).removeClass('hide');
		$('#'+divid).addClass('show_volume');
	}else{
		$('#'+divid).removeClass('show_volume');
		$('#'+divid).addClass('hide');
	}
	
}