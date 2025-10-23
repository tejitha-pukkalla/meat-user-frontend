import { useState } from "react";

export const useHeaderLocation = () => {
  const [location, setLocation] = useState("Seethammadhara, Visakhapatnam");
  const [isLoading, setIsLoading] = useState(false);

  const handleGetLocation = async (onComplete) => {
    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=069d026b831a4676abf7120c2db84474`
          );
          const data = await response.json();
          const props = data.features[0]?.properties;
          const trimmedAddress = {
            area: props?.district || props?.suburb || "",
            city: props?.city || props?.town || props?.village || "",
            state: props?.state || "",
            pincode: props?.postcode || "",
            country: props?.country || "",
          };
          const formatted = `${trimmedAddress.area}, ${trimmedAddress.city}, ${trimmedAddress.state} - ${trimmedAddress.pincode}, ${trimmedAddress.country}`;
          setLocation(formatted);
        } catch (error) {
          console.error("Geoapify error:", error);
          setLocation("Unable to fetch location");
        }
        setIsLoading(false);
        if (onComplete) onComplete();
      },
      (error) => {
        console.error("Location access denied:", error);
        alert("Location access denied");
        setIsLoading(false);
        if (onComplete) onComplete();
      }
    );
  };

  return { location, isLoading, handleGetLocation };
};
