const revealPassword = (evt) => {
  evt.preventDefault();
  let target = evt.target;
  let pwElement = null;
  let iconElement = null;

  // Get the parent node
  if (!target) {
    return;
  }
  while (!target.classList.contains('InputGroup')) {
    target = target.parentNode;
  }

  for (let node of target.children) {
    if (node.id.includes('password')) {
      pwElement = node;
    }
    if (node.classList.contains('Input-Password-Btn')) {
      iconElement = node;
    }
  }

  if (!pwElement) return;

  pwElement.type = pwElement.type === 'password' ? 'text' : 'password';

  iconElement.classList.toggle('shown');
};

export { revealPassword };
