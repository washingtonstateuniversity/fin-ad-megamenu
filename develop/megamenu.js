/*jshint -W054 */
var flexing = flexing || {};
(function($,Drop,window){

	/**
	 * A small templating engine for processing HTML with given data.
	 *
	 * @see TemplateEngine via MIT Licensed https://github.com/krasimir/absurd/
	 *
	 * @param {string} html
	 * @param {Object} options
	 * @returns {*}
	 */
	$.runTemplate = function( html, options ) {
		var re, add, match, cursor, code, reExp, result;
        html = $.isFunction(html) ? html() : html;
        var new_option = {};
        $.each(options,function(idx,value){
            new_option[idx+""] = $.isFunction(value) ? value() : value;
        });

		re = /<%(.+?)%>/g;
		reExp = /(^( )?(var|if|for|else|switch|case|break|{|}|;))(.*)?/g;
		code = "var r=[];\n";
		cursor = 0;

		add = function( line, js ) {
			if ( js ) {
				code += line.match( reExp ) ? line + "\n" : "r.push(" + line + ");\n";
			}else {
				code += line !== "" ? "r.push('" + line.replace( /'/g, "\"" ) + "');\n" : "";
			}
			return add;
		};

		while ( ( match = re.exec( html ) ) ) {
			add( html.slice( cursor, match.index ) )( match[ 1 ], true );
			cursor = match.index + match[ 0 ].length;
		}

		add( html.substr( cursor, html.length - cursor ) );
		code = ( code + "return r.join('');" ).replace( /[\r\t\n]/g, "" );
		result = new Function( code ).apply( new_option );

		return result;
	};

    $.wsu = $.wsu || {}; // extend wsu global name space
    $.wsu.fais = $.wsu.fais || {}; // set up the unit name space
    $.wsu.fais.megamenu = {};
    (function(MM){
        //gotten from the central area with long cache
        MM.fna_logo = '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 313.26 194.19"><polygon points="95.04 81.19 42.29 81.19 51.8 37.2 108.77 37.2 113.01 13.2 32.42 13.2 0 166.19 24.37 166.19 37.48 105.19 90.52 105.19 95.04 81.19" style="fill:#f4f3ef"/><path d="M345.53,20.33H322l-65.62,117.4c-0.7.83-1.31,1.59-1.88,2.31s-1.08,1.35-1.61,2l-29.71-41.94c4.62-2.47,9-5,13.35-7.42l2.21-1.25a95,95,0,0,0,16.39-11.68A54.45,54.45,0,0,0,266.7,65.37a38.27,38.27,0,0,0,4.46-18.68c0-12-4-21.68-12-28.86S240.66,7.14,227.53,7.14c-15.31,0-27.83,4.51-37.21,13.4s-14.22,20.82-14.22,35.29c0,11.52,3.79,23.88,11.29,36.8-16.19,8.1-28,16.65-35.26,25.43a52.31,52.31,0,0,0-11.94,34.11c0,15,4.57,26.9,13.6,35.48s21,12.85,35.72,12.85a87.34,87.34,0,0,0,31.86-5.56c7.82-3.06,16.85-6.91,26.38-14.18l13.42,20.58H295l-25.42-33.5c4.74-7,18.76-29.43,24.65-41.5H334l5.71,47h24.09Zm-17.17,57.4,3.07,27.6H301.61c11-21.71,18.26-36.17,21.47-42.61L324,60.87c0.75-1.5,1.48-3.06,2.2-4.65C326.73,63.68,327.46,71,328.36,77.73ZM209.12,37.46c4.14-4.28,9.92-6.36,17.67-6.36,5.74,0,9.91,1.45,12.76,4.43s4.29,7.16,4.29,12.63a18.92,18.92,0,0,1-3.24,10.92,40.9,40.9,0,0,1-9.48,9.68c-3.77,2.83-10.63,6.82-20.4,11.89-5.18-8.06-7.81-16.31-7.81-24.57,0-8.1,2.09-14.36,6.2-18.62h0Zm-36,94.83c2-3.88,2.63-4.47,6.4-7.76l0.92-.81c4-3.5,10.52-7.69,19.4-12.46l34,48.06a51.13,51.13,0,0,1-10,4.87c-1.06.4-2.23,0.86-3.66,1.44a51.45,51.45,0,0,1-19.48,3.83c-8.13,0-14.44-2.29-19.29-7a39,39,0,0,1-10.68-19.39C170.06,140.24,170.82,136.81,173.1,132.29Z" transform="translate(-50.58 -7.14)" style="fill:#f4f3ef"/></svg>';
        MM.template = {
            "container":'<div id="mega" class="mega" data-height="405"><div id="megatail"></div><% this.opener %><div id="megacontent"><% this.header %><% this.tabs_area %></div></div>',
            "tabs":{
                "wrapper":"<div id='megatabs' class='ui-tabs-vertical flex-row column-at-768'><ul class='hide-below-768'><% this.tabs_menu %></ul><% this.tabs %></div>",
                "content":"<div id='tabs-<% this.tab_idx %>' class='full-width-at-768' style='display:none;'><% this.tab_content %></div>",
                "menu_item":"<li role='tab' aria-controls='tabs-<% this.menu_tab_idx %>' aria-labelledby='tabs-<% this.menu_tab_idx %>_link'><a data-idx='<% this.count %>' href='#tabs-<% this.menu_tab_idx %><% this.prefix %>' class='ui-tabs-anchor' role='presentation' id='tabs-<% this.menu_tab_idx %>_link' ><% this.menu_tab_name %></a></li>",
                "resmenu_item":"<li><a data-idx='<% this.count %>' href='#tabs-<% this.menu_tab_idx %><% this.prefix %>'><% this.menu_tab_name %></a></li>",
                "res_menu_wrap":"<div id='res_wrap'><span id='res_selected'></span><span class='dropdown-menu'><ul class='res-menu-wrap'><% this.res_tabs_menu %></ul></span></div>",
            },
            "header":{
                "container":"<div id='mega_header' class='flex-row column-at-768'><h2>Finance and Administration</h2><ul id='mega_crumb'><% this.crumbs %></ul></div>",
                "item":"<li><a href='<% this.crumb_url %>' data-relation='<% this.data %>'><% this.crumb_name %></a></li>",
            },
            "opener":'<div id="mm_opener"><span>'+MM.fna_logo+'</span><i></i></div>'
        };

        MM._html = "";
        MM._json = [];
        MM.service_areas = {};
        MM.mega_height=0;
        MM._Drop=null;
        MM._tabs=null;

        MM.init = function (){
            MM.set_json_input(function(){
                MM.bake_content_data(MM.start);
            });
           // MM.load_content(MM.start);
        };
        /*MM.load_content = function(callback){
            $.ajax({
                url:"https://webcore.fais.wsu.edu/resources/central_FnA_theme/megamenu/data/static.txt",
                dataType:"jsonp",
                jsonpCallback:"static"
            }).done(function(data){
                MM._json = data[0];
                callback();
            });
        };*/


        MM.set_menu_size = function (){
            MM.mega_height=$("#mega").height();
            $("#mega").data("height",MM.mega_height);
            //console.log(MM.mega_height);
            if( ! $("#mega").is(".open") ){
                $("#mega").css("top", "-"+MM.mega_height-50);
            }
        };
        MM.close_menu = function (){
            MM.set_menu_size();
            $("#mega").animate({
                top: "-"+MM.mega_height-50,
            }, 200, "easeInExpo", function() {
            	$("#mega").removeClass("open");
            });

        };
        MM.ready_drops = (function(){
            MM._Drop = Drop.createContext({
                classPrefix: "drop"
            });
        }());
        MM.setupDrops = function ( target ) {
            var $dropTrigger, $target, content, drop, openOn, position, targetAttachment, $is_vertical;
            $dropTrigger = target;

            $is_vertical = $dropTrigger.is(".btn-group-vertical .dropdown-toggle");
            openOn = $dropTrigger.data("open-on") || "click";
            $target = $dropTrigger;
            content = $dropTrigger.next(".dropdown-menu").html() || $("#" + $dropTrigger.data("drop-for")).html();
            position = $dropTrigger.data("position") || ( $is_vertical ? "top left" : "top left" );
            targetAttachment = $dropTrigger.data("attachment") || ( $is_vertical ? "top right" : "bottom left" );
            return drop = new MM._Drop({
                target: $target[0],
                position: position,
                tetherOptions: {
                    targetAttachment: targetAttachment,
                    attachment: position,
                },
                constrainToWindow: true,
                constrainToScrollParent: false,
                openOn: openOn,
                content: content,
                //beforeClose: "undefined" === callback.beforeClose ? callback.beforeClose() : function(){}
            });
        };

        MM.setup_inner_menu_tabs = function(){
            //console.log("tabed it");
            //console.log(MM._tabs);
            if( null === MM._tabs){
                MM._tabs = $( "#megatabs" ).tabs({
                    activate: function( ){//event, ui ) {
                        var activeTabIdx = $('#megatabs').tabs('option','active');
                        $(".res-menu-wrap li.active").removeClass('active');
                        $(".res-menu-wrap li").eq(activeTabIdx).addClass("active");
                        $("#res_selected").html($(".res-menu-wrap li").eq(activeTabIdx).find('a').html());
                    }
                }).addClass( "ui-tabs-vertical ui-helper-clearfix" );
                $( "#megatabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
            }
        };


        MM.set_json_input = function(callback){
            $.ajax({
                url:"https://stage.baf.wsu.edu/wp-json/wp/v2/pages?tags=410,409&orderby=menu_order&order=asc&_jsonp=mega",
                dataType:"jsonp",
                jsonpCallback:"mega"
            }).done(function(data){
                MM._json = data;
                //console.log("----------------set _json---");
                //console.log(MM._json);
                callback();
            });
        };

        MM.bake_content_data = function(callback){
            $.each(MM._json, function(idx,page_object){

                var html = $("<div>");
                html.html(page_object.content.rendered);
                html = html.find("#content_area").html();
                MM.service_areas[""+page_object.slug]={
                    name:page_object.title.rendered,
                    content:html,
                };
            });

            //console.log("----------------set service_areas---");
            //console.log(MM.service_areas);

            callback();
        };

        MM.start = function (){


            //gotten from the central location but lick a 5 min cache
            if( !$("#mega").length ){
                MM._html = $.runTemplate(MM.template.container, {
                    "opener":MM.template.opener,
                    "tabs_area":function(){
                        var menuhtml = "",res_menuhtml="";
                        var tabhtml = "";
                        var area_html = "";
                        var count = 0;


                        $.each( MM.service_areas, function( slug , content_object ){
                            res_menuhtml += $.runTemplate(MM.template.tabs.resmenu_item, { count:count, menu_tab_idx:slug.toLowerCase(), menu_tab_name:content_object.name, prefix:"_res" });
                            tabhtml += $.runTemplate(MM.template.tabs.content, { tab_idx:slug.toLowerCase(), tab_content:content_object.content  });
                            menuhtml += $.runTemplate(MM.template.tabs.menu_item, { count:count, menu_tab_idx:slug.toLowerCase(), menu_tab_name:content_object.name, prefix:""  });
                            count++;
                        });
                        area_html += $.runTemplate(MM.template.tabs.res_menu_wrap, { res_tabs_menu:res_menuhtml });

                        area_html += $.runTemplate(MM.template.tabs.wrapper, { tabs_menu:menuhtml, tabs:tabhtml });
                        return area_html;
                    },
                    "header":function(){
                        var html = $.runTemplate( MM.template.header.container, {
                            crumbs:function(){
                                var area_html = "";
                                var parents = [];

                                var list = [];
                                var name = $('head title').text();
                                if("undefined" !== typeof window.fais_site_object && "undefined" !== typeof window.fais_site_object.local ){
                                    name = window.fais_site_object.local.title;
                                }

                                list.push({
                                    _url : "/",
                                    _name : name,
                                    _data:"self"
                                });

                                if(parents.length){
                                    $.each(parents, function(idx,parent){
                                        list.push({
                                            _url : parent._url,
                                            _name : parent._name,
                                            _data:"partent"
                                        });
                                    });
                                }
                                list.push({
                                    _url : "https://baf.wsu.edu",
                                    _name : MM.fna_logo,
                                    _data:"root"
                                });

                                $.each( list, function(idx, item){
                                    area_html += $.runTemplate( MM.template.header.item, { crumb_url:item._url, crumb_name:item._name ,data:item._data  });
                                });


                                return area_html;
                            }
                        });
                        return html;
                    },
                });

                if( !$("#mega.setup").length ){
                    $('#binder').prepend(MM._html);
                }


                $(document).ready(function(){


                    MM.setup_inner_menu_tabs();

                    MM.mega_height=$("#mega").height();

                    $("#mega").width($('#binder').width());


                    var res_menu = MM.setupDrops( $( "#res_selected" ) );
                    res_menu.on("open",function(){
                        $(".res-menu-wrap").width($('#res_wrap').width());
                        $("#res_selected").on("click",function(){
                            //$(".res-menu-wrap").show();
                        });
                        $(".res-menu-wrap a").off().on("click",function(e){
                            e.stopPropagation();
                            e.preventDefault();
                            var idx = $(this).data("idx");
                            MM._tabs.tabs( "option", "active", idx );
                            $("#res_selected").html($("this").html());
                            $(window).trigger("resize");
                            //$(".res-menu-wrap").hide();
                            res_menu.close();
                        });
                    });

                    $("#mm_opener").on("click",function(){
                        if( ! $("#mega").is(".open") ){
                            $("#mega").addClass("open");
                            $("#mega").animate({
                                top: "-50",
                            }, 750, "easeInOutQuint", function() {
                                // Animation complete.
                            });
                        }else{
                            MM.close_menu();
                        }
                    });

                    var int_idx = $('[aria-expanded="true"]').index($('#megatabs'))+1; //+1 as there is a ul then
                    $(".res-menu-wrap li:eq("+int_idx+")").addClass("active");
                    $("#res_selected").html($(".res-menu-wrap li:eq("+int_idx+") a").html());
                    $(document).on("click",function(event) {
                        if(!$(event.target).closest('.res-menu-wrap').length && !$(event.target).is('#res_selected')){
                            res_menu.close();
                        }
                        if(!$(event.target).closest('#mega').length && !$(event.target).is('#mm_opener')){
                            MM.close_menu();
                        }
                    });
                    MM.set_menu_size();
                    //$("#mega").css("top","-"+MM.mega_height-40);

                    $(window).on("resize",function(){
                        $("#mega").width($('#binder').width());
                        MM.set_menu_size();
                        if( $("#mega").is($(".open")) ){
                            $("#mega").animate({
                                top: "-50",
                            }, 10, "linear", function() {
                                // Animation complete.
                            });
                        }else{
                            $(".res-menu-wrap").width($('#res_wrap').width());
                            MM.set_menu_size();
                            $("#mega").css("top","-"+MM.mega_height-50);
                            setTimeout(function(){MM.set_menu_size();$("#mega").css("top","-"+MM.mega_height-50);},100);
                             //$(document).trigger("click");
                        }

                    });

                    $("#mega").addClass("setup");
                    setTimeout(function(){MM.set_menu_size();$("#mega").css("top","-"+MM.mega_height-50);},500);

                });
            }
        };

    }($.wsu.fais.megamenu));

	if( !$("#mega.setup").length && window.self === window.top){
		$.wsu.fais.megamenu.init();
	}
}(jQuery,flexing.Drop,window));
