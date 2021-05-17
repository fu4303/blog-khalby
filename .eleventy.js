const { DateTime } = require("luxon");
const pluginSEO = require("eleventy-plugin-seo");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const htmlmin = require("html-minifier");
const CleanCSS = require("clean-css");
const searchFilter = require("./src/filters/searchFilter");
const posts = require("./src/_data/posts");

module.exports = function (eleventyConfig) {
  eleventyConfig.setTemplateFormats([
    "html",
    "njk",
    "md",
    "css",
    "jpeg",
    "jpg",
    "png",
    "svg",
    "woff",
    "woff2",
  ]);

  eleventyConfig.addPassthroughCopy("public");

  /*
  From: https://github.com/artstorm/eleventy-plugin-seo
  
  Adds SEO settings to the top of all pages
  The "glitch-default" bit allows someone to set the url in seo.json while
  still letting it have a proper glitch.me address via PROJECT_DOMAIN
  */
  const seo = require("./src/seo.json");
  if (seo.url === "glitch-default") {
    seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
  }
  eleventyConfig.addPlugin(pluginSEO, seo);

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  /**
   https://github.com/11ty/eleventy-base-blog/pull/34
   https://www.browsersync.io/docs/options#option-ghostMode
   
   Noticed by @clottman - we do NOT want to be transmitting the full browsersync
   to all users. I 
  */
  eleventyConfig.setBrowserSyncConfig({ ghostMode: false });

  /**
  Eleventy RSS feed
  **/
  eleventyConfig.addPlugin(pluginRss);

  /**
  Minifes CSS and HTML
  
  Thanks @aboutDavid!
  **/
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (outputPath.endsWith(".html")) {
      return htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
      });
    }

    return content;
  });
  eleventyConfig.addTransform("cssmin", function (content, outputPath) {
    if (outputPath.endsWith(".css")) {
      return new CleanCSS({}).minify(content);
    }
    return content;
  });

  /**
   * Stuff related to searching using Elasticlunr.js
   * https://www.belter.io/eleventy-search/
   */
  eleventyConfig.addFilter("search", searchFilter);
  eleventyConfig.addCollection("posts", collection => {
    return posts;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "build",
    },
  };
};
