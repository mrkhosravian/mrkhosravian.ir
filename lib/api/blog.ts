import { fetchAPI } from "./api";
import { postFilePaths } from "../mdxUtils";

export function getAllPosts(lang: "en"|"fa", preview: boolean = false) {
  return postFilePaths(lang)
}
