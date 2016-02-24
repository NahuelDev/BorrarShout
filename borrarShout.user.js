// ==UserScript==
// @name Borrar Shout
// @namespace Violentmonkey Scripts
// @author       @Mauri934 y @AndrewLedger
// @grant none
// ==/UserScript==

borrarShout = function(){
	// Obtenemos todos los owner de los shouts
	var ownerList = $("..activity-element.clearfix .shout-footer .s-action-list").map(function() {
		return $(this).data("owner");
	})

	// Obtenemos todos los id de los shouts
	var idList = $("..activity-element.clearfix .shout-footer .s-action-list").map(function() {
		return $(this).data("id");
	})

	// Creacion del boton
	$("ul.hide.select-list").each(function(i,v){
		if(ownerList[i]==global_data.user){
			$(this).append("<li><a class='icon-eliminar require-login shout-action shout-action-delete' data-owner=\'"+ownerList[i]+"\' data-id=\'" +idList[i]+ "\' data-redirect='1'> Eliminar shout</li>");
		}
	})

	// Borrado de shout
	$('.icon-eliminar.require-login.shout-action.shout-action-delete').click(function(){
		id=$(this).data("id");
		owner=$(this).data("owner");
		shout_delete(id,owner);
	});
}
$(".icon-eliminar.require-login.shout-action.shout-action-delete:gt(0)").hide()
$(document).ajaxSuccess(function(event, jqXHR, settings) {
   	if (settings.url.indexOf('ajax/feed/fetch') > -1 || settings.url.indexOf('serv/more/trend') > -1) {
       	borrarShout();
   	}else{
		borrarShout();
	}
});