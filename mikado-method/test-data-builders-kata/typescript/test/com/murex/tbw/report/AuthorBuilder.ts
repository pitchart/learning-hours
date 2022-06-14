import { Author } from "../../../../../src/com/murex/tbw/domain/book";
import { Country } from "../../../../../src/com/murex/tbw/domain/country";
import { CountryBuilder } from "./CountryBuilder";

export class AuthorBuilder {
    private name: string = "Jack";
    private country: Country = CountryBuilder.ACountry().build();

    private constructor() { };

    static AnAuthor(): AuthorBuilder {
        return new AuthorBuilder();
    };

    named(name: string): AuthorBuilder {
        this.name = name;
        return this;
    }

    from(country: Country): AuthorBuilder {
        this.country = country;
        return this;
    }

    build(): Author {
        return new Author(this.name, this.country);
    }
}

export const anAuthor = () => AuthorBuilder.AnAuthor();
