import React from "react";
import { PureComponent } from "react";

class Name extends PureComponent {
    render() {
        return (
            <p>
                <button class="success button">Hello {this.props.name}</button>
            </p>
        );
    }
}
export default Name;
