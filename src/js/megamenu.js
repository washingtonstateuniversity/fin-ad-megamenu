/*jshint -W054 */
(function($){

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

	var mega_height=$("#mega").height();
	//gotten from the central area with long cache
	var template = {
		"container":'<div id="mega" class="mega" data-height="405"><div id="megatail"></div><div id="megatab"><img src="data:image/svg+xml;utf8,%3Csvg%20id%3D%22Layer_1%22%20data-name%3D%22Layer%201%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%20313.26%20194.19%22%3E%3Cdefs%3E%3Cstyle%3E.cls-1%7Bfill%3A%23f4f3ef%3B%7D%3C/style%3E%3C/defs%3E%3Ctitle%3EF%26amp%3Bamp%3BA%20logo%3C/title%3E%3Cpolygon%20class%3D%22cls-1%22%20points%3D%2295.04%2081.19%2042.29%2081.19%2051.8%2037.2%20108.77%2037.2%20113.01%2013.2%2032.42%2013.2%200%20166.19%2024.37%20166.19%2037.48%20105.19%2090.52%20105.19%2095.04%2081.19%22/%3E%3Cpath%20class%3D%22cls-1%22%20d%3D%22M472.87%2C138.4H449.32L383.7%2C255.8c-0.7.83-1.31%2C1.59-1.88%2C2.31s-1.08%2C1.35-1.61%2C2l-29.71-41.94c4.62-2.47%2C9-5%2C13.35-7.42l2.21-1.25a95%2C95%2C0%2C0%2C0%2C16.39-11.68A54.45%2C54.45%2C0%2C0%2C0%2C394%2C183.43a38.27%2C38.27%2C0%2C0%2C0%2C4.46-18.68c0-12-4-21.68-12-28.86S368%2C125.2%2C354.87%2C125.2c-15.31%2C0-27.83%2C4.51-37.21%2C13.4s-14.22%2C20.82-14.22%2C35.29c0%2C11.52%2C3.79%2C23.88%2C11.29%2C36.8-16.19%2C8.1-28%2C16.65-35.26%2C25.43a52.31%2C52.31%2C0%2C0%2C0-11.94%2C34.11c0%2C15%2C4.57%2C26.9%2C13.6%2C35.48s21%2C12.85%2C35.72%2C12.85A87.34%2C87.34%2C0%2C0%2C0%2C348.71%2C313c7.82-3.06%2C16.85-6.91%2C26.38-14.18l13.42%2C20.58h33.83l-25.42-33.5c4.74-7%2C18.76-29.43%2C24.65-41.5h39.8l5.71%2C47h24.09Zm-17.17%2C57.4%2C3.07%2C27.6H428.94c11-21.71%2C18.26-36.17%2C21.47-42.61l0.93-1.85c0.75-1.5%2C1.48-3.06%2C2.2-4.65C454.06%2C181.74%2C454.79%2C189.09%2C455.69%2C195.8ZM336.46%2C155.52c4.14-4.28%2C9.92-6.36%2C17.67-6.36%2C5.74%2C0%2C9.91%2C1.45%2C12.76%2C4.43s4.29%2C7.16%2C4.29%2C12.63a18.92%2C18.92%2C0%2C0%2C1-3.24%2C10.92%2C40.9%2C40.9%2C0%2C0%2C1-9.48%2C9.68c-3.77%2C2.83-10.63%2C6.82-20.4%2C11.89-5.18-8.06-7.81-16.31-7.81-24.57%2C0-8.1%2C2.09-14.36%2C6.2-18.62h0Zm-36%2C94.83c2-3.88%2C2.63-4.47%2C6.4-7.76l0.92-.81c4-3.5%2C10.52-7.69%2C19.4-12.46l34%2C48.06a51.13%2C51.13%2C0%2C0%2C1-10%2C4.87c-1.06.4-2.23%2C0.86-3.66%2C1.44A51.45%2C51.45%2C0%2C0%2C1%2C328%2C287.52c-8.13%2C0-14.44-2.29-19.29-7A39%2C39%2C0%2C0%2C1%2C298%2C261.13C297.39%2C258.3%2C298.15%2C254.88%2C300.44%2C250.35Z%22%20transform%3D%22translate%28-177.91%20-125.2%29%22/%3E%3C/svg%3E"/><i></i></div><div id="megacontent"><% this.header %><% this.tabs_area %></div></div>',
		"tabs":{
            "wrapper":"<div id='tabs' class='ui-tabs ui-tabs-vertical flex-row column-at-768'><ul class='ui-tabs-nav hide-below-768'><% this.tabs_menu %></ul><% this.tabs %></div>",
            "content":"<div id='tabs-<% this.tab_idx %>' class='full-width-at-768'><% this.tab_content %></div>",
            "menu_item":"<li><a data-idx='<% this.count %>' href='#tabs-<% this.menu_tab_idx %>'><% this.menu_tab_name %></a></li>",
            "res_menu_wrap":"<div id='res_wrap'><span id='res_selected'></span><ul class='res-menu-wrap'><% this.res_tabs_menu %></ul></div>",
        },
        "header":{
            "container":"<div id='mega_header' class='flex-row column-at-768'><h2>Finance and Administration</h2><ul id='mega_crumb'><% this.crumbs %></ul></div>",
            "item":"<li><a href='<% this.crumb_url %>'><% this.crumb_name %></a></li>",
        }
	};
	//gotten from the central location but lick a 5 min cache
	var json = {
		service_areas: {
			"Financial Services":{
                content:"stuff and html I think",
            },
			"Facilities Services":{
                content:"really stuff and html I think",
            },
			"Public Safety":{
                content:"ok maybe stuff and html I think",
            },
			"Health & Safety and Risk Management Services":{
                content:"but it has to be stuff and html I think",
            },
			"Real Estate and External Business Operations":{
                content:"and why not stuff and html I think",
            },
			"Finance and Administration":{
                content:"lets just stick with stuff and html I think",
            }
		},
		global_massges: {}
	};
    var html = $.runTemplate(template.container, {
        "tabs_area":function(){
            var menuhtml = "";
            var tabhtml = "";
            var area_html = "";
            var count = 0;
            $.each( json.service_areas, function( name, area ){
                var idx = name.replace(/[^a-zA-Z0-9-_]/g, '-');
                tabhtml += $.runTemplate(template.tabs.content, { tab_idx:idx, tab_content:area.content  });
                menuhtml += $.runTemplate(template.tabs.menu_item, { count:count, menu_tab_idx:idx, menu_tab_name:name });
                count++;
            });
            area_html += $.runTemplate(template.tabs.res_menu_wrap, { res_tabs_menu:menuhtml });
            area_html += $.runTemplate(template.tabs.wrapper, { tabs_menu:menuhtml, tabs:tabhtml });
            return area_html;
        },
        "header":function(){
            var html = $.runTemplate( template.header.container, {
                crumbs:function(){
                    var area_html = "";
                    area_html = $.runTemplate( template.header.item, { crumb_url:"#", crumb_name:"here" });
                    return area_html;
                }
            });
            return html;
        },
    });

    function set_menu_size(){
        mega_height=$("#mega").height();
        $("#mega").data("height",mega_height);
        console.log(mega_height);
        if( ! $("#mega").is(".open")){
            $("#mega").css("top","-"+mega_height-50);
        }
    }
    function close_menu(){
        $("#mega").animate({
        top: "-"+mega_height-50,
        }, 200, "easeInExpo", function() {
        // Animation complete.
        });
        $("#mega").removeClass("open");
    }
    $('#binder').prepend(html);
	$(document).ready(function(){
        $( "#tabs" ).tabs({
            activate: function( ){//event, ui ) {
                var activeTabIdx = $('#tabs').tabs('option','active');
                $(".res-menu-wrap li.active").removeClass('active');
                $(".res-menu-wrap li").eq(activeTabIdx).addClass("active");

            $("#res_selected").html($(".res-menu-wrap li").eq(activeTabIdx).find('a').html());
            }
        }).addClass( "ui-tabs-vertical ui-helper-clearfix" );
        $( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );


        $("#megatab").on("click",function(){
            set_menu_size();
            if( ! $("#mega").is(".open") ){
                $("#mega").addClass("open");
                $("#mega").animate({
                    top: "-50",
                }, 500, "easeOutBack", function() {
                    // Animation complete.
                });
            }else{
                close_menu();
            }
        });
        $("#res_selected").on("click",function(){
            $(".res-menu-wrap").show();
        });
        $(".res-menu-wrap a").on("click",function(e){
            e.stopPropagation();
            e.preventDefault();
            var idx = $(this).data("idx");
            $( "#tabs" ).tabs( "option", "active", idx );
            $("#res_selected").html($("this").html());
            $(".res-menu-wrap").hide();
        });

        var int_idx = $('[aria-expanded="true"]').index($('#tabs'))+1; //+1 as there is a ul then
        $(".res-menu-wrap li:eq("+int_idx+")").addClass("active");
        $("#res_selected").html($(".res-menu-wrap li:eq("+int_idx+") a").html());
        $(document).on("click",function(event) {
            if(!$(event.target).closest('.res-menu-wrap').length && !$(event.target).is('#res_selected')){
                $(".res-menu-wrap").hide();
            }
            if(!$(event.target).closest('#mega').length && !$(event.target).is('#megatab')){
                close_menu();
            }
        });
        $(window).on("resize",function(){
            set_menu_size();
            console.log("resizing");
        }).trigger("resize");
        set_menu_size();
        $("#mega").animate({
            top: "-"+mega_height-50,
        }, 200, "easeInExpo", function() {
            // Animation complete.
        });

    });
}(jQuery));
