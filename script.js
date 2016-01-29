$(document).ready(function(){
	$( "#pButton" ).click(function(){
		$( "#piano" ).toggleClass("is-active");
		$( "#pButton" ).toggleClass("btn-active");
	});
	$( "#pnButton" ).click(function(){
		$( "#pianonotes" ).toggleClass("is-active");
		$( "#pnButton" ).toggleClass("btn-active");
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
	$( "#bButton" ).click(function(){
		$( "#b" ).toggleClass("is-active");
		$( "#bButton" ).toggleClass("btn-active");
	});	
	$( "#btButton" ).click(function(){
		$( "#bt" ).toggleClass("is-active");
		$( "#btButton" ).toggleClass("btn-active");
	});		
	$( "#bnButton" ).click(function(){
		$( "#bn" ).toggleClass("is-active");
		$( "#bnButton" ).toggleClass("btn-active");
	});	
	$( "#ndButton" ).click(function(){
		$( "#nd" ).toggleClass("is-active");
		$( "#ndButton" ).toggleClass("btn-active");
	});				
});