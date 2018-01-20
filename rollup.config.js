import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import node from 'rollup-plugin-node-builtins';

export default {
    input: 'demo/index.js',
    name: 'something',
    output: {
        file: 'dist/bundle.js',
        format: 'iife'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**' // only transpile our source code
        }),
        commonjs(),
        resolve(),
        node(),
    ]
};
