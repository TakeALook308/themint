export default class Session extends Map {
  set(id, value) {
    if (typeof value === 'object') value = JSON.stringify(value);
    sessionStorage.setItem(id, value);
  }

  get(id) {
    const value = sessionStorage.getItem(id);
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  }
  remove(id) {
    sessionStorage.removeItem(id);
  }
}
