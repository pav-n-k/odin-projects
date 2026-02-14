const grid = document.getElementById('grid');
const colorPicker = document.getElementById('color-picker');
const clearBtn = document.getElementById('clear-btn');
const RGBCheckbox = document.getElementById('rgb-checkbox');
const gridViewCheckbox = document.getElementById('grid-view-checkbox');
const openModalBtn = document.getElementById('toggle-grid-size');

let isRGB = false;
let brushColor = '#0B0C10';
let gridSize = 50;
let isBrushActive = false;
let isDarkGridView = false;
let isModalActive = false;

const createElement = (tag, options = {}, text = '') => {
    const domElement = document.createElement(tag);
    Object.entries(options).forEach(([key, value]) => {
        domElement.setAttribute(key, value);
    })
    if (text) domElement.textContent = text;
    return domElement;
}

const generateRandomColor = (min = 0, max = 256) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const generateColorValue = () => Math.floor(Math.random() * (max - min) + min);
    return `rgb(${generateColorValue()}, ${generateColorValue()}, ${generateColorValue()})`
};

const activeBrush = (event) => {
    const { target } = event;
    if (target.classList.contains('cell') && target.style.backgroundColor !== brushColor) {
        if (!isRGB) {
            target.style.backgroundColor = brushColor;
        } else {
            target.style.backgroundColor = generateRandomColor();
        }
    }
};

const createModal = () => {
    const modalContainer = document.querySelector('.modal-container');
    const modalOverlay = document.getElementById('modalOverlay');
    modalContainer.innerHTML = '';
    const modalTitle = createElement('h2', { class: 'modal-title' }, 'Enter grid size');
    const closeBtn = createElement('button', {
        class: 'close-btn'
    }, '×');
    const gridInput = createElement('input', {
        class: 'grid-input',
        type: 'number',
        min: '10',
        max: '100',
        value: gridSize
    });
    const setBtn = createElement('button', {
        class: 'set-btn'
    }, 'Set');
    const inputGroup = createElement('div', { class: 'input-group' });
    inputGroup.appendChild(gridInput);
    inputGroup.appendChild(setBtn);
    modalContainer.appendChild(closeBtn);
    modalContainer.appendChild(modalTitle);
    modalContainer.appendChild(inputGroup);
    openModalBtn.addEventListener('click', () => {
        modalOverlay.style.display = 'flex';
    });
    closeBtn.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
    });
    setBtn.addEventListener('click', () => {
        const value = +gridInput.value;
        gridSize = value;
        createGrid(gridSize);
        modalOverlay.style.display = 'none';
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            modalOverlay.style.display = 'none';
        }
    });

};

const bindEvents = () => {
    grid.addEventListener('click', () => {
        isBrushActive = !isBrushActive;

        if (isBrushActive) {
            grid.addEventListener('mouseover', activeBrush);
        } else {
            grid.removeEventListener('mouseover', activeBrush);
        }
    });

    clearBtn.addEventListener('click', (event) => {
        event.preventDefault();
        isBrushActive = false;
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => cell.style.background = 'var(--primary-light)');
    });

    RGBCheckbox.addEventListener('change', (event) => {
        isRGB = event.target.checked;
    });

    gridViewCheckbox.addEventListener('change', (event) => {
        isDarkGridView = event.target.checked;
        if (isDarkGridView) {
            grid.style.background = 'var(--primary-dark)';
        } else {
            grid.style.background = 'var(--primary-light)';
        }
    });

    colorPicker.addEventListener("change", (event) => {
        const { value } = event.target;
        brushColor = value;
        isRGB = false;
    }, false);

    openModalBtn.addEventListener('click', (event) => {
        event.preventDefault();
        createModal();
    });
}

const createGrid = (size = 10) => {
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size ** 2; i += 1) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.id = i;
        grid.append(cell);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('current-year').textContent = new Date().getFullYear();
    createGrid(gridSize);
    bindEvents();
});
