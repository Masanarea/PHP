'use strict';

{
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        // チェックボックスから見てformタグは親要素なのでparentNode
        // checkbox.parentNode.submit();
        // 上のような、ページ遷移をせずにデータを送ることができるフェッチ
        // fetch(url, options);

        const url = '?action=toggle';
        const options = {
            method: 'POST',
            body: new URLSearchParams({
                id: checkbox.dataset.id,
                token: checkbox.dataset.token,
                                        }),
    };
        fetch(url, options);
        checkbox.nextElementSibling.classList.toggle('done');
  });
    });

  const deletes = document.querySelectorAll('.delete');
  deletes.forEach(span => {
    span.addEventListener('click', () => {
      span.parentNode.submit();
    });
  });

  const purge = document.querySelector('.purge');
  purge.addEventListener('click', () => {
    if (!confirm('Are you sure?')) {
      return;
    }
    purge.parentNode.submit();
  });
}