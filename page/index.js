'use strict';
var yeoman = require('yeoman-generator');
var fs = require('fs');
var chalk = require('chalk');

var ComponentGenerator = yeoman.generators.NamedBase.extend({
    init : function (){
        console.log('Creating page \'' + this.name + '\'...');
        this.componentName = this.name;
        this.dirname = 'src/pages/' + this._.dasherize(this.name) + '/';
        this.filename = this._.dasherize(this.name);
        this.viewModelClassName = this._.classify(this.name);
    },

    template : function (){
        this.copy('view.html', this.dirname + this.filename + '.html');
        this.copy('viewmodel.js', this.dirname + this.filename + '.js');
    },

    addComponentRegistration : function (){
        // Identify file where registration shall be made
        var componentConfig = 'src/app/components.config.js';

        //If file exists
        readIfFileExists.call(this, componentConfig, function (existingContents) {


            // Check if component with similar name is already registered
            var existingRegistrationRegex = new RegExp('\s*{\s*name\s*:\s*[\'"]' + this.filename + '[\'"]\s*,');
            // If already registered, give feedback in console
            if (existingRegistrationRegex.exec(existingContents)) {
                this.log(chalk.white(this.filename) +
                    chalk.cyan(' is already registered in ') +
                    chalk.white(componentConfig));
                return;
            }

            // Declare token to look for when inserting code
            var token =
                    '// [Scaffolded pages will be inserted here. To retain this feature, don\'t remove this comment.]',
                // Create RegExp from token
                regex = new RegExp('^(\\s*)(' + token.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&') + ')',
                    'm'),
                // Set path to create file
                modulePath = 'pages/' + this.filename + '/' + this.filename,
                // Define line to add to the list
                lineToAdd = '\n\t\t{ name: \'' + this.filename + '\', path: \'' + modulePath + '\' },',
                // Replace token-regex with new component registration + the token to retain feature
                newContents = existingContents.replace(regex, '$&$1' + lineToAdd);
            // Write the new content to file
            fs.writeFile(componentConfig, newContents);
            // Give feedback that file is registered
            this.log(chalk.green('   registered ') +
                chalk.white(this.filename) +
                chalk.green(' in ') +
                chalk.white(componentConfig));

            // Give gulpfile instructions
            if (fs.existsSync('gulpfile.js')) {
                this.log(chalk.magenta('To include in build output, reference ') +
                    chalk.white('\'' + modulePath + '\'') +
                    chalk.magenta(' in ') +
                    chalk.white('gulpfile.js'));
            }
        });
    }

});

function readIfFileExists(path, callback){
    if (fs.existsSync(path)) {
        callback.call(this, this.readFileAsString(path));
    }
}

module.exports = ComponentGenerator;
