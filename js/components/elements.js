export const createElement = (tag, classes, parameters) => {
  // тэг html разметки, classes классы в строку 'hidden seper_class', parameters - массив атрибутов и значений [{attr: textContent, value: 'Команда!'}]
  const _tag = document.createElement(tag);
  if (classes && classes !== "") {
    _tag.classList.add(...classes.split(" "));
  }

  if (parameters) {
    parameters.forEach((p) => {
      _tag[p.attr] = p.value;
    });
  }
  return _tag;
};
