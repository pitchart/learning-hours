using BookInvoicing.Domain.Book;
using BookInvoicing.Domain.Country;

namespace BookInvoicing.Tests
{
    public class AuthorBuilder 
    {
        private string _name = "Bob";
        private Country _country = CountryBuilder.Usa().Build();

        public static AuthorBuilder AnAuthor()
        {
            return new AuthorBuilder();
        }

        public AuthorBuilder Named(string name)
        {
            _name = name;
            return this;
        }

        public AuthorBuilder BornIn(Country country)
        {
            _country = country;
            return this;
        }

        public Author Build()
        {
            return new Author(_name, _country);
        }
    }
}