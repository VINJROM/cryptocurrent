import highchartsConfig from "./HighchartsConfig";
import react from "react";
import { TIle } from "../Shared/Tile";
import { AppContext } from "../App/AppProvider";
import ReactHighcharts from "react-highchart";

export default () => {
  return (
    <AppContext.Consumer>
      <Tile>
        <ReactHighcharts config={highchartsConfig()} />
      </Tile>
    </AppContext.Consumer>
  );
};
