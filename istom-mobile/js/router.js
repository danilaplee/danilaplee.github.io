var $container = $('.container'),
	manualNavigation = true;  
function pushUrl(url) {
        manualNavigation == false;
		history.pushState(null, null, url);
        manualNavigation == true;
}

function scrollToNew(url, el) {
		var urlsplit = url.split('/');
    	var $target = $(urlsplit[1]);
    	var	targetOffset = $target.offset().top;
    	$('html, body')
    	.animate({scrollTop: targetOffset}, 1000)
    	.promise()
    	.done(setDefCursor(el));
}

function setDefCursor(el) {
	el.css('cursor','pointer');
    $('body').css('cursor','default');
}

function setLdCursor(el) {
	el.css('cursor','progress');
    $('body').css('cursor','progress');
}

function loadBind() {
	$('.mainContainer a').bind('click', menuLoading);
}

$(window).ready(function() {
	var url = window.location.pathname;
    if (navigator.userAgent.match(/AppleWebKit/) && ! navigator.userAgent.match(/Chrome/)) {
    var bonus = 0;
	}
	else {
	var bonus = 1;
	}
	$(window).bind('popstate', function(){
			bonus++;
		if (bonus > 1) {
        	if (manualNavigation == true) {
        		location.reload();
        	}
        	if (manualNavigation == false) {
        		manualNavigation == true;
        	}
        	else {
        	}
        }
        else {

        }
    });
});
$('footer').ready(function() {
	$('a').bind('click', menuLoading);
});
var menuLoading = function () {
	var mC = 0;
	var el = $(this);
	var url = $(this).attr('href');
	var urlsplit = url.split('/');
    var $target = $(urlsplit[1]);
    var scrollEl = $('.mainContainer').find($target);
	clearAnimate;
		if (el.hasClass('modal') == true) {
        		setLdCursor(el);
				$('.magnifyContainer').load(url);
				clearTimeout(clearAnimate);
				$(document).ajaxComplete(function(){
					mC++;
					if (mC <= 1) {
					$('.magnifyContainer').velocity("transition.slideDownIn", { stagger: 205 })
    				.promise()
    				.done(setDefCursor(el));
					}
					else {

					};
				});
				return false;
		}
		if (el.hasClass('lightbox') == true) {
        		setLdCursor(el);
				$('.magnifyContainer').load(url);
				clearTimeout(clearAnimate);
				$(document).ajaxComplete(function(){
					mC++;
					if (mC <= 1) {
					$('.magnifyContainer')
					.velocity("transition.slideDownIn", { stagger: 205 })
    				.promise()
    				.done(setDefCursor(el));
					}
					else {

					};
				});
				return false;
		}
		if (el.hasClass('roundal') == true) {
			return false;
		}
		if (el.hasClass('nonLink') == true) {
			return false;
		}
		if (url.search('#') > -1 && scrollEl.length == 1) {
			pushUrl(url);
			setLdCursor(el);
        	scrollToNew(url, el);
    		return false;
		}
		if (url.search('#') > -1 && scrollEl.length == 0) {
			pushUrl(url);
			setLdCursor(el);
			$('.mainContainer').load('/');
			clearTimeout(clearAnimate);
			$(document).ajaxComplete(function(){
				mC++;
				if (mC <= 1) {
					loadBind();
        			scrollToNew(url, el);

				}
				else {

				};
			});
			return false;
		}
		else if (url.search('contacts') == true) {
		}
		else {
			pushUrl(url);
			setLdCursor(el);
			$('.mainContainer').load(url);
			clearTimeout(clearAnimate);
			$(document).ajaxComplete(function(){
				mC++;
				if (mC <= 1) {
					loadBind();
					if (url != '/') {
					}
					else {
					};
					$('.mainContainer').velocity("transition.slideDownIn", { stagger: 205 });
    				targetOffset = $('#hometop').offset().top;
    				$('html, body')
    				.velocity({scrollTop: targetOffset}, 1000)
    				.promise()
    				.done(setDefCursor(el));
    			}
				else {

				};
			});
			return false;
		}
};