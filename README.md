# sonar-web-frontend-reporters

[![NPM version][npm-image]][npm-url]

[npm-image]: https://badge.fury.io/js/sonar-web-frontend-reporters.svg
[npm-url]: https://npmjs.org/package/sonar-web-frontend-reporters

This is a repo for SII continuous integration build system dedicated to Front-end webapps. This repo provides all the linters reporters written by SII for the generic [Sonarqube plugin](https://github.com/groupe-sii/sonar-web-client-plugin). Usage is based on gulp.

# Getting started

```bash
npm i --save-dev sonar-web-frontend-reporters
```

# Default Usage

```Javascript
'use strict';
var gulp = require('gulp'),
    SonarWebReporters = require("sonar-web-frontend-reporters"),
    projectName = 'sonar-web-frontend-helloworld';

gulp.task('lint', function() {
    return SonarWebReporters.launchReporters({
        project: projectName, //your project's name
        css: true, //activate CSS Lint with default values
        scss: true, //activate SCSS Lint with default values
        html: true, //activate HTMLHint with default values
        js: true, //activate JSHint with default values
        eslint: true, //activate ESLint with default values
        eslint_angular: true, //activate ESLint for Angular with default values
        ts: true //activate TSLint with default values
    });
});
```

```bash
gulp lint
```

All params for launchReporters are optional, if you dont pass them, they'll skip linters. We rarely need to scan both css and scss for example.

# Configuration

Since not all project will match the default values, you can customize it, each reporter has params :

* src: the gulp.src params to use for the task, probably the only one you'll have to override
* report: the report json file path to use
* rulesFile: the rules file to use
* task: the gulp task name to use for the report
* base: (for eslint only) the base folder for seeking sources
* linter: the gulp linter wrapper to use for the report

# Default values

```Javascript
gulp.task('lint', function() {
    return SonarWebReporters.launchReporters({
        project: projectName,
        css: {
          src: "src/**/*.css",
          report: "reports/sonar/csslint.json",
          rulesFile: ".csslintrc",
          task: "ci-csslint",
          linter: require("gulp-csslint")
        },
        scss: {
          src: "src/**/*.scss",
          report: "reports/sonar/scsslint.json",
          rulesFile: ".scsslintrc",
          task: "ci-scsslint",
          linter: require("gulp-scss-lint")
        },
        html: {
          src: "src/**/*.html",
          report: "reports/sonar/htmlhint.json",
          rulesFile: ".htmlhintrc",
          task: "ci-htmlhint",
          linter: require("gulp-htmlhint")
        },
        js: {
          src: "src/**/*.js",
          report: "reports/sonar/jshint.json",
          rulesFile: ".jshintrc",
          task: "ci-jshint",
          linter: require("gulp-jshint")
        },
        eslint: {
          src: "src/**/*.js",
          report: "reports/sonar/eslint.json",
          rulesFile: ".eslintrc",
          task: "ci-eslint",
          base: "src",
          linter: require("gulp-eslint")
        },
        eslint_angular: {
          src: "src/**/*.js",
          report: "reports/sonar/eslint-angular.json",
          rulesFile: ".eslintrc",
          task: "ci-eslint-angular",
          base: "src",
          linter: require("gulp-eslint")
        },
        ts: {
          src: "src/**/*.ts",
          report: "reports/sonar/tslint.json",
          rulesFile: "tslint.json",
          task: "ci-tslint",
          linter: require("gulp-tslint")
        },
        callback: function() {
          console.log('Linting ended!');
        }
    });
});
```

# Sample project with jasmine/istanbul for testing

SOON

# Sample project with intern for testing

An example project is available here: https://github.com/groupe-sii/sonar-web-frontend-helloworld

# Informations for Sonarqube

The export files for Sonarqube are JSON files providing all informations a Sonarqube issue might need :

* Project Description
  * language : The programmation(cough) language of the project (HTML, CSS, JS, whatever)
  * project : The name of the project
  * projectPath : The path to the sources of the project for Sonarqube parsing
  * version : The project version
  * violations : Object summarizing the number of violations in the project sorted by severity
  * nbFiles : Number of scanned files in the project
  * nbLines : Total number of lines in scanned files
  * nbComments : Total number of commented lines in scanned files
  * nbCloc : Total number of lines of code (non empty non comment) in scanned files
  * files : Array of scanned files
* File description
  * name : File name
  * path : File path relative to project's path
  * nbLines : Number of lines in the file
  * nbComments : Number of commented lines in the file
  * nbCloc : Number of lines of code (non empty non comment) in the file
  * violations : Object summarizing the number of violations in the file sorted by severity
  * issues : Array of issues in the file
* Issue description
  * line : The line where the issue occurs in the file
  * col : The column where the issue occurs in the line
  * message : Summary of the issue
  * description : Long test descrtibing the issue
  * rulekey : The unique identifier of the issue
  * severity : Issue severity (one of INFO,MINOR,MAJOR,CRITICAL,BLOCKER)
  * reporter : Name of the reporter used to generate this issue
  * creationDate : Date of issue creation

# Included Reporters

Reporters are custom reporters written for the gulp tasks of each linter, the output is a Sonarqube compatible JSON file.
A Reporter must be open before being passed to linter/hinter plugin, and closed after the linter/hinter plugin ended its task.

* [HTMLHint](http://htmlhint.com/)
* [JSHint](http://jshint.com/)
* [CSS Lint](http://csslint.net/)
* [SCSS Lint](https://github.com/brigade/scss-lint)
* [ESLint](http://eslint.org/)
* [ESLint for Angular](https://github.com/Gillespie59/eslint-plugin-angular)
* [TSLint](http://palantir.github.io/tslint/)

# Roadmap

New reporters will be added over time, with new webtechnologies incoming :

* Angular2 linter / Codelyzer
