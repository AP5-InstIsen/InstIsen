import React from "react";
import { PureComponent } from "react";

class Name extends PureComponent {
    render() {
        return <p>Hello {this.props.name}</p>;
    }
}
export default Name;
