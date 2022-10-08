export function LoadGoogleMapFunction() {
  const input = document.getElementById(
    "autocompleteInput"
  ) as HTMLInputElement;
  var autocomplete = new google.maps.places.Autocomplete(input, {
    bounds: new google.maps.LatLngBounds(
      new google.maps.LatLng(45.4215296, -75.6971931)
    ),
  });

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace() as any;
    console.log(place.geometry.location.lat());
    showLocationOnTheMap(
      place.geometry.location.lat(),
      place.geometry.location.lng()
    );
  });

  console.log("Loading App", document.getElementById("autocompleteInput"));
}

function showLocationOnTheMap(latitude: number, longitude: number) {
  var mapArea = document.getElementById("mapArea") as HTMLInputElement;

  // Show & center the Map based oon
  var map = new google.maps.Map(mapArea, {
    zoom: 15,
    center: new google.maps.LatLng(latitude, longitude),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });

  new google.maps.Marker({
    position: new google.maps.LatLng(latitude, longitude),
    map: map,
  });
  console.log("showLocationOnTheMap", mapArea);
}
