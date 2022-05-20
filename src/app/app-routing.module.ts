import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { environment } from 'src/environments/environment';
const prefix = environment.prefix;

const routes: Routes = [
  {
    path: '',
    redirectTo: `${prefix}/home`,
    pathMatch: 'full'
  },
  {
    path: 'slider',
    loadChildren: () => import('./pages/slider/slider.module').then( m => m.SliderPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'subject/all',
    loadChildren: () => import('./pages/subject/subject.module').then( m => m.SubjectPageModule)
  },
  {
    path: 'user/subject',
    loadChildren: () => import('./pages/user-subjects/user-subjects.module').then( m => m.UserSubjectsPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./pages/payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'ui/language',
    loadChildren: () => import('./pages/laguage/language.module').then( m => m.LanguagePageModule)
  },
  {
    path: 'video-view/:topicId',
    loadChildren: () => import('./pages/video-view/video-view.module').then( m => m.VideoViewPageModule)
  },

  // prefix side routes
  {
    path: 'public/profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'public/downloads',
    loadChildren: () => import('./pages/download/download.module').then( m => m.DownloadPageModule)
  },
  {
    path: 'public/subscribed',
    loadChildren: () => import('./pages/subscription/subscription.module').then( m => m.SubscriptionPageModule)
  },
  {
    path: 'public/home',
    loadChildren: () => import('./pages/welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'public/transaction',
    loadChildren: () => import('./pages/transaction/transaction.module').then( m => m.TransactionPageModule)
  },
  {
    path: 'public/messages',
    loadChildren: () => import('./pages/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'public/quize',
    loadChildren: () => import('./pages/quiz/quiz.module').then( m => m.QuizPageModule)
  },
  {
    path: 'public/settings',
    loadChildren: () => import('./pages/setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'public/supports',
    loadChildren: () => import('./pages/support/support.module').then( m => m.SupportPageModule)
  },
  {
    path: 'public/about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
