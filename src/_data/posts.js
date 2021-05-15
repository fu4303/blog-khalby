const request = require("sync-request");
const readingTime = require("reading-time");
const slugify = require("slugify");
const moment = require("moment");
const md = require("markdown-it")({
  html: true,
  linkify: true,
  typographer: true
});

require("dotenv").config();

var res = request(
  "GET",
  `https://khaleelgibran-blog-notion.vercel.app/table?id=9676e5ba544740f58d0eb6404220f74c`,
  {
    headers: {
      "user-agent": "blog.khaleelgibran.com"
    }
  }
);

res = JSON.parse(res.getBody("utf8"));
res = res.filter(item => item.fields.Published == true);

let posts = [];
let i = 0;

while (i < res.length) {
  let post = res[i];
  let html = request("GET", `https://khaleelgibran-blog-notion.vercel.app/html?id=${post.id}`, {
    headers: {
      "user-agent": "blog.khaleelgibran.com"
    }
  }).getBody("utf8");
  let date = new Date(post.fields.Date.start_date);
  let day = date.getDate();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let slug = post.fields.Slug;
  
  posts.push({
    title: post.fields.Title,
    date: moment(date.toISOString()).format("MMMM Do[,] YYYY"),
    dateObject: date,
    description: post.fields.Description || "",
    readTime: readingTime(html).text,
    slug: slug,
    html: md.render(html),
    url: `https://khaleelgibran-blog.glitch.me/post/${slug}`
  });
  i++;
}

module.exports = posts.sort(
  (a, b) => new Date(b.dateObject) - new Date(a.dateObject)
);
