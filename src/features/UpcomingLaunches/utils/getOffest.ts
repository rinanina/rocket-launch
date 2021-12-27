import queryString from 'query-string';

const getOffset = (url?: string) => url ? queryString.parse(url).offset : '0';

export default getOffset;
