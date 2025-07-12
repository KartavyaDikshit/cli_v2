

interface ReportMetadata {
  id: string;
  title: string;
  language: string;
  version: number;
  category: string[];
  tags: string[];
  scheduledPublishDate?: Date;
  content: string;
}

interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

/**
 * Validates the structure and basic SEO requirements of content.
 */
export const validateContentStructure = (report: ReportMetadata): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!report.id || report.id.trim() === '') {
    errors.push({ field: 'id', message: 'Report ID cannot be empty.', severity: 'error' });
  }
  if (!report.title || report.title.trim() === '') {
    errors.push({ field: 'title', message: 'Title cannot be empty.', severity: 'error' });
  }
  if (!report.content || report.content.trim() === '') {
    errors.push({ field: 'content', message: 'Content cannot be empty.', severity: 'error' });
  }
  if (!report.language || report.language.trim() === '') {
    errors.push({ field: 'language', message: 'Language cannot be empty.', severity: 'error' });
  }
  if (report.version === undefined || report.version < 0) {
    errors.push({ field: 'version', message: 'Version must be a non-negative number.', severity: 'error' });
  }
  if (!report.category || report.category.length === 0) {
    errors.push({ field: 'category', message: 'At least one category is required.', severity: 'warning' });
  }
  if (!report.tags || report.tags.length === 0) {
    errors.push({ field: 'tags', message: 'At least one tag is recommended.', severity: 'info' });
  }

  // Basic SEO checks (example: title length)
  if (report.title.length < 10 || report.title.length > 70) {
    errors.push({
      field: 'title',
      message: 'Title length should be between 10 and 70 characters for SEO.',
      severity: 'warning',
    });
  }

  // More advanced checks would involve parsing content for heading structure, keyword density, etc.
  return errors;
};

/**
 * Checks if a given string is a valid URL.
 * @param url The string to validate.
 * @returns True if the string is a valid URL, false otherwise.
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (_e) {
    return false;
  }
};

/**
 * Validates a given email address.
 * @param email The email string to validate.
 * @returns True if the email is valid, false otherwise.
 */
