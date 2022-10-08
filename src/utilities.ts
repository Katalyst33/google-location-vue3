export function LoadGoogleMapFunction() {
  const input = document.getElementById(
    "autocompleteInput"
  ) as HTMLInputElement;
  var autocomplete = new google.maps.places.Autocomplete(input, {
    bounds: new google.maps.LatLngBounds(
      new google.maps.LatLng(45.4215296, -75.6971931)
    ),
  });

  console.log("Loading App", document.getElementById("autocompleteInput"));
}
