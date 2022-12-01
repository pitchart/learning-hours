import { Country, Currency, Language } from "../../../../../src/com/murex/tbw/domain/country";

export class CountryBuilder {
    constructor(name: string = "country", currency: Currency = Currency.Dollar, language: Language = Language.English) {
        this.name = name;
        this.currency = currency;
        this.language = language;
    }

    but(): CountryBuilder {
        return new CountryBuilder(this.name, this.currency, this.language);
    }
    private name: string;
    private currency: Currency;
    private language: Language;

    static aCountry(): CountryBuilder {
        return new CountryBuilder();
    }
    named(name: string): CountryBuilder {
        this.name = name;
        return this;
    }
    payingIn(currency: Currency): CountryBuilder {
        this.currency = currency;
        return this;
    }

    speaking(language: Language): CountryBuilder {
        this.language = language;
        return this;
    }

    build(): Country {
        return new Country(this.name, this.currency, this.language);
    }

    static USA = this.aCountry().named("USA").payingIn(Currency.Dollar).speaking(Language.English);
}

