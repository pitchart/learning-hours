import {ReportGenerator} from "../../../../../src/com/murex/tbw/report/ReportGenerator";
import {MainRepository} from "../../../../../src/com/murex/tbw/MainRepository";
import {InMemoryRepository} from "../storage/InMemoryRepository";
import {Invoice, PurchasedBook} from "../../../../../src/com/murex/tbw/purchase";
import { Currency, Language } from "../../../../../src/com/murex/tbw/domain/country";
import { aBook, aCountry, anAuthor, usa } from "../test-data-builders";


describe(ReportGenerator, () => {
    it("Computes total amount without discount and without tax rate", () => {
        const repository = new InMemoryRepository();
        MainRepository.override(repository);
        const generator = new ReportGenerator();

        const USA = usa().build();

        const purchase = new PurchasedBook(aBook().costing(25).build(), 2);

        const invoice = new Invoice("John Doe", USA);
        invoice.addPurchasedBook(purchase);

        repository.addInvoice(invoice);

        expect(generator.getTotalAmount()).toBe(57.5);
        expect(generator.getNumberOfIssuedInvoices()).toBe(1);
        expect(generator.getTotalSoldBooks()).toBe(2);

        MainRepository.reset();
    });


    it("Computes total amount with invoice in Europe", () => {
        const repository = new InMemoryRepository();
        MainRepository.override(repository);
        const generator = new ReportGenerator();

        const europeanCountry = aCountry().payingIn(Currency.Euro);
        const france = europeanCountry.but().named("France").speaking(Language.French);
        const germany = europeanCountry.but().named("Germany").speaking(Language.German);

        const purchase = new PurchasedBook(aBook().costing(15).writtenBy(anAuthor().bornIn(germany)).build(), 3);

        const invoice = new Invoice("Jean Doe", france.build());
        invoice.addPurchasedBook(purchase);

        repository.addInvoice(invoice);

        expect(generator.getTotalAmount()).toBe(64.13);
        expect(generator.getNumberOfIssuedInvoices()).toBe(1);
        expect(generator.getTotalSoldBooks()).toBe(3);

        MainRepository.reset();
    });
});
