module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    copy: {
      main: {
        files: [
          {expand: true, cwd: 'source/', src: ['fonts/*'], dest: 'build/'},
          {expand: true, cwd: 'source/', src: ['index.html'], dest: 'build/'}
        ]
      }
    },
    // sass-compass config
    compass: {
      prod: {
        options: {
          sassDir: 'source/style',
          cssDir: 'build/css',
          environment: 'production'
        }
      },
      dev: {
        options: {
          sassDir: 'source/style',
          cssDir: 'build/css'
        }
      }
    },

    // add prefix to property declaration
    autoprefixer: {
      single_file: {
        options: {
          // Target-specific options go here.
        },
        src: 'build/css/*.css'
      }
    },

    browserify: {
      vendor: {
        src: 'source/scripts/libs.js',
        dest: 'build/js/libs.js'
      },
      app: {
        src: 'source/scripts/app.js',
        dest: 'build/js/app.js'
      }

    },

    sprite:{
      all: {
        src: 'source/sprites/*.png',
        destImg: 'build/img/spritesheet.png',
        destCSS: 'build/css/sprites.css'
      }
    },

    handlebars: {
      all: {
          files: {
            "build/js/templates.js": ["source/templates/**/*.hbs"]
          }
        }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '*',
          base: 'build',
          livereload: true,
          onCreateServer: function(server, connect, options) {
            // var io = require('socket.io').listen(server);
            // io.sockets.on('connection', function(socket) {
            //   do something with socket
            // });
          }
        }
      }
    },

    watch: {
      scripts: {
        files: ['source/**/**/*.js', 'source/**/*.html', 'source/**/*.scss', 'source/**/*.hbs'],
        tasks: ['compass:dev', 'autoprefixer','browserify', 'handlebars', 'copy:main'],
        options: {
          livereload: true
        }
      }
    }


  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  

  // Default task(s).
  grunt.registerTask('default', ['compass:dev', 'autoprefixer','browserify','handlebars','copy:main','connect:server', 'watch']);
  // grunt.registerTask('default', ['copy:main','sprite:all','compass:dev', 'autoprefixer', 'browserify','connect:server', 'watch']);
};