export function createElement(tag, options = {}, text = '') {
    const domElement = document.createElement(tag);
    Object.entries(options).forEach(([key, value]) => {
        domElement.setAttribute(key, value);
    })
    if (text) domElement.textContent = text;
    return domElement;
}