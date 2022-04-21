export const hasFinalConsonant = (text: String): boolean | null => {
  const lastLetter: string = text[text.length - 1];
  const unicode = lastLetter.charCodeAt(0);
  if (unicode < 44032 || unicode > 55203) {
    return null;
  }
  return (unicode - 44032) % 28 !== 0;
};

export const getObjectPostPosition = (text: string): string => {
  const result = hasFinalConsonant(text);
  if (result === null) {
    return '';
  }
  return result ? '을' : '를';
};

export const getSubjectPostPosition = (text: string): string => {
  const result = hasFinalConsonant(text);
  if (result === null) {
    return '';
  }
  return result ? '이' : '가';
};

export const getAuxiliaryPostPosition = (text: string): string => {
  const result = hasFinalConsonant(text);
  if (result === null) {
    return '';
  }
  return result ? '은' : '는';
};
