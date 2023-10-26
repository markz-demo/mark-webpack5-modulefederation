const Page1 = () => <div>Sub1 Replace Page1</div>

// 替换主应用里page1路由
export default [{
    exact: true,
    path: '/page1',
    element: <Page1 />,
}]