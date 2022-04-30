import fs from "fs";
import path from "path";

// POSTS_PATH is useful when you want to get the path to a specific file
export const DATA_PATH = path.join(process.cwd(), "data");

export enum DateTypeEnum {
  Posts = "posts",
  Projects = "projects"
}

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const getFilePaths = (lang: "fa" | "en", DataType: DateTypeEnum) => {
  let path_root = `${DATA_PATH}/${DataType}/${lang}/`;
  return fs
    .readdirSync(path_root)
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path))
    .map(fileName => ({
      path: fileName,
      time: fs.statSync(path_root + fileName).ctime.getTime()
    }))
    .sort(function(a, b) {
      return b.time - a.time;
    })
    .map(({ path }) => path.substr(0, path.lastIndexOf(".")) || path);
};

export const count = (lang: "fa" | "en", DataType: DateTypeEnum) => fs
  .readdirSync(`${DATA_PATH}/${DataType}/${lang}/`)
  .filter((path) => /\.mdx?$/.test(path))
  .length;
