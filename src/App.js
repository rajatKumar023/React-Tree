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
                'children': [
                    {
                        'id': 10,
                        'title': 'Component 1\'s children',
                        'children': [
                            {
                                'id': 100,
                                'title': 'Yet another children',
                                'children': null,
                            }
                        ],
                    }
                ]
            },
            {
                'id': 2,
                'title': 'Component 2',
                'children': [
                    {
                        'id': 1,
                        'title': 'Component 2\'s children',
                        'children': [
                            {
                                'id': 1,
                                'title': 'Third level children',
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
                        index={index}
                        children={c.children}
                    />
                )
                }
            </div>
        );
    }
}

export default App;
