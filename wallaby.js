const compilerOptions = Object.assign(require('./tsconfig.json').compilerOptions);

module.exports = function (wallaby) {

  return {
    files: [
      'fixtures/**/*.+(ts|js|html|json|css|ico|txt)',
      'package.json',
      'src/**/*.+(ts|js|html|json)',
      '!src/**/*.spec.ts'
    ],
    tests: [
      'src/**/*.spec.ts'
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      '**/*.ts': wallaby.compilers.typeScript(compilerOptions)
    },

    testFramework: 'jest',

    setup: function (wallaby) {
      // modifying node_modules/jest-preset-angular/jest-preset.json settings
      // to avoid transforming already transformed by wallaby TS files
      // and to point module mapper to wallaby cache (with transformed/instrumented files)
      const jestConfig = require('./package.json').jest;
      jestConfig.transformIgnorePatterns = ['node_modules/(?!@ngrx)', 'src/(?!jest)'];
      jestConfig.moduleNameMapper = {'(.*)': `${wallaby.projectCacheDir}/src/$1`};
      wallaby.testFramework.configure(jestConfig);
    },

    debug: true
  };
};
