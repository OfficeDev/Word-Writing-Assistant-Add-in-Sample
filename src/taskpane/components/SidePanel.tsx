import { CloseOutlined, HomeOutlined, LogoutOutlined, MailOutlined, SettingFilled } from '@ant-design/icons';
import { Drawer } from 'antd';
import React from 'react';

export interface SidePanelState {
    isOpen: boolean
}

export interface SidePanelProp {
    OnRef: any,
    logout: () => void;
}

export class SidePanel extends React.Component<SidePanelProp> {
    constructor(props, context) {
        super(props, context);
    }

    state = { isOpen: false };

    componentDidMount() {
        this.props.OnRef(this)
    }

    openPanel = () => {
        this.setState({ isOpen: true });
    }

    closePanel = () => {
        this.setState({ isOpen: false });
    }

    render() {
        const customTitle = <>
            <div className="side_panel_title_root">
                <div className="side_panel_title_settins_wrapper" >
                    <SettingFilled className='side_panel_title_seting_icon' />
                    <CloseOutlined className='side_panel_title_close_icon' onClick={this.closePanel} />
                </div>
                <div className='side_panel_email'>
                    <p className='side_panel_email_font'>Email</p>
                    <span>xxxx@Contoso.com</span>
                </div>
            </div>
        </>

        return <>
            <Drawer
                placement="right"
                width={"260px"}
                className="side_panel_body"
                style={{ backgroundColor: "#252525" }}
                headerStyle={{ borderColor: "white" }}
                open={this.state.isOpen}
                onClose={this.closePanel}
                title={customTitle}
                closable={false}
            >
                <div className='side_panel_home' onClick={this.closePanel}>
                    <HomeOutlined className='side_panel_icon' />
                    <div className='side_panel_text'>Home</div>
                </div>
                <div className='side_panel_list_item'>
                    <MailOutlined className='side_panel_icon' />
                    <div className='side_panel_text'>Contact Us</div>
                </div>
                <div className='side_panel_list_item' onClick={this.closePanel}>
                    <LogoutOutlined className='side_panel_icon' rotate={180} />
                    <div className='side_panel_text' onClick={this.props.logout}>Log Out</div>
                </div>
            </Drawer>
        </>
    }
}