export const isValidEmail = (email: string): boolean => {
  // Basic regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Sanitizes a string to be used as a URL slug.
 * @param text The input string.
 * @returns A URL-friendly slug.
 */
export const slugify = (text: string): string => {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

/**
 * Truncates a string to a specified length and appends an ellipsis if truncated.
 * @param text The input string.
 * @param maxLength The maximum length of the string.
 * @returns The truncated string.
 */
export const truncateString = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

/**
 * Capitalizes the first letter of a string.
 * @param text The input string.
 * @returns The string with the first letter capitalized.
 */
export const capitalizeFirstLetter = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/**
 * Removes HTML tags from a string.
 * @param html The input HTML string.
 * @returns The string with HTML tags removed.
 */
export const stripHtmlTags = (html: string): string => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

/**
 * Generates a unique identifier.
 * @returns A unique string.
 */
export const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

/**
 * Debounces a function, so it only runs after a certain delay.
 * @param func The function to debounce.
 * @param delay The delay in milliseconds.
 * @returns A debounced version of the function.
 */
export const debounce = <T extends (...args: unknown[]) => void>(func: T, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttles a function, so it runs at most once per a certain time period.
 * @param func The function to throttle.
 * @param limit The time limit in milliseconds.
 * @returns A throttled version of the function.
 */
export const throttle = <T extends (...args: unknown[]) => ReturnType<T>>(func: T, limit: number): T => {
  let inThrottle: boolean;
  let lastResult: ReturnType<T>;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T> {
    if (!inThrottle) {
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
      lastResult = func.apply(this, args);
    }
    return lastResult;
  } as T;
};

/**
 * Formats a date into a readable string.
 * @param date The date to format.
 * @param locale The locale to use for formatting (e.g., 'en-US').
 * @param options Date formatting options.
 * @returns The formatted date string.
 */
export const formatDate = (date: Date, locale: string = 'en-US', options?: Intl.DateTimeFormatOptions): string => {
  return new Date(date).toLocaleDateString(locale, options);
};

/**
 * Formats a number into a locale-specific string.
 * @param num The number to format.
 * @param locale The locale to use for formatting (e.g., 'en-US').
 * @param options Number formatting options.
 * @returns The formatted number string.
 */
export const formatNumber = (num: number, locale: string = 'en-US', options?: Intl.NumberFormatOptions): string => {
  return new Intl.NumberFormat(locale, options).format(num);
};

/**
 * Converts a string to title case.
 * @param str The input string.
 * @returns The string in title case.
 */
export const toTitleCase = (str: string): string => {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

/**
 * Checks if an object is empty.
 * @param obj The object to check.
 * @returns True if the object is empty, false otherwise.
 */
export const isEmptyObject = (obj: Record<string, unknown>): boolean => {
  return Object.keys(obj).length === 0;
};

/**
 * Deep merges two objects.
 * @param target The target object.
 * @param source The source object.
 * @returns The merged object.
 */
export const deepMerge = (target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> => {
  const output = { ...target };
  if (target && typeof target === 'object' && source && typeof source === 'object') {
    Object.keys(source).forEach(key => {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        if (!(key in target))
          Object.assign(output, { [key]: source[key] });
        else
          output[key] = deepMerge(target[key] as Record<string, unknown>, source[key] as Record<string, unknown>);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
};

/**
 * Retries a promise-returning function a specified number of times with a delay.
 * @param fn The function to retry.
 * @param retries The number of retries.
 * @param delay The delay between retries in milliseconds.
 * @returns The result of the function if successful.
 */
export const retry = async <T>(fn: () => Promise<T>, retries: number, delay: number): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return retry(fn, retries - 1, delay);
    }
    throw error;
  }
};

/**
 * Converts a file size in bytes to a human-readable format (e.g., KB, MB, GB).
 * @param bytes The file size in bytes.
 * @param decimals The number of decimal places to include.
 * @returns The formatted file size string.
 */
export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Scrolls to the top of the page.
 */
export const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * Gets a query parameter from the URL.
 * @param name The name of the query parameter.
 * @returns The value of the query parameter, or null if not found.
 */
export const getQueryParam = (name: string): string | null => {
  if (typeof window === 'undefined') return null;
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
};

/**
 * Sets a query parameter in the URL.
 * @param name The name of the query parameter.
 * @param value The value to set.
 */
export const setQueryParam = (name: string, value: string): void => {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  url.searchParams.set(name, value);
  window.history.pushState({}, '', url.toString());
};

/**
 * Removes a query parameter from the URL.
 * @param name The name of the query parameter to remove.
 */
export const removeQueryParam = (name: string): void => {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  url.searchParams.delete(name);
  window.history.pushState({}, '', url.toString());
};

/**
 * Checks if the current environment is a browser.
 * @returns True if in browser, false otherwise.
 */
export const isBrowser = (): boolean => {
  return typeof window !== 'undefined';
};

/**
 * Checks if the current environment is Node.js.
 * @returns True if in Node.js, false otherwise.
 */
export const isNode = (): boolean => {
  return typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
};

/**
 * Safely parses JSON, returning null on error.
 * @param jsonString The JSON string to parse.
 * @returns The parsed object, or null if parsing fails.
 */
export const safeJsonParse = <T>(jsonString: string): T | null => {
  try {
    return JSON.parse(jsonString) as T;
  } catch (_e) {
    console.error("Error parsing JSON:", _e);
    return null;
  }
};

/**
 * Converts an object to a URL-encoded query string.
 * @param params The object to convert.
 * @returns The URL-encoded query string.
 */
export const toQueryString = (params: Record<string, unknown>): string => {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key] as string)}`)
    .join('&');
};

/**
 * Parses a URL query string into an object.
 * @param queryString The query string to parse (e.g., "key1=value1&key2=value2").
 * @returns An object representing the query parameters.
 */
export const fromQueryString = (queryString: string): Record<string, string> => {
  const params: Record<string, string> = {};
  queryString.replace(/^\?/, '').split('&').forEach(pair => {
    const [key, value] = pair.split('=').map(decodeURIComponent);
    if (key) {
      params[key] = value || '';
    }
  });
  return params;
};

/**
 * Generates a random integer within a specified range.
 * @param min The minimum value (inclusive).
 * @param max The maximum value (inclusive).
 * @returns A random integer.
 */
export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Shuffles an array randomly.
 * @param array The array to shuffle.
 * @returns A new shuffled array.
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

/**
 * Clones an object deeply.
 * @param obj The object to clone.
 * @returns A deep clone of the object.
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Compares two objects for deep equality.
 * @param obj1 The first object.
 * @param obj2 The second object.
 * @returns True if the objects are deeply equal, false otherwise.
 */
export const deepEqual = (obj1: unknown, obj2: unknown): boolean => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

/**
 * Gets the file extension from a filename or path.
 * @param filename The filename or path.
 * @returns The file extension (e.g., 'txt', 'jpg'), or an empty string if no extension.
 */
export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};

/**
 * Gets the filename without its extension from a filename or path.
 * @param filename The filename or path.
 * @returns The filename without extension.
 */
export const getFilenameWithoutExtension = (filename: string): string => {
  const lastDotIndex = filename.lastIndexOf('.');
  if (lastDotIndex === -1) return filename;
  return filename.substring(0, lastDotIndex);
};

/**
 * Checks if a string is a valid JSON string.
 * @param str The string to check.
 * @returns True if the string is valid JSON, false otherwise.
 */
export const isValidJson = (str: string): boolean => {
  try {
    JSON.parse(str);
  } catch (_e) {
    return false;
  }
  return true;
};

/**
 * Converts a string to a boolean.
 * Handles 'true', 'false', '1', '0', and case insensitivity.
 * @param str The string to convert.
 * @returns The boolean value.
 */
export const stringToBoolean = (str: string): boolean => {
  return str.toLowerCase() === 'true' || str === '1';
};

/**
 * Generates a range of numbers.
 * @param start The start of the range (inclusive).
 * @param end The end of the range (inclusive).
 * @returns An array of numbers.
 */
export const range = (start: number, end: number): number[] => {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

/**
 * Calculates the percentage.
 * @param partialValue The partial value.
 * @param totalValue The total value.
 * @returns The percentage.
 */
export const calculatePercentage = (partialValue: number, totalValue: number): number => {
  if (totalValue === 0) return 0;
  return (partialValue / totalValue) * 100;
};

/**
 * Clamps a number between a minimum and maximum value.
 * @param num The number to clamp.
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns The clamped number.
 */
export const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max);
};

/**
 * Checks if a value is a number.
 * @param value The value to check.
 * @returns True if the value is a number, false otherwise.
 */
export const isNumber = (value: unknown): boolean => {
  return typeof value === 'number' && !isNaN(value);
};

/**
 * Checks if a value is a string.
 * @param value The value to check.
 * @returns True if the value is a string, false otherwise.
 */
export const isString = (value: unknown): boolean => {
  return typeof value === 'string';
};

/**
 * Checks if a value is an array.
 * @param value The value to check.
 * @returns True if the value is an array, false otherwise.
 */
export const isArray = (value: unknown): boolean => {
  return Array.isArray(value);
};

/**
 * Checks if a value is a function.
 * @param value The value to check.
 * @returns True if the value is a function, false otherwise.
 */
export const isFunction = (value: unknown): boolean => {
  return typeof value === 'function';
};

/**
 * Checks if a value is an object (and not null or an array).
 * @param value The value to check.
 * @returns True if the value is an object, false otherwise.
 */
export const isObject = (value: unknown): boolean => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

/**
 * Converts an array of objects into a map (object) using a specified key.
 * @param array The array of objects.
 * @param key The key to use for the map.
 * @returns A map (object) where keys are values from the specified key.
 */
export const arrayToMap = <T extends Record<string, unknown>>(array: T[], key: keyof T): Record<string, T> => {
  return array.reduce((acc, item) => {
    acc[item[key]] = item;
    return acc;
  }, {} as Record<string, T>);
};

/**
 * Groups an array of objects by a specified key.
 * @param array The array of objects.
 * @param key The key to group by.
 * @returns An object where keys are the group values and values are arrays of objects.
 */
export const groupBy = <T extends Record<string, unknown>>(array: T[], key: keyof T): Record<string, T[]> => {
  return array.reduce((acc, item) => {
    const group = item[key];
    acc[group] = acc[group] || [];
    acc[group].push(item);
    return acc;
  }, {} as Record<string, T[]>);
};

/**
 * Finds the maximum value in an array of numbers.
 * @param arr The array of numbers.
 * @returns The maximum value, or -Infinity if the array is empty.
 */
export const max = (arr: number[]): number => {
  return Math.max(...arr);
};

/**
 * Finds the minimum value in an array of numbers.
 * @param arr The array of numbers.
 * @returns The minimum value, or Infinity if the array is empty.
 */
export const min = (arr: number[]): number => {
  return Math.min(...arr);
};

/**
 * Calculates the sum of numbers in an array.
 * @param arr The array of numbers.
 * @returns The sum.
 */
export const sum = (arr: number[]): number => {
  return arr.reduce((acc, num) => acc + num, 0);
};

/**
 * Calculates the average of numbers in an array.
 * @param arr The array of numbers.
 * @returns The average, or 0 if the array is empty.
 */
export const average = (arr: number[]): number => {
  if (arr.length === 0) return 0;
  return sum(arr) / arr.length;
};

/**
 * Removes duplicate values from an array.
 * @param arr The array with potential duplicates.
 * @returns A new array with unique values.
 */
export const uniqueArray = <T>(arr: T[]): T[] => {
  return Array.from(new Set(arr));
};

/**
 * Flattens a nested array.
 * @param arr The nested array.
 * @returns A new flattened array.
 */
export const flattenArray = <T>(arr: (T | T[])[]): T[] => {
  return arr.flat(Infinity) as T[];
};

/**
 * Checks if all elements in an array satisfy a condition.
 * @param arr The array to check.
 * @param predicate The function to test each element.
 * @returns True if all elements satisfy the condition, false otherwise.
 */
export const all = <T>(arr: T[], predicate: (item: T) => boolean): boolean => {
  return arr.every(predicate);
};

/**
 * Checks if any element in an array satisfies a condition.
 * @param arr The array to check.
 * @param predicate The function to test each element.
 * @returns True if any element satisfies the condition, false otherwise.
 */
export const any = <T>(arr: T[], predicate: (item: T) => boolean): boolean => {
  return arr.some(predicate);
};

/**
 * Filters out null or undefined values from an array.
 * @param arr The array to filter.
 * @returns A new array without null or undefined values.
 */
export const compact = <T>(arr: (T | null | undefined)[]): T[] => {
  return arr.filter(item => item != null) as T[];
};

/**
 * Creates a new array with n elements removed from the beginning.
 * @param arr The input array.
 * @param n The number of elements to drop.
 * @returns A new array.
 */
export const drop = <T>(arr: T[], n: number = 1): T[] => {
  return arr.slice(n);
};

/**
 * Creates a new array with n elements removed from the end.
 * @param arr The input array.
 * @param n The number of elements to drop.
 * @returns A new array.
 */
export const dropRight = <T>(arr: T[], n: number = 1): T[] => {
  return arr.slice(0, arr.length - n);
};

/**
 * Creates a new array with elements taken from the beginning up to a certain count.
 * @param arr The input array.
 * @param n The number of elements to take.
 * @returns A new array.
 */
export const take = <T>(arr: T[], n: number = 1): T[] => {
  return arr.slice(0, n);
};

/**
 * Creates a new array with elements taken from the end up to a certain count.
 * @param arr The input array.
 * @param n The number of elements to take.
 * @returns A new array.
 */
export const takeRight = <T>(arr: T[], n: number = 1): T[] => {
  return arr.slice(Math.max(arr.length - n, 0));
};

/**
 * Partitions an array into two groups based on a predicate function.
 * @param arr The array to partition.
 * @param predicate The function to test each element.
 * @returns A tuple of two arrays: [elements that satisfy the predicate, elements that do not].
 */
export const partition = <T>(arr: T[], predicate: (item: T) => boolean): [T[], T[]] => {
  const passed: T[] = [];
  const failed: T[] = [];
  arr.forEach(item => {
    if (predicate(item)) {
      passed.push(item);
    } else {
      failed.push(item);
    }
  });
  return [passed, failed];
};

/**
 * Creates an array of unique values that are included in all given arrays.
 * @param arrays The arrays to intersect.
 * @returns A new array of common unique values.
 */
export const intersection = <T>(...arrays: T[][]): T[] => {
  if (arrays.length === 0) return [];
  const firstArray = new Set(arrays[0]);
  return arrays.slice(1).reduce((acc, currentArray) => {
    const currentSet = new Set(currentArray);
    return acc.filter(item => currentSet.has(item));
  }, Array.from(firstArray));
};

/**
 * Creates an array of unique values that are present in the first array but not in the subsequent arrays.
 * @param array The array to inspect.
 * @param others The arrays to exclude values from.
 * @returns A new array of differing values.
 */
export const difference = <T>(array: T[], ...others: T[][]): T[] => {
  const otherValues = new Set(flattenArray(others));
  return array.filter(item => !otherValues.has(item));
};

/**
 * Creates an array of unique values, in order, from all given arrays.
 * @param arrays The arrays to union.
 * @returns A new array of unique values.
 */
export const union = <T>(...arrays: T[][]): T[] => {
  return uniqueArray(flattenArray(arrays));
};

/**
 * Creates an array of unique values that are present in only one of the given arrays.
 * @param arrays The arrays to compare.
 * @returns A new array of symmetric difference values.
 */
export const symmetricDifference = <T>(...arrays: T[][]): T[] => {
  if (arrays.length === 0) return [];
  if (arrays.length === 1) return uniqueArray(arrays[0]);

  let result = uniqueArray(arrays[0]);
  for (let i = 1; i < arrays.length; i++) {
    const current = uniqueArray(arrays[i]);
    const newResult: T[] = [];
    const intersectionSet = new Set(intersection(result, current));

    result.forEach(item => {
      if (!intersectionSet.has(item)) {
        newResult.push(item);
      }
    });
    current.forEach(item => {
      if (!intersectionSet.has(item)) {
        newResult.push(item);
      }
    });
    result = newResult;
  }
  return result;
};

/**
 * Memoizes a function's result based on its arguments.
 * @param func The function to memoize.
 * @returns A memoized version of the function.
 */
export const memoize = <T extends (...args: unknown[]) => unknown>(func: T): T => {
  const cache = new Map();
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

/**
 * Composes multiple functions into a single function.
 * @param fns The functions to compose.
 * @returns A new function that is the composition of the input functions.
 */
export const compose = (...fns: ((...args: any[]) => any)[]) => (...args: unknown[]) => {
  return fns.reduceRight((res, fn) => (Array.isArray(res) ? fn(...res) : fn(res)), args);
};

/**
 * Pipes multiple functions into a single function (left-to-right composition).
 * @param fns The functions to pipe.
 * @returns A new function that is the pipe of the input functions.
 */
export const pipe = (...fns: ((...args: any[]) => any)[]) => (...args: unknown[]) => {
  return fns.reduce((res, fn) => (Array.isArray(res) ? fn(...res) : fn(res)), args);
};

/**
 * Creates a function that invokes `func` with arguments transformed by `transforms`.
 * @param func The function to invoke.
 * @param transforms The functions to transform arguments.
 * @returns A new function.
 */
export const over = (func: (...args: unknown[]) => unknown, ...transforms: ((arg: unknown) => unknown)[]) => (...args: unknown[]) => {
  return func(...args.map((arg, i) => (transforms[i] ? transforms[i](arg) : arg)));
};

/**
 * Creates a function that invokes `func` with its arguments reversed.
 * @param func The function to reverse arguments for.
 * @returns A new function.
 */
export const flip = <T extends (...args: unknown[]) => unknown>(func: T): T => {
  return ((...args: Parameters<T>): ReturnType<T> => {
    return func(...args.reverse()) as ReturnType<T>;
  }) as T;
};

/**
 * Creates a function that invokes `func` with arguments partially applied.
 * @param func The function to partially apply.
 * @param partials The arguments to partially apply.
 * @returns A new function with partially applied arguments.
 */
export const partial = <T extends (...args: unknown[]) => unknown>(func: T, ...partials: unknown[]): T => {
  return ((...args: Parameters<T>): ReturnType<T> => {
    return func(...partials, ...args) as ReturnType<T>;
  }) as T;
};

/**
 * Creates a function that invokes `func` with arguments partially applied from the right.
 * @param func The function to partially apply.
 * @param partials The arguments to partially apply from the right.
 * @returns A new function with partially applied arguments.
 */
export const partialRight = <T extends (...args: unknown[]) => unknown>(func: T, ...partials: unknown[]): T => {
  return ((...args: Parameters<T>): ReturnType<T> => {
    return func(...args, ...partials) as ReturnType<T>;
  }) as T;
};

/**
 * Creates a function that invokes `func` with its `this` binding bound to `context`.
 * @param func The function to bind.
 * @param context The `this` binding of `func`.
 * @returns A new bound function.
 */
export const bind = <T extends (...args: unknown[]) => unknown>(func: T, context: unknown): T => {
  return func.bind(context) as T;
};

/**
 * Creates a function that is restricted to invoking `func` once. Repeat calls to the function return the value of the first invocation.
 * @param func The function to restrict.
 * @returns A new restricted function.
 */
export const once = <T extends (...args: unknown[]) => unknown>(func: T): T => {
  let hasBeenCalled = false;
  let result: ReturnType<T>;
  return ((...args: Parameters<T>): ReturnType<T> => {
    if (!hasBeenCalled) {
      hasBeenCalled = true;
      result = func(...args);
    }
    return result;
  }) as T;
};

/**
 * Creates a function that invokes `func` with arguments in `array` and `this` bound to `context`.
 * @param func The function to invoke.
 * @param context The `this` binding of `func`.
 * @param args The arguments to invoke `func` with.
 * @returns The result of the invoked function.
 */
export const apply = <T extends (...args: unknown[]) => unknown>(func: T, context: unknown, args: Parameters<T>): ReturnType<T> => {
  return func.apply(context, args) as ReturnType<T>;
};

/**
 * Creates a function that invokes `func` with arguments in `array`.
 * @param func The function to invoke.
 * @param args The arguments to invoke `func` with.
 * @returns The result of the invoked function.
 */
export const call = <T extends (...args: unknown[]) => unknown>(func: T, ...args: Parameters<T>): ReturnType<T> => {
  return func(...args) as ReturnType<T>;
};

/**
 * Delays the invocation of `func` until after `wait` milliseconds have elapsed since the last time `func` was invoked.
 * @param func The function to debounce.
 * @param wait The number of milliseconds to debounce.
 * @returns The new debounced function.
 */
export const debounceLeading = <T extends (...args: unknown[]) => ReturnType<T>>(func: T, wait: number): T => {
  let timeout: NodeJS.Timeout;
  let result: ReturnType<T>;
  return ((...args: Parameters<T>): ReturnType<T> => {
    const later = () => {
      timeout = null;
      if (!leading) {
        result = func(...args);
      }
    };
    const leading = !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (leading) {
      result = func(...args);
    }
    return result;
  }) as T;
};

/**
 * Creates a function that is restricted to invoking `func` once per `wait` milliseconds.
 * @param func The function to throttle.
 * @param wait The number of milliseconds to throttle.
 * @returns The new throttled function.
 */
export const throttleLeading = <T extends (...args: unknown[]) => ReturnType<T>>(func: T, wait: number): T => {
  let inThrottle: boolean;
  let lastResult: ReturnType<T>;
  return ((...args: Parameters<T>): ReturnType<T> => {
    if (!inThrottle) {
      inThrottle = true;
      setTimeout(() => (inThrottle = false), wait);
      lastResult = func(...args);
    }
    return lastResult;
  }) as T;
};

/**
 * Creates a function that invokes `func` with its arguments transformed by `transforms`.
 * @param func The function to invoke.
 * @param transforms The functions to transform arguments.
 * @returns A new function.
 */
export const overArgs = (func: (...args: unknown[]) => unknown, ...transforms: ((arg: unknown) => unknown)[]) => (...args: unknown[]) => {
  return func(...args.map((arg, i) => (transforms[i] ? transforms[i](arg) : arg)));
};

/**
 * Creates a function that invokes `func` with its arguments in `array`.
 * @param func The function to invoke.
 * @param args The arguments to invoke `func` with.
 * @returns The result of the invoked function.
 */
export const spread = <T extends (...args: unknown[]) => unknown>(func: T) => (args: Parameters<T>): ReturnType<T> => {
  return func(...args) as ReturnType<T>;
};

/**
 * Creates a function that invokes `func` with its arguments in `array` and `this` bound to `context`.
 * @param func The function to invoke.
 * @param context The `this` binding of `func`.
 * @param args The arguments to invoke `func` with.
 * @returns The result of the invoked function.
 */
export const applyContext = <T extends (...args: unknown[]) => unknown>(func: T, context: unknown, args: Parameters<T>): ReturnType<T> => {
  return func.apply(context, args) as ReturnType<T>;
};

/**
 * Creates a function that invokes `func` with arguments in `array`.
 * @param func The function to invoke.
 * @param args The arguments to invoke `func` with.
 * @returns The result of the invoked function.
 */
export const callContext = <T extends (...args: unknown[]) => unknown>(func: T, context: unknown, ...args: Parameters<T>): ReturnType<T> => {
  return func.call(context, ...args) as ReturnType<T>;
};

/**
 * Creates a function that invokes `func` with its arguments in `array`.
 * @param func The function to invoke.
 * @param args The arguments to invoke `func` with.
 * @returns The result of the invoked function.
 */
export const invoke = <T extends (...args: unknown[]) => unknown>(func: T, ...args: Parameters<T>): ReturnType<T> => {
  return func(...args) as ReturnType<T>;
};

/**
 * Creates a function that invokes `func` with its arguments in `array` and `this` bound to `context`.
 * @param func The function to invoke.
 * @param context The `this` binding of `func`.
 * @param args The arguments to invoke `func` with.
 * @returns The result of the invoked function.
 */
export const invokeContext = <T extends (...args: unknown[]) => unknown>(func: T, context: unknown, ...args: Parameters<T>): ReturnType<T> => {
  return func.apply(context, args) as ReturnType<T>;
};

/**
 * Creates a function that invokes `func` with its arguments in `array`.
 * @param func The function to invoke.
 * @param args The arguments to invoke `func` with.
 * @returns The result of the invoked function.
 */
export const applySpread = <T extends (...args: unknown[]) => unknown>(func: T) => (args: Parameters<T>): ReturnType<T> => {
  return func(...args) as ReturnType<T>;
};

/**
 * Creates a function that invokes `func` with its arguments in `array` and `this` bound to `context`.
 * @param func The function to invoke.
 * @param context The `this` binding of `func`.
 * @param args The arguments to invoke `func` with.
 * @returns The result of the invoked function.
 */
export const applyContextSpread = <T extends (...args: unknown[]) => unknown>(func: T, context: unknown) => (args: Parameters<T>): ReturnType<T> => {
  return func.apply(context, args) as ReturnType<T>;
};

/**
 * Creates a function that invokes `func` with its arguments in `array`.
 * @param func The function to invoke.
 * @param args The arguments to invoke `func` with.
 * @returns The result of the invoked function.
 */
export const callSpread = <T extends (...args: unknown[]) => unknown>(func: T) => (args: Parameters<T>): ReturnType<T> => {
  return func(...args) as ReturnType<T>;
};

/**
 * Creates a function that invokes `func` with its arguments in `array` and `this` bound to `context`.
 * @param func The function to invoke.
 * @param context The `this` binding of `func`.
 * @param args The arguments to invoke `func` with.
 * @returns The result of the invoked function.
 */
export const callContextSpread = <T extends (...args: unknown[]) => unknown>(func: T, context: unknown) => (args: Parameters<T>): ReturnType<T> => {
  return func.call(context, ...args) as ReturnType<T>;
};

/**
 * Creates a function that invokes `func` with its arguments in `array`.
 * @param func The function to invoke.
 * @param args The arguments to invoke `func` with.
 * @returns The result of the invoked function.
 */
export const invokeSpread = <T extends (...args: unknown[]) => unknown>(func: T) => (args: Parameters<T>): ReturnType<T> => {
  return func(...args) as ReturnType<T>;
};

/**
 * Creates a function that invokes `func` with its arguments in `array` and `this` bound to `context`.
 * @param func The function to invoke.
 * @param context The `this` binding of `func`.
 * @param args The arguments to invoke `func` with.
 * @returns The result of the invoked function.
 */
export const invokeContextSpread = <T extends (...args: unknown[]) => unknown>(func: T, context: unknown) => (args: Parameters<T>): ReturnType<T> => {
  return func.apply(context, args) as ReturnType<T>;
};
