import i18n from './config';

const translate = i18n.t as unknown as (key: string) => string;

export const t = (key: string): string => translate(key);
