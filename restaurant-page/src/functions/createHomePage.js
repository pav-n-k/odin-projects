import ctaImage from '../assets/images/cta.jpg';

export function createHomePage(createElement) {
    const row = createElement('div', { class: 'row' });
    const col1 = createElement('div', { class: 'col' });
    const col2 = createElement('div', { class: 'col' });
    const title = createElement('h2', { class: 'title' }, 'The only SPIRIT-FREE aperitif that tastes as good as it makes you feel.');
    const button = createElement('button', { class: 'btn' }, 'Find us');
    const image = createElement('img', {
        class: 'img',
        src: ctaImage,
        alt: 'intro'
    });
    col1.append(title, button);
    col2.append(image);
    row.append(col1, col2);
    return row;
}