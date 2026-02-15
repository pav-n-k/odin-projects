import lavandeImage from '../assets/images/lavande.jpg';
import primaveraImage from '../assets/images/primavera.jpg';
import speziaImage from '../assets/images/spezia.jpg';

function createCard(createElement, imageSrc, altText, captionText) {
    const figure = createElement('figure', { class: 'card' });
    const img = createElement('img', {
        src: imageSrc,
        alt: altText
    });
    const figcaption = createElement('figcaption', {}, captionText);
    figure.append(img, figcaption);
    return figure;
}

export function createMenuPage(createElement) {
    const row = createElement( 'div', { class: 'row' });
    const cards = createElement( 'div', { class: 'cards' });
    cards.append(
        createCard(
            createElement,
            lavandeImage,
            'lavande',
            'A delicate and floral aperitif with notes of lavender and chamomile.'
        ),
        createCard(
            createElement,
            primaveraImage,
            'primavera',
            'A refreshing and vibrant aperitif with bright citrus notes.'
        ),
        createCard(
            createElement,
            speziaImage,
            'spezia',
            'A bold, spiced aperitif featuring cardamom, ginger, and cinnamon.'
        )
    );
    row.append(cards);
    return row;
}