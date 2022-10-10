using BookInvoicing.Domain.Book;
using BookInvoicing.Domain.Country;

namespace BookInvoicing.Tests
{
    public class EducationalBookBuilder
    {
        private string _name = "myName";
        private int _price = 25;
        private Author _author = AuthorBuilder.AnAuthor().Build();
        private Language _language = Language.English;
        private Category _category = Category.Computer;

        public static EducationalBookBuilder AnEducationalBook()
        {
            return new EducationalBookBuilder();
        }

        public EducationalBookBuilder Named(string name)  
        {
            _name = name;
            return this;
        }

        public EducationalBookBuilder Costing(int price)
        {
            _price = price;
            return this;
        }

        public EducationalBookBuilder WrittenBy(Author author)
        {
            _author = author;
            return this;
        }

        public EducationalBookBuilder WrittenIn(Language language)  
        {
            _language = language;
            return this;
        }

        public EducationalBookBuilder CategorizedIn(Category category)
        {
            _category = category;
            return this;
        }

        public EducationalBook Build()
        {
            return new EducationalBook(_name, _price, _author, _language, _category);
        }
    }
}