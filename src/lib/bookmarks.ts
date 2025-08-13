const KEY = 'cosmic.bookmarks.v1';
export type Bookmark = { id: string; title: string; url: string; image?: string };

export function getBookmarks(): Bookmark[] {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
}
export function addBookmark(b: Bookmark) {
  const all = getBookmarks();
  localStorage.setItem(KEY, JSON.stringify([b, ...all]));
}
export function removeBookmark(id: string) {
  const all = getBookmarks().filter(x => x.id !== id);
  localStorage.setItem(KEY, JSON.stringify(all));
}
