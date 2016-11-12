# Classical-Ko Generator for Yeoman

A Yeoman generator that creates a simple starting point for a knockoutjs SPA.


## About

This generator is a fork of [the fantastic 'generator-ko'](https://github.com/SteveSanderson/generator-ko) by [the brilliant Steven Sanderson](https://github.com/SteveSanderson).

The purpose of this fork was to simplify the original project, reducing dependencies and avoiding any transpilation of javascript. The aim is to be a simple starting point for a knockoutjs single page application that works out of the box. Also trying to provide a tad more documentation, as the original project is best documented in [this video](https://www.youtube.com/watch?v=I1USsIW8aWE)

There is a minuscule underlying preference for users of the [Brackets.io text editor](http://brackets.io/), but it's absolutely not a dependancy.

## Requirements

Since this is a Yeoman generator you will have to have installed [node.js](https://nodejs.org/en/), which bundles [npm](https://www.npmjs.com/).

And the [Yeoman scaffolding tool](http://yeoman.io/). `npm install -g yo` in node.

## How-to

### Install

When that's all in place, you can install the generator `npm install -g generator-classical-ko`

### Use

**Scaffolding a new app**
Navigate your terminal to where you want to scaffold up your starting point. Should be an empty folder.

Type `yo classical-ko`

Yeoman will start up and ask you some questions:
1. What's the name of your app
2. Do you want to include automated tests? (Karma and Jasmine)
3. What stylesheet language do you want to use? (Css or Less)

After that, you'll have a small simple app, as a starting point for your project.

**Scaffolding a new component**
When you need a new component in your app you can scaffold one:
`yo classical-ko:component <newComponentName>`
This will add a component in src/components and register it in startup.js

## A small note on choosing LESS
If you go down the less-route, you can use the `gulp watch` -task to transpile during development, or you can do it "manually" each time with `gulp devLess`.
If you're using the Brackets.io text editor, I recommend [the LESS AutoCompile extension](https://github.com/jdiehl/brackets-less-autocompile). The style.less file has already been configured for this extension.

## Testing in Brackets.io
The Karma.conf has Brackets.io added as a reporter, and the karma-brackets package has already been added as a dependency. If you're in to BDD-style development you can simply install [the Karma runner for Brackets](https://github.com/artoale/karma-brackets) and have Karma run your tests directly in Brackets. 

## License
MIT
