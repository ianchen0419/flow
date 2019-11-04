module.exports = function $flow() {
	var that=this;
	var selectedLine;
	var selectedNode;
	var dragArea={
		containment: '#container'
	}

	var connectComm={
		connector: 'Straight',
        anchor: ['Left', 'Right'],
        endpoints: ['Blank', 'Blank'],
        paintStyle: {
        	stroke: '#b3b3b3', 
        	strokeWidth: 2
        },
        hoverPaintStyle: {
        	stroke: "#333"
        },
	};

	var sourceSetting={
		anchor: 'Right',
		endpoint: ['Image', {
			src: '../inc/img/right.svg',
			cssClass: 'endpoint'
		} ],
		connector: 'Straight',
		isSource: true,
        connectorStyle: {
        	stroke: '#b3b3b3',
        	strokeWidth: 2,
        },
        connectorHoverStyle: {
        	stroke: '#333'
        },
	};
	 
	var targetSetting={
		anchors: 'Left',
		endpoint: ['Image', {
			src: '../inc/img/left.svg',
			cssClass: 'endpoint'
		} ],
		connector: 'Straight',
		isTarget: true,
		connectorStyle: {
        	stroke: '#b3b3b3',
        	strokeWidth: 2,
        },
        connectorHoverStyle: {
        	stroke: '#333'
        },
	};

	jsPlumb.registerConnectionTypes({
		'selected':{
	    	paintStyle: {
	    		stroke: '#333'
	    	}
		}
	});

	$('#verify').draggable({
		helper: 'clone',
		containment: '#container',
		cancel: false,
		stop: function(event, ui){
			if(ui.position.top>50){
				var newVerify=container.appendChild(document.querySelector('#needClone .verify').cloneNode(true));
				newVerify.style.top=`${ui.position.top}px`;
				newVerify.style.left=`${ui.position.left}px`;
				jsPlumb.draggable(newVerify, dragArea);
				jsPlumb.addEndpoint(newVerify, targetSetting);
				jsPlumb.addEndpoint(newVerify, sourceSetting);
				componentInit();
			}
		}
	});

	$('#pass').draggable({
		helper: 'clone',
		containment: '#container',
		cancel: false,
		stop: function(event, ui){
			if(ui.position.top>50){
				var newPass=container.appendChild(document.querySelector('#needClone .pass').cloneNode(true));
				newPass.style.top=`${ui.position.top}px`;
				newPass.style.left=`${ui.position.left}px`;
				jsPlumb.draggable(newPass, dragArea);
				jsPlumb.addEndpoint(newPass, targetSetting);
				jsPlumb.addEndpoint(newPass, sourceSetting);
				componentInit();
			}
		}
	});

	
	this.nodeActive=function(th){
		selectedNode=document.querySelector(".node-block.active");

		if(selectedNode){
			selectedNode.classList.remove("active");
		}
		if(selectedLine){
			selectedLine.removeType('selected');
			selectedLine=null;
		}

		th.parentNode.classList.add("active");
		selectedNode=th.parentNode;
	}


	this.default2flow=function(){
		container.innerHTML='';
		selectedLine='';
		selectedNode='';

		var newEdit=container.appendChild(document.querySelector('#needClone .edit').cloneNode(true));
		var newPass=container.appendChild(document.querySelector('#needClone .pass').cloneNode(true));
		var newEnd=container.appendChild(document.querySelector('#needClone .end').cloneNode(true));

		newEdit.style.top='250px';
		newEdit.style.left='200px';
		newPass.style.top='150px';
		newPass.style.left='400px';
		newEnd.style.top='250px';
		newEnd.style.left='600px';

		jsPlumb.draggable(newEdit, dragArea);
		jsPlumb.draggable(newPass, dragArea);
		jsPlumb.draggable(newEnd, dragArea);

		jsPlumb.addEndpoint(newEdit, sourceSetting);
		jsPlumb.addEndpoint(newPass, targetSetting);
		jsPlumb.addEndpoint(newPass, sourceSetting);
		jsPlumb.addEndpoint(newEnd, targetSetting);

		jsPlumb.connect({
	        source: newEdit,
	        target: newPass,
	    }, connectComm);

	    jsPlumb.connect({
	        source: newPass,
	        target: newEnd,
	    }, connectComm);

	    componentInit();

	}
	

	this.default3flow=function(){
		container.innerHTML='';
		selectedLine='';
		selectedNode='';

		var newEdit=container.appendChild(document.querySelector('#needClone .edit').cloneNode(true));
		var newPass=container.appendChild(document.querySelector('#needClone .pass').cloneNode(true));
		var newVerify=container.appendChild(document.querySelector('#needClone .verify').cloneNode(true));
		var newEnd=container.appendChild(document.querySelector('#needClone .end').cloneNode(true));

		newEdit.style.top='250px';
		newEdit.style.left='150px';
		newVerify.style.top='150px';
		newVerify.style.left='300px';
		newPass.style.top='150px';
		newPass.style.left='450px';
		newEnd.style.top='250px';
		newEnd.style.left='600px';

		jsPlumb.draggable(newEdit, dragArea);
		jsPlumb.draggable(newVerify, dragArea);
		jsPlumb.draggable(newPass, dragArea);
		jsPlumb.draggable(newEnd, dragArea);

		jsPlumb.addEndpoint(newEdit, sourceSetting);
		jsPlumb.addEndpoint(newVerify, targetSetting);
		jsPlumb.addEndpoint(newVerify, sourceSetting);
		jsPlumb.addEndpoint(newPass, targetSetting);
		jsPlumb.addEndpoint(newPass, sourceSetting);
		jsPlumb.addEndpoint(newEnd, targetSetting);

		jsPlumb.connect({
	        source: newEdit,
	        target: newVerify,
	    }, connectComm);

	    jsPlumb.connect({
	        source: newVerify,
	        target: newPass,
	    }, connectComm);

	    jsPlumb.connect({
	        source: newPass,
	        target: newEnd,
	    }, connectComm);

	    
	    componentInit();
	}

	function componentInit(){
		$('.flow-canvas .mydropdown').puidropdown();
		$('.flow-canvas input[type="checkbox"').puicheckbox();
		
		$('.flow-canvas .mydialog').not('.scroll').puidialog({
	    	width: 600,
			modal: true,
			draggable: false,
			resizable: false,
			showEffect: 'fade',
			hideEffect: 'fade',
			beforeHide: function(){
				// 關閉上方的×時，dropdown關不掉的bug
				$('.ui-dropdown-panel').hide();
			}
	    });

	    $('.flow-canvas .mydialog.scroll').puidialog({
	    	width: 600,
	    	height: 500,
			modal: true,
			draggable: false,
			resizable: false,
			showEffect: 'fade',
			hideEffect: 'fade',
			beforeHide: function(){
				$('.ui-dropdown-panel').hide();
			}
	    });
	    
	}

	jsPlumb.bind('click', function(conn, originalEvent) {
		selectedNode=document.querySelector(".node-block.active");
		if(selectedNode){
			selectedNode.classList.remove("active");
			selectedNode='';
		}
		if(selectedLine){
			selectedLine.removeType('selected');
		}
		conn.toggleType('selected');
		selectedLine=conn;
	});

	this.deleteItem=function(){
		if(!selectedLine && !selectedNode){
			$('#deleteNone').puidialog('show');
		}else{
			if(selectedLine){
				jsPlumb.deleteConnection(selectedLine);
				selectedLine='';
			}

			if(selectedNode){
				if(selectedNode.classList.contains('edit')){
					$('#deleteWrong').puidialog('show');
				}else{
					jsPlumb.deleteConnectionsForElement(selectedNode);
					jsPlumb.removeAllEndpoints(selectedNode);
					selectedNode.remove()
					selectedNode='';
				}
			}
		}
	}

	this.closeMyPopup=function(th){
		$(th.closest('.mydialog')).puidialog('hide');
	}

	this.importEditInfo=function(th){
		// 安控機制
		var securityInfo=$(th.closest('.ui-dialog-content').querySelector('.security')).puidropdown('getSelectedValue');
		th.closest('.node-block.edit').querySelector('.info-security').innerText=securityInfo;
	}

	this.importVerifyInfo=function(th){
		var dialogParent=th.closest('.ui-dialog-content');
		var nodeblockParent=th.closest('.node-block.verify');

		var infoName=nodeblockParent.querySelector('.info-name');
		var infoMan=nodeblockParent.querySelector('.info-man');
		var infoDivision=nodeblockParent.querySelector('.info-division');
		var infoRole=nodeblockParent.querySelector('.info-role');
		var infoNumber=nodeblockParent.querySelector('.info-number');

		//自訂名稱
		var nameInfo=dialogParent.querySelector('.name');
		infoName.innerText=nameInfo.value;

		// 安控機制
		var securityInfo=$(dialogParent.querySelector('.security')).puidropdown('getSelectedValue');
		nodeblockParent.querySelector('.info-security').innerText=securityInfo;

		// 不可連續作業
		var manInfo=$(dialogParent.querySelector('.man')).puicheckbox('isChecked');
		if(manInfo==true){
			infoMan.hidden=false;
		}else{
			infoMan.hidden=true;
		}

		// 必須同部門
		var divisionInfo=$(dialogParent.querySelector('.division')).puicheckbox('isChecked');
		if(divisionInfo==true){
			infoDivision.hidden=false;
		}else{
			infoDivision.hidden=true;
		}

		// 角色們
		var roleInfo=dialogParent.querySelectorAll('.role-item');
		if(roleInfo.length>0){
			infoRole.textContent=[...roleInfo].map(item => item.textContent).join('、');
			infoRole.parentNode.parentNode.classList.remove('no-role');
		}else{
			infoRole.textContent='未設定';
			infoRole.parentNode.parentNode.classList.add('no-role');
		}

		if(infoRole.textContent.length>9){
			nodeblockParent.querySelector('.roles').classList.add('has-clip');
		}else{
			nodeblockParent.querySelector('.roles').classList.remove('has-clip');
		}

		infoNumber.innerText=roleInfo.length;
	}

	this.importPassInfo=function(th){
		var dialogParent=th.closest('.ui-dialog-content');
		var nodeblockParent=th.closest('.node-block.pass');

		var infoName=nodeblockParent.querySelector('.info-name');
		var infoMan=nodeblockParent.querySelector('.info-man');
		var infoDivision=nodeblockParent.querySelector('.info-division');
		var infoRole=nodeblockParent.querySelector('.info-role');
		var infoNumber=nodeblockParent.querySelector('.info-number');

		//自訂名稱
		var nameInfo=dialogParent.querySelector('.name');
		infoName.innerText=nameInfo.value;

		// 安控機制
		var securityInfo=$(dialogParent.querySelector('.security')).puidropdown('getSelectedValue');
		nodeblockParent.querySelector('.info-security').innerText=securityInfo;

		// 不可連續作業
		var manInfo=$(dialogParent.querySelector('.man')).puicheckbox('isChecked');
		if(manInfo==true){
			infoMan.hidden=false;
		}else{
			infoMan.hidden=true;
		}

		// 必須同部門
		var divisionInfo=$(dialogParent.querySelector('.division')).puicheckbox('isChecked');
		if(divisionInfo==true){
			infoDivision.hidden=false;
		}else{
			infoDivision.hidden=true;
		}

		// 角色們
		var roleInfo=dialogParent.querySelectorAll('.role-item');
		if(roleInfo.length>0){
			infoRole.textContent=[...roleInfo].map(item => item.textContent).join('、');
			infoRole.parentNode.parentNode.classList.remove('no-role');
		}else{
			infoRole.textContent='未設定';
			infoRole.parentNode.parentNode.classList.add('no-role');
		}

		if(infoRole.textContent.length>9){
			nodeblockParent.querySelector('.roles').classList.add('has-clip');
		}else{
			nodeblockParent.querySelector('.roles').classList.remove('has-clip');
		}

		infoNumber.innerText=roleInfo.length;
		
	}

	this.addRole=function(th){
		var myRole=th.parentNode.parentNode.querySelector('.role');
		if(myRole.selectedIndex===0) return;
		var newRow=document.createElement('tr');
		newRow.innerHTML=`
			<td class="role-item">${$(myRole).puidropdown('getSelectedLabel')}</td>
			<td>
				<button class="func-btn" onclick="this.parentNode.parentNode.remove()">
					<i class="fa fa-trash"></i>
					<span>刪除</span>
				</button>
			</td>`;
		th.closest('tbody').appendChild(newRow);
		// myRole
		myRole.selectedOptions[0].remove()
		var tempOptions=[...myRole.options];
		$(myRole).puidropdown('removeAllOptions');
		for(i=0;i<tempOptions.length;i++){
			$(myRole).puidropdown('addOption', tempOptions[i]);
		}
		

	}

}