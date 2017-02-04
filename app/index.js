'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var styleChoice = {
    css: 'Css',
    less: 'Less'
}

var KoGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
          console.log('Installing dependencies');

          this.npmInstall();
      }
    });
  },

  askFor: function () {
    var done = this.async();
    this.log(this.yeoman);
    this.log(chalk.magenta('Welcome! This generator will create a knockout-project for you.'));

    var prompts = [{
        name: 'name',
        message: 'What\'s the name of your new site?',
        default: path.basename(process.cwd())
    }, {
        type: 'confirm',
        name: 'includeTests',
        message: 'Do you want to include automated tests, using Jasmine and Karma?',
        default: true
    }, {
        type: 'list',
        name: 'styleLang',
        message: "What stylesheet language do you want to use?",
        choices: [styleChoice.css, styleChoice.less]
    }];

    this.prompt(prompts, function (props) {
        this.longName = props.name;
        this.slugName = this._.slugify(this.longName);
        this.usesLess = props.styleLang === 'Less';
        this.includeTests = props.includeTests;
        done();
    }.bind(this));
  },

  templating: function () {
      var excludeExtension = this.usesLess ? '.css' : '.less';
      this._processDirectory('src', 'src', excludeExtension);
      this.template('_package.json', 'package.json');
      this.template('_gulpfile.js', 'gulpfile.js');
      this.template('_gitignore', '.gitignore');

      if (this.includeTests) {
          // Set up tests
          this._processDirectory('test', 'test');
          this.copy('intern.js');
      }
  },

  _processDirectory: function(source, destination, excludeExtension) {
    var root = this.isPathAbsolute(source) ? source : path.join(this.sourceRoot(), source);
    var files = this.expandFiles('**', { dot: true, cwd: root }).filter(function(filename){
        return !excludeExtension || path.extname(filename) !== excludeExtension;
    });

    for (var i = 0; i < files.length; i++) {
        var f = files[i];
        var src = path.join(root, f);
        if(path.basename(f).indexOf('_') == 0){
            var dest = path.join(destination, path.dirname(f), path.basename(f).replace(/^_/, ''));
            this.template(src, dest);
        }
        else{
            var dest = path.join(destination, f);
            this.copy(src, dest);
        }
    }
  }
});

module.exports = KoGenerator;
