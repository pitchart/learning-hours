using System.Collections.Generic;
using BookInvoicing.Domain.Book;
using BookInvoicing.Domain.Country;
using BookInvoicing.Purchase;
using BookInvoicing.Report;
using BookInvoicing.Tests.Storage;
using Xunit;
using static BookInvoicing.Tests.CountryBuilder;
using static BookInvoicing.Tests.AuthorBuilder;
using static BookInvoicing.Tests.EducationalBookBuilder;

namespace BookInvoicing.Tests
{
    public class ReportGeneratorTests
    {
        [Fact]
        public void ShouldComputeTotalAmount_WithoutDiscount_WithoutTaxExchange()
        {
            // Arrange
            var inMemoryRepository = OverrideRepositoryForTests();
            var generator = new ReportGenerator();

            var usa = Usa().Build();
            var book = AnEducationalBook()
                .Costing(25)
                .Build();

            var purchasedBook = new PurchasedBook(book, 2);

             var invoice = new Invoice("John Doe", usa);
            invoice.AddPurchasedBooks(new List<PurchasedBook> { purchasedBook });

            // Act
            inMemoryRepository.AddInvoice(invoice);

            // Assert
            Assert.Equal(50, generator.GetTotalAmount());
            Assert.Equal(1, generator.GetNumberOfIssuedInvoices());
            Assert.Equal(2, generator.GetTotalSoldBooks());

            ResetTestsRepository();
        }

        [Fact]
        public void ShouldComputeTotalAmount_WithDiscount_WithTaxExchanges()
        {
            // Arrange
            var inMemoryRepository = OverrideRepositoryForTests();
            var generator = new ReportGenerator();

            var europeanCountry = ACountry().WhoPaysIn(Currency.Euro);
            var laFrance = europeanCountry.But().Named("La France").Speaking(Language.French);
            var germany  = europeanCountry.But().Named("Germany").Speaking(Language.German).Build();
            
            var book = NovelBuilder.ANovel()
                .WrittenBy(AnAuthor().BornIn(laFrance).Build())
                .Costing(35.5)
                .Build();

            var purchasedBook = new PurchasedBook(book, 3);

            var invoice = new Invoice("John Doe",
                germany
            );
            
            invoice.AddPurchasedBooks(new List<PurchasedBook> { purchasedBook });

            // Act
            inMemoryRepository.AddInvoice(invoice);

            // Assert
            Assert.Equal(106.5, generator.GetTotalAmount());
            Assert.Equal(1, generator.GetNumberOfIssuedInvoices());
            Assert.Equal(3, generator.GetTotalSoldBooks());

            ResetTestsRepository();
        }

        private InMemoryRepository OverrideRepositoryForTests()
        {
            InMemoryRepository inMemoryRepository = new InMemoryRepository();
            MainRepository.Override(inMemoryRepository);
            return inMemoryRepository;
        }

        private void ResetTestsRepository()
        {
            MainRepository.Reset();
        }
    }
}
