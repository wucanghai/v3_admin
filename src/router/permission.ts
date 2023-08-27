import router from '@/router'
import { whiteList } from '@/utils/white-list'
import NProgress from 'nprogress'
import { getToken } from '@/utils/cache/cookies'

import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, _form, next) => {
  NProgress.start()

  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
      NProgress.done()
    }
  } else if (whiteList.indexOf(to.path) > -1) {
    next()
  } else {
    next('/login')
    NProgress.done()
  }

  NProgress.done()
})
