
const { locales } = require('./src/lib/i18n/config');

const collectUrls = locales.map((locale) => `http://localhost:3000/${locale}`);

module.exports = {
  ci: {
    collect: {
      url: collectUrls,
      startServerCommand: 'npm run start',
      startServerReadyTimeout: 10000,
    },
    assert: {
      assertions: {
        'categories.performance': ['error', { minScore: 0.8 }],
        'categories.accessibility': ['error', { minScore: 0.9 }],
        'categories.best-practices': ['error', { minScore: 0.9 }],
        'categories.seo': ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
