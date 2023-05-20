import { Dispatch, SetStateAction } from "react";
import { IStatistics } from "../interfaces/layouts.interface";

export type navBarProps = {
  title: string;
};

export type nextUIModalProps = {
  setVisible: Dispatch<SetStateAction<boolean>>;
  bindings: {
    open: boolean;
    onClose: () => void;
  };
};

export type dashboardProps = {
  statistics: IStatistics;
};
