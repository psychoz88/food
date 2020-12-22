'use strict';

let path = require('path');
// различные плагины тут идут

module.exports = {
  mode: 'development', // режим сборки
  entry: './js/main.js', // откуда берет(файл где import), какой файл является сборщиком всех зависимостей
  output: {
    filename: 'bundle.js',
    path: __dirname + '/js'
  },
  watch: true, // следит за изменениями в коде и файле и постоянно изменять полную сборку

  devtool: "source-map", // карта того как мы можем ориентироваться в файле

  module: {
    rules: [ // правила для определенныъ файлов
      {
        test: /\.m?js$/, // находит js файлы
        exclude: /(node_modules|bower_components)/, // исключаем данные файлы
        use: { // как и что будем искользовать
          loader: 'babel-loader', // технология которая будет связывать наш webpack с babel(ндао установить)
          options: { // опции которые будут тут использоваться
            presets: [['@babel/preset-env', { // пресеты и мы его как раз установили
                debug: true, // свойство которое поволяет во время компиляции увидеть проблемы
                corejs: 3, 
                useBuiltIns: "usage" // позволяет выбрать те полифиллы которые нам нужны
            }]]
          }
        }
      }
    ]
  }
};
