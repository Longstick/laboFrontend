﻿/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,title 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
    {
        path: '/user',
        layout: false,
        routes: [
            {
                name: 'login',
                path: '/user/login',
                component: './User/Login',
            },
            {
                name: 'signup',
                path: '/user/signup',
                component: './User/Signup',
            }
        ],
    },
    // {
    //     path: '/testuser',
    //     layout: false,
    //     routes: [
    //         {
    //             name: 'login',
    //             path: '/testuser/login',
    //             component: './User/Login_test',
    //         },
    //     ],
    // },
    // {
    //     path: '/welcome',
    //     name: 'welcome',
    //     icon: 'smile',
    //     component: './Welcome',
    // },
    // {
    //     path: '/admin',
    //     name: 'admin',
    //     icon: 'crown',
    //     access: 'canAdmin',
    //     routes: [
    //         {
    //             path: '/admin',
    //             redirect: '/admin/sub-page',
    //         },
    //         {
    //             path: '/admin/sub-page',
    //             name: 'sub-page',
    //             component: './Admin',
    //         },
    //     ],
    // },
    // {
    //     name: 'list.table-list',
    //     icon: 'table',
    //     path: '/list',
    //     component: './TableList',
    // },

    {
        path: '/home',
        name: 'home',
        icon: 'home',
        component: './HomePage'
    },
    {
        name: 'Repairment',
        icon: 'tool',
        path: '/repair',
        component: './Repairment',
    },
    {
        name: 'Equipment',
        icon: 'database',
        path: '/equipment',
        access: 'canEquip',
        routes: [
            {
                name: 'Equipment Management',
                path: '/equipment/manage',
                component: './Equipment/EquipmentManage',
            },
            {
                name: '废弃管理',
                path: '/equipment/discard',
                component: './Equipment/DiscardManage',
            },
            {
                path: '/equipment',
                redirect: '/equipment/manage',
            }
        ]
    },
    {
        name: 'System',
        icon: 'team',
        path: '/system',
        access: 'canSystem',
        routes: [
            // {
            //     name: 'Character Management',
            //     path: '/system/character',
            //     icon: 'team',
            //     component: './System/Character'
            // },
            {
                name: 'User Management',
                path: '/system/user',
                icon: 'user',
                component: './System/UserManage'
            },
            {
                path: '/system',
                redirect: '/system/user',
            }
        ]
    },
    {
        name: 'Statistics',
        path: '/statistics',
        icon: 'pieChart',
        access: 'canAdmin',
        routes: [
            {
                name: 'Real-Time Statistics',
                path: '/statistics/realtime',
                icon: 'lineChart',
                component: './Statistics/RealTimeStatistic'
            },
            {
                name: 'Maintenance Data',
                path: '/statistics/maintenancedata',
                icon: 'sliders',
                component: './Statistics/MaintenanceData'
            },
        ]
    },
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '*',
        layout: false,
        component: './404',
    },
];
