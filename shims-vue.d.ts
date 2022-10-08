declare var google: {
  maps: {
    Map: new (
      arg0: HTMLElement | null,
      arg1: { center: { lat: number; lng: number }; zoom: number }
    ) => any;
  };
};
