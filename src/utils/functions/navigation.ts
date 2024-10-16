import { NavigateFunction } from "react-router-dom";
import { IBuildingDetails } from "../../interfaces/building";

export const navigateToDetails = (
  navigate: NavigateFunction,
  args: IBuildingDetails
) => {
  navigate("/detail", {
    state: args,
  });
};
