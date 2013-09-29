/** @jsx React.DOM */
var Map = 
React.createClass({                                         
    createHeatMap : function(locations, map) {
        var mergeLocations = new Array(), finalLocations = new Array();
        var mapper = 
        {
            'Fire Stations':{'radius':200,'intensity':0.8},
            'Hospitals':{'radius':200,'intensity':0.7},
            'Police Stations':{'radius':200,'intensity':0.7},
            'Bars':{'radius':100,'intensity':0.5},
            'eat+drink':{'radius':60,'intensity':0.5},
            'Schools':{'radius':60,'intensity':0.5},
        };
        $.each(locations, function(i) {
            console.log(i);
            var settings = mapper[locations[i].type];
            $.each(locations[i].data, function(y) {
                locations[i].data[y].radius = settings.radius;
                locations[i].data[y].intensity = settings.intensity;
            });
            mergeLocations.push(locations[i].data);
        });
        finalLocations = finalLocations.concat.apply(finalLocations, mergeLocations);  //Flatten array
        Microsoft.Maps.loadModule("HeatMapModule", { callback: function() {
            // Create a basic heatmap from an array of locations
            heatmapLayer = new HeatMapLayer(map, finalLocations);
        }});
    },
    search : function(where, what, index) {
        var deferred = new $.Deferred();
        var searchRequest = { 
            what: what, 
            where: where, 
            count: 20, 
            startIndex: index, 
            callback: function (searchResponse) {
                var items = searchResponse.searchResults.map(function (response) {
                    response.location.label = response.name;
                    return response.location;
                });

                var location = searchResponse.searchRegion.explicitLocation.location;

                deferred.resolve({ "type" : what, "data" : items, "locationCenter" : location });
            },
            errorCallback : function (error) {
                console.log(error);
            }
        };
        
        var searchManager = new Microsoft.Maps.Search.SearchManager(this.map)
        searchManager.search(searchRequest);

        return deferred.promise();
    },
    multiSearch : function (where, itemsToSearch, callback) {
        var self = this;
        
        var searchArray = [];
        for (var i = 0; i < 3; i += 1) {
            searchArray = searchArray.concat(itemsToSearch.map(function (item) {
                    return self.search(where, item, i);            
                }));
        }

        $.when.apply($, searchArray).done(function (firstResult) {
            if (callback) {
                callback(firstResult.locationCenter);
            }

            self.createHeatMap(arguments, self.map);

            $.each(arguments, function () {
                $.each(this.data, function () {
                    var pushpin = new Microsoft.Maps.Pushpin(this, { typeName : 'customPushpin', text : this.label });
                    self.map.entities.push(pushpin);
                });
            });
        });
    },
    componentDidMount: function(node) {
        Microsoft.Maps.registerModule("HeatMapModule", "js/vendor/heatmap.js");
        Microsoft.Maps.loadModule('Microsoft.Maps.Search');
        var map = new Microsoft.Maps.Map($(node).find(".map").get(0), {credentials: this.props.apiKey, showDashboard: true, enableSearchLogo: false });

        Microsoft.Maps.loadModule('Microsoft.Maps.Traffic', { callback: function() { trafficLayer = new Microsoft.Maps.Traffic.TrafficLayer(map); 
            // show the traffic Layer 
            trafficLayer.show();} 
        }); 

        this.map = map;
    },
    updateLocation : function (location) {
        var zoom = this.map.getTargetZoom();
        zoom = zoom < 15 ? 15 : zoom;
        
        this.map.setView({ zoom: zoom, center: new Microsoft.Maps.Location(location.x, location.y) });
    },
    render : function () {
        return (<div>
                    <Sidebar setLocation={this.updateLocation} includeLocations={this.props.includeLocations} search={this.multiSearch}/>
                    <div class="map">
                    </div>
                </div>);
    }
});    