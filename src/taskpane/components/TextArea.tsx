import React from 'react';
import { Divider, Skeleton, Input, message } from 'antd';
import { post } from './utility/request';
import { api as apiConf } from './utility/config';
import { AxiosRequestConfig } from "axios";
import { Footer } from './Footer';
import { Header } from './Header';

const { TextArea } = Input;

export interface TextAIParams {
    document: string
}

export interface TextAreaProps {
    openPanelCallback: () => void
}

export class ResizeTextArea extends React.Component<TextAreaProps> {
    constructor(props, context) {
        super(props, context);
    }

    state = {
        src: "",
        tgt: null,
        loading: false
    };

    registerSelectRangeListner() {
        Office.context.document.addHandlerAsync(Office.EventType.DocumentSelectionChanged,
            () => {
                return Word.run(async (context) => {
                    const selRange = context.document.getSelection();
                    selRange.load();
                    await context.sync();
                    if (selRange.text.length > 0) {
                        this.setState({ src: selRange.text, tgt: null, loading: false });
                    }
                });
            }
        );
    }

    componentDidMount() {
        // listener to the document selection change
        this.registerSelectRangeListner();

        // define the behavior of the resizable textarea
        this.textAreaResizable();
    }

    textAreaResizable() {
        const resizer = document.getElementById('dragMe');
        const prevSibling = resizer.previousElementSibling;
        let prevSiblingHeight = 0;

        // The current position of mouse
        let y = 0;

        const mouseDownHandler = function (e) {
            y = e.clientY;
            const rect = prevSibling.getBoundingClientRect();
            prevSiblingHeight = rect.height;

            // Attach the listeners to `document`
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        };

        const mouseMoveHandler = function (e) {
            const dy = e.clientY - y;
            const h = ((prevSiblingHeight + dy) * 100) / resizer.parentElement.getBoundingClientRect().height;
            prevSibling["style"].height = `${h}%`;

            resizer.style.cursor = 'row-resize';
            document.body.style.cursor = 'row-resize';
            resizer["style"].userSelect = 'none';
            resizer["style"].pointerEvents = 'none';

            resizer["style"].userSelect = 'none';
            resizer["style"].pointerEvents = 'none';
        };

        const mouseUpHandler = function () {
            resizer.style.removeProperty('cursor');
            document.body.style.removeProperty('cursor');

            resizer["style"].removeProperty('user-select');
            resizer["style"].removeProperty('pointer-events');

            resizer["style"].removeProperty('user-select');
            resizer["style"].removeProperty('pointer-events');

            // Remove the handlers of `mousemove` and `mouseup`
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };
        // Attach the handler
        resizer.addEventListener('mousedown', mouseDownHandler);
    }

    onSrcChange = async (e) => {
        let nextState;
        if (e.target.value.length == 0) {
            nextState = { src: e.target.value, tgt: null };
        } else {
            nextState = { src: e.target.value };
        }
        this.setState(nextState);
    }

    getResult() {
        if (this.state.src.length == 0) {
            message.warning("Fill in the source content!");
            return;
        }
        if (this.state.src.length < 250) {
            message.warning("Fill in at least 250 characters!");
            return;
        }

        //TODO: just mock data, remove once your logic filled in
        let result = this.genPredictResult();
        this.setState({ tgt: result, loading: false });


        //TODO: request the server and show the result
        // this.setState({ tgt: null, loading: true });
        // post(apiConf.baseUrl + apiConf.postUrl, {}, {}).then((res) => {
        //     if (res.status == 200 && res.data != null) {
        //         //TODO: generate response data here !!
        //         let analyze = null;
        //         this.setState({ tgt: analyze, loading: false });
        //     } else {
        //         message.error(res.data.error);
        //         this.setState({ loading: false });
        //     }
        // })
    }

    genPredictResult() {
        const AIBackGroundColor = "#FEFDE0";
        return <><div style={{ display: 'flex', justifyContent: 'center' }}>
            <h2 style={{ backgroundColor: `${AIBackGroundColor}`, alignSelf: 'center' }}>Fill in your logic here!</h2>
        </div>
        </>;
    }


    render() {
        return <>
            <div className='text_area_root'>
                <Header openPanelCallBack={this.props.openPanelCallback}></Header>
                <div className="text_area_src">
                    < TextArea
                        bordered={false}
                        className="text_area_src_text"
                        onChange={this.onSrcChange}
                        placeholder="Select the text from document content or type manually for AI involvement (minimum 250 characters)"
                        value={this.state.src}
                        allowClear
                    />
                </div>
                <div className="resizer" id="dragMe"><Divider className='divider'></Divider></div>
                <div className='text_area_tgt'>
                    <div className='text_are_tgt_text'>
                        {
                            this.state.tgt != null && this.state.tgt.length != 0
                                ? this.state.tgt
                                : <Skeleton
                                    loading
                                    active={this.state.loading}
                                    paragraph={{ rows: 8, width: [400, 500, 250, 400, 250, 200, 500, 150, 300] }} />
                        }
                    </div>
                </div>
                <Footer getResultCallback={this.getResult.bind(this)} loading={this.state.loading}></Footer>
            </div>
        </>
    }
}

export default ResizeTextArea;