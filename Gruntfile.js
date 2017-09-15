module.exports = function (grunt) {

  grunt.initConfig({
    'compile-handlebars': {
      all: {
        files: [{
          cwd: 'pre',
          expand: true,
          src: ['**/*.hbs', '!partials/*.hbs'],
          dest: 'post/',
          ext: '.html'
        }],
        partials: 'pre/partials/**/*.hbs',
        globals: ['pre/globals.json'],
        templateData: 'pre/**/*.json'
      }
    },
    watch: {
      all: {
        options: { livereload: true },
        files: ['pre/**/*'],
        tasks: ['compile-handlebars']
      }
    },
    connect: {
      all: {
        options: {
          base: {
            path: 'post',
            options: {
              index: 'index.html'
            }
          },
          keepalive: true
        }
      }
    },
    concurrent: {
      all: {
        tasks: ['watch', 'connect'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-compile-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('build', ['compile-handlebars']);
  grunt.registerTask('run', ['concurrent']);
};
