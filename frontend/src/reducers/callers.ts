import { useDispatch, useSelector } from "react-redux";

import { APIUrls } from "../constants";
import { RootState } from "../store";
import { ShadowSimpleType } from "./types";

import axios from "axios";
import { setShadows } from "./shadowSlice";

export function shadowsCaller() {
  const dispatch = useDispatch();

  const shadows = useSelector((state: RootState) => state.shadow.shadows);

  const fillShadows = () => {
    if (shadows.length > 0) {
      return;
    }
    axios
      .get(APIUrls.shadowSimple.url)
      .then((response: { data: { result: ShadowSimpleType[] } }) => {
        dispatch(setShadows(response.data.result));
      });
  };

  return [shadows, fillShadows] as const;
}
