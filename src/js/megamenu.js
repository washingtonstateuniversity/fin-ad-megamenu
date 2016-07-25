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
		result = new Function( code ).apply( options );

		return result;
	};


	var mega_height=$("#mega").height();
	//gotten from the central area with long cache
	var template = {
		"container":"<div id='mega' class='mega' data-height='376'><div id='megatail'></div><div id='megatab'><img src='https://dl.dropboxusercontent.com/s/r386p47oif0wiox/fa-meag-logo.png'/><i></i></div><div id='megacontent'><div id='mega_header' class='flex-row column-at-875'><% this.header %></div><% this.tabs_area %></div></div>",
		"tabs":{}

	};
	//gotten from the central location but lick a 5 min cache
	var json = {
		service_areas: {
			"Financial Services":{},
			"Facilities Services":{},
			"Public Safety":{},
			"Health & Safety and Risk Management Services":{},
			"Real Estate and External Business Operations":{},
			"Finance and Administration":{}
		},
		global_massges: {}
	};



	$(document).ready(function(){

        $(window).on("resize",function(){
            mega_height=$("#mega").height();
            $("#mega").data("height",mega_height);
            console.log(mega_height);
            console.log(template);
            console.log(json);
            if( ! $("#mega").is(".open")){
                $("#mega").css("top","-"+mega_height-50);
            }


        }).trigger("resize");


        $("#megatab").on("click",function(){
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



        $( "#tabs" ).tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
        $( "#tabs li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-left" );
    });
}(jQuery));
