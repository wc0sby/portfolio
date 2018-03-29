const parser = new DOMParser();

export const parseHtmlEntity = s => {
  try {
    const result = parser
      .parseFromString(s, 'text/html');
    return result.body.textContent;
  }
  catch (error) {
    console.error(error);
  }
}
  