import contactImage from '../assets/images/contacts.jpg';

export function createFindUsPage(createElement) {
    const row = createElement('section', { class: 'row' });
    const col1 = createElement('div', { class: 'col' });
    const contactsList = createElement('ul');
    contactsList.classList.add('contacts');
    const contactItems = [
        { type: 'phone', value: '415-555-4567', href: 'tel:4155554567' },
        { type: 'email', value: 'hello@figma.com', href: 'mailto:hello@figma.com' },
        { type: 'telegram', value: '@odin-bar', href: 'https://t.me/odin-bar' }
    ];

    contactItems.forEach(contact => {
        const li = createElement('li');
        const link = createElement('a', {
            href: contact.href,
            class: 'contact-link'
        }, `${contact.type}: ${contact.value}`);

        li.append(link);
        contactsList.append(li);
    });
    col1.append(contactsList);
    const col2 = createElement('div', { class: 'col' });
    col2.append(createElement('img', {
        class: 'img',
        src: contactImage,
        alt: 'find-us'
    }));
    row.append(col1, col2);
    return row;
}
