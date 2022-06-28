'use strict';

{
  const token = document.querySelector('main').dataset.token;
  const input = document.querySelector('[name="title"]');
  const ul = document.querySelector('ul');

  input.focus();

  ul.addEventListener('click', e => {
    if (e.target.type === 'checkbox') {
      fetch('?action=toggle', {
        method: 'POST',
        body: new URLSearchParams({
          id: e.target.parentNode.dataset.id,
          token: token,
        }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('This todo has been deleted!');
        }
        console.log(1);
        return response.json();
      })
      .then(json => {
        console.log(2);
        console.log(json.is_done);
        if (json.is_done !== e.target.checked) {
          alert('This Todo has been updated. UI is being updated.');
          e.target.checked = json.is_done;
        }
      })
      .catch(err => {
        alert(err.message);
        location.reload();
      });

    }

    if (e.target.classList.contains('delete')) {
      if (!confirm('Are you sure?')) {
        return;
      }
      
      fetch('?action=delete', {
        method: 'POST',
        body: new URLSearchParams({
          id: e.target.parentNode.dataset.id,
          token: token,
        }),
      });

      e.target.parentNode.remove();
    }
  });


  function addTodo(id,titleValue)
    {
      // お手本をindex.php からもらう
      // <li data-id="">
      //     <input type="checkbox">
      //     <span></span>
      //     <span class="delete">x</span>
      // </li>

      const li = document.createElement('li');
    li.dataset.id = id;
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const title = document.createElement('span');
    title.textContent = titleValue;
    const deleteSpan = document.createElement('span');
    deleteSpan.textContent = 'x';
    deleteSpan.classList.add('delete');

    li.appendChild(checkbox);
    li.appendChild(title);
    li.appendChild(deleteSpan);

    ul.insertBefore(li, ul.firstChild);
    }

  document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();

    // ここで非同期の特有の処理順番の対策として入力文字枠を作っておく
    const title = input.value;

    fetch('?action=add', {
      // 次に実行される
      method: 'POST',
      body: new URLSearchParams({
        title: title,
        token: token,
      }),
    })
    // 省略形
    // .then(response => response.json())
    // json形式かの確認
    .then(response => {
      return response.json();
    })
    // jsonでのデータ表記の確認
    .then(json => {
      // テスト用
      // console.log(json.id);
      addTodo(json.id, title);
    });

    // 最初に実行される
    input.value = '';
    input.focus();
    // テスト用
    console.log('Finish!');
  });

  // const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  // checkboxes.forEach(checkbox => {
  //   checkbox.addEventListener('change', () => {
  //       // チェックボックスから見てformタグは親要素なのでparentNode
  //       // checkbox.parentNode.submit();
  //       // 上のような、ページ遷移をせずにデータを送ることができるフェッチ
  //       // fetch(url, options);

  //       const url = '?action=toggle';
  //       const options = {
  //           method: 'POST',
  //           body: new URLSearchParams({
  //               id: checkbox.parentNode.dataset.id,
  //               token: token,
  //                                       }),
  //   };
  //       fetch(url, options);
  //       // CSSで操作
  //       // checkbox.nextElementSibling.classList.toggle('done');
  // });
  //   });

  // const deletes = document.querySelectorAll('.delete');
  // deletes.forEach(span => {
  //   span.addEventListener('click', () => {

  //     if (!confirm('Are you sure?')) {
  //       return;
  //     }

  //     const url = '?action=delete';
  //       const options = {
  //           method: 'POST',
  //           body: new URLSearchParams({
  //               id: span.parentNode.dataset.id,
  //               token: token,
  //                                       }),
  //   };
  //       fetch(url, options);
  //       span.parentNode.remove();
  //   });
  // });

  const purge = document.querySelector('.purge');
  purge.addEventListener('click', () => {
    if (!confirm('Are you sure?')) {
      return;
    };

    const url = '?action=purge';
        const options = {
            method: 'POST',
            body: new URLSearchParams({
                token: token,
                                        }),
    };
        fetch(url, options);

    const lis = document.querySelectorAll('li');
    lis.forEach(li => {
      if (li.children[0].checked) {
        li.remove();
      }
  });

  });
}