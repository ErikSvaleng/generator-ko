'use strict';
var yeoman = require('yeoman-generator');
var fs = require('fs');
var chalk = require('chalk');

var ComponentGenerator = yeoman.generators.NamedBase.extend({
    init : function (){
        console.log('Creating component \'' + this.name + '\'...');
        this.componentName = this.name;
        this.dirname = 'src/components/' + this._.dasherize(this.name) + '/';
        this.filename = this._.dasherize(this.name);
        this.viewModelClassName = this._.classify(this.name);
    },

    template : function (){
        var codeExtension = '.js';
        this.copy('view.html', this.dirname + this.filename + '.html');
        this.copy('viewmodel.js', this.dirname + this.filename + '.js');
    },

    addComponentRegistration : function (){
        // Identify file where registration shall be made
        var startupFile = 'src/app/startup.js';

        //If file exists
        readIfFileExists.call(this, startupFile, function (existingContents) {

            // Check if component with similar name is already registered
            var existingRegistrationRegex = new RegExp('\\bko\\.components\\.register\\(\s*[\'"]' +
                this.filename +
                '[\'"]');
            // If already registered, give feedback in console
            if (existingRegistrationRegex.exec(existingContents)) {
                this.log(chalk.white(this.filename) +
                    chalk.cyan(' is already registered in ') +
                    chalk.white(startupFile));
                return;
            }

            // Declare token to look for when inserting code
            var token =
                    '// [Scaffolded component registrations will be inserted here. To retain this feature, don\'t remove this comment.]',
                // Create RegExp from token
                regex = new RegExp('^(\\s*)(' + token.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&') + ')',
                    'm'),
                // Set path to create file
                modulePath = 'components/' + this.filename + '/' + this.filename,
                // Define line to add to the list
                lineToAdd = 'ko.components.register(\'' + this.filename + '\', { require: \'' + modulePath + '\' });',
                // Replace token-regex with new component registration + the token to retain feature
                newContents = existingContents.replace(regex, '$1' + lineToAdd + '\n$&');
            // Write the new content to file
            fs.writeFile(startupFile, newContents);
            // Give feedback that file is registered
            this.log(chalk.green('   registered ') +
                chalk.white(this.filename) +
                chalk.green(' in ') +
                chalk.white(startupFile));

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