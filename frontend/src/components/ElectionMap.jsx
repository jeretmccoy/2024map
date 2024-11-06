import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import usMapData from "./us-states.json"; // Ensure this points to your GeoJSON file
import statesData from "./statesData.json"; // Import initial state points and colors
import OutcomeBarChart from "./OutcomeBarChart";

const ElectionMap = () => {
  // Initialize state points and colors
  const [stateColors, setStateColors] = useState(statesData);

  // Track points for each team
  const [teamPoints, setTeamPoints] = useState({ red: 0, blue: 0, grey: 0 });

  // Calculate initial points
  useEffect(() => {
    const initialPoints = { red: 0, blue: 0, grey: 0 };
    Object.values(statesData).forEach((state) => {
      initialPoints[state.color] += state.points;
    });
    setTeamPoints(initialPoints);
  }, []);

  function generateBinaryLists(n) {
    const result = [];
    
    function helper(currentList) {
      if (currentList.length === n) {
        result.push([...currentList]);
        return;
      }
      // Add 0 and 1 to the current list and recurse
      currentList.push(0);
      helper(currentList);
      currentList.pop();
      currentList.push(1);
      helper(currentList);
      currentList.pop();
    }
    
    helper([]);
    return result;
  }
  function dotProduct(x, y) {
    if (x.length !== y.length) {
      throw new Error("Vectors must be of the same length");
    }
  
    return x.reduce((sum, xi, i) => sum + xi * y[i], 0);
  }

  const odds = () => {
    const totals = { red: 0, blue: 0 };
    const pts = [];
    Object.values(stateColors).forEach(state => {
      if (state.color === "red") {
        totals.red += state.points;
      } else if (state.color === "blue") {
        totals.blue += state.points;
      }
      else if (state.color === 'grey'){
         pts.push(state.points);
      }
    });
    console.log(pts);
    if (pts.length > 10) {
      return totals;
    }
    const bins = generateBinaryLists(pts.length);
    console.log(bins);

    const outcomes = [];
    for (const bin of bins) {
      outcomes.push(dotProduct(bin, pts) + totals.red);
    } 

    console.log(outcomes)

    return outcomes;

  }

  // Function to toggle state color and update points
  const toggleColor = (stateCode) => {
    // Check if the stateCode exists in stateColors
    if (!stateColors[stateCode]) {
      console.error(`State code ${stateCode} not found in statesData.`);
      return;
    }

    const colors = ["red", "blue", "grey"];
    const currentColor = stateColors[stateCode].color;
    const newColor = colors[(colors.indexOf(currentColor) + 1) % colors.length];
    
    // Update state color
    setStateColors((prevColors) => ({
      ...prevColors,
      [stateCode]: { ...prevColors[stateCode], color: newColor },
    }));

    // Update team points
    setTeamPoints((prevPoints) => ({
      ...prevPoints,
      [currentColor]: prevPoints[currentColor] - stateColors[stateCode].points,
      [newColor]: prevPoints[newColor] + stateColors[stateCode].points,
    }));
  };

  // Helper function to get color based on state color property
  const getColor = (color) => {
    if (color === "red") return "#ff0000";
    if (color === "blue") return "#0000ff";
    return "#cccccc"; // grey
  };
  const teamTotals = odds();
  return (
    <div>
      <h1>US Presidential Election Map</h1>
      <div>
        <p>Trump: {teamPoints.red}</p>
        <p>Kamalah: {teamPoints.blue}</p>
        <p>Grey (Up for Grabs): {teamPoints.grey}</p>
        <p> Odds of Trump Win:  {odds().filter(value => value > 270).length} / {odds().length} = {odds().filter(value => value > 270).length/ odds().length}</p>
        <OutcomeBarChart outcomes={odds()} />
      </div>
      <ComposableMap projection="geoAlbersUsa" width={800} height={500}>
        <Geographies geography={usMapData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateCode = geo.properties.NAME; // Adjust this if your GeoJSON uses a different property
              
              // Get color from stateColors or default to grey if undefined
              const color = stateColors[stateCode]?.color || "grey";
              
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={getColor(color)}
                  onClick={() => toggleColor(stateCode)}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", cursor: "pointer" },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default ElectionMap;
