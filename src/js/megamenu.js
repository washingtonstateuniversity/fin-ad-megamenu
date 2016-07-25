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
		"container":"<div id='mega' class='mega' data-height='405'><div id='megatail'></div><div id='megatab'><img src='https://dl.dropboxusercontent.com/s/r386p47oif0wiox/fa-meag-logo.png'/><i></i></div><div id='megacontent'><% this.header %><% this.tabs_area %></div></div>",
		"tabs":{
            "wrapper":"<div id='tabs' class='ui-tabs ui-tabs-vertical flex-row column-at-875'><ul class='ui-tabs-nav full-width-at-875'><% this.tabs_menu %></ul><% this.tabs %></div>",
            "content":"<div id='tabs-<% this.tab_idx %>' class='full-width-at-875'><% this.tab_content %></div>",
            "menu_item":"<li><a href='#tabs-<% this.menu_tab_idx %>'><% this.menu_tab_name %></a></li>",
        },
        "header":{
            "container":"<div id='mega_header' class='flex-row column-at-875'><h2>Finance and Administration</h2><ul id='mega_crumb'><% this.crumbs %></ul></div>",
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
            $.each( json.service_areas, function( name, area ){
                var idx = name.replace(/[^a-zA-Z0-9-_]/g, '-');
                tabhtml += $.runTemplate(template.tabs.content, { tab_idx:idx, tab_content:area.content  });
                menuhtml += $.runTemplate(template.tabs.menu_item, { menu_tab_idx:idx, menu_tab_name:name });
            });
            html = $.runTemplate(template.tabs.wrapper, { tabs_menu:menuhtml, tabs:tabhtml });



            return html;
        },
        "header":function(){
            var html = $.runTemplate( template.header.container, {
                crumbs:function(){
                    var html = $.runTemplate( template.header.item, { crumb_url:"#", crumb_name:"here" });
                    return html;
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

    $('#binder').prepend(html);
	$(document).ready(function(){
        $( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
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
                $("#mega").animate({
                    top: "-"+mega_height-50,
                }, 200, "easeInExpo", function() {
                    // Animation complete.
                });
                $("#mega").removeClass("open");
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
