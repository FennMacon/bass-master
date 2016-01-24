$(document).ready(function(){
	$( "#pButton" ).click(function(){
		$( "#piano" ).toggleClass("is-active");
		$( "#pButton" ).toggleClass("btn-active");
	});
	$( "#tcButton" ).click(function(){
		$( "#tc" ).toggleClass("is-active");
		$( "#tcButton" ).toggleClass("btn-active");
	});
	$( "#bcButton" ).click(function(){
		$( "#bc" ).toggleClass("is-active");
		$( "#bcButton" ).toggleClass("btn-active");
	});
	$( "#fcButton" ).click(function(){
		$( "#full" ).toggleClass("is-active");
		$( "#fcButton" ).toggleClass("btn-active");
	});
	$( "#btButton" ).click(function(){
		$( "#bt" ).toggleClass("is-active");
		$( "#btButton" ).toggleClass("btn-active");
	});			
	$( "#ndButton" ).click(function(){
		$( "#nd" ).toggleClass("is-active");
		$( "#ndButton" ).toggleClass("btn-active");
	});				
});