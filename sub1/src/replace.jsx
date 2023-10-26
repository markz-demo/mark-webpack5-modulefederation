import { SearchButton } from 'main/common';

function Sub1Page1() {
    return (
        <div>
            <SearchButton>Sub1 Search Button</SearchButton>
            <div>Sub1 Replace Page1</div>
        </div>
    )
}

// 替换主应用里page1路由
export default [{
    exact: true,
    path: '/page1',
    element: <Sub1Page1 />,
}]