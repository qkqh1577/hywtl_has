export const toAmount = (localeString: string | number): number | '' => {
  if (typeof localeString === 'number' || localeString === '') {
    return '';
  }
  const builder: string[] = [];
  for (let i = 0; i < localeString.length; i++) {
    const letter: string = localeString[i];
    if (i === 0 && letter === '-') {
      builder.push(letter);
      continue;
    }
    if (letter === ' ' || letter === ',') {
      continue;
    }
    if (Number.isNaN(+letter)) {
      continue;
    }
    builder.push(letter);
  }

  if (builder.length === 0) {
    return '';
  }
  const raw: string = builder.join('');
  if (Number.isNaN(+raw)) {
    return '';
  }
  return +raw;
};

export const toAmountKor = (amount: number | ''): string | undefined => {
  if (amount === '' || amount < 0) {
    return;
  }
  const releaseBuilder = (builder: string): string =>
    `일금${builder}원정`;
  const counter: string[] = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  const splitter: string[] = ['', '십', '백', '천'];
  const unit: string[] = ['', '만', '억', '조', '경', '해'];

  const amountStr = `${amount}`;

  let breaker: boolean = false;
  let result: string = '';

  if (amountStr === '0') {
    return releaseBuilder('영');
  }
  for (let i = 0; i < unit.length; i++) {
    let unitUsed: boolean = false;
    for (let j = 0; j < splitter.length; j++) {
      const index = i * splitter.length + j;
      if (index === amountStr.length) {
        breaker = true;
        break;
      }
      const letter: string = amountStr[amountStr.length - 1 - index];
      if (letter === '0') {
        continue;
      }
      if (letter === '-') {
        continue;
      }
      let str: string = counter[+letter];
      str += splitter[j];
      if (!unitUsed) {
        str += unit[i];
        unitUsed = true;
      }
      result = str + result;
    }
    if (breaker) {
      break;
    }
  }
  return releaseBuilder(result);
};
