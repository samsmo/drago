import Flxr from 'flxr';
import '../styles/main.less';

console.log(Flxr);

const $container = document.querySelector('.js-drag-container');
const $content = $container.querySelector('.js-drag-content');

const flick = new Flxr({container: $container, content: $content});
