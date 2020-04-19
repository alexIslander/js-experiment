import { concat } from 'ramda';

export default concat(
    'https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search='
);

// const endpoint = 'https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=';
// const getWikipediaSearchUrlFor = (topic) => endpoint + topic;