(function(){
	var requireNode = window.require;
	var WINDOW_WIDTH = 290;
	var gui = null;
	var counter = 0;
	if(requireNode){
		gui = requireNode('nw.gui');
	}

	if(!window.DEA){
		window.DEA = {};
	}


	function makeNewNotifyWindow(){
		var win = gui.Window.open(
			'nw-desktop-notifications.html', {
			frame: false,
			toolbar: false,
			width: WINDOW_WIDTH,
			height: 0,
			'always-on-top': true,
			show: false,
			resizable: false
		});
		window.DEA.DesktopNotificationsWindow = win;
		window.DEA.DesktopNotificationsWindowIsLoaded = false;
		win.on('loaded', function(){
			window.DEA.DesktopNotificationsWindowIsLoaded = true;
			$(win.window.document.body).find('#closer').click(function(){
				slideOutNotificationWindow();
			});
		});
	}

	function closeAnyOpenNotificationWindows(){
		if(!gui){
			return false;
		}
		if(window.DEA.DesktopNotificationsWindow){
			window.DEA.DesktopNotificationsWindow.close(true);
			window.DEA.DesktopNotificationsWindow = null;
		}
	}

	function notify(icon, title, content, onClick){
		if(!gui){
			return false;
		}
		if(!window.DEA.DesktopNotificationsWindow){
			makeNewNotifyWindow();
		}
		var continuation = function(){
			appendNotificationToWindow(icon, title, content, onClick);
			slideInNotificationWindow();
			$(window.DEA.DesktopNotificationsWindow.window.document.body).find('#shouldstart').text('true');	
		};
		if(window.DEA.DesktopNotificationsWindowIsLoaded){
			continuation();
		}
		else{
			window.DEA.DesktopNotificationsWindow.on('loaded',continuation);	
		}
		return true;
	}

	function makeNotificationMarkup(iconUrl, title, content, id){
		return "<li id='"+id+"'>"+
			"<div class='icon'>" +
				"<img src='"+iconUrl+"' />" +
			"</div>" +
			"<div class='title'>"+truncate(title, 35)+"</a></div>" +
			"<div class='description'>"+truncate(content, 37)+"</div>" +
			"</li>";
	}

	function appendNotificationToWindow(iconUrl, title, content, onClick){
		var elemId = getUniqueId();
		var markup = makeNotificationMarkup(iconUrl, title, content, elemId);
		var jqBody = $(window.DEA.DesktopNotificationsWindow.window.document.body);
		jqBody.find('#notifications').append(markup);
		jqBody.find('#'+elemId).click(onClick);
	}

	function slideInNotificationWindow(){
		var win = window.DEA.DesktopNotificationsWindow;
		if(win.NOTIFICATION_IS_SHOWING){
			return;
		}
		var y = screen.availTop;
		var x = WINDOW_WIDTH;
		win.moveTo(getXPositionOfNotificationWindow(win),y);
		win.show();
		win.NOTIFICATION_IS_SHOWING = true;
		if(document.hasFocus()){
			//win.blur();
		}
		function animate(){
			setTimeout(function(){
				if(y<60){
					win.resizeTo(x,y);
					y+=10;
					animate();
				}
			},5);
		}
		animate();
	}

	function slideOutNotificationWindow(callback){
		var win = window.DEA.DesktopNotificationsWindow;
		var y = win.height;
		var x = WINDOW_WIDTH;
		function animate(){
			setTimeout(function(){
				if(y>-10){
					win.resizeTo(x,y);
					y-=10;
					animate();
				}
				else{
					win.hide();
					if(callback){
						callback();
					}
				}
			},5);
		}
		animate();
		win.NOTIFICATION_IS_SHOWING = false;
	}

	function getXPositionOfNotificationWindow(win){
		return screen.availLeft + screen.availWidth - (WINDOW_WIDTH+10);
	}

	function getUniqueId(){
		return (+(new Date())) + '-' + (counter ++);
	}

	function truncate(str, size){
		str = $.trim(str);
		if(str.length > size){
			return $.trim(str.substr(0,size))+'...';
		}
		else{
			return str;
		}
	}

	window.DEA.desktopNotifications = {
		notify: notify,
		closeAnyOpenNotificationWindows: closeAnyOpenNotificationWindows
	};

})();