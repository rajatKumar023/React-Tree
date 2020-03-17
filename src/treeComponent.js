import React, {Component} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './App.css';
import {faChevronDown, faChevronRight, faMinus, faPlus} from "@fortawesome/free-solid-svg-icons";

class TreeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            opened: false,
        };
    }

    render() {
        return (
            <div className="first-branch">
                <div className="single-component">
                    <div className="arrow-icon">
                        {this.props.children != null && this.props.children.length > 0 &&
                        <FontAwesomeIcon
                            icon={this.state.opened ? faChevronDown : faChevronRight}
                            onClick={() => this.setOpened()}
                        />
                        }
                    </div>
                    <input type="checkbox" className="check-box" checked={this.props.checked} onChange={() => {
                        console.log('action configured');
                        this.props.listenCheckChange(this.props.index);

                    }}/>
                    <div>{this.props.title}</div>
                    <FontAwesomeIcon
                        className="fav-icons"
                        icon={faPlus}
                        onClick={() => this.addChild({
                            id: 4,
                            checked: false,
                            title: 'new component',
                            children: null
                        }, this.props.index)}
                    />
                    <FontAwesomeIcon
                        className="fav-icons"
                        icon={faMinus}
                        onClick={() => this.props.removeChild(this.props.index)}
                    />
                </div>
                {this.props.children != null && this.state.opened &&
                <div className="child-component">
                    {this.props.children.map((c, index) =>
                        <TreeComponent
                            title={c.title}
                            children={c.children}
                            index={index}
                            id={c.id}
                            key={c.id}
                            checked={c.checked}
                            removeChild={(index) => this.removeChild(index)}
                            listenCheckChange={(index) => {
                                this.props.listenCheckChange(this.props.index);
                                this.listenCheckChange(index);
                            }}
                            updateChildren={(children, childIndex) => {
                                let actualChildren = this.props.children;
                                actualChildren[childIndex].children = children;
                                this.props.updateChildren(actualChildren, this.props.index);
                            }}
                        />
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

    listenCheckChange = (index) => {
        let children = this.props.children;
        children[index].checked = !children[index].checked;
        this.props.updateChildren(children, this.props.index);
    };

    addChild = (child, index) => {
        let children = this.props.children;
        if (children != null) {
            children.push(child);
        } else {
            children = [];
            children.push(child);
        }
        this.props.updateChildren(children, index);
    };

    removeChild = (index) => {
        let children = this.props.children;
        if (children != null && children.length > 0) {
            children.splice(index, 1);
        }
        this.props.updateChildren(children, this.props.index);
    };
}

export default TreeComponent;