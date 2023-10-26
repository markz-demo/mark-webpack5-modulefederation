import { SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default function SearchButton({ children, ...others }) {
    return <Button icon={<SearchOutlined />} {...others}>{children}</Button>
}