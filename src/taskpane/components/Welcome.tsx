import React from 'react';
import { Button, message } from 'antd';

export interface WelcomeProps {
    toTextArea: () => void;
}

export class Welcome extends React.Component<WelcomeProps> {
    constructor(props, context) {
        super(props, context);
    }

    dialog: any

    SignIn = () => {
        Office.context.ui.displayDialogAsync("https://localhost:3000/login.html", { height: 80, width: 80 }, this.dialogCallback);
    }

    dialogCallback = (asyncResult) => {
        if (asyncResult.status == "failed") {
            // In addition to general system errors, there are 3 specific errors for
            // displayDialogAsync that you can handle individually.
            switch (asyncResult.error.code) {
                case 12004:
                    message.error("Domain is not trusted");
                    break;
                case 12005:
                    message.error("HTTPS is required");
                    break;
                case 12007:
                    message.error("A dialog is already opened.");
                    break;
                default:
                    message.error(asyncResult.error.message);
                    break;
            }
        }
        else {
            this.dialog = asyncResult.value;

            /*Messages are sent by developers programatically from the dialog using office.context.ui.messageParent(...)*/
            this.dialog.addEventHandler(Office.EventType.DialogMessageReceived, this.messageHandler);

            /*Events are sent by the platform in response to user actions or errors. For example, the dialog is closed via the 'x' button*/
            //dialog.addEventHandler(Office.EventType.DialogEventReceived, eventHandler);
        }
    }

    messageHandler = (arg) => {
        this.dialog.close();
        //const messageFromDialog = JSON.parse(arg.message);
        //console.log(messageFromDialog.name);
        message.info(arg.message);
        window.location.replace("https://localhost:3000/loggedin.html");
        // Alternatively ...
        // window.location.href = "/newPage.html";
    }

    render() {

        return <>
            <div id="container" className='welcome_container'>
                <div id="title" className='welcome_introduce'>
                    <div className='welcome_logo'><img src="./assets/icon-64.png"></img></div>
                    <h2>Contoso</h2>
                    <h2 className='welcome_desc'>welcome</h2>
                </div>
                <div id="buttons" className='welcome_button' >
                    <Button className='welcome_signin' onClick={this.SignIn}>Sign In</Button>
                    <div style={{ padding: "3px" }}>or</div>
                    <Button className='welcome_startfree' onClick={this.props.toTextArea}>Start for Free</Button>
                </div>
                <div id="parterners" className='partners'>
                    <span style={{ fontWeight: "bold" }}>Our Partners</span>
                    <div className='partner_wrapper'>
                        <img src="https://res-1.cdn.office.net/shellux/outlook_24x.59692ba8e1f344194426952916c16896.svg" className='partner_img'></img>
                        <img src="https://res-1.cdn.office.net/shellux/teams_24x.1da2a0886d3c616a6242b1f249a9bdce.svg" className='partner_img'></img>
                        <img src="https://res-1.cdn.office.net/shellux/word_24x.21f886b59cf807ae5818458ffa8cecd4.svg" className='partner_img'></img>
                        <img src="https://res-1.cdn.office.net/shellux/powerpoint_24x.5326aeabae2168deb16e6da825978d4f.svg" className='partner_img'></img>
                    </div>
                </div>
            </div>
        </>
    }
}