import request from "request";
import { load } from "cheerio";
import { Book, Chapter } from "../export";

const fetchHTMLContent = (url?: string) => {
  return new Promise<string>((resolve, reject) => {
    if (!url) {
      return resolve("");
    }
    request(url, (err, res, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    });
  });
};

const resolveBookList = (html: string, list_selector?: string) => {
  const $ = load(html);
  const $listChapter = $(list_selector || ".list-chapter li a");
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

const reoslveChapterContent = (html: string, content_selector?: string) => {
  const $ = load(html);
  const content = $(content_selector || ".article .article-box").text();
  return content;
};

export const crawlBookChapters = async (book: Book) => {
  const bookHTML = await fetchHTMLContent(book.fetch_url);
  const chapterList = resolveBookList(bookHTML, book.crawl_rule?.list_selector);
  return chapterList;
};

export const crawlChapterContent = async (
  url?: string,
  content_selector?: string,
) => {
  if (!url) return null;
  const chapterHTML = await fetchHTMLContent(url);
  const chapterContent = reoslveChapterContent(chapterHTML, content_selector);
  return chapterContent;
};
