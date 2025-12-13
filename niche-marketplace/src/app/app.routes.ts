import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home').then(m => m.Home)
    },
    {
        path: 'annonces',
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/ads-list/ads-list').then(m => m.AdsList)
            },
            //   {
            //     path: 'nouveau',
            //     // canActivate: [AuthGuard],
            //     loadComponent: () => import('./pages/ad-create/ad-create.component').then(m => m.AdCreateComponent)
            //   },
            //       {
            //         path: ':id',
            //         loadComponent: () => import('./pages/ad-detail/ad-detail.component').then(m => m.AdDetailComponent)
            //       },
            //       {
            //         path: ':id/modifier',
            //         // canActivate: [AuthGuard],
            //         loadComponent: () => import('./pages/ad-create/ad-create.component').then(m => m.AdCreateComponent)
            //       }
            //     ]
            //   },
            //   {
            //     path: 'categories',
            //     loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent)
            //   },
            //   {
            //     path: 'messages',
            //     // canActivate: [AuthGuard],
            //     loadComponent: () => import('./pages/messages/messages.component').then(m => m.MessagesComponent)
            //   },
            //   {
            //     path: 'profil',
            //     // canActivate: [AuthGuard],
            //     children: [
            //       {
            //         path: '',
            //         loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent)
            //       },
            //       {
            //         path: 'annonces',
            //         loadComponent: () => import('./pages/user-ads/user-ads.component').then(m => m.UserAdsComponent)
            //       }
            //     ]
            //   },
            //   {
            //     path: 'admin',
            //     // canActivate: [AuthGuard, AdminGuard],
            //     children: [
            //       {
            //         path: '',
            //         loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent)
            //       },
            //       {
            //         path: 'utilisateurs',
            //         loadComponent: () => import('./pages/admin-users/admin-users.component').then(m => m.AdminUsersComponent)
            //       },
            //       {
            //         path: 'moderation',
            //         loadComponent: () => import('./pages/admin-moderation/admin-moderation.component').then(m => m.AdminModerationComponent)
            //       }
        ]
        //   },
        //   {
        //     path: 'connexion',
        //     loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)
        //   },
        //   {
        //     path: 'inscription',
        //     loadComponent: () => import('./pages/auth/register/register.component').then(m => m.RegisterComponent)
        //   },
        //   {
        //     path: '**',
        //     loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
    }
];
