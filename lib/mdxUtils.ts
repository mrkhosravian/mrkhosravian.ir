import fs from "fs";
import path from "path";

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), "data", "posts");

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = (lang: "fa" | "en") => fs
  .readdirSync(POSTS_PATH + "/" + lang + "/")
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path))
  .map(path => path.substr(0, path.lastIndexOf(".")) || path)
