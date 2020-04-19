import 'bootstrap/dist/css/bootstrap.min.css';
import { pipe, tap, ifElse, isEmpty } from 'ramda';
import getInputValue from './getInputValue';
import getUrl from './getUrl';
import Results from './Results';

// const makeUrlFromInput = pipe(
//     getInputValue,
//     getUrl,
//     tap(console.warn)
// );
// inputElement.addEventListener('keyup', makeUrlFromInput);
const doNothing = () => {};
const render = markup => {
    const resultsElement = document.getElementById('results');

    resultsElement.innerHTML = markup;
};
const searchAndRenderResults = pipe(
    // getInputValue,
    getUrl,
    url =>
        fetch(url)
            .then(res => res.json())
            .then(Results)
            // .then(console.warn)
            .then(render)
);

const inputElement = document.querySelector('input');
const makeSearchRequestIfValid = pipe(
    getInputValue,
    ifElse(isEmpty, doNothing, searchAndRenderResults)
);
// inputElement.addEventListener('keyup', searchAndRenderResults);
inputElement.addEventListener('keyup', makeSearchRequestIfValid);
