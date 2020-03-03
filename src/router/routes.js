function page (path) {
  return () => import(/* webpackChunkName: '' */ `@/views/${path}`).then(m => m.default || m)
}

export default [
  { path: '/', name: 'home', component: page('Home.vue') },
  { path: '/articles/:id', name: 'articles.detail', component: page('ArticleDetail.vue') },
  { path: '/messages', name: 'messages', component: page('Messages.vue') },
  { path: '/messages/:id', name: 'messages.detail', component: page('MessageDetail.vue') },
  { path: '*', component: page('errors/404.vue') }
]
