import { TextEncoder, TextDecoder } from 'node:util';
import '@testing-library/jest-dom';

// Polyfill for TextEncoder/Decoder (Required for many React environments in JSDOM)
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock the URL constructor to handle import.meta.url in tests
// Mock the URL constructor to handle the Vite/import.meta.url pattern
const OldURL = global.URL;
global.URL = class extends OldURL {
  constructor(path, base) {
    // If the base is import.meta.url (which Babel passes as a file:// path or undefined)
    // we provide a fallback base to prevent the 'require' error
    if (!base || base.startsWith('file:')) {
      return super(path, 'http://localhost');
    }
    return super(path, base);
  }
};