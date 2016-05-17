'use strict';
var Q = require('q');
var trim = require('lodash.trim');
var readFile = Q.denodeify(require('fs').readFile);
var resolve = require('path').resolve;

var parserOpts = {
  headerPattern: /^(\w*)\: (.*?)(?:\((.*)\))?$/,
  headerCorrespondence: [
    'tag',
    'message'
  ]
};

var writerOpts = {
  transform: function(commit) {
    if (!commit.tag || typeof commit.tag !== 'string') {
      return;
    }

    if (commit.tag.toLowerCase() === 'release') {
      return;
    }

    if (typeof commit.hash === 'string') {
      commit.hash = commit.hash.substring(0, 7);
    }

    if (typeof commit.message === 'string') {
      commit.message = trim(commit.message);
    }

    return commit;
  },
  // TODO: sort groups
  groupBy: 'tag',
  commitGroupsSort: 'title',
  commitsSort: ['tag', 'committerDate']
};

module.exports = Q.all([
  readFile(resolve(__dirname, 'templates/template.hbs'), 'utf-8'),
  readFile(resolve(__dirname, 'templates/header.hbs'), 'utf-8'),
  readFile(resolve(__dirname, 'templates/commit.hbs'), 'utf-8')
])
  .spread(function(template, header, commit) {
    writerOpts.mainTemplate = template;
    writerOpts.headerPartial = header;
    writerOpts.commitPartial = commit;

    return {
      parserOpts: parserOpts,
      writerOpts: writerOpts
    };
  });
