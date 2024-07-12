import { Book, Chapter } from "@/export";
import { resolve } from "node:path";
import fs from "node:fs";

export default class BookMerger {
  book: Book;
  chapters: Chapter[];
  constructor(book: Book, chapters: Chapter[]) {
    this.book = book;
    this.chapters = chapters;
  }

  async start() {
    const bookName = this.book.name;
    const filepath = resolve(__dirname, "../../uploads/" + bookName + ".txt");
    const contents = this.chapters
      .map(
        (item) =>
          `${item.no}${item.title}\n\n${item.content?.replaceAll("\n", "").split("  ").join("\n") || ""}`,
      )
      .join("\n\n\n");
    return new Promise<string>((resolve, reject) => {
      fs.writeFile(filepath, contents, (err) => {
        if (err) reject(err);
        else resolve(`${process.env.STATIC_URL}/${bookName}.txt`);
      });
    });
  }
}
