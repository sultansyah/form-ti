import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _ea6e88e2 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _1b5fbed4 = () => interopDefault(import('../pages/logout.vue' /* webpackChunkName: "pages/logout" */))
const _33cb7eed = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _90f3af52 = () => interopDefault(import('../pages/answers/completed.vue' /* webpackChunkName: "pages/answers/completed" */))
const _cea28d2e = () => interopDefault(import('../pages/responses/lists/_id.vue' /* webpackChunkName: "pages/responses/lists/_id" */))
const _82fc078c = () => interopDefault(import('../pages/responses/summary/_id.vue' /* webpackChunkName: "pages/responses/summary/_id" */))
const _2e99c974 = () => interopDefault(import('../pages/answers/_id.vue' /* webpackChunkName: "pages/answers/_id" */))
const _32d1a09e = () => interopDefault(import('../pages/questions/_id.vue' /* webpackChunkName: "pages/questions/_id" */))
const _7dbdcf10 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/login",
    component: _ea6e88e2,
    name: "login___id"
  }, {
    path: "/logout",
    component: _1b5fbed4,
    name: "logout___id"
  }, {
    path: "/register",
    component: _33cb7eed,
    name: "register___id"
  }, {
    path: "/answers/completed",
    component: _90f3af52,
    name: "answers-completed___id"
  }, {
    path: "/responses/lists/:id?",
    component: _cea28d2e,
    name: "responses-lists-id___id"
  }, {
    path: "/responses/summary/:id?",
    component: _82fc078c,
    name: "responses-summary-id___id"
  }, {
    path: "/answers/:id?",
    component: _2e99c974,
    name: "answers-id___id"
  }, {
    path: "/questions/:id?",
    component: _32d1a09e,
    name: "questions-id___id"
  }, {
    path: "/",
    component: _7dbdcf10,
    name: "index___id"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
