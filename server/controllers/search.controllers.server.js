'use strict';

var path = require('path');

var client = require(path.resolve('./lib/elasticsearch'));

var searchPosts = function(query) {
  var search = {};
  search.index = 'posts';
  search.type = 'post';
  search.size = 10;
  search.body = {};
    search.body.query = {};
      search.body.query.match = {};
        search.body.query.match.content = {};
          search.body.query.match.content.query = query;
          search.body.query.match.content.fuzziness = 3;
          search.body.query.match.content.operator = "and";
    search.body.sort = '_score';
    search.body.highlight = {};
      search.body.highlight.order = 'score';
      search.body.highlight.fields = {};
        search.body.highlight.fields.content = {};
          search.body.highlight.fields.content.fragment_size = 200;
          search.body.highlight.fields.content.number_of_fragments = 0;

  return client.search(seatch).then(function (result) {
    return result.hits.hits;
  });
};

var searchComments = function(query) {
  var search = {};
  search.index = 'comments';
  search.type = 'comment';
  search.size = 10;
  search.body = {};
    search.body.query = {};
      search.body.query.match = {};
        search.body.query.match.content = {};
          search.body.query.match.content.query = query;
          search.body.query.match.content.fuzziness = 3;
          search.body.query.match.content.operator = "and";
    search.body.sort = '_score';
    search.body.highlight = {};
      search.body.highlight.order = 'score';
      search.body.highlight.fields = {};
        search.body.highlight.fields.content = {};
          search.body.highlight.fields.content.fragment_size = 200;
          search.body.highlight.fields.content.number_of_fragments = 0;

  return client.search(seatch).then(function (result) {
    return result.hits.hits;
  });
};

exports.search = function(req, res) {
  // pass a paramater text in as the search string
  var q = req.query;

  var result = {};
  result.posts = searchPosts(q.text);
  result.comments = seatchComments(q.text);

  res.json(result);

};

exports.searchPosts = function(req, res) {
  var q = req.query;

  res.json(searchPosts(q.text));
};

exports.searchComments = function(req, res) {
  var q = req.query;

  res.json(searchComments(q.text));
};
