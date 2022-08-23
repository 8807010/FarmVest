//========Зміна Кольорової палітри сайту
"use strict"
window.addEventListener("load", windowLoad);

function windowLoad() {
  //HTML
  const htmlBlock = document.documentElement;

  //Отримуємо збережену тему
  const saveUserTheme = localStorage.getItem('user-theme');

  //Робота з системними налаштуваннями
  let UserTheme;
  if (window.matchMedia) {
    UserTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    !saveUserTheme ? changeTheme() : null;
  });

  //Зміна теми по кліку
  const themeButton = document.querySelector('.main__theme');
  const resetButton = document.querySelector('.main__reset');

  if (themeButton) {
    themeButton.addEventListener("click", function (e) {
      resetButton.classList.add('active');
      changeTheme(true);
    });
  }
  if (resetButton) {
    resetButton.addEventListener("click", function (e) {
      resetButton.classList.remove('active');
      localStorage.setItem('user-theme', '');
    });
  }

  //Функція додавання класу теми
  function setThemeClass() {
    if (saveUserTheme) {
      htmlBlock.classList.add(saveUserTheme);
      resetButton.classList.add('active');
    } else {
      htmlBlock.classList.add(UserTheme);
    }

  }
  //Додаємо класс теми
  setThemeClass();

  //Функція зміни теми
  function changeTheme(saveTheme = false) {
    let currentTheme = htmlBlock.classList.contains('light') ? 'light' : 'dark';
    let newTheme;

    if (currentTheme === 'light') {
      newTheme = 'dark';
    } else if (currentTheme === 'dark') {
      newTheme = "light";
    }
    htmlBlock.classList.remove(currentTheme);
    htmlBlock.classList.add(newTheme);
    saveTheme ? localStorage.setItem('user-theme', newTheme) : null;
  }
}