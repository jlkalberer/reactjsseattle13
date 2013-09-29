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
        var total = 0;
        var html = [];
        for (var key in this.props.score) {
            var temp = this.props.score[key];
            var imgPath = 'img/'+ key.replace(/\s/g, '%20')+'.svg';

            html.push(<li><img src={imgPath} /><h2>{key} Score<span htmlClass="score">{temp}</span></h2></li>);
            debugger;
            total += temp;
        }

        return (
            <aside>
                <form id="searchForm" onSubmit={this.handleSubmit}>
                    <input type="search" placeholder="Enter location" />
                    <Locations includeLocations={this.props.includeLocations} />
                </form>
                <div id="score">
                    <ul>
                        {html}
                        <li><h1>Total Score<span>{total}</span></h1></li>
                    </ul>
                </div>
            </aside>
            );
    }
});