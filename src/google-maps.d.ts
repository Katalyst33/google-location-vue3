import "@types/googlemaps";

declare module "googlemaps";
declare global {
  interface Window {
    google: typeof google;
  }
}
