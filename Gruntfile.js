module.exports = function(grunt) {
    // Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            files: [
                "src/**/*",
                "data/**/*",
            ],
            tasks: [ "sass", "jshint", "uglify" , "autoprefixer", "stylelint", "cssmin",   "copy" ]
        },
        sass: {
            options: {
                sourceMap: true
            },
            megamenu: {
                files: [
                    { src: "src/scss/megamenu.scss", dest: "build/_pre_sass/megamenu.css" },
                ]
            },
        },
        copy:{
            maps: {
                files: [
                    //for deploy
                    { expand: true, src: ["build/pre_deploy/**/megamenu.min.*"], dest: "deploy", flatten: true },
                    //for dev
                    { expand: true, src: ["src/js/megamenu.js"], dest: "develop", flatten: true },
                    { expand: true, src: ["build/_precss/megamenu.css"], dest: "develop", flatten: true, },
                    { expand: true, src: ["src/bootstrap.js"], dest: "develop", flatten: true },
                ]
            },
            production: {
                files: [
                    { expand: true, src: ["src/images/*"], dest: "//facops35/resources/central_FnA_theme/megamenu/images", flatten: true },
                    { expand: true, src: ["data/*"], dest: "//facops35/resources/central_FnA_theme/megamenu" },
                    { expand: true, src: ["develop/*"], dest: "//facops35/resources/central_FnA_theme/megamenu", flatten: true },
                ]
            }
        },
        uglify: {
            options: {
                banner: "/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today('yyyy-mm-dd') %> */\n" +
                    "/*   */\n"
            },
            build: {
                src: "src/js/megamenu.js",
                dest: "deploy/megamenu.min.<%= pkg.version %>.js"
            },
            bootstrap: {
                src: "src/bootstrap.js",
                dest: "deploy/bootstrap.min.<%= pkg.version %>.js"
            }
        },
        autoprefixer: {
            options: {
                browsers: ["> 1%", "last 2 versions","ie 9","ie 10"]
            },
            megamenu: {
                src: "build/_pre_sass/megamenu.css",
                dest: "build/_precss/megamenu.css"
            },
        },
        cssmin: {
            options: {
                sourceMap: true,
            },
            megamenu: {
                files: [{
                    expand: true,
                    src: ['build/_precss/megamenu.css'],
                    dest: "build/pre_deploy/megamenu",
                    ext: '.min.<%= pkg.version %>.css'
                }]
            },
        },
        stylelint: {
            megamenu: {
                src: [ "build/_precss/megamenu.css",
                     ],
                options: {
                    configFile: '.stylelintrc',
                    /*"fallback-colors": false,              // unless we want to support IE8
                    "box-sizing": false,                   // unless we want to support IE7
                    "compatible-vendor-prefixes": false,   // The library on this is older than autoprefixer.
                    "gradients": false,                    // This also applies ^
                    "overqualified-elements": false,       // We have weird uses that will always generate warnings.
                    "ids": false,
                    "regex-selectors": false,              // audit
                    "adjoining-classes": false,
                    "box-model": false,                    // audit
                    "universal-selector": false,           // audit
                    "unique-headings": false,              // audit
                    "outline-none": false,                 // audit
                    "floats": false,
                    "font-sizes": false,                   // audit
                    "important": false,                    // This should be set to 2 one day.
                    "unqualified-attributes": false,       // Should probably be 2 one day.
                    "qualified-headings": false,
                    "known-properties": 1,              // Okay to ignore in the case of known unknowns.
                    "duplicate-background-images": 2,
                    "duplicate-properties": 2,
                    "star-property-hack": 2,
                    "text-indent": 2,
                    "display-property-grouping": 2,
                    "shorthand": 2,
                    "empty-rules": 2,
                    "vendor-prefix": 2,
                    "zero-units": 2*/
                }
            }
        },
        jshint: {
            files: [
                    "src/**/*.js",
                ],
            options: {
                // options here to override JSHint defaults
                boss: true,
                curly: true,
                eqeqeq: true,
                eqnull: true,
                expr: true,
                immed: true,
                noarg: true,
                //onevar: true,
                //quotmark: "double",
                smarttabs: true,
                //trailing: true,
                undef: true,
                unused: true,
                globals: {
                    jQuery: true,
                    $: true,
                    console: true,
                    module: true,
                    document: true,
                    window:true,
                    define:true,
                    alert:true,
                    setTimeout:true,
                    ZeroClipboard:true,
                    MutationObserver:true,
                    google:true,
                    tinyMCE:true,
                    tinymce:true,
                    addthis:true,
                }
            }
        },

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks( "grunt-contrib-uglify" );
    grunt.loadNpmTasks( "grunt-contrib-jshint" );
    grunt.loadNpmTasks( "grunt-contrib-cssmin" );
    grunt.loadNpmTasks( "grunt-stylelint" );
    grunt.loadNpmTasks( "grunt-contrib-copy" );
    grunt.loadNpmTasks( "grunt-contrib-watch" );
    grunt.loadNpmTasks( "grunt-autoprefixer" );
    grunt.loadNpmTasks( "grunt-sass" );
    // Default task(s).
    grunt.registerTask("start", ["watch"]);
    grunt.registerTask("default", ["sass", "jshint", "uglify" ,"autoprefixer", "stylelint", "cssmin",  "copy" ]);

};
