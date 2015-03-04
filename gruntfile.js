/*global module: true */
module.exports = function (grunt) {
	"use strict";
  var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;// to config html5 mode
  
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		/*load bower dependencies when building, it clean the directory first then install */
		bower: {
      install: {
        options: {
          install: true,
          copy: false,
          targetDir: './bower_components',
          cleanTargetDir: true
        }
      }
    },
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
				'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
				'* Copyright (c) <%= grunt.template.today("yyyy") %> */'
		},
		outputDir: '<%= pkg.folders.build + pkg.name + "-" + pkg.version %>',
		clean: {
			all: ['<%=pkg.folders.build %>']
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
    /* uglify to remove unneccessary stuff */
    uglify: {
      dist: {
        files: {
          '<%= outputDir %>/main.js': [ '<%= outputDir %>/main.js' ]
        },
        options: {
          mangle: false // to make sure angular code doesn't break.
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
		appcache: {
			options: {
				basePath: "<%= outputDir %>"
			},
			build: {
				dest: "<%= outputDir %>/<%= pkg.name %>.manifest",
				cache: "<%= outputDir %>/**/*",
				network: '*',
				fallback: ''
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
			},
//			connect: {
//			  options: {
//			    livereload: true
//			  },
//			  tasks: ['connect:server']
//			}
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
					dest: '<%= outputDir %>/media/build/',
					src: ['**', "!**/README"],
					cwd: '<%= pkg.folders.wwwRoot%>media/build/'
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
			translations: {
				files: [{
					expand: true,
					dest: '<%= outputDir %>/translations/',
					src: ['*.json'],
					cwd: '<%= pkg.folders.wwwRoot%>/translations/'
				}]
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
		function (system) {
			grunt.task.run("jshint");
			grunt.task.run("clean:all");

			if (system) {
				grunt.config('configuration', "configuration_" + system);
			} else {
				grunt.config('configuration', "configuration");
			}

//			grunt.task.run("ngtemplates");
//			grunt.task.run("requirejs");
      grunt.task.run("bower");
			grunt.task.run("cssmin");
			grunt.task.run("autoprefixer:production");
			grunt.task.run("copy:images");
			grunt.task.run("copy:media");
			grunt.task.run("copy:fonts");
			grunt.task.run("copy:htaccess");
			grunt.task.run("copy:translations");
			grunt.task.run("processhtml:build");
			grunt.task.run("appcache:build");
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
	grunt.registerTask('web', ['sass', 'autoprefixer:development', 'connect:server', 'karma:development', 'watch']);

	//call grunt.loadNpmTasks for all dependencies in package.json which names start with "grunt-"
  require('load-grunt-tasks')(grunt);
};
