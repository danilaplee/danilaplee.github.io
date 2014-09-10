// Avoid `console` errors in browsers that lack a console.
(function () {
    var method;
    var noop = function () {
    };
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.9
 *
 * Requires: jQuery 1.2.2+
 */
(function (factory) {
	if ( typeof define === 'function' && define.amd ) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS style for Browserify
		module.exports = factory;
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
		toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
			['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
		slice  = Array.prototype.slice,
		nullLowestDeltaTimeout, lowestDelta;

	if ( $.event.fixHooks ) {
		for ( var i = toFix.length; i; ) {
			$.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
		}
	}

	var special = $.event.special.mousewheel = {
		version: '3.1.9',

		setup: function() {
			if ( this.addEventListener ) {
				for ( var i = toBind.length; i; ) {
					this.addEventListener( toBind[--i], handler, false );
				}
			} else {
				this.onmousewheel = handler;
			}
			// Store the line height and page height for this particular element
			$.data(this, 'mousewheel-line-height', special.getLineHeight(this));
			$.data(this, 'mousewheel-page-height', special.getPageHeight(this));
		},

		teardown: function() {
			if ( this.removeEventListener ) {
				for ( var i = toBind.length; i; ) {
					this.removeEventListener( toBind[--i], handler, false );
				}
			} else {
				this.onmousewheel = null;
			}
		},

		getLineHeight: function(elem) {
			return parseInt($(elem)['offsetParent' in $.fn ? 'offsetParent' : 'parent']().css('fontSize'), 10);
		},

		getPageHeight: function(elem) {
			return $(elem).height();
		},

		settings: {
			adjustOldDeltas: true
		}
	};

	$.fn.extend({
		mousewheel: function(fn) {
			return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
		},

		unmousewheel: function(fn) {
			return this.unbind('mousewheel', fn);
		}
	});


	function handler(event) {
		var orgEvent   = event || window.event,
			args       = slice.call(arguments, 1),
			delta      = 0,
			deltaX     = 0,
			deltaY     = 0,
			absDelta   = 0;
		event = $.event.fix(orgEvent);
		event.type = 'mousewheel';

		// Old school scrollwheel delta
		if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
		if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
		if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
		if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

		// Firefox < 17 horizontal scrolling related to DOMMouseScroll event
		if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
			deltaX = deltaY * -1;
			deltaY = 0;
		}

		// Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
		delta = deltaY === 0 ? deltaX : deltaY;

		// New school wheel delta (wheel event)
		if ( 'deltaY' in orgEvent ) {
			deltaY = orgEvent.deltaY * -1;
			delta  = deltaY;
		}
		if ( 'deltaX' in orgEvent ) {
			deltaX = orgEvent.deltaX;
			if ( deltaY === 0 ) { delta  = deltaX * -1; }
		}

		// No change actually happened, no reason to go any further
		if ( deltaY === 0 && deltaX === 0 ) { return; }

		// Need to convert lines and pages to pixels if we aren't already in pixels
		// There are three delta modes:
		//   * deltaMode 0 is by pixels, nothing to do
		//   * deltaMode 1 is by lines
		//   * deltaMode 2 is by pages
		if ( orgEvent.deltaMode === 1 ) {
			var lineHeight = $.data(this, 'mousewheel-line-height');
			delta  *= lineHeight;
			deltaY *= lineHeight;
			deltaX *= lineHeight;
		} else if ( orgEvent.deltaMode === 2 ) {
			var pageHeight = $.data(this, 'mousewheel-page-height');
			delta  *= pageHeight;
			deltaY *= pageHeight;
			deltaX *= pageHeight;
		}

		// Store lowest absolute delta to normalize the delta values
		absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

		if ( !lowestDelta || absDelta < lowestDelta ) {
			lowestDelta = absDelta;

			// Adjust older deltas if necessary
			if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
				lowestDelta /= 40;
			}
		}

		// Adjust older deltas if necessary
		if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
			// Divide all the things by 40!
			delta  /= 40;
			deltaX /= 40;
			deltaY /= 40;
		}

		// Get a whole, normalized value for the deltas
		delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
		deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
		deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

		// Add information to the event object
		event.deltaX = deltaX;
		event.deltaY = deltaY;
		event.deltaFactor = lowestDelta;
		// Go ahead and set deltaMode to 0 since we converted to pixels
		// Although this is a little odd since we overwrite the deltaX/Y
		// properties with normalized deltas.
		event.deltaMode = 0;

		// Add event and delta to the front of the arguments
		args.unshift(event, delta, deltaX, deltaY);

		// Clearout lowestDelta after sometime to better
		// handle multiple device types that give different
		// a different lowestDelta
		// Ex: trackpad = 3 and mouse wheel = 120
		if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
		nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

		return ($.event.dispatch || $.event.handle).apply(this, args);
	}

	function nullLowestDelta() {
		lowestDelta = null;
	}

	function shouldAdjustOldDeltas(orgEvent, absDelta) {
		// If this is an older event and the delta is divisable by 120,
		// then we are assuming that the browser is treating this as an
		// older mouse wheel event and that we should divide the deltas
		// by 40 to try and get a more usable deltaFactor.
		// Side note, this actually impacts the reported scroll distance
		// in older browsers and can cause scrolling to be slower than native.
		// Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
		return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
	}

}));

