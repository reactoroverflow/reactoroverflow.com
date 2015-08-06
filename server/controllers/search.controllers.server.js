'use strict';

var path = require('path');

var client = require(path.resolve('./lib/elasticsearch'));

exports.search = function(req, res) {
  // pass a paramater text in as the search string
  var q = req.query;

  var search = {};
  search.index = 'posts';
  search.type = 'post';
  search.size = 10;
  search.body = {};
    search.body.query = {};
      search.body.query.match = {};
        search.body.query.match.title = {};
          search.body.query.match.title.query = q.text;
          search.body.query.match.title.fuzziness = 3;
          search.body.query.match.title.operator = "and";
    search.body.sort = '_score';
    search.body.highlight = {};
      search.body.highlight.order = 'score';
      search.body.highlight.fields = {};
        search.body.highlight.fields.title = {};
          search.body.highlight.fields.title.fragment_size = 200;
          search.body.highlight.fields.title.number_of_fragments = 0;

  client.search(search).then(function (result) {
    res.json(result.hits.hits);
  });

};
