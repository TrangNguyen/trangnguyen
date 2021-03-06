/*global module: true */
module.exports = function (grunt) {
	"use strict";
  var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;// to config html5 mode
  
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		outputDir: '<%= pkg.folders.build + pkg.name + "-" + pkg.version %>',
		bower: grunt.file.readJSON('./.bowerrc'),
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> */'
		},
		
		clean: {
			all: ['<%=pkg.folders.build %>'],
			css: {
        src: ['<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/css/*.css',
            '!<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/css/<%= pkg.name %>.css']
      }
		},
		/* files to hint, in this case, only our own js and gruntfile.js. */
		jshint: {
			src: '<%=pkg.folders.jsSource %>' + '**/*.js',
			grunt: ['gruntfile.js'],
			options: {
				jshintrc: '.jshintrc',
				globals: {
				}
			}
		},
    /*using concat to concat js files into one file which we include in the html, main.js */    
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [ 
          '<%=pkg.folders.jsSource %>' + '**/*.js' //all js inside app folder
        ],
        dest: '<%= outputDir %>/main.js'
      }
    },
    /* uglify to remove unneccessary stuff and compile all bower script too.*/
    uglify: {
      dist: {
        files: {
          '<%= outputDir %>/main.js': [  '<%= bower.directory %>/angular/angular.js',
          '<%= bower.directory %>/angular-animate/angular-animate.js',
          '<%= bower.directory %>/angular-sanitize/angular-sanitize.js',
          '<%= bower.directory %>/videogular/videogular.js',
          '<%= bower.directory %>/videogular-overlay-play/vg-overlay-play.js',
          '<%= bower.directory %>/videogular-poster/vg-poster.js',
          '<%= bower.directory %>/angular-scroll/angular-scroll.js',
          '<%= outputDir %>/main.js'
         ]
        },
        options: {
          mangle: false ,// to make sure angular code doesn't break.
          banner: '/*! <%= pkg.name %> lib - v<%= pkg.version %> -' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
        }
      }
    },
    /* css */
		sass: {
      dist: {
        options: {
          style: 'expanded',
          lineNumbers: true
        },
        files: [{
          src: ['<%=pkg.folders.wwwRoot %>/scss/app.scss'],
          dest: '<%=pkg.folders.wwwRoot %>' + 'css/app.css',
          ext: '.css'
        }]
      }
		},
		/*parse CSS ans adds venodr-prefixed CSS properties */
		autoprefixer: {
			options: {
				browsers: ["last 2 android versions", "last 2 chrome versions", "last 2 chromeandroid versions", "last 2 BlackBerry versions", "last 2 Firefox versions", "last 2 FirefoxAndroid versions", "last 2 iOS versions", "last 2 OperaMobile versions", "last 2 Safari versions", "last 2 ExplorerMobile versions"]
			},
			development: {
				src: '<%=pkg.folders.wwwRoot %>/css/app.css',
				dest: '<%=pkg.folders.wwwRoot %>/css/app.css'
			},
			production: {
				options: {
					cascade: false
				},
				src: "<%= outputDir %>/css/<%= pkg.name %>.css",
				dest: "<%= outputDir %>/css/<%= pkg.name %>.css"
			}
		},
		/*process html files at build time to modify them */
		processhtml: {
			build: {
				files: {
					"<%= outputDir %>/index.html": ['<%=pkg.folders.wwwRoot%>/index.html']
				}
			}
		},
		/* generate HTML5 AppCache Manifest from specific list */
		manifest: {
			generate: {
				options: {
					basePath: "<%=pkg.folders.build + pkg.name + '-' + pkg.version%>",
					network: ["*"],
					fallback: [],
					exclude: [],
					preferOnline: false,
					timestamp: true
				},

				src: ["**/*", "!modules/main.js.map", "!modules/main.js.src",
					//TODO - remove folder names manually, update grunt-manifest to have it done automatically
					"!js", "!css", "!images", "!images/build", "!modules", "!modules/templates"],
				dest: "<%= pkg.folders.build + pkg.name + '-' + pkg.version + '/' + pkg.name %>.manifest"
			}
		},
		/* When release, we have an archive of the application in tar.gz format */
		compress: {
			tgz: {
				options: {
					mode: "tgz",
					archive: "<%= pkg.folders.build + pkg.name + '-' + pkg.version + '.tar.gz'%>"
				},
				expand: true,
				src:  ['**/*', '**/.*'],
				dest: '<%= pkg.name + "-" + pkg.version %>/',
				cwd: '<%= outputDir %>/'
			}
		},
		
		/* Watchover changes and run speific tasks. Livereload true to auto injection, so no browser refresh needed.*/
		watch: {
			javascript: {
				files: ['<%=pkg.folders.jsSource %>' + '**/*.js'],
				tasks: ['jshint', 'karma:development:run'],
				options: {
					livereload: true
				}
			},
			html: {
				files: ['<%=pkg.folders.wwwRoot %>' + '**/*.html'],
				options: {
					livereload: true
				}
			},
			css: {
        files: ['<%=pkg.folders.wwwRoot %>' + 'css/*',
                '<%=pkg.folders.wwwRoot %>' + 'scss/**/*.scss'
        ],
        options: {
          livereload: false
        },
        tasks: ['sass']
			},
			images: {
				files: ['<%=pkg.folders.wwwRoot %>' + 'images/*'],
				options: {
					livereload: false
				}
			},
			media: {
				files: ['<%=pkg.folders.wwwRoot %>' + 'media/*'],
				options: {
					livereload: false
				}
			},
			karma: {
				files: ['<%=pkg.folders.testRoot + "**/*.js" %>'],
				tasks: ['jshint', 'karma:development:run']
			}
		},
		/*options for karma tasks */
		karma: {
			options: {
				configFile: 'karma.conf.js'
			},
			development: {
				options: {
					background: true
				}
			},
			build: {
				options: {
					singleRun: true
				}
			}
		},
		/* run a local webserver for development mode*/
		connect: {
			server: {
				options:  {
					port: 5000,
					livereload: true,
					base: '',
					hostname: '*',
					middleware: function(connect, options) {
            var middlewares = [];

            // RewriteRules support
            middlewares.push(rewriteRulesSnippet);

            if (!Array.isArray(options.base)) {
                options.base = [options.base];
            }

            var directory = options.directory || options.base[options.base.length - 1];
            options.base.forEach(function (base) {
                // Serve static files.
                middlewares.push(connect.static(base));
            });

            // Make directory browse-able.
            middlewares.push(connect.directory(directory));

            return middlewares;
          }
				}
			}
		},
		/* copy files and folders from src related to current working directory */
		copy: {
		  css: {
        files: [{
          expand: true,
          dest: '<%= pkg.folders.build + pkg.name + "-" + pkg.version %>/css/',
          src: ['*.css'],
          cwd: '<%= pkg.folders.wwwRoot%>css/'
        }]
      },
			images: {
				files: [{
					expand: true,
					dest: '<%= outputDir %>/images/build/',
					src: ['**', "!**/README"],
					cwd: '<%= pkg.folders.wwwRoot%>images/build/'
				}]
			},
			media: {
				files: [{
					expand: true,
					dest: '<%= outputDir %>/media/',
					src: ['**', "!**/README"],
					cwd: '<%= pkg.folders.wwwRoot%>media/'
				}]
			},
			modules: {
				files: [{
					expand: true,
					dest: '<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/modules/',
					src: ['**', '!**/*.js', "!**/README"],
					cwd: '<%= pkg.folders.wwwRoot%>modules/'
				}]
			},
			fonts: {
				files: [{
					expand: true,
					dest: '<%= outputDir %>/fonts/',
					src: ['**'],
					cwd: '<%= pkg.folders.wwwRoot%>fonts/'
				}]
			},
			deploy: {
				files: [{
					expand: true,
					dest: '<%=deployOrdner %>',
					src: ['<%= pkg.name + "-" + pkg.version + ".tar.gz"%>'],
					cwd: '<%= pkg.folders.build%>'
				}]
			},
			htaccess: {
				files: [{
					expand: true,
					dest: '<%= outputDir %>/',
					src: ['.htaccess'],
					cwd: '<%= pkg.folders.wwwRoot%>'
				}]
			}
		},
		cssmin: {
			css: {
				files: {
					'<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/css/<%= pkg.name %>.css': [
							//include all css files in correct order, add new files in desired order
							'<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/css/app.css'
						]
				}
			}
		},
		license: {
			options: {
				unknown: true,
				start: '.',
				depth: null,
				output: "file"
			}
		},
		
		dataUri: {
      dist: {
        src: ['<%=pkg.folders.wwwRoot %>css/*.css'],
        dest: '<%=pkg.folders.build + pkg.name + "-" + pkg.version %>/css/',
        options: {
          target: ['<%=pkg.folders.wwwRoot %>images/*.*'],
          fixDirLevel: true,
          baseDir: '<%=pkg.folders.wwwRoot %>css'
        }
      }
    },
		/* bump pkg version, create tag, commit, push*/
		push: {
			options: {
				files: ['package.json', 'bower.json'],
				add: true,
				addFiles: ['.'], // '.' for all files except ingored files in .gitignore
				commit: true,
				commitMessage: 'Release v%VERSION%',
				commitFiles: ["-a"], // '-a' for all files
				createTag: true,
				tagName: 'v%VERSION%',
				tagMessage: 'Version %VERSION%',
				push: true,
				pushTo: 'origin',
				npm: false,
				npmTag: 'Release v%VERSION%',
				gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
			}
		}
	});

	grunt.registerTask("install", "Create a deployable artifact for server environments",
		function () {
			grunt.task.run("jshint");
			grunt.task.run("clean:all");
//      grunt.task.run("bower");			
      grunt.task.run("concat");
      grunt.task.run("uglify");
//			grunt.task.run("copy:images");
			grunt.task.run("copy:media");
			grunt.task.run("copy:fonts");
			grunt.task.run("copy:htaccess");
			grunt.task.run("copy:modules");
			grunt.task.run("processhtml:build");
			grunt.task.run("dataUri");
			grunt.task.run("cssmin");
			grunt.task.run("clean:css");
			//			grunt.task.run("autoprefixer:production");
			grunt.task.run("manifest");
			grunt.task.run("compress");
		}
	);

	grunt.registerTask('license', 'List all packages (and their sub-packages) that this project depends on with license information', function() {
		function convertToCsv(data) {
			var ret = "", module, licenses, repository;

			for (module in data) {
				if (data.hasOwnProperty(module)) {
					licenses = data[module].licenses || "";
					repository = data[module].repository || "";
					ret = ret + module + ";" + licenses + ";" + repository + "\r\n";
				}
			}

			return ret;
		}
		var checker = require('license-checker'),
			fs = require('fs'),
			done = this.async(),
			defaults = {
				start: '.',
				unknown: false,
				depth: 1,
				include: 'all',
				output: 'console', //console or file
				filename: 'LICENSES',
				format: 'json' //json or csv
			},
			options = grunt.util._.extend(defaults, this.options());

		checker.init(options, function(data){
			if (options.format === 'csv') {
				data = convertToCsv(data);
			} else {
				data = JSON.stringify(data, null, 4);
			}

			if (options.output === 'file') {
				fs.writeFile(options.filename, data, function() {
					console.log('Successfully written '.green + options.filename.grey);
					done();
				});
			} else if (options.output === 'console') {
				grunt.log.writeln(data);
			} else {
				grunt.log.writeln("Unknown output channel: " + options.output);
			}
		});
	});

	grunt.registerTask('default', ['jshint']);
	grunt.registerTask('web', ['sass', 'connect:server', 'karma:development', 'watch']);

	//call grunt.loadNpmTasks for all dependencies in package.json which names start with "grunt-"
  require('load-grunt-tasks')(grunt);
};
