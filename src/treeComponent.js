import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './App.css';
import {faChevronDown, faChevronRight, faPlus} from "@fortawesome/free-solid-svg-icons";

class TreeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
            children: props.children,
        };
    }

    render() {
        return (
            <div className="first-branch">
                <div className="single-component">
                    <div className="arrow-icon">
                        {this.state.children != null &&
                        <FontAwesomeIcon
                            // className="fav-icons"
                            icon={this.state.opened ? faChevronDown : faChevronRight}
                            onClick={() => this.setOpened()}
                        />
                        }
                    </div>
                    {/*{this.state.children == null &&*/}
                    {/*    <div className="empty-arrow-box"></div>*/}
                    {/*}*/}
                    <input type="checkbox" className="check-box"/>
                    <div>{this.props.title}</div>
                    <FontAwesomeIcon
                        className="fav-icons"
                        icon={faPlus}
                        onClick={() => this.addChild({id: 4, title: 'new component', children: null})}
                    />
                </div>
                {this.state.children != null && this.state.opened &&
                <div className="child-component">
                    {this.state.children.map((c, index) =>
                        <TreeComponent
                            title={c.title}
                            children={c.children}
                            id={c.id}
                            key={c.id}/>
                    )
                    }
                </div>
                }
            </div>
        );
    }

    setOpened = () => {
        this.setState(
            (prevState, props) => {
                let opened = !prevState.opened;
                return {opened};
            }
        );
    };

    addChild = (child) => {
        this.setState(
            (prevState, props) => {
                let children = prevState.children;
                if (children != null) {
                    children.push(child);
                } else {
                    children = [];
                    children.push(child);
                }
                return {children};
            });
    };
}

export default TreeComponent;