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
      search.body.query.multi_match = {};
      search.body.query.multi_match.query = q.text;
      search.body.query.multi_match.type = "most_fields";
      search.body.query.multi_match.fields = ["title", "content", "tags"];
        // search.body.query.match.title = {};
        //   search.body.query.match.title.query = q.text;
        //   search.body.query.match.title.fuzziness = 3;
        //   search.body.query.match.title.operator = "and";


        // search.body.query.match.content = {};
        //   search.body.query.match.content.query = q.text;
        //   search.body.query.match.content.fuzziness = 3;
        //   search.body.query.match.content.operator = "and";


        // Fix and uncomment once tags are stored as an array
        // search.body.query.match.tags = {};
        //   search.body.query.match.tags.query = q.text;
        //   search.body.query.match.tags.fuzziness = 3;
        //   search.body.query.match.tags.operator = "and";
    search.body.sort = '_score';


  client.search(search).then(function (result) {
    res.json(result.hits.hits);

  });

};

exports.searchByTag = function(req, res) {

  var q = req.query;

  var search = {};
  search.index = 'posts';
  search.type = 'post';
  search.size = 10;
  search.body = {};
    search.body.query = {};
      search.body.query.match = {};
        search.body.query.match.tags = {};
          search.body.query.match.tags.query = req.tagName;
          search.body.query.match.tags.fuzziness = 1;
          search.body.query.match.tags.operator = "and";
    search.body.sort = '_score';
    // search.body.highlight = {};
    //   search.body.highlight.order = 'score';
    //   search.body.highlight.fields = {};
    //     search.body.highlight.fields.tags = {};
    //       search.body.highlight.fields.tags.fragment_size = 200;
    //       search.body.highlight.fields.tags.number_of_fragments = 0;

  client.search(search).then(function (result) {
    res.json(result.hits.hits);
  });

};

exports.postByTagName = function(req, res, next, tagName) {
  req.tagName = tagName;
  next();
};
