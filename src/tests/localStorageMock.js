const localStorageMock = () => {
  let store = {};

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
};

export default localStorageMock;

// https://robertmarshall.dev/blog/how-to-mock-local-storage-in-jest-tests;
