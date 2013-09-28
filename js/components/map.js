/** @jsx React.DOM */
var Map = React.createClass({
    componentDidMount: function(node) {
        this.map = new Microsoft.Maps.Map(node, {credentials: this.props.apiKey });
    },
    render : function () {
        return (<div />);
    }
});