/** @jsx React.DOM */
var Map = 
React.createClass({
    componentDidMount: function(node) {
        var map = new Microsoft.Maps.Map(node, {credentials: this.props.apiKey, showDashboard: false }),
            searchManager;

        function createSearchManager() {
            if (searchManager) 
            {
                return;
            }

            map.addComponent('searchManager', new Microsoft.Maps.Search.SearchManager(map)); 
            searchManager = map.getComponent('searchManager'); 
        }

        function addTrafficLayer () {
            trafficLayer = new Microsoft.Maps.Traffic.TrafficLayer(map); 
    
            // show the traffic Layer 
            trafficLayer.show();
        } 

        map.setView({ zoom: 10, center: new Microsoft.Maps.Location(40.73, -73.98) })

        Microsoft.Maps.loadModule('Microsoft.Maps.Traffic', { callback: addTrafficLayer });
        Microsoft.Maps.loadModule('Microsoft.Maps.Search', { callback: createSearchManager })
        
        this.map = map;
    },
    render : function () {
        return (<div />);
    }
});    