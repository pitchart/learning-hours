import { Author, Category, EducationalBook } from "../../../../../src/com/murex/tbw/domain/book";
import { Language } from "../../../../../src/com/murex/tbw/domain/country";
import { AuthorBuilder } from "./AuthorBuilder";

export class EducationalBookBuilder {
    private author: Author = AuthorBuilder.anAuthor().build();
    private title: string = "Martine fait des tests avec Caro et ses copains";
    private category: Category = Category.COMPUTER;
    private cost: number = 1000;
    private language: Language = Language.English;

    build(): EducationalBook {
        return new EducationalBook(this.title, this.cost, this.author, this.language, this.category);
    }

    categorizedAs(category: Category): EducationalBookBuilder {
        this.category = category;
        return this;
    }

    costing(cost: number) {
        this.cost = cost;
        return this;
    }

    titled(title: string): EducationalBookBuilder {
        this.title = title;
        return this;
    }

    writtenBy(author: Author): EducationalBookBuilder {
        this.author = author;
        return this;
    }

    writtenIn(language: Language): EducationalBookBuilder {
        this.language = language;
        return this;
    }

    static aBook(): EducationalBookBuilder {
        return new EducationalBookBuilder();
    }
}
