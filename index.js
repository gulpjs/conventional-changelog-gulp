'use strict';

var Q = require('q');
var trim = require('lodash.trim');
var readFile = Q.denodeify(require('fs').readFile);
var resolve = require('path').resolve;

var parserOpts = {
  headerPattern: /^(\w*)\: (.*?)(?:\((.*)\))?$/,
  headerCorrespondence: [
    'tag',
    'message',
  ],
};

var tagOrder = {
  breaking: 0,
  fix: 1,
  new: 2,
  update: 3,
  docs: 4,
  upgrade: 5,
  build: 6,
  scaffold: 7,
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
  commitGroupsSort: function(a, b) {
    var aTitle = a.title;
    var bTitle = b.title;
    var aOrder = tagOrder[aTitle.toLowerCase()];
    var bOrder = tagOrder[bTitle.toLowerCase()];

    if (aOrder < bOrder) {
      return -1;
    }

    if (aOrder > bOrder) {
      return 1;
    }

    return 0;
  },
  commitsSort: ['tag', 'committerDate'],
};

module.exports = Q.all([
  readFile(resolve(__dirname, 'templates/template.hbs'), 'utf-8'),
  readFile(resolve(__dirname, 'templates/header.hbs'), 'utf-8'),
  readFile(resolve(__dirname, 'templates/commit.hbs'), 'utf-8'),
])
  .spread(function(template, header, commit) {
    writerOpts.mainTemplate = template;
    writerOpts.headerPartial = header;
    writerOpts.commitPartial = commit;

    return {
      parserOpts: parserOpts,
      writerOpts: writerOpts,
    };
  });
