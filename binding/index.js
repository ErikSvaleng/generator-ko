'use strict';
var yeoman = require('yeoman-generator');
var fs = require('fs');
var chalk = require('chalk');

var BindingGenerator = yeoman.generators.NamedBase.extend({
    init : function (){
        console.log('Creating new binding \'' + this.name + '\'...');
        this.componentName = this.name;
        this.dirname = 'src/bindings/';
        this.filename = this._.dasherize(this.name);
    },

    template : function (){
        this.copy('customBinding.js', this.dirname + this.filename + '.js');
    },

    addComponentRegistration : function (){
        // Identify file where registration shall be made
    var requireConfig = 'src/app/require.config.js';

        //If file exists
    readIfFileExists.call(this, requireConfig, function (existingContents) {

            
        // Check if component with similar name is already registered
        var existingRegistrationRegex = new RegExp('\s*[\'"]' + this.filename + '[\'"]\s*:');
        // If already registered, give feedback in console
        if (existingRegistrationRegex.exec(existingContents)) {
            this.log(chalk.white(this.filename) +
                chalk.cyan(' is already registered in ') +
                chalk.white(requireConfig));
            return;
        }

        // Declare token to look for when inserting code
        var token =
                '// [Scaffolded bindings will be inserted here. To retain this feature, don\'t remove this comment.]',
            // Create RegExp from token
            regex = new RegExp('^(\\s*)(' + token.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&') + ')',
                'm'),
            // Set path to create file
            modulePath = 'bindings/' + this.filename,
            // Define line to add to the list
            lineToAdd = '\"' + this.filename + '\": \"' + modulePath + '\",',
            // Replace token-regex with new component registration + the token to retain feature
            newContents = existingContents.replace(regex, '$&$1' + lineToAdd);
        // Write the new content to file
        fs.writeFile(requireConfig, newContents);
        // Give feedback that file is registered
        this.log(chalk.green('   registered ') +
            chalk.white(this.filename) +
            chalk.green(' in ') +
            chalk.white(requireConfig));

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

module.exports = BindingGenerator;