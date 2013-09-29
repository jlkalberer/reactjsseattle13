/** @jsx React.DOM */
var Locations = 
React.createClass({
    showAdvanced : function() {
        $("#showAdvanced").addClass("hidden");
        $("#hideAdvanced").removeClass("hidden");

        $("#advancedItems").slideDown();

        return false;
    },
    hideAdvanced : function() {
        $("#showAdvanced").removeClass("hidden");
        $("#hideAdvanced").addClass("hidden");

        $("#advancedItems").slideUp();

        return false;
    },
    render : function () {
        var html = this.props.includeLocations.map(function (location) {
            return (<li>
                        <input id={location.id} type="checkbox" defaultChecked="checked" value={location.name} />
                        <label for={location.id}>Include {location.name}</label>
                    </li>);
            });

        return (
            <div class="advanced">
                <a href="#" id="showAdvanced" onClick={this.showAdvanced}>+ Show Advanced</a>
                <a href="#" id="hideAdvanced" class="hidden" onClick={this.hideAdvanced}>- Hide Advanced</a>
                <ul id="advancedItems">
                    {html}
                </ul>
            </div>);
    }
});