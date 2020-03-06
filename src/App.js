import React, {useState} from 'react';
import './App.css';
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function App() {
    const [component, setComponent] = useState([
        {
            'id': 1,
            'title': 'Component 1',
            'opened': false,
            'children': [
                {
                    'id': 1,
                    'title': 'Component 1\'s children',
                    'opened': false,
                    'children': [
                        {
                            'id': 1,
                            'title': 'Yet another children',
                            'opened': false,
                            'children': null,
                        }
                    ],
                }
            ]
        }
    ]);

    return (
        <div className="App">
            {component.map((c, index) =>
                <SingleComponent
                    id={c.id}
                    title={c.title}
                    children={c.children}
                    opened={c.opened}
                />
            )
            }
        </div>
    );
}


function SingleComponent(props) {
    return (
        <div>
            <div className="single-component">
                {props.children != null &&
                <FontAwesomeIcon
                    className="fav-icons"
                    icon={faChevronRight}
                />
                }
                <div>{props.title}</div>
                <FontAwesomeIcon
                    className="fav-icons"
                    icon={faPlus}
                />
            </div>
            {props.children != null &&
            <div className="child-component">
                {props.children.map((c, index) =>
                    <SingleComponent
                        id={c.id}
                        title={c.title}
                        children={c.children}
                        opened={false}
                    />
                )
                }
            </div>
            }
        </div>
    );
}


export default App;
