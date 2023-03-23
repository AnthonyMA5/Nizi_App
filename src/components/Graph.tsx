/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {VictoryChart, VictoryLine, VictoryAxis, VictoryArea} from 'victory-native';

type Filter = 'hoy' | 'semanaActual' | 'mesActual' | 'todo';

const data = [
  {x: 1, y: 2},
  {x: 2, y: 3},
  {x: 3, y: 5},
  {x: 4, y: 4},
  {x: 5, y: 7},
  {x: 6, y: 6},
  {x: 7, y: 8},
  {x: 8, y: 9},
  {x: 9, y: 10},
  {x: 10, y: 12},
  {x: 11, y: 11},
  {x: 12, y: 14},
];


const getFilteredData = (filter: Filter) => {
  switch (filter) {
    case 'hoy':
      return data.filter(d => d.x === 12);
    case 'semanaActual':
      return data.filter(d => d.x >= 7 && d.x <= 12);
    case 'mesActual':
      return data.filter(d => d.x >= 1 && d.x <= 12);
    default:
      return data;
  }
};

const Graph = () => {

  const [filter, setFilter] = useState<Filter>('todo');
  const [selectedData, setSelectedData] = useState<any[]>([]);

  const handleFilterPress = (newFilter: Filter) => {
    setFilter(newFilter);
    setSelectedData([]);
  };

  const handleDataPointPress = (datum: any) => {
    setSelectedData([datum]);
  };

  const filteredData = getFilteredData(filter);

  return (
    <View style={styles.container}>
      <VictoryChart>

        <VictoryLine
          interpolation="catmullRom"
          data={filteredData}
          style={{ data: { stroke: '#3FBFA0' } }}
          events={[
            {
              target: 'data',
              eventHandlers: {
                onPressIn: (_: any, {datum}: any) => [
                  {
                    target: 'data',
                    mutation: () => handleDataPointPress(datum),
                  },
                ],
              },
            },
          ]}
        />

        <VictoryArea
          data={filteredData}
          interpolation="catmullRom"
          x="x"
          y="y"
          style={{ data: { fill: '#F4FEF6' } }} // color de fondo
        />

        <VictoryAxis
          style={{
            axis: { stroke: 'transparent' }, // oculta la línea del eje X
            tickLabels: { color: 'transparent' }, // oculta las etiquetas del eje X
          }}
          tickFormat={() => ''} // establece la función de formato de tick en vacío
        />

        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: 'transparent' }, // oculta la línea del eje Y
            tickLabels: { color: 'transparent' }, // oculta las etiquetas del eje Y
          }}
          tickFormat={() => ''} // establece la función de formato de tick en vacío
        />

      </VictoryChart>

      <View style={styles.filterContainer}>

        <TouchableOpacity
          style={[ styles.filterButton, filter === 'hoy' && styles.filterButtonActive]}
          onPress={() => handleFilterPress('hoy')}>
          <Text style={[ styles.filterButtonText, filter === 'hoy' && styles.filterButtonTextActive]}>
            Hoy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[ styles.filterButton, filter === 'semanaActual' && styles.filterButtonActive]}
          onPress={() => handleFilterPress('semanaActual')}>
          <Text style={[styles.filterButtonText, filter === 'semanaActual' && styles.filterButtonTextActive]}>
            Semana
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[ styles.filterButton, filter === 'mesActual' && styles.filterButtonActive]}
          onPress={() => handleFilterPress('mesActual')}>
          <Text style={[ styles.filterButtonText, filter === 'mesActual' && styles.filterButtonTextActive]}>
            Mes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[ styles.filterButton, filter === 'todo' && styles.filterButtonActive]}
          onPress={() => handleFilterPress('todo')}>
          <Text style={[ styles.filterButtonText, filter === 'todo' && styles.filterButtonTextActive]}>
            Todo
          </Text>
        </TouchableOpacity>

      </View>

      {selectedData.length > 0 && (
        <View style={[ styles.selectedDataContainer, { left: selectedData[0]._x - 20 }]}>
          <Text style={styles.selectedDataText}>
            {selectedData[0]._x}, {selectedData[0]._y}
          </Text>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },


  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },

  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 40,
  },

  filterButtonActive: {
    backgroundColor: '#3FBFA0',
  },

  filterButtonText: {
    color: '#555555',
  },

  filterButtonTextActive: {
    color: '#FFF',
  },

  selectedDataContainer: {
    position: 'absolute',
    backgroundColor: '#3FBFA0',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  selectedDataText: {
    color: '#FFF',
  },

});

export default Graph;
