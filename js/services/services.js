const postData = async (url, data) => { // отвечает за постинг данных, то есть когда мы их уже отправляем на сервер. Эта функция занимается тем, что настраивает наш запрос, фетчит - посылает запрос на сервер, получает какой-то ответ от сервера и после этого трансформирует этот ответ в json
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: data
    });

    return await res.json() // это Promise
  };
  // function expretion - функции которые создаются прямо в потоке кода и выглядят как пресваивание в обычную переменную

// убрать если захочу использовать axios
  async function getResource(url) {
    let res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
}

  export {postData};
  export {getResource};