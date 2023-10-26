import React, { useEffect, useState } from 'react';
import { Button } from 'antd';

function Sub1TabContent() {
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        // 这里为了测试antd Tab销毁模式，加的loading例子，可以忽略
        setTimeout(() => setLoaded(true), 1000)
    }, [])
    return (
        <div>
            Sub1 Tab content
            <div>{loaded ? 'loaded' : 'loading'}</div>
            <Button>Ant Button</Button> {/* 测试子应用引用antd */}
        </div>
    )
}

export default {
    label: 'Sub1 tab', // 对应Tab title
    key: 'sub1', // 对应Tab控件的唯一key
    children: <Sub1TabContent />, // 对应content组件
}