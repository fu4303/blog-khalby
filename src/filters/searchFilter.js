const elasticlunr = require("elasticlunr");
const posts = require("../_data/posts.js");

module.exports = function (collection) {
  // what fields we'd like our index to consist of
  var index = elasticlunr(function () {
    this.addField("title");
    this.addField("description");
    this.addField("date");
    this.setRef("slug");
  });

  // loop through each page and add it to the index
  posts.forEach((post) => {
    index.addDoc({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
    });
  });

  return index.toJSON();
};
