import Drago from '../../src/drago';
import '../styles/main.less';

const $container = document.querySelector('.js-drag-container');
const $content = $container.querySelector('.js-drag-content');

const flick = new Drago($content, $container, { axis: { x: false, y: true }} );
