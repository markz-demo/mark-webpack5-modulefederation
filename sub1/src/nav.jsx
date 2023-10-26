import React from 'react';
import { Button } from 'antd';

function Page1() {
    return (
        <div>
            Sub1 Page1
            <Button>Ant Button</Button> {/* 测试子应用引用antd */}
        </div>
    )
}

function Page2() {
    return (
        <div>
            Sub1 Page2
        </div>
    )
}

// 子应用导航数组
export const navs = [{
    title: 'Sub1 nav1', // 对应导航名称
    url: '/sub1/page1', // url
}, {
    title: 'Sub1 nav2', // 对应导航名称
    url: '/sub1/page2', // url
}]

// 子应用路由数组
export const routers = [{
    exact: true,
    path: '/sub1/page1',// 路由path
    element: <Page1 />, // 路由组件
}, {
    exact: true,
    path: '/sub1/page2',// 路由path
    element: <Page2 />, // 路由组件
}]