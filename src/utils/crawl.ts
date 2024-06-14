// import request from "request";
import { load } from "cheerio";
import { Book, Chapter } from "@/export";

const fetchHTMLContent = (url?: string) => {
  return new Promise<string>((resolve, reject) => {
    if (!url) {
      return resolve("");
    }
    // request(url, (err, res, body) => {
    //   if (err) {
    //     reject(err);
    //   } else {
    //     resolve(body);
    //   }
    // });
    fetch(url)
      .then((data) => resolve(data.text()))
      .catch((e) => reject(e));
  });
};

const resolveBookList = (
  html: string,
  list_selector?: string,
  website_url?: string,
) => {
  const $ = load(html);
  const $listChapter = $(list_selector || ".list-chapter li a");
  const chapterList: Array<Partial<Chapter>> = [];
  $listChapter.each((index, el) => {
    const $el = $(el);
    const title = $el.attr("title") || $el.text() || "";
    const url = $el.attr("href") || "";
    const chapter: Partial<Chapter> = {
      no: `${index}`.padStart(4, "0"),
      title: title?.replaceAll(/[\\\/:\*\?<>|"]/g, ""),
      url: url && !url.startsWith("http") ? `${website_url}${url}` : url,
    };
    chapterList.push(chapter);
  });
  return chapterList;
};

function isFourByteChar(char: string) {
  const codePoint = char.codePointAt(0);
  return codePoint && codePoint >= 0x10000 && codePoint <= 0x10ffff;
}

const toHTMLEntity = (str: string) => {
  return str
    .split("")
    .map((char) => {
      const code = char.codePointAt(0);
      if (isFourByteChar(char)) {
        console.log(
          "isFourByteChar(char)isFourByteChar(char)isFourByteChar(char)isFourByteChar(char)isFourByteChar(char)",
        );
      }
      return isFourByteChar(char) ? `&#${code}` : char;
    })
    .join("");
};

const reoslveChapterContent = (html: string, content_selector?: string) => {
  const $ = load(html);
  const content = $(content_selector || ".article .article-box").text();
  return toHTMLEntity(content);
};

export const crawlBookChapters = async (book: Book) => {
  const bookHTML = await fetchHTMLContent(book.fetch_url);
  const chapterList = resolveBookList(
    bookHTML,
    book.crawl_rule?.list_selector,
    book.crawl_rule?.website_url,
  );
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
