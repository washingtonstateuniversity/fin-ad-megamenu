/*!
* WSU F&A MEGAMENU BOOTSCRIPT | Version <%= pkg.version %> | Copyright (c) 2016+ Jeremy Bass | Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
*/

function async_load_js(url){
	var headID, s, x;
	headID = document.getElementsByTagName("head")[0];
	s = document.createElement('script');
	s.type = 'text/javascript';
	s.async = true;
	s.src = url;
	x = document.getElementsByTagName('script')[0];
	headID.appendChild(s);
}
function param( name , process_url ){
	var regexS, regex, results;
	if(typeof(process_url) === 'undefined'){
		process_url=window.location.href;
	}
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	regexS = "[\\?&]"+name+"=([^&#]*)";
	regex = new RegExp( regexS );
	results = regex.exec( process_url );
	if( results === null ){
		return false;
	}else{
		return results[1];
	}
}

var _jquery_version = '1.10.2';

if(  (typeof(jQuery) === 'undefined' || (typeof($) === 'undefined' && typeof(jQuery) === 'undefined') ) ){// || (jQuery().jquery !== _jquery_version || jQuery.fn.jquery !== _jquery_version) ){
	async_load_js('https://ajax.googleapis.com/ajax/libs/jquery/'+_jquery_version+'/jquery.min.js');
}
var loading = null;
var css_loaded = false;
function load_base() {
	loading = setTimeout(function(){
		if( (typeof(jQuery) === 'undefined' || (typeof($) === 'undefined' && typeof(jQuery) === 'undefined') || false ===css_loaded  ) ){// || (jQuery().jquery !== _jquery_version || jQuery.fn.jquery !== _jquery_version) ){
			window.clearTimeout(loading);
			loading = null;
            var links = document.getElementsByTagName('link'),
                needCSS = true;
                for ( var i = 0; i < links.length; i++ ) {
                    if ( links[i].href == "http://webcore.fais.wsu.edu/resources/central_FnA_theme/megamenu/megamenu.css" ) {
                        needCSS = false;
                    }
                }
                if ( needCSS ) {
                    var stylesheet = document.createElement('link');
                    stylesheet.rel="stylesheet";
                    stylesheet.href="http://webcore.fais.wsu.edu/resources/central_FnA_theme/megamenu/megamenu.css";
                    stylesheet.type = 'text/css';
                    document.getElementsByTagName('head')[0].appendChild(stylesheet);
                    css_loaded = true;
                }
			load_base();
		}else{
			(function($) {
				var scriptArray = [
					{
						src:"http://webcore.fais.wsu.edu/resources/central_FnA_theme/megamenu/megamenu.js",
						exc:function(){
						}
					}
				];
				$.each(scriptArray, function(idx,script){
					$.ajax({
						type:"GET",
						dataType:"script",
						cache:true,
						url:script.src,
						success: function() {
							window.clearTimeout(loading);
							loading = null;
							script.exc();
						}
					});
				});
			}(jQuery));
		}
	},50);
}load_base();
