// Distance
const KilometerToMile = (kilometer) => {
    return Math.round(kilometer * 0.62137 * 1000) / 1000;
  };
  
  const MileToKilometer = (mile) => {
    return Math.round((mile / 0.62137) * 1000) / 1000;
  };
  
  // Temperature
  const CelsiusToFahrenheit = (celsius) => {
    return Math.round(celsius * (9 / 5) + 32);
  };
  
  const FahrenheitToCelsius = (fahrenheit) => {
    return Math.round((fahrenheit - 32) * (5 / 9));
  };
  
  // Weight
  const PoundsToKilograms = (pounds) => {
    return Math.round(pounds * 0.45359237 * 100) / 100;
  };
  
  const KilogramsToPounds = (kilograms) => {
    return Math.round(kilograms * 2.205 * 100) / 100;
  };
  
  // Higher-Order Function for Unit Conversion
  const HigherOrderFunction = (fromUnit, toUnit) => {
    const conversions = {
      "km-mi": (val) => val * 0.62137,
      "mi-km": (val) => val / 0.62137,
      "c-f": (val) => (val * 9) / 5 + 32,
      "f-c": (val) => ((val - 32) * 5) / 9,
      "lb-kg": (val) => val * 0.45359237,
      "kg-lb": (val) => val / 0.45359237,
    };
  
    return (values) => {
      if (Array.isArray(values)) {
        return values.map(
          (v) => Math.round(conversions[`${fromUnit}-${toUnit}`](v) * 1000) / 1000
        );
      }
      return (
        Math.round(conversions[`${fromUnit}-${toUnit}`](values) * 1000) / 1000
      );
    };
  };
  
  const convertKmToMi = HigherOrderFunction("km", "mi");
  console.log(convertKmToMi(5)); // Output: 3.107
  console.log(convertKmToMi([5, 10])); // Output: [3.107, 6.214]
  
  // Function to load navigation dynamically
  document.addEventListener("DOMContentLoaded", () => {
    fetch("../nav.html")
      .then((response) => response.text())
      .then((html) => {
        document.getElementById("nav-container").innerHTML = html;
      })
      .catch((error) => console.error("Error loading navigation:", error));
  });
  
  // Higher-Order Function that returns a conversion function
  const getConversionFunction = (fromUnit, toUnit) => {
    const conversions = {
      "miles-km": (val) => val * 1.60934,
      "km-miles": (val) => val / 1.60934,
      "lb-kg": (val) => val * 0.453592,
      "kg-lb": (val) => val / 0.453592,
      "c-f": (val) => (val * 9) / 5 + 32,
      "f-c": (val) => ((val - 32) * 5) / 9,
    };
  
    return conversions[`${fromUnit}-${toUnit}`] || (() => "Invalid Conversion");
  };
  
  // Function to update the conversion result
  document.addEventListener("DOMContentLoaded", () => {
    const inputBox = document.getElementById("inputBox");
    const outputBox = document.getElementById("outputBox");
    const fromUnit = document.getElementById("fromUnit");
    const toUnit = document.getElementById("toUnit");
  
    const updateConversion = () => {
      if (fromUnit.value === toUnit.value) {
        outputBox.value = inputBox.value;
        return;
      }
  
      const convert = getConversionFunction(fromUnit.value, toUnit.value);
  
      if (!isNaN(inputBox.value) && inputBox.value !== "") {
        outputBox.value =
          Math.round(convert(parseFloat(inputBox.value)) * 1000) / 1000;
      } else {
        outputBox.value = "";
      }
    };
  
    inputBox.addEventListener("input", updateConversion);
    fromUnit.addEventListener("change", updateConversion);
    toUnit.addEventListener("change", updateConversion);
  });
