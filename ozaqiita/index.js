const api = 'https://qiita.com/api/v2/users/ozaki25/items?page=1&per_page=5';

const template = items => `
<style>
.item {
  border-bottom: 1px solid #e8e8e8;
  padding: 16px;
}
.title {
  color: #777;
  font-size: 1.6rem;
  font-weight: 700;
  text-decoration: none;
}
.likes {
  border-radius: 4px;
  background-color: #55c500;
  color: #fff;
  padding: 4px 8px;
}
.meta {
  color: #999;
  font-size: .9em;
}
</style>
<div>
${items
  .map(
    ({ title, created_at, likes_count, url }) =>
      `
<div class="item">
  <a class="title" href="${url}">${title}</a>
  <div class="meta">by ozaki25 ${created_at} <span class="likes">いいね ${likes_count}</span></div>
</div>
    `,
  )
  .join('')}
</div>
`;

class OzaQiita extends HTMLElement {
  constructor() {
    super();
    this.items = [];
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render({ loading: true });
    fetch(api).then(res =>
      res.json().then(json => {
        this.items = json.map(({ title, created_at, likes_count, url }) => ({
          title,
          created_at,
          likes_count,
          url,
        }));
        this.render({ loading: false });
      }),
    );
  }

  render({ loading }) {
    console.log('render', this.items);
    this.shadowRoot.innerHTML = loading
      ? `<p>Loading...</p>`
      : template(this.items);
  }
}

window.customElements.define('oza-qiita', OzaQiita);
