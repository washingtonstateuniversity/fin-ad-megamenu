/*!
* WSU F&A MEGAMENU BOOTSCRIPT | Version <%= pkg.version %> | Copyright (c) 2016+ Jeremy Bass | Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
*/
(function($){
    var dev = "";
    if( -1 !== window.location.host.indexOf("wp.wsu.dev") ){
        dev = "dev/";
    }
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
    if( "undefined" !== window.jQuery.wsu || "undefined" !== window.jQuery.wsu.fais || "undefined" !== window.jQuery.wsu.fais.megamenu ){
        var _jquery_version = '1.10.2';

        if(  (typeof(jQuery) === 'undefined' || (typeof($) === 'undefined' && typeof(jQuery) === 'undefined') ) ){// || (jQuery().jquery !== _jquery_version || jQuery.fn.jquery !== _jquery_version) ){
            async_load_js('https://ajax.googleapis.com/ajax/libs/jquery/'+_jquery_version+'/jquery.min.js');
        }

        var css_dependants = [
            "https://webcore.fais.wsu.edu/resources/central_FnA_theme/"+dev+"megamenu/megamenu.css"
        ];
        if( !$("link[href*='/resources/flexwork/flexwork-']").length ){
            css_dependants.push('https://webcore.fais.wsu.edu/resources/flexwork/'+dev+'flexwork-light.css');
        }

        var loading = null;
        var css_loaded = false;
        (function load_base() {
            loading = setTimeout(function(){
                if( (typeof(jQuery) === 'undefined' || (typeof($) === 'undefined' && typeof(jQuery) === 'undefined') || false ===css_loaded  ) ){// || (jQuery().jquery !== _jquery_version || jQuery.fn.jquery !== _jquery_version) ){
                    window.clearTimeout(loading);
                    loading = null;
                    for ( var i = 0; i < css_dependants.length; i++ ) {
                        if ( !$("link[href*='"+css_dependants[i]+"']").length  ) {
                            var stylesheet = document.createElement('link');
                            stylesheet.rel ="stylesheet";
                            stylesheet.href = css_dependants[i];
                            stylesheet.type = 'text/css';
                            document.getElementsByTagName('head')[0].appendChild(stylesheet);
                            css_loaded = true;
                        }
                    }
                    load_base();
                }else{
                    var scriptArray = [
                        {
                            src:"https://webcore.fais.wsu.edu/resources/flexwork/extra/tether.min.js",
                            exc:function(){
                            }
                        },
                        {
                            src:"https://webcore.fais.wsu.edu/resources/flexwork/extra/drop.min.js",
                            exc:function(){
                            }
                        },
                        {
                            src:"https://webcore.fais.wsu.edu/resources/central_FnA_theme/"+dev+"megamenu/megamenu.js",
                            exc:function(){
                            }
                        }
                    ];
                    $.each(scriptArray, function(idx,script){
                        if ( !$("script[src*='"+script.src+"']").length  ) {
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
                        }
                    });
                }
            },50);
        }());
    }
}(jQuery));
