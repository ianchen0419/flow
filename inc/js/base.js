module.exports = function $base() {
	//js測試
	$('.dropdown').puidropdown();

	//jq測試
	$('#my-button').click(function(){
		$(this).fadeOut();
	})

	//function測試
	this.hi=function(){
		console.log('hihiihihihihihihi');
	}

	$('.dialog.small').puidialog({
		width: 600,
		modal: true,
		draggable: false,
		resizable: false,
		showEffect: 'fade',
		hideEffect: 'fade'
	})


	this.showPopup=function(target){
		$(target).puidialog('show');
	}

	this.closePopup=function(th){
		$(th.closest('.dialog')).puidialog('hide');
	}

}