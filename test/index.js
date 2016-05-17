'use strict';

var expect = require('expect');
var shell = require('shelljs');
var through = require('through2');
var writeFileSync = require('fs').writeFileSync;
var conventionalChangelogCore = require('conventional-changelog-core');

var preset = require('./');

describe('gulp preset', function() {

  before(function(done) {
    shell.config.silent = true;
    shell.rm('-rf', 'tmp');
    shell.mkdir('tmp');
    shell.cd('tmp');
    shell.mkdir('git-templates');
    shell.exec('git init --template=./git-templates');

    writeFileSync('test1', '');
    shell.exec('git add --all && git commit -m\'Fix: the `no-class-assign` rule (fixes #2718)\'');
    writeFileSync('test2', '');
    shell.exec('git add --all && git commit -m"Update: Handle CRLF line endings in spaced-comment rule - 2 (fixes #3005)"');
    writeFileSync('test3', '');
    shell.exec('git add --all && git commit -m"Fix: indent rule should recognize single line statements with ASI (fixes #3001, fixes #3000)"');
    writeFileSync('test4', '');
    shell.exec('git add --all && git commit -m"Docs: Fix unmatched paren in rule description"');
    writeFileSync('test5', '');
    shell.exec('git add --all && git commit -m"Merge pull request #3033 from gcochard/patch-3 "');
    done();
  });

  it('needs tests', function(done) {
    conventionalChangelogCore({ preset: preset })
      .pipe(through())
      .on('finish', done);
  });
});
