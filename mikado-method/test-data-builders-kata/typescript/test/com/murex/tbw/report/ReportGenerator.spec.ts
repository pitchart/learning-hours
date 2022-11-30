import {ReportGenerator} from "../../../../../src/com/murex/tbw/report/ReportGenerator";
import {MainRepository} from "../../../../../src/com/murex/tbw/MainRepository";
import {InMemoryRepository} from "../storage/InMemoryRepository";
import {Author, Category, EducationalBook} from "../../../../../src/com/murex/tbw/domain/book";
import {Country, Currency, Language} from "../../../../../src/com/murex/tbw/domain/country";
import {Invoice, PurchasedBook} from "../../../../../src/com/murex/tbw/purchase";

class CountryBuilder {
    private name: string = "country";
    private currency: Currency = Currency.Dollar;
    private language: Language = Language.English;

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

describe(ReportGenerator, () => {
    it("Computes total amount without discount and without tax rate", () => {
        const repository = new InMemoryRepository();
        MainRepository.override(repository);
        const generator = new ReportGenerator();

        const usa = CountryBuilder.USA.build();
        const book = new EducationalBook(
            "Clean Code", 25, new Author(
                "Uncle Bob", usa
            ), Language.English, Category.COMPUTER);

        const purchase = new PurchasedBook(book, 2);

        const invoice = new Invoice("John Doe", usa);
        invoice.addPurchasedBook(purchase);

        repository.addInvoice(invoice);

        expect(generator.getTotalAmount()).toBe(57.5);
        expect(generator.getNumberOfIssuedInvoices()).toBe(1);
        expect(generator.getTotalSoldBooks()).toBe(2);

        MainRepository.reset();
    });
});
