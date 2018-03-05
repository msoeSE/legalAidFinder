import React, { Component } from 'react';

class MagnifyLoader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Generated from loader.io --> don't remove divs
        return (
            <div align="center" className="lds-css ng-scope">
                <div className="lds-magnify">
                    <div>
                        <div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
                <h2>{this.props.label}</h2>
            </div>
        );
    }
}

export default MagnifyLoader;
