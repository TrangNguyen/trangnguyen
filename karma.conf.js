/*global module: true */
module.exports = function (config) {
	"use strict";
	config.set({
		basePath: '.',

		files: [
			{pattern: 'bower_components/**/*.js', included: false},
			{pattern: 'test/unit/**/*.js', included: false},
			{pattern: 'app/modules/**/*.js', included: false}

		],

		autoWatch: false,

		frameworks: ['jasmine'],

		browsers: ['Chrome'],

		plugins: [
			'karma-jasmine',
			'karma-chrome-launcher'
		]

	});
};