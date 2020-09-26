console.log("Stuff")

// Get the reference to the button
var fltrBtn = d3.select("#filter-btn");
fltrBtn.on("click", getTable);

// Get country and unique contries
var country = data.map(sighting => sighting.country);
var uniqueCountry = country.filter((x, i, a) => a.indexOf(x) == i);

// Sort
uniqueCountry.sort();

// Add the countries to the list
addToList("#country", uniqueCountry);

// Find unique shapes
var shape = data.map(sighting => sighting.shape);
var uniqueShape = shape.filter((x, i, a) => a.indexOf(x) == i);

// Sort
uniqueShape.sort();

// Add shapes to the list
addToList("#shape", uniqueShape);

// Load data on page refresh
getTable();

// Add to list function
function addToList(id, list) {
	
    // Get the dropdown
    var dropdown = d3.select(id).node();

    // Loop through the list
    for (i=0; i<list.length; i++) {
        var option = d3.create("option").node();
        option.text = list[i];
        option.value = list[i]
        dropdown.add(option, i+1);   
    }
}

// Get table function
function getTable() {
 
    filteredData = data;

    // Get tbody
    var tbody = d3.select("tbody");
    tbody.html("");

    // Filter on date
    var inDate = d3.select("#datetime").property("value");
    if (inDate != ""){
        var filteredData = filteredData.filter(sighting => sighting.datetime === inDate);
    }
    
    // Filter on city
    var inCity = d3.select("#city").property("value").toLowerCase();
    if (inCity != ""){
        var filteredData = filteredData.filter(sighting => sighting.city === inCity);
    }

     // Filter on state
     var inState = d3.select("#state").property("value").toLowerCase();
     if (inState != ""){
         var filteredData = filteredData.filter(sighting => sighting.state === inState);
     }

    // Filter on county
    var inCountry = d3.select("#country").property("value");

    if (inCountry != "All"){
        var filteredData = filteredData.filter(sighting => sighting.country === inCountry);
    }

    // Filter on shape
    var inShape = d3.select("#shape").property("value");
    if (inShape != "All"){
        var filteredData = filteredData.filter(sighting => sighting.shape === inShape);
    }

    // Add to the table on page
    filteredData.forEach((sighting) => {
        var row = tbody.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });

}