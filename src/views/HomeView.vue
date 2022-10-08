<script setup lang="ts">
import MapIcon from "../components/icons/MapIcon.vue";

import axios from "axios";
import { ref } from "vue";
// import {} from "@types/google.maps";
import Spinner from "../components/icons/Spinner.vue";

const API_KEY = import.meta.env.VITE_GOOGLE_MAP_API;
const mapData = ref({
  address: "",
  error: "",
  isLoading: false,
});

const map = ref<HTMLElement | null>();
/* const GeolocationPositionError = ref([
  {
    code: 1,
    message:
      "	The acquisition of the geolocation information failed because the page didn't have the permission to do it.",
  },
  {
    code: 2,
    message: "Requested Position unavailable",
  },
  {
    code: 3,
    message: "Geolocation information was not obtained in the allowed time.",
  },
]); */

function locatorButtonPressed() {
  mapData.value.isLoading = true;
  // get the current location

  if (navigator.geolocation) {
    console.log(
      "Geolocation is supported!",
      navigator.geolocation.getCurrentPosition(
        (position) => {
          getAddressFromCoordinates(
            position.coords.latitude,
            position.coords.longitude
          );
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
        },
        (error) => {
          mapData.value.error = ` Locator is unable to find your address. <br/> Please type your address manually.`;
          mapData.value.isLoading = false;
        }
      )
    );
    // navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    mapData.value.isLoading = false;

    console.log("Geolocation is not supported by this browser.");
  }
}

// get address from coordinates

function getAddressFromCoordinates(lat: number, long: number) {
  axios
    .get(
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        lat +
        "," +
        long +
        `&key=${API_KEY}`
    )
    .then((response) => {
      if (response.data.error_message) {
        mapData.value.error = response.data.error_message;
        console.log(response.data.error_message);
        mapData.value.isLoading = false;
      } else {
        mapData.value.address = response.data.results[0].formatted_address;
        console.log("No results found");
      }
      console.log(response.data);
      mapData.value.isLoading = false;
    })
    .catch((error) => {
      mapData.value.error = error.message;
      mapData.value.isLoading = false;
    });
}

// get coordinates from address

interface googleMaps {
  maps: {
    Map: new (
      arg0: HTMLElement | null,
      arg1: { center: { lat: number; lng: number }; zoom: number }
    ) => any;
  };
}
/* function showLocationOnTheMap(latitude: number, longitude: number) {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: new google.maps.LatLng(latitude, longitude) as googleMaps,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });
} */
</script>

<!-- 55.83674197542296, -4.510805172428572 -->

<template>
  <main class="flex justify-center">
    <div class="max-w-lg py-14 border rounded-md">
      <div class="p-4">
        <div class="relative">
          <div
            v-show="mapData.error"
            class="bg-red-100 border text-sm py-2 my-2 border-red-500 rounded-md"
          >
            <p class="text-red-500 text-center" v-html="mapData.error"></p>
          </div>

          {{ mapData.isLoading }}
          <input
            v-model="mapData.address"
            class="border py-3 w-96 rounded-sm"
            placeholder="Enter your Address"
            type="text"
          />
          <button
            @click="locatorButtonPressed"
            class="bg-red-500 py-[17px] px-4 rounded-sm"
          >
            <Spinner v-if="mapData.isLoading" />

            <MapIcon v-if="!mapData.isLoading" />
          </button>
        </div>
        <button
          @click="
            getAddressFromCoordinates(55.83674197542296, -4.510805172428572)
          "
          class="bg-red-500 text-white p-2 px-4 my-4"
        >
          Go
        </button>
        <div class="bg-red-500 p-10">
          <Spinner v-if="mapData.isLoading" />
        </div>
      </div>

      <div id="map">Map area</div>
    </div>
  </main>
</template>
