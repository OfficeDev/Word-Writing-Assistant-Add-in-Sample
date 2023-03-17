import React from "react";
import ResizeTextArea from "./TextArea";
import { Welcome } from "./Welcome";
import { SidePanel } from "./SidePanel";

enum Page {
    TextEditPage,
    Welcome
}

export interface HomeProps {
    isOfficeInitialized: boolean;
}

export default class Home extends React.Component<HomeProps> {
    constructor(props, context) {
        super(props, context);
    }

    panelRef: any;
    state = {
        currentPage: Page.Welcome
    }

    openPanel = () => {
        this.panelRef.openPanel();
    };

    onPanelRef = (Ref: any) => {
        this.panelRef = Ref;
    };

    toTextEditPage = () => {
        this.setState({ currentPage: Page.TextEditPage });
    }

    logout = () => {
        this.setState({ currentPage: Page.Welcome });
    }

    render() {

        const { isOfficeInitialized } = this.props;
        if (!isOfficeInitialized) {
            //add some logic to alert
        }

        if (this.state.currentPage == Page.Welcome) {
            return <>
                <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%", padding: "2px" }}>
                    <Welcome toTextArea={this.toTextEditPage.bind(this)} />
                </div>
            </>
        }

        return <>
            <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%", padding: "2px" }}>
                <SidePanel OnRef={this.onPanelRef} logout={this.logout.bind(this)}></SidePanel>
                <ResizeTextArea openPanelCallback={this.openPanel.bind(this)}></ResizeTextArea>
            </div>
        </>
    }

}