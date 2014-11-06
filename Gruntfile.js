module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //copy static files
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'frontend/source/', src: ['fonts/*'], dest: 'frontend/build/'},
          {expand: true, cwd: 'frontend/source/', src: ['index.html'], dest: 'frontend/build/'}
        ]
      }
    },
    // sass config
    sass: {
      dist: {
        files: {
          'frontend/build/css/app.css' : 'frontend/source/style/app.scss'
        }
      }
    },
    // add prefix to css property declaration
    autoprefixer: {
      single_file: {
        options: {
          // Target-specific options go here.
        },
        src: 'frontend/build/css/*.css'
      }
    },

    //javascript AMD
    browserify: {
      vendor: {
        src: 'frontend/source/scripts/libs.js',
        dest: 'frontend/build/js/libs.js'
      },
      app: {
        src: 'frontend/source/scripts/app.js',
        dest: 'frontend/build/js/app.js'
      }

    },

    //assets management
    sprite:{
      all: {
        src: 'frontend/source/sprites/*.png',
        destImg: 'frontend/build/img/spritesheet.png',
        destCSS: 'frontend/build/css/sprites.css'
      }
    },

    //html templating
    handlebars: {
      all: {
        files: {
          "frontend/build/js/templates.js": ["frontend/source/templates/**/*.hbs"]
        }
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '*',
          base: 'frontend/build',
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
        files: ['frontend/source/**/**/*.js', 'frontend/source/**/*.html', 'frontend/source/**/*.scss', 'frontend/source/**/*.hbs'],
        tasks: ['sass', 'autoprefixer','browserify', 'handlebars', 'copy:main'],
        options: {
          livereload: true
        }
      }
    }


  });

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-spritesmith');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-sass');
  

  // Default task(s).
  grunt.registerTask('default', ['sass', 'autoprefixer','browserify','handlebars','copy:main','connect:server','watch']);
  // grunt.registerTask('default', ['copy:main','sprite:all','compass:dev', 'autoprefixer', 'browserify','connect:server', 'watch']);
};