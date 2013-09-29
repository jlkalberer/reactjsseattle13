var api = (function() {
    Microsoft.Maps.loadModule('Microsoft.Maps.Search');

	
	function searchCallback(searchResponse, userData) {
		var items = searchResponse.map(function (response) {
			return response.location;
		});

    }

	function search(map, where, what) {
		var deferred = new $.Deferred();
		var searchRequest = { 
			what: what, 
			where: where, 
			count: 50, 
			startIndex: 0, 
			callback: function (searchResponse) {
				var items = searchResponse.map(function (response) {
					return response.location;
				});

				deferred.resolve({ "type" : what, "data" : items});
			}
		};
		
		var searchManager = new Microsoft.Maps.Search.SearchManager(map)
		searchManager.search(searchRequest);

		return deferred.promise();
	}

	function multiSearch (map, where, itemsToSearch, callback) {
		var searchArray = itemsToSearch.map(function (item) {
			return search(map, where, item);			
		});

		$.when.apply($, searchArray).done(function (values) {
        	alert("foo");
        });
	}

	return {
		"search" : multiSearch
	};
}());