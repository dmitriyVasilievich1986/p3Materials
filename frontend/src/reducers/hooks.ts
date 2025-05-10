import {
  CraftSimpleType,
  FloorSimpleType,
  MaterialSimpleType,
  ShadowSimpleType,
} from "./types";

import { setFloors, setShadows } from "./shadowSlice";
import { useDispatch, useSelector } from "react-redux";

import { APIUrls } from "../constants";
import { RootState } from "../store";

import axios from "axios";
import { setCrafts } from "./craftSlice";
import { setMaterials } from "./materialSlice";

export function useShadowCaller() {
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

export function useFloorsCaller() {
  const dispatch = useDispatch();

  const floors = useSelector((state: RootState) => state.shadow.floors);

  const fillFloors = () => {
    if (floors.length > 0) {
      return;
    }
    axios
      .get(APIUrls.floorSimple.url)
      .then((response: { data: { result: FloorSimpleType[] } }) => {
        dispatch(setFloors(response.data.result));
      });
  };

  return [floors, fillFloors] as const;
}

export function useMaterialCaller() {
  const dispatch = useDispatch();

  const materials = useSelector((state: RootState) => state.material.materials);

  const fillMaterials = () => {
    if (materials.length > 0) {
      return;
    }
    axios
      .get(APIUrls.materialSimple.url)
      .then((response: { data: { result: MaterialSimpleType[] } }) => {
        dispatch(setMaterials(response.data.result));
      });
  };

  return [materials, fillMaterials] as const;
}

export function useCraftCaller() {
  const dispatch = useDispatch();

  const crafts = useSelector((state: RootState) => state.craft.crafts);

  const fillCrafts = () => {
    if (crafts.length > 0) {
      return;
    }
    axios
      .get(APIUrls.craftSimple.url)
      .then((response: { data: { result: CraftSimpleType[] } }) => {
        dispatch(setCrafts(response.data.result));
      });
  };

  return [crafts, fillCrafts] as const;
}
