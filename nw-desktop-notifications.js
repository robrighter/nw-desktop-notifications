var html = (function () {/*

 */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

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

    /* API called directly from apps */
	function create(options, onClick){
		if(!gui){
			return false;
		}
		if(!window.DEA.DesktopNotificationsWindow){
			makeNewNotifyWindow();
		}
		var continuation = function(){
			appendNotificationToWindow(options, onClick);
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

    /**
     * Notification template type
     */

	function makeNotificationMarkup(options, id){
		return "<section id='"+id+"'>"+
			"<div class='icon'>" +
				"<img src='"+options.iconUrl+"' />" +
			"</div>" +
			"<div class='title'>" + options.title +"</div>" +
			"<div class='description'>" + options.message + "</div>" +
			"</section>";
	}

    function makeImageNotificationMarkup(options, id) {
        return "<section id='"+id+"'>"+
            "<div class='icon'>" +
            "<img src='" + options.iconUrl + "' />" +
            "</div>" +
            "<div class='title'>" + options.title +"</div>" +
            "<div class='description'>" + options.message + "</div>" +
            "<div class='gallery'><img src=''" +  "</div>" +
            "</section>";
    }

	function appendNotificationToWindow(options, onClick){
		var elemId = getUniqueId();
        var markup;
        switch (options.type) {
            case 'text':
                markup = makeNotificationMarkup(options, elemId);
                break;
            case 'image':
                markup = makeImageNotificationMarkup(options, elemId);
                break;
            default:
                markup = makeNotificationMarkup(options, elemId);
                break;
        }
		var jqBody = $(window.DEA.DesktopNotificationsWindow.window.document.body);
		jqBody.find('#notifications').append(markup);
		jqBody.find('#'+elemId).click(onClick); //notification as a whole click, what about button clicks
	}

    /*
     * Custom sliding IN animations here, slide right, slide left, slide up, slide down...
     */

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

    /*
     * Custom sliding OUT animations here, slide right, slide left, slide up, slide down...
     */

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

	window.DEA.notifications = {
        create: create,
		closeAnyOpenNotificationWindows: closeAnyOpenNotificationWindows
	};

})();