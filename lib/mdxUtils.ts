import fs from "fs";
import path from "path";

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), "data", "posts");

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = (lang: "fa" | "en") => fs
  .readdirSync(POSTS_PATH + "/" + lang + "/")
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path))
  .map(fileName => ({
    path: fileName,
    time: fs.statSync(POSTS_PATH + "/" + lang + "/" + fileName).ctime.getTime()
  }))
  .sort(function(a, b) {
    console.log(a.time, b.time);
    return b.time - a.time;
  })
  .map(({ path }) => path.substr(0, path.lastIndexOf(".")) || path);

export const countPosts = (lang: "fa" | "en") => fs
  .readdirSync(POSTS_PATH + "/" + lang + "/")
  .filter((path) => /\.mdx?$/.test(path))
  .length;
