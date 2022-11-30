import { Author } from "../../../../../src/com/murex/tbw/domain/book";
import { Country } from "../../../../../src/com/murex/tbw/domain/country";
import { CountryBuilder } from "./CountryBuilder";

export class AuthorBuilder {
    private name: string = "John Doe";
    private nationality: CountryBuilder = CountryBuilder.aCountry();
    static anAuthor(): AuthorBuilder {
        return new AuthorBuilder();
    }


    named(name: string): AuthorBuilder {
        this.name = name;
        return this;
    }


    bornIn(country: CountryBuilder): AuthorBuilder {
        this.nationality = country;
        return this;
    }

    build(): Author {
        return new Author(this.name, this.nationality.build());
    }
}

export const anAuthor = (): AuthorBuilder => AuthorBuilder.anAuthor();