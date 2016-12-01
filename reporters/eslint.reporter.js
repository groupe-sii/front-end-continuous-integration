const Reporter = require('./reporter'),
  CLIEngine = require('eslint').CLIEngine,
  glob = require('glob');

module.exports = class ESLintReporter extends Reporter {

  constructor (options, projectName) {
    super(options, projectName);
    this.linterName = 'ESLint';
  }

  static defaultOptions () {
    return {
      src      : 'src/**/*.js',
      report   : 'reports/sonar/eslint.json',
      rulesFile: '.eslintrc'
    };
  }

  launch (done) {
    this.options.eslint = this.getRCFile(this.options.rulesFile);
    this.linter = new CLIEngine(this.options.eslint);

    glob(this.options.src, (er, files) => {
      this.processFiles(files, this.options);
      this.closeReporter(this.options.report);

      if (typeof done === 'function') {
        done();
      }
    });
  }

  processFiles (fileArray) {
    this.openReporter();
    fileArray.forEach((file) => {
      this.processFile(file);
    });
  }

  processFile (file) {
    let input = this.readFile(file),
      result = this.linter.executeOnText(input, undefined, true),
      severity;

    this.openFileIssues(file, null, /^(\s+)?\n$/gm);
    for (let message of result.results[0].messages) {
      switch (message.type) {
        case 2:
          severity = this.MAJOR;
          break;
        case 1:
          severity = this.MINOR;
          break;
        default:
          severity = this.INFO;
          break;
      }
      this.addIssue((message.line ? message.line : null), message.message, '', message.ruleId, severity, 'eslint');

    }

  }


};
