/** @jsx React.DOM */
var Sidebar = 
React.createClass({
    handleSubmit : function (event) {
        // call api here
        event.preventDefault();

        var self = this;
        var selected = $.makeArray($('#searchForm input[type="checkbox"]:checked').map(function() { return $(this).val(); }));
        var searchTerm = $("#searchForm input[type='search']").val();

        this.props.search(searchTerm, selected, function (response) {
            self.props.setLocation({ x : response.latitude, y : response.longitude})
        });

        return false;
    },
    render : function () {
        return (
            <aside>
                <form id="searchForm" onSubmit={this.handleSubmit}>
                    <input type="search" placeholder="Enter location" />
                    <Locations includeLocations={this.props.includeLocations} />
                </form>
            </aside>
            );
    }
});