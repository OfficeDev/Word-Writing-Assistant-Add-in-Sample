import { CaretDownOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import React from 'react';

export interface HeaderProp {
    openPanelCallBack: () => void;
}

export class Header extends React.Component<HeaderProp> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const items: MenuProps['items'] = [
            {
                label: "Option 1",
                key: '0',
            },
            {
                type: 'divider',
            },
            {
                label: "Option 2",
                key: '1',
            }
        ];


        return <>
            <div className="header_style">
                <Dropdown menu={{ items }} className="drop_down_button" trigger={['click']}>
                    <Space>
                        Select
                        <CaretDownOutlined />
                    </Space>
                </Dropdown>
                <Button className='open_panel_button'
                    type="text"
                    icon={<MenuOutlined className='icon_style' />}
                    onClick={this.props.openPanelCallBack}
                ></Button>
            </div>
        </>
    }
}