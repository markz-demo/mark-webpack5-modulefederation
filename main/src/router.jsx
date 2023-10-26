import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Outlet, useLocation, matchPath } from 'react-router-dom';
import Home from './Home';
import Page1 from './Page1';
import Page2 from './Page2';
import './nav.less';
// import { navs, routers } from 'sub1/nav';
// import replaces from 'sub1/replace';

export default function RootRouter() {

    const [replaces, setReplaces] = useState(null)
    const [navs, setNavs] = useState([])
    const [routers, setRouters] = useState([])

    useEffect(() => {
        // 动态异步加载子应用navs和routers列表
        import('sub1/nav').then(({ navs, routers }) => {
            setNavs(navs)
            setRouters(routers)
        })

        // 动态异步加载子应用replace路由列表
        import('sub1/replace').then(result => {
            setReplaces(result.default)
        }).catch(e => { setReplaces([]) })
    }, [])

    return (
        <BrowserRouter>
            <div className='layout'>
                <div className='nav'>
                    <NavLink to='/' className='nav-link'>Home</NavLink>
                    <NavLink to='/page1' className='nav-link'>Page1</NavLink>
                    <NavLink to='/page2' className='nav-link'>Page2</NavLink>
                    {/* 遍历渲染导航 */}
                    {navs.map((item, i) => <NavLink key={i} to={item.url} className='nav-link'>{item.title}</NavLink>)}
                </div>
                <div className='layout-body'>
                    {/* 子应用replace路由列表加载完成才能渲染路由 */}
                    {replaces && <Routes>
                        {/* 外层套个自定义Wrapper，重写路由加载逻辑 */}
                        <Route exact path='/' element={<Wrapper replaces={replaces} />} >
                            <Route exact path='/' element={<Home />} />
                            <Route exact path='/page1' element={<Page1 />} />
                            <Route exact path='/page2' element={<Page2 />} />
                            {/* 遍历渲染路由 */}
                            {routers.map((item, i) => <Route key={i} {...item} />)}
                        </Route>
                    </Routes>
                    }
                </div>
            </div>
        </BrowserRouter>
    )
}

function Wrapper({ replaces }) {
    const { pathname } = useLocation()
    const replace = replaces.find(item => matchPath(item, pathname)) // 判断当前path是否在子应用的replace路由列表里
    if (replace) {
        return replace.element // 如果有，则渲染子应用里配置的路由组件
    }
    return <Outlet />
}