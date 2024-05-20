import request from "request";
import { load } from "cheerio";
import { Chapter } from "../export";

const fetchHTMLContent = (url: string) => {
  return new Promise<string>((resolve, reject) => {
    request(url, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
};

const resolveBookList = (html: string) => {
  const $ = load(html);
  const $listChapter = $(".list-chapter li a");
  const chapterList: Array<Partial<Chapter>> = [];
  $listChapter.each((index, el) => {
    const $el = $(el);
    const title = $el.attr("title");
    const chapter: Partial<Chapter> = {
      no: `${index}`.padStart(4, "0"),
      title: title?.replaceAll(/[\\\/:\*\?<>|"]/g, ""),
      url: $el.attr("href") || "",
    };
    chapterList.push(chapter);
  });
  return chapterList;
};

const reoslveChapterContent = (html: string) => {
  const $ = load(html);
  const content = $(".article .article-box").text();
  return content;
};

export const crawlBookChapters = async (url: string) => {
  const bookHTML = await fetchHTMLContent(url);
  const chapterList = resolveBookList(bookHTML);
  return chapterList;
};

export const crawlChapterContent = async (url?: string) => {
  if (!url) return null;
  const chapterHTML = await fetchHTMLContent(url);
  const chapterContent = reoslveChapterContent(chapterHTML);
  return chapterContent;
};
