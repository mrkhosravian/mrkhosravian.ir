import { DateTypeEnum, getFilePaths } from "../mdxUtils";

export function getAllPosts(lang: "en"|"fa", preview: boolean = false) {
  return getFilePaths(lang, DateTypeEnum.Posts)
}
