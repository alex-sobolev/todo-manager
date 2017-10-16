import React from 'react';
import Header from './header';
import Todos from './todos';

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
