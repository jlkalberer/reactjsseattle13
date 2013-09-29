/** @jsx React.DOM */
var includeLocations = [
		{"id" : "firestation", "name" : "Fire Stations"}, 
		{"id" : "hospital", "name" : "Hospitals"},
		{"id" : "police", "name" : "Police Stations"}, 
		{"id" : "bar", "name" : "Bars"}, 
		{"id" : "school", "name" : "Schools"}
	];
React.renderComponent(
	<Map apiKey={apiKey} includeLocations={includeLocations}/>,
	document.getElementById('container')
);