import React, {Component} from 'react';
import './App.css';
import TreeComponent from './treeComponent';

class App extends Component {

    state = {
        idCount: 2,
        components: [
            {
                'id': 1,
                'title': 'Component 1',
                'checked': false,
                'children': [
                    {
                        'id': 10,
                        'title': 'Component 1\'s children',
                        'checked': false,
                        'children': [
                            {
                                'id': 100,
                                'title': 'Yet another children',
                                'checked': false,
                                'children': null,
                            }
                        ],
                    }
                ]
            },
            {
                'id': 2,
                'title': 'Component 2',
                'checked': false,
                'children': [
                    {
                        'id': 1,
                        'title': 'Component 2\'s children',
                        'checked': false,
                        'children': [
                            {
                                'id': 1,
                                'title': 'Third level children',
                                'checked': false,
                                'children': null,
                            }
                        ],
                    }
                ]
            }
        ]
    };

    render() {
        return (
            <div className="App">
                {this.state.components.map((c, index) =>
                    <TreeComponent
                        key={c.id}
                        id={c.id}
                        title={c.title}
                        checked={c.checked}
                        index={index}
                        children={c.children}
                        component={c}
                        removeChild={(index) => {
                            this.removeChild(index);
                        }
                        }
                        listenCheckChange={(index) => {
                            this.listenCheckChange(index);
                        }}
                        updateChildren={(children, ind) => {
                            this.updateChildren(children, ind);
                        }}
                        changeChildElementsState={(children, index, checked) => {
                            this.changeChildElementsState(index, checked);
                        }}
                    />
                )
                }
            </div>
        );
    }

    updateChildren = (children, index) => {
        this.setState((prevState, props) => {
            let components = prevState.components;
            components[index].children = children;
            return {components};
        })
    };

    removeChild = (index) => {
        this.setState(
            (prevState, props) => {
                let components = prevState.components;
                if (components != null && components.length > 0) {
                    components.splice(index, 1);
                }
                return {components};
            });
    };

    listenCheckChange = (index) => {
        this.setState(
            (prevState, props) => {
                let components = prevState.components;
                if (components != null && components.length > 0) {
                    components[index].checked = !components[index].checked;
                }
                return {components};
            });
    };

    changeChildElementsState = (index, checked) => {
        this.setState((prevState, props) => {
            let components = prevState.components;
            if (components[index].children != null && components[index].children.length > 0) {
                components[index].children = this.changeCheckedState(components[index].children, checked);
            }
            return {components};
        });
    };

    changeCheckedState = (children, checked) => {
        children.map((child, index) => {
            children[index].checked = checked;
            if (children[index].children != null && children[index].children.length > 0) {
                children[index].children = this.changeCheckedState(children[index].children, checked);
            }
        });
        return children;
    };

}

export default App;
