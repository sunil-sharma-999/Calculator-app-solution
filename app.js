// general variables
const theme = document.querySelector('#toggle');
const screen = document.querySelector('.screen');
let used = false;

// theme toggle
theme.addEventListener('change', () => {
  themeToggle();
});
theme.addEventListener('touchmove', () => {
  themeToggle();
});
const themeToggle = () => {
  const body = document.body;
  if (theme.value === '1') {
    body.classList = 'theme1';
  } else if (theme.value === '2') {
    body.classList = 'theme2';
  } else if (theme.value === '3') {
    body.classList = 'theme3';
  }
};

// physical keypad
document.addEventListener('keydown', (e) => {
  if (
    (e.key >= 0 && e.key <= 9) ||
    e.key === '+' ||
    e.key === '-' ||
    e.key === '/' ||
    e.key === '*' ||
    e.key === '.'
  ) {
    keyPressed(e.key);
  } else if (e.key === 'Enter') {
    calc();
  } else if (e.key === 'Backspace') {
    clearDigit();
  } else if (e.key === 'Delete') {
    clearScreen();
  }
});

// keypad
const keyPressed = (val) => {
  const lastChar = screen.textContent[screen.textContent.length - 1];
  if (val === '.') {
    decimalValidation(val, lastChar);
    return;
  } else if (val === '+' || val === '-' || val === '*' || val === '/') {
    used = false;
    keyValidation(val, lastChar);
  } else {
    screen.textContent += `${val}`;
  }
  fontSize();
};

const calc = () => {
  const noOperator = screen.textContent.match(/[*+/-]/g);
  if (!noOperator) {
    return;
  } else {
    const value = eval(screen.textContent);
    screen.textContent = value.toLocaleString('en-US');
  }
  fontSize();
};

const clearDigit = () => {
  screen.textContent = screen.textContent.substring(
    0,
    screen.textContent.length - 1
  );
  fontSize();
};
const clearScreen = () => {
  screen.textContent = '';
};

// font size
const fontSize = () => {
  if ((screen.textLength < 11) & (screen.textLength > 0)) {
    screen.style.fontSize = '2.5rem';
  } else if ((screen.textLength > 10) & (screen.textLength <= 42)) {
    screen.style.fontSize = '1.2rem';
  } else if (screen.textLength > 42) {
    screen.style.fontSize = '0.5rem';
  }
};

// key validate
const keyValidation = (val, lastChar) => {
  if (
    lastChar === '+' ||
    lastChar === '-' ||
    lastChar === '*' ||
    lastChar === '/' ||
    screen.textLength === 0
  ) {
    return;
  } else {
    screen.textContent += `${val}`;
  }
};

const decimalValidation = (val, lastChar) => {
  if (used === false && lastChar !== '.') {
    screen.textContent += `${val}`;
    used = true;
  } else {
    return;
  }
};
