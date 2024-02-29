import React from "react";
class GammaStatistics extends React.Component {
  constructor(props) {
    super(props);

    this.dataset = [
      { Alcohol: 1, Ash: 2, Hue: 3, Magnesium: 4 },
      { Alcohol: 1, Ash: 3, Hue: 4, Magnesium: 5 },
      { Alcohol: 2, Ash: 4, Hue: 5, Magnesium: 6 },
      { Alcohol: 2, Ash: 5, Hue: 6, Magnesium: 7 },
    ];

    this.dataset = this.calculateGamma(this.dataset);
  }

  calculateGamma(data) {
    return data.map((item) => ({
      ...item,
      Gamma: (item.Ash * item.Hue) / item.Magnesium,
    }));
  }

  calculateMeanByClass() {
    const meanByClass = {};

    this.dataset.forEach((item) => {
      const alcoholClass = item.Alcohol;
      if (!meanByClass[alcoholClass]) {
        meanByClass[alcoholClass] = [];
      }
      meanByClass[alcoholClass].push(item.Gamma);
    });

    for (const alcoholClass in meanByClass) {
      const sum = meanByClass[alcoholClass].reduce(
        (acc, curr) => acc + curr,
        0
      );
      meanByClass[alcoholClass] = sum / meanByClass[alcoholClass].length;
    }

    return meanByClass;
  }

  calculateMedianByClass() {
    const medianByClass = {};

    this.dataset.forEach((item) => {
      const alcoholClass = item.Alcohol;
      if (!medianByClass[alcoholClass]) {
        medianByClass[alcoholClass] = [];
      }
      medianByClass[alcoholClass].push(item.Gamma);
    });

    for (const alcoholClass in medianByClass) {
      const sortedData = medianByClass[alcoholClass].sort((a, b) => a - b);
      const middle = Math.floor(sortedData.length / 2);
      if (sortedData.length % 2 === 0) {
        medianByClass[alcoholClass] =
          (sortedData[middle - 1] + sortedData[middle]) / 2;
      } else {
        medianByClass[alcoholClass] = sortedData[middle];
      }
    }

    return medianByClass;
  }

  calculateModeByClass() {
    const modeByClass = {};

    this.dataset.forEach((item) => {
      const alcoholClass = item.Alcohol;
      if (!modeByClass[alcoholClass]) {
        modeByClass[alcoholClass] = {};
      }
      modeByClass[alcoholClass][item.Gamma] =
        (modeByClass[alcoholClass][item.Gamma] || 0) + 1;
    });

    for (const alcoholClass in modeByClass) {
      let modeValue;
      let modeCount = 0;
      for (const value in modeByClass[alcoholClass]) {
        if (modeByClass[alcoholClass][value] > modeCount) {
          modeCount = modeByClass[alcoholClass][value];
          modeValue = value;
        }
      }
      modeByClass[alcoholClass] = parseFloat(modeValue);
    }

    return modeByClass;
  }

  render() {
    const meanByClass = this.calculateMeanByClass();
    const medianByClass = this.calculateMedianByClass();
    const modeByClass = this.calculateModeByClass();

    return (
      <table border="1">
        <thead>
          <tr>
            <th>Measure</th>
            {Object.keys(meanByClass).map((alcoholClass) => (
              <th key={alcoholClass}>Class {alcoholClass}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Gamma Mean</td>
            {Object.keys(meanByClass).map((alcoholClass) => (
              <td key={alcoholClass}>{meanByClass[alcoholClass]}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma Median</td>
            {Object.keys(medianByClass).map((alcoholClass) => (
              <td key={alcoholClass}>{medianByClass[alcoholClass]}</td>
            ))}
          </tr>
          <tr>
            <td>Gamma Mode</td>
            {Object.keys(modeByClass).map((alcoholClass) => (
              <td key={alcoholClass}>{modeByClass[alcoholClass]}</td>
            ))}
          </tr>
        </tbody>
      </table>
    );
  }
}

export default GammaStatistics;