/*!
 * History API JavaScript Library v4.0.9
 *
 * Support: IE6+, FF3+, Opera 9+, Safari, Chrome and other
 *
 * Copyright 2011-2013, Dmitrii Pakhtinov ( spb.piksel@gmail.com )
 *
 * http://spb-piksel.ru/
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Update: 2013-11-20 13:03
 */
(function(e){var i=!0,j=null,o=!1;function J(){}function h(a,b,c){if(a!=j&&""!==a&&!b)var b=h(),c=b.e,d=b.h,a=""+a,a=/^(?:[\w0-9]+\:)?\/\//.test(a)?0===a.indexOf("/")?d+a:a:d+"//"+b.g+(0===a.indexOf("/")?a:0===a.indexOf("?")?c+a:0===a.indexOf("#")?c+b.f+a:c.replace(/[^\/]+$/g,"")+a);else if(a=b?a:f.href,!p||c)a=a.replace(/^[^#]*/,"")||"#",a=f.protocol+"//"+f.host+k.basepath+a.replace(RegExp("^#[/]?(?:"+k.type+")?"),"");O.href=a;var a=/(?:([\w0-9]+:))?(?:\/\/(?:[^@]*@)?([^\/:\?#]+)(?::([0-9]+))?)?([^\?#]*)(?:(\?[^#]+)|\?)?(?:(#.*))?/.exec(O.href),b=
a[2]+(a[3]?":"+a[3]:""),c=a[4]||"/",d=a[5]||"",e="#"===a[6]?"":a[6]||"",m=c+d+e,u=c.replace(RegExp("^"+k.basepath,"i"),k.type)+d;return{a:a[1]+"//"+b+m,h:a[1],g:b,i:a[2],k:a[3]||"",e:c,f:d,b:e,c:m,j:u,d:u+e}}function Z(){var a;try{a=e.sessionStorage,a.setItem(E+"t","1"),a.removeItem(E+"t")}catch(b){a={getItem:function(a){a=g.cookie.split(a+"=");return 1<a.length&&a.pop().split(";").shift()||"null"},setItem:function(a){var b={};if(b[f.href]=l.state)g.cookie=a+"="+q.stringify(b)}}}try{r=q.parse(a.getItem(E))||
{}}catch(c){r={}}v(w+"unload",function(){a.setItem(E,q.stringify(r))},o)}function x(a,b,c,d){var c=c||{set:J},f=!c.set,m=!c.get,u={configurable:i,set:function(){f=1},get:function(){m=1}};try{C(a,b,u),a[b]=a[b],C(a,b,c)}catch(fa){}if(!f||!m)if(a.__defineGetter__&&(a.__defineGetter__(b,u.get),a.__defineSetter__(b,u.set),a[b]=a[b],c.get&&a.__defineGetter__(b,c.get),c.set&&a.__defineSetter__(b,c.set)),(!f||!m)&&a===e){try{var $=a[b];a[b]=j}catch(ga){}if("execScript"in e)e.execScript("Public "+b,"VBScript");
else try{C(a,b,{value:J})}catch(g){}a[b]=$}else if(!f||!m)try{try{var y=F.create(a);C(F.getPrototypeOf(y)===a?y:a,b,c);for(var h in a)"function"===typeof a[h]&&(y[h]=a[h].bind(a));try{d.call(y,y,a)}catch(l){}a=y}catch(k){C(a.constructor.prototype,b,c)}}catch(n){return o}return a}function aa(a,b,c){c=c||{};a=a===K?f:a;c.set=c.set||function(c){a[b]=c};c.get=c.get||function(){return a[b]};return c}function G(a,b){var c=(""+("string"===typeof a?a:a.type)).replace(/^on/,""),d=z[c];if(d){b="string"===typeof a?
b:a;if(b.target==j)for(var f=["target","currentTarget","srcElement","type"];a=f.pop();)b=x(b,a,{get:"type"===a?function(){return c}:function(){return e}});(("popstate"===c?e.onpopstate:e.onhashchange)||J).call(e,b);for(var f=0,g=d.length;f<g;f++)d[f].call(e,b);return i}return ba(a,b)}function P(){var a=g.createEvent?g.createEvent("Event"):g.createEventObject();a.initEvent?a.initEvent("popstate",o,o):a.type="popstate";a.state=l.state;G(a)}function s(a,b,c,e){p||(b=h(b),b.c!==h().c&&(A=e,c?f.replace("#"+
b.d):f.hash=b.d));!H&&a&&(r[f.href]=a);D=o}function L(a){if(A){Q!==f.href&&P();var a=a||e.event,b=h(A,i),c=h();a.oldURL||(a.oldURL=b.a,a.newURL=c.a);b.b!==c.b&&G(a)}A=f.href}function R(a){setTimeout(function(){v("popstate",function(a){Q=f.href;H||(a=x(a,"state",{get:function(){return l.state}}));G(a)},o)},0);!p&&a!==i&&l.location&&(S(l.location.hash),D&&(D=o,P()))}function ca(a){var a=a||e.event,b;a:{for(b=a.target||a.srcElement;b;){if("A"===b.nodeName)break a;b=b.parentNode}b=void 0}var c="defaultPrevented"in
a?a.defaultPrevented:a.returnValue===o;b&&"A"===b.nodeName&&!c&&(c=h(),b=h(b.getAttribute("href",2)),c.a.split("#").shift()===b.a.split("#").shift()&&b.b&&(c.b!==b.b&&(l.location.hash=b.b),S(b.b),a.preventDefault?a.preventDefault():a.returnValue=o))}function S(a){var b=g.getElementById(a=(a||"").replace(/^#/,""));b&&b.id===a&&"A"===b.nodeName&&(a=b.getBoundingClientRect(),e.scrollTo(I.scrollLeft||0,a.top+(I.scrollTop||0)-(I.clientTop||0)))}function da(){function a(a){var b=[],d="VBHistoryClass"+(new Date).getTime()+
c++,f=["Class "+d],g;for(g in a)if(a.hasOwnProperty(g)){var h=a[g];h&&(h.get||h.set)?(h.get&&f.push("Public "+("_"===g?"Default ":"")+"Property Get ["+g+"]","Call VBCVal([(accessors)].["+g+"].get.call(me),["+g+"])","End Property"),h.set&&f.push("Public Property Let ["+g+"](val)",h="Call [(accessors)].["+g+"].set.call(me,val)\nEnd Property","Public Property Set ["+g+"](val)",h)):(b.push(g),f.push("Public ["+g+"]"))}f.push("Private [(accessors)]","Private Sub Class_Initialize()","Set [(accessors)]="+
d+"FactoryJS()","End Sub","End Class","Function "+d+"Factory()","Set "+d+"Factory=New "+d,"End Function");e.execScript(f.join("\n"),"VBScript");e[d+"FactoryJS"]=function(){return a};d=e[d+"Factory"]();for(f=0;f<b.length;f++)d[b[f]]=a[b[f]];return d}function b(a){var b=/[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,c={"\u0008":"\\b","\t":"\\t","\n":"\\n","\u000c":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};return b.test(a)?
'"'+a.replace(b,function(a){return a in c?c[a]:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}var c=e.eval&&eval("/*@cc_on 1;@*/");if(c&&!(7<+(/msie (\d+)/i.exec(navigator.userAgent)||[,8])[1])){var d=x,k=h().a,m=g.createElement("iframe");m.src="javascript:true;";m=I.firstChild.appendChild(m).contentWindow;e.execScript("Public history\nFunction VBCVal(o,r) If IsObject(o) Then Set r=o Else r=o End If End Function","VBScript");t={_:{get:K.toString}};l={back:n.back,forward:n.forward,
go:n.go,emulate:j,_:{get:function(){return"[object History]"}}};q={parse:function(a){try{return(new Function("","return "+a))()}catch(b){return j}},stringify:function(a){var c=(typeof a).charCodeAt(2);if(114===c)a=b(a);else if(109===c)a=isFinite(a)?""+a:"null";else if(111===c||108===c)a=""+a;else if(106===c)if(a){var d=(c="[object Array]"===F.prototype.toString.call(a))?"[":"{";if(c)for(var e=0;e<a.length;e++)d+=(0==e?"":",")+q.stringify(a[e]);else for(e in a)a.hasOwnProperty(e)&&(d+=(1==d.length?
"":",")+b(e)+":"+q.stringify(a[e]));a=d+(c?"]":"}")}else a="null";else a="void 0";return a}};s=function(a,b,c,d,e){var g=m.document,b=h(b);D=o;if(b.c===h().c&&!e)a&&(r[f.href]=a);else{A=d;if(c)m.lfirst?(history.back(),s(a,b.a,0,d,1)):f.replace("#"+b.d);else if(b.a!=k||e)m.lfirst||(m.lfirst=1,s(a,k,0,d,1)),g.open(),g.write('<script>lfirst=1;parent.location.hash="'+b.d.replace(/"/g,'\\"')+'";<\/script>'),g.close();!e&&a&&(r[f.href]=a)}};x=function(b,c,f,g){d.apply(this,arguments)||(b===t?t[c]=f:b===
l?(l[c]=f,"state"===c&&(t=a(t),e.history=l=a(l))):b[c]=f.get&&f.get());return b};setInterval(function(){var a=h().a;if(a!=k){var b=g.createEventObject();b.oldURL=k;b.newURL=k=a;b.type="hashchange";L(b)}},100);e.JSON=q}}if(e.history){var g=e.document,I=g.documentElement,F=e.Object,q=e.JSON,f=e.location,n=e.history,l=n,M=n.pushState,T=n.replaceState,p=!!M,H="state"in n,C=F.defineProperty,t=x({},"t")?{}:g.createElement("a"),w="",N=e.addEventListener?"addEventListener":(w="on")&&"attachEvent",U=e.removeEventListener?
"removeEventListener":"detachEvent",V=e.dispatchEvent?"dispatchEvent":"fireEvent",v=e[N],W=e[U],ba=e[V],k={basepath:"/",redirect:0,type:"/"},E="__historyAPI__",O=g.createElement("a"),A=f.href,Q="",D=o,r={},z={},B=g.title,ea={onhashchange:j,onpopstate:j},X=function(a,b){var c=e.history!==n;c&&(e.history=n);a.apply(n,b);c&&(e.history=l)},Y={redirect:function(a,b){k.basepath=b=b==j?k.basepath:b;k.type=a=a==j?k.type:a;if(e.top==e.self){var c=h(j,o,i).c,d=f.pathname+f.search;p?(d=d.replace(/([^\/])$/,
"$1/"),c!=b&&RegExp("^"+b+"$","i").test(d)&&f.replace(c)):d!=b&&(d=d.replace(/([^\/])\?/,"$1/?"),RegExp("^"+b,"i").test(d)&&f.replace(b+"#"+d.replace(RegExp("^"+b,"i"),a)+f.hash))}},pushState:function(a,b,c){var d=g.title;B!=j&&(g.title=B);M&&X(M,arguments);s(a,c);g.title=d;B=b},replaceState:function(a,b,c){var d=g.title;B!=j&&(g.title=B);delete r[f.href];T&&X(T,arguments);s(a,c,i);g.title=d;B=b},location:{set:function(a){e.location=a},get:function(){return p?f:t}},state:{get:function(){return r[f.href]||
j}}},K={assign:function(a){0===(""+a).indexOf("#")?s(j,a):f.assign(a)},reload:function(){f.reload()},replace:function(a){0===(""+a).indexOf("#")?s(j,a,i):f.replace(a)},toString:function(){return this.href},href:{get:function(){return h().a}},protocol:j,host:j,hostname:j,port:j,pathname:{get:function(){return h().e}},search:{get:function(){return h().f}},hash:{set:function(a){s(j,(""+a).replace(/^(#|)/,"#"),o,A)},get:function(){return h().b}}};(function(){var a=g.getElementsByTagName("script"),a=(a[a.length-
1]||{}).src||"";(-1!==a.indexOf("?")?a.split("?").pop():"").replace(/(\w+)(?:=([^&]*))?/g,function(a,b,c){k[b]=(c||("basepath"===b?"/":"")).replace(/^(0|false)$/,"")});da();v(w+"hashchange",L,o);var b=[K,t,ea,e,Y,l];H&&delete Y.state;for(var c=0;c<b.length;c+=2)for(var d in b[c])if(b[c].hasOwnProperty(d))if("function"===typeof b[c][d])b[c+1][d]=b[c][d];else{a=aa(b[c],d,b[c][d]);if(!x(b[c+1],d,a,function(a,d){if(d===l)e.history=l=b[c+1]=a}))return W(w+"hashchange",L,o),o;b[c+1]===e&&(z[d]=z[d.substr(2)]=
[])}k.redirect&&l.redirect();!H&&q&&Z();if(!p)g[N](w+"click",ca,o);"complete"===g.readyState?R(i):(!p&&h().c!==k.basepath&&(D=i),v(w+"load",R,o));return i})()&&(l.emulate=!p,e[N]=function(a,b,c){a in z?z[a].push(b):3<arguments.length?v(a,b,c,arguments[3]):v(a,b,c)},e[U]=function(a,b,c){var d=z[a];if(d)for(a=d.length;--a;){if(d[a]===b){d.splice(a,1);break}}else W(a,b,c)},e[V]=G)}})(window);

// Place any jQuery/helper plugins in here.
// region "caterpillar" jQuery plugin
(function ($) {

    /**
     * <b>caterpillar</b> class for jquery plugin
     * @param el        Элемент DOM
     * @param options    Настрйоки
     * @param NS        Пространство имен
     * @returns {*}
     * @constructor
     */
    var caterpillar = function (el, options, NS) {

        var NSoptions = NS + '.options';

        /**
         * главный Элемент
         * @type {jQuery}
         */
        var $el = $(el).addClass('caterpillar');

        /**
         * caterpillar jquery plugin - настройки по умолчанию
         */
        var defaults = {
            itm_duration: 800,
            $lent: $el.children(':first'),
            $kit: $('ul:first', $el),
            item: ('li')
        };

        /**
         * Настройки плагина
         */
        var options = $.extend(
            defaults,
            options
        );

        /**
         * используемые переменные
         */
        var vars = {
            tm: 0,
            bound_width: $el.innerWidth(),
            lent_width: (options.$lent.outerWidth() >> 0),
            $itm: options.$lent.find(options.item)
        };

        vars.all_duration = options.itm_duration * vars.$itm.length;
        vars.itm_width = (vars.$itm.outerWidth() >> 0);
        $el.data(NSoptions, options);

        this.options = function () {
            return $el.data(NSoptions);
        }

        this.centrate = function () {
            if (vars.lent_width <= vars.bound_width) {
                options.$lent.css('left', (Math.round(vars.bound_width / 2) - Math.round(vars.lent_width / 2)) + 'px');
                return true;
            }
        }

        this.animate = function () {
            var pos = options.$lent.position(),
                dur, ratio;
            if (pos.left == 0) {
                dur = vars.all_duration;
            } else {
                ratio = Math.abs((vars.lent_width - Math.abs(pos.left)) / vars.lent_width) * 100;
                dur = Math.round((vars.all_duration / 100) * ratio);
            }

            options.$lent.animate({left: '-' + vars.lent_width + 'px'}, {
                duration: dur,
                easing: 'linear',
                complete: function () {
                    $(this).css('left', 0);
                    _prototype.animate();
                }
            });
        }

        this.reinit = function () {
            var o = $el.data(NSoptions);
            if (!this.centrate()) {

                options.$lent.append(options.$kit.clone()).append(options.$kit.clone()).css('width', ((vars.lent_width * 3) + 100) + 'px');
                //options.$lent.append(options.$kit.clone()).css('width', ((vars.lent_width*2)+100)+'px');

                this.animate();
            }
        }

        var _prototype = this;

        // Binding events

        $el.on('mouseenter.caterpillar.data-api', options.item, function () {
            options.$lent.stop();
        });

        $el.on('mouseleave.caterpillar.data-api', options.item, function () {
            _prototype.animate();
        });

//		$(window).on('resize');

        this.reinit();

        return this;
    };

    /**
     * <b>caterpillar</b> jquery plugin
     *
     * <i>Параметры плагина:</i>
     * <pre>
     * {
	 *		animate: true,
	 *		duration: 1200,
	 *		$lent: $el.children(':first')
	 * }
     * </pre>
     *
     * <i>Методы плагина:</i>
     * <pre>
     * {
	 * 		$(*).caterpillar().options()	Возвращает объект парамтеров плагина
	 * }
     * </pre>
     *
     * @param object|string options Параметры плагина
     *
     * @returns {*}
     */
    $.fn.caterpillar = function (options) {
        return this.each(function (key, value) {
            var element = $(this);
            // если плагин был инициализирован - возвращаем его инстанс
            if (element.data('caterpillar')) {
                return element.data('caterpillar');
            }
            // передаем опции и this в конструктор плагина
            var _caterpillar = new caterpillar(this, options, 'caterpillar');

            // сохраним объект плагина в данные элемента
            element.data('caterpillar', _caterpillar);
        });
    };

})(jQuery);
$('[data-caterpillar]').caterpillar();
// endregion


(function($){
	/**
	 * Use internal $.serializeArray to get list of form elements which is
	 * consistent with $.serialize
	 *
	 * From version 2.0.0, $.serializeObject will stop converting [name] values
	 * to camelCase format. This is *consistent* with other serialize methods:
	 *
	 * - $.serialize
	 * - $.serializeArray
	 *
	 * If you require camel casing, you can either download version 1.0.4 or map
	 * them yourself.
	 * @returns {{}}
	 */
	$.fn.serializeObject = function () {
		"use strict";

		var result = {};
		var extend = function (i, element) {
			var node = result[element.name];

			// If node with same name exists already, need to convert it to an array as it
			// is a multi-value field (i.e., checkboxes)

			if ('undefined' !== typeof node && node !== null) {
				if ($.isArray(node)) {
					node.push(element.value);
				} else {
					result[element.name] = [node, element.value];
				}
			} else {
				result[element.name] = element.value;
			}
		};

		$.each(this.serializeArray(), extend);
		return result;
	};
})(jQuery);


// region "landing" jQuery plugin
(function($) {
	/**
	 * <b>landing</b> class for jquery plugin
	 * @param el		Элемент DOM
	 * @param options	Настрйоки
	 * @param NS		Пространство имен
	 * @returns {*}
	 * @constructor
	 */
	var landing = function(el, options, NS){

		if(!$('[data-landing-anchor]').length) return false;

		var NSoptions = NS+'.options';

		/**
		 * главный Элемент
		 * @type {jQuery}
		 */
		var $el = $(el).addClass('landing');

		/**
		 * landing jquery plugin - настройки по умолчанию
		 * @type {{}}
		 */
		var defaults = {
			speed: 1000,
			scroll_offset: 100,
			anchor: '[data-landing-anchor]',
			btn_up: '[data-landing-btn-up]',
			btn_dn: '[data-landing-btn-dn]',
			menu: '[data-landing-menu]',
			menu_item: '[data-landing-menu-item]'
		};

		/**
		 * Настройки плагина
		 */
		var options = $.extend(
			defaults,
			options
		);

		/**
		 * используемые переменные
		 */
		var vars = {
			height: $el.height(),
            scrolling:false
		};

		$el.data(NSoptions, options);

		this.init = function(){
			var o = $el.data(NSoptions),
				href = location.hash,
				id = href.substr(1),
				$m_item_id = $(o.menu_item+'[href="#'+id+'"]'),
				$prev = $m_item_id.parent().prev(),
				$next = $m_item_id.parent().next();
			
			$(o.menu_item).removeClass('active');
			$m_item_id.addClass('active').parent().siblings().find(o.menu_item).removeClass('active');

			if(!$prev.length){
				$(options.btn_up).fadeOut('fast');
			} else{
				$(options.btn_up).fadeIn('fast');
			}
			if(!$next.length){
				$(options.btn_dn).fadeOut('fast');
			} else{
				$(options.btn_dn).fadeIn('fast');
			}
		}

		this.options = function(){
			return $el.data(NSoptions);
		}

		var t = this;

		$(document).on('click.landing.data-api', options.menu_item, function(){
			var $t = $(this),
				$siblings = $t.parent().siblings().find(options.menu_item),
				$prev = $t.parent().prev(),
				$next = $t.parent().next(),
				hash = $t.attr('href'),
				id = hash.substr(1),
				$anchor = $(options.anchor+'[name="'+id+'"]')
				anchor_offset = $anchor.offset()||{top:0},
				props = {scrollTop: anchor_offset.top};

			if(!$prev.length){
				$(options.btn_up).fadeOut('fast');
			} else{
				$(options.btn_up).fadeIn('fast');
			}
			if(!$next.length){
				$(options.btn_dn).fadeOut('fast');
			} else{
				$(options.btn_dn).fadeIn('fast');
			}

            vars.scrolling=false;
            $('body,html').stop(true);
            vars.scrolling=true;
			$('body,html').animate(props, options.speed, function(){
                history.location.hash = hash;
            }).animate({'z-index':'0'},100,function(){
                vars.scrolling=false;
            });

			$t.addClass('active');
			$siblings.removeClass('active');

			return false;
		});

		$(document).on('click.landing.data-api', options.btn_up, function(){
			$(options.menu_item+'.active').parent().prev().find(options.menu_item).trigger('click.landing');
		});

		$(document).on('click.landing.data-api', options.btn_dn, function(){
			$(options.menu_item+'.active').parent().next().find(options.menu_item).trigger('click.landing');
		});

		$el.on('mousewheel.landing', function(event) {
			if(event.deltaY > 0){
				$(options.btn_up).trigger('click.landing');
			} else{
				$(options.btn_dn).trigger('click.landing');
			}
			return false;
		});

        $(window).on('scroll.landing.data-api', function(){
            if(vars.scrolling) return false;
            var $t = $(this),
                st = $t.scrollTop(),
                name;

            if(st <= 10){
                name = '';
            } else{
                $(options.anchor).each(function(){
                    var $tt = $(this),
                        of = $tt.offset()||{top:0};

                    if(st > of.top){
                        name = $tt.attr('name');
                    }
                });
            }

            if(name!=undefined){
                $(options.menu_item).removeClass('active');
                var $item = $(options.menu_item + '[href="#' + (name) + '"]');
                $item.addClass('active');
            }
        });

		this.init();

		return this;
	};

	/**
	 * <b>landing</b> jquery plugin
	 *
	 * <i>Параметры плагина:</i>
	 * <pre>
	 * {
	 *
	 * }
	 * </pre>
	 *
	 * <i>Методы плагина:</i>
	 * <pre>
	 * {
	 * 		$(*).landing().options()	Возвращает объект парамтеров плагина
	 * }
	 * </pre>
	 *
	 * @param object|string options Параметры плагина
	 *
	 * @returns {*}
	 */
	$.fn.landing = function(options) {
		return this.each(function(key, value){
			var element = $(this);
			// если плагин был инициализирован - возвращаем его инстанс
			if (element.data('landing')) { return element.data('landing'); }
			// передаем опции и this в конструктор плагина
			var _landing = new landing(this, options, 'landing');
			// сохраним объект плагина в данные элемента
			element.data('landing', _landing);
		});
	};

})(jQuery);
// endregion

//$('body').landing();