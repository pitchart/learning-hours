import { Author, EducationalBook, Category } from "../../../../../src/com/murex/tbw/domain/book";
import { Language } from "../../../../../src/com/murex/tbw/domain/country";
import { AuthorBuilder } from "./AuthorBuilder";

export class EducationalBookBuilder {
    private name: string = "The Name";
    private price: number = 13;
    private author: Author = AuthorBuilder.AnAuthor().build();
    private language: Language = Language.English;
    private category: Category = Category.COMPUTER;

    private constructor() { };

    static AnEducationalBook(): EducationalBookBuilder {
        return new EducationalBookBuilder();
    };

    named(name: string): EducationalBookBuilder {
        this.name = name;
        return this;
    }

    costing(price: number): EducationalBookBuilder {
        this.price = price;
        return this;
    }

    writtenBy(author: Author): EducationalBookBuilder {
        this.author = author;
        return this;
    }

    withLanguage(language: Language): EducationalBookBuilder {
        this.language = language;
        return this;
    }

    categorizedIn(category: Category): EducationalBookBuilder {
        this.category = category;
        return this;
    }

    build(): EducationalBook {
        return new EducationalBook(this.name, this.price, this.author, this.language, this.category);
    }
}

export const anEducationalBook = () => EducationalBookBuilder.AnEducationalBook();
