import React from 'react';
import Header from '../containers/header';
import Todos from '../containers/todos';

class App extends React.Component {
    render() {
        return(
            <div className='app'>
                <Header />
                <Todos />
            </div>
        );
    }
}

export default App;
