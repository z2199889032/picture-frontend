import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import UserLoginPage from '@/pages/user/UserLoginPage.vue'
import UserRegisterPage from '@/pages/user/UserRegisterPage.vue'
import UserManagePage from '@/pages/admin/UserManagePage.vue'
import AddPicturePage from '@/pages/AddPicturePage.vue'
import PictureManagePage from '@/pages/admin/PictureManagePage.vue'
import PictureDetailPage from '@/pages/PictureDetailPage.vue'
import AddPictureBatchPage from '@/pages/AddPictureBatchPage.vue'
import SpaceManagePage from '@/pages/admin/SpaceManagePage.vue'
import AddSpacePage from '@/pages/AddSpacePage.vue'
import MySpacePage from '@/pages/MySpacePage.vue'
import SpaceDetailPage from '@/pages/SpaceDetailPage.vue'
import SearchPicturePage from '@/components/SearchPicturePage.vue'
import SpaceAnalyzePage from '@/pages/SpaceAnalyzePage.vue'
import UserDetailPage from '@/pages/user/UserDetailPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/user/login',
      name: '用户登录',
      component: UserLoginPage,
    },
    {
      path: '/user/register',
      name: '用户注册',
      component: UserRegisterPage,
    },
    {
      path: '/admin/pictureManage',
      name: '图片管理',
      component: PictureManagePage,
    },
    {
      path: '/admin/spaceManage',
      name: '空间管理',
      component: SpaceManagePage,
    },
    {
      path: '/add_picture/batch',
      name: '批量创建图片',
      component: AddPictureBatchPage,
    },
    {
      path: '/admin/userManagePage',
      name: '用户管理',
      component: UserManagePage,
    },
    {
      path: '/add_picture',
      name: '创建图片',
      component: AddPicturePage,
    },
    {
      path: '/picture/:id',
      name: '图片详情',
      component: PictureDetailPage,
      props: true,
    },
    {
      path: '/add_space',
      name: '创建空间',
      component: AddSpacePage,
    },
    {
      path: '/my_space',
      name: '我的空间',
      component: MySpacePage,
    },
    {
      path: '/space/:id',
      name: '空间详情',
      component: SpaceDetailPage,
      props: true,
    },
    {
      path: '/search_picture',
      name: '图片搜索',
      component: SearchPicturePage,
    },
    {
      path: '/space_analyze',
      name: '空间分析',
      component: SpaceAnalyzePage,
    },
    {
      path: '/user/detail',
      name: '个人详情',
      component: UserDetailPage,
    },




  ],
})

export default router

