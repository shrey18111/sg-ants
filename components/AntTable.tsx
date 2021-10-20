import * as React from "react";
import { Text } from "react-native";
import { DataTable } from "react-native-paper";
import { connect } from "react-redux";

import { Ant, AntStatus } from "./commontypes";
import { AppState } from "../store";

type Props = {
  ants: Ant[];
};

/**
 * Simple table that renders the ants from state.
 */
const AntTable = (props: Props) => {
  props.ants.sort((a: Ant, b: Ant) => {
    return b.likelihood - a.likelihood;
  });

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title style={{ flex: 2 }}>Ant Name</DataTable.Title>
        <DataTable.Title>Length</DataTable.Title>
        <DataTable.Title>Color</DataTable.Title>
        <DataTable.Title>Weight</DataTable.Title>
        <DataTable.Title>Status</DataTable.Title>
        <DataTable.Title numeric>Likelihood</DataTable.Title>
      </DataTable.Header>
      {props.ants.map((ant) => formatAntRow(ant))}
    </DataTable>
  );
};

const mapStateToProps = (state: AppState) => ({
  ants: Object.keys(state.ants.ants)
    .map((antName) => state.ants.ants[antName])
    .filter((ant) => ant.name),
});

export default connect(mapStateToProps)(AntTable);

/**
 * Renders an ant row for the table.
 */
function formatAntRow(ant: Ant) {
  return (
    <DataTable.Row key={ant.name}>
      <DataTable.Cell style={{ flex: 2 }}>{ant.name}</DataTable.Cell>
      <DataTable.Cell>{ant.length}</DataTable.Cell>
      <DataTable.Cell>{ant.color}</DataTable.Cell>
      <DataTable.Cell>{ant.weight}</DataTable.Cell>
      <DataTable.Cell>{formatColoredText(ant.status)}</DataTable.Cell>
      <DataTable.Cell numeric>{ant.likelihood || null}</DataTable.Cell>
    </DataTable.Row>
  );
}

/**
 * Renders a colored text (based on AntStatus).
 */
function formatColoredText(status: AntStatus) {
  let color = "grey";
  if (status === AntStatus.Calculated) {
    color = "green";
  } else if (status === AntStatus.InProgress) {
    color = "yellow";
  }

  return <Text style={{ backgroundColor: color }}>{status}</Text>;
}
