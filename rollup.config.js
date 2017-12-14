const nodeResolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const closureCompiler = require('rollup-plugin-closure-compiler-js')

module.exports = [{
  input: 'lib/index.js',
  output: {
    file: 'build/strict-emitter.es.js',
    format: 'es'
  },
  name: 'strictEmitter',
  plugins: [
    nodeResolve({
      preferBuiltins: false,
      browser: true
    }),
    commonjs(),
    closureCompiler({
      languageOut: 'ECMASCRIPT6',
      warningLevel: 'QUIET'
    })
  ]
}, {
  input: 'lib/index.js',
  output: {
    file: 'build/strict-emitter.umd.js',
    format: 'umd'
  },
  name: 'strictEmitter',
  plugins: [
    nodeResolve({
      preferBuiltins: false,
      browser: true
    }),
    commonjs(),
    closureCompiler({
      languageOut: 'ECMASCRIPT6',
      warningLevel: 'QUIET'
    })
  ]
}, {
  input: 'lib/index.js',
  output: {
    file: 'build/strict-emitter.cjs.js',
    format: 'cjs'
  },
  name: 'strictEmitter',
  plugins: [
    nodeResolve({
      preferBuiltins: false,
      browser: true
    }),
    commonjs(),
    closureCompiler({
      languageOut: 'ECMASCRIPT6',
      warningLevel: 'QUIET'
    })
  ]
}]
