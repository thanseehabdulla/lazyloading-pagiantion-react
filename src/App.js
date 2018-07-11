import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            items: 30,
            offsets: 0,
            loadingState: false
        };
        this.handleScroll = this.handleScroll.bind(this)
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }


    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)

    }

    displayItems() {
        var items = [];
        for (var k = 0; k < this.state.items; k++) {
            items.push(<li key={k}>Item-VoidCanvas {k}</li>);
        }
        return items;
    }



    loadMoreItems() {
        this.setState({ loadingState: true });
        setTimeout(() => {
            this.setState({ items: this.state.items + 30, loadingState: false });
        }, 3000);
    }


    handleScroll(event) {

        var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        var clientHeight = document.documentElement.clientHeight || window.innerHeight;
        var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom) {

            this.loadMoreItems();
            this.displayItems();
        }

    }


    render() {
        return (
            <div className="App"
                 ref="iScroll"
                 >
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>

                <ul>
                    {this.displayItems()}
                </ul>

                {this.state.loadingState
                    ? <p className="loading">
                        loading More Items..
                    </p>
                    : ""}
            </div>

        );
    }
}

export default App;
