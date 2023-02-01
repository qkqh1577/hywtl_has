import { DataFieldValue } from 'components/DataFieldProps';

export const toAmount = (localeString: DataFieldValue): number | '' => {
  if (localeString === null || typeof localeString === 'number' || localeString === '') {
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

export function cut10000(amount: number | undefined): number {
  if (!amount) {
    return 0;
  }
  const value = amount / 10000;

  if (Math.floor(value)
          .toFixed(1) === Math.ceil(value)
                              .toFixed(2)) {
    return +value.toFixed(0);
  }
  return +value.toFixed(2);
}


export function getRateAmount(rate: number | string | undefined,
                              totalAmount: number | undefined
): number {
  if (!rate || !totalAmount) {
    return 0;
  }
  const r = (typeof rate === 'string' ? +rate : rate) / 100.0;

  const t = (totalAmount * r).toFixed(0);

  return +t;
}

export function getRatio(height: unknown,
                         baseArea: unknown
): string {
  const h = typeof height === 'string' ? +height : height;
  const b = typeof baseArea === 'string' ? +baseArea : baseArea;
  if (typeof h !== 'number' || typeof b !== 'number') {
    return '-';
  }
  if (Number.isNaN(h) || Number.isNaN(b)) {
    return '-';
  }
  if (h <= 0 || b <= 0) {
    return '-';
  }

  const ratio = h / Math.sqrt(b);
  return ratio.toFixed(4);
}
