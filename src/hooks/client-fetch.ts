export const clientFetch = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);

  if (res.status === 401) {
    window.dispatchEvent(new Event("unauthorized"));
    return;
  }

  return res;
};
