import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import OrderView from '@/views/OrderView.vue'
import JoinView from '@/views/JoinView.vue'
import MeView from '@/views/MeView.vue'
import SearchView from '@/views/SearchView.vue'
import HospView from '@/views/HospView.vue'
import IWantView from '@/views/IWantView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import CompView from '@/views/CompView.vue'
import UserInfoView from '@/views/UserInfoView.vue'
import CommentView from '@/views/CommentView.vue'
import PatientView from '@/views/PatientView.vue'
import CommentDetailView from '@/views/CommentDetailView.vue'
import OrderDetailView from '@/views/OrderDetailView.vue'
import ArticleView from '@/views/ArticleView.vue'
import { useAuthStore } from '@/stores/auth'
import DownloadView from '@/views/DownloadView.vue'
import PaymentView from '@/views/PaymentView.vue'
import HelperOrderView from '@/views/HelperOrderView.vue'
import HaveCommentedDetailView from '@/views/HaveCommentedDetailView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/download',
      component: DownloadView
    },
    {
      path: '/home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/order',
      component: OrderView,
      meta: { requiresAuth: true }
    },
    {
      path: '/join',
      component: JoinView,
      meta: { requiresAuth: true }
    },
    {
      path: '/me',
      component: MeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/search',
      component: SearchView,
      meta: { requiresAuth: true }
    },
    {
      path: '/hospital',
      component: HospView,
      meta: { requiresAuth: true }
    },
    {
      path: '/iwant',
      component: IWantView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      component: LoginView
    },
    {
      path: '/register',
      component: RegisterView
    },
    {
      path: '/company',
      component: CompView,
      meta: { requiresAuth: true }
    },
    {
      path: '/userinfo',
      component: UserInfoView,
      meta: { requiresAuth: true }
    },
    {
      path: '/comment',
      component: CommentView,
      meta: { requiresAuth: true }
    },
    {
      path: '/patients',
      component: PatientView,
      meta: { requiresAuth: true }
    },
    {
      path: '/commentDetail',
      component: CommentDetailView,
      meta: { requiresAuth: true }
    },
    {
      path: '/orderDetail',
      component: OrderDetailView,
      meta: { requiresAuth: true }
    },
    {
      path: '/article',
      props: true,
      component: ArticleView,
      meta: { requiresAuth: true }
    },
    {
      path: '/payment',
      component: PaymentView,
      meta: { requiresAuth: true }
    },
    {
      path: '/helperOrder',
      component: HelperOrderView,
      meta: { requiresAuth: true }
    },
    {
      path: '/haveCommentedDetail',
      component: HaveCommentedDetailView,
      meta: { requiresAuth: true }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // 总是滚动到顶部
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authStore.isLogin()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
