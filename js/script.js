$(function(){

	//region compare table - remove item
	$(document).on('click.toggle-group.data-api', '.compare-table .gh td', function(){
		var $t = $(this)
			, $p = $t.parent()
			, $tbl = $t.parents('table')
			, a = $p.is('.a')>> 0
			, g = $p.attr('class').replace(/([\S\s]*gh)([\d]+)(\sa)?/, '$2')
			, $rows = $('.g'+g+' td', $tbl);
		console.log('--',$t,$p);
		if(a){
			$p.removeClass('a');
			$rows.css('display','none');
		} else{
			$p.addClass('a');
			$rows.css('display','table-cell');
		}
	});
	//endregion

});