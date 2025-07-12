import React, { useState, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next'; // Assuming react-i18next for i18n

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  language: string;
  // Add other relevant fields like URL, etc.
}

interface SearchComponentProps {
  onSearch: (query: string, language: string, category?: string) => Promise<SearchResult[]>;
  // You might want to pass available languages and categories as props
  availableLanguages?: { code: string; name: string }[];
  availableCategories?: string[];
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  onSearch,
  availableLanguages = [{ code: 'en', name: 'English' }], // Default to English
  availableCategories = [],
}) => {
  const { i18n, t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(i18n.language || 'en');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowSuggestions(query.length > 0);
    debouncedSearch(query, selectedLanguage, selectedCategory);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    debouncedSearch(searchQuery, lang, selectedCategory);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    debouncedSearch(searchQuery, selectedLanguage, category);
  };

  const handleResultClick = (result: SearchResult) => {
    console.log('Clicked search result:', result);
    // Implement navigation or other actions here
  };

  const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

  const debouncedSearch = useCallback(
    debounce(async (query: string, lang: string, category?: string) => {
      if (query.length < 2) {
        setSearchResults([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const results = await onSearch(query, lang, category);
        setSearchResults(results);
      } catch (err) {
        setError(t('search.error', { defaultValue: 'Failed to perform search.' }));
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 300),
    [onSearch, t, searchQuery, selectedLanguage, selectedCategory] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={i}>{part}</mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  return (
    <div className="search-container" ref={searchInputRef}>
      <input
        type="text"
        placeholder={t('search.placeholder', { defaultValue: 'Search reports...' })}
        value={searchQuery}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        className="search-input"
      />
      <select onChange={handleLanguageChange} value={selectedLanguage} className="search-filter language-filter">
        {availableLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      {availableCategories.length > 0 && (
        <select onChange={handleCategoryChange} value={selectedCategory} className="search-filter category-filter">
          <option value="">{t('search.allCategories', { defaultValue: 'All Categories' })}</option>
          {availableCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      )}

      {loading && <div className="search-status">{t('search.loading', { defaultValue: 'Loading...' })}</div>}
      {error && <div className="search-error">{error}</div>}

      {showSuggestions && searchQuery.length > 0 && searchResults.length > 0 && (
        <ul className="search-results-list">
          {searchResults.map((result) => (
            <li key={result.id} onClick={() => handleResultClick(result)} className="search-result-item">
              <h3>{highlightText(result.title, searchQuery)}</h3>
              <p>{highlightText(result.description, searchQuery)}</p>
              <small>{result.category} - {result.language}</small>
            </li>
          ))}
        </ul>
      )}

      {showSuggestions && searchQuery.length > 0 && !loading && !error && searchResults.length === 0 && (
        <div className="search-no-results">{t('search.noResults', { defaultValue: 'No results found.' })}</div>
      )}
    </div>
  );
};

export default SearchComponent;
