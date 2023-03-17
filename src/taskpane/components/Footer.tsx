import { Button, Divider } from 'antd';
import React from 'react';

export interface FooterProp {
    loading: boolean
    getResultCallback: () => void
}

export class Footer extends React.Component<FooterProp> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <>
            <div className="footer_tyle">
                <Divider style={{ margin: "3px" }} />
                <Button className='result_button_style'
                    onClick={this.props.getResultCallback}
                    loading={this.props.loading}>
                    Get Results
                </Button>
            </div >
        </>
    }
}