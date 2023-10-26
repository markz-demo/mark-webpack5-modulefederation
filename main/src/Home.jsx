import React, { useEffect, useState } from 'react';
import { Button, Tabs } from 'antd';
// import sub1Tab from 'sub1/tab';

export default function Home() {
    const [type, setType] = useState('1')
    const [items, setItems] = useState([
        { label: 'Tab 1', key: '1', children: <TabContent index={1} /> },
        { label: 'Tab 2', key: '2', children: <TabContent index={2} /> },
        { label: 'Tab 3', key: '3', children: <TabContent index={3} /> },
        // sub1Tab,
    ])

    useEffect(() => {
        import('sub1/tab').then(result => {
            setItems(items => [...items, result.default])
        })
    }, [])

    return (
        <div>
            <div>Main Home</div>
            <Tabs activeKey={type} onChange={setType} items={items}></Tabs>
        </div>
    )
}

function TabContent({ index }) {
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        // 这里为了测试antd Tab销毁模式，加的loading例子，可以忽略
        setTimeout(() => setLoaded(true), 1000)
    }, [])
    return (
        <div>
            Tab content {index}
            <div>{loaded ? 'loaded' : 'loading'}</div>
        </div>
    )
}