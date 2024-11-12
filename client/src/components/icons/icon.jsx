import { useMemo } from "react";
import IconAdd from "./iconAdd";
import IconExcel from "./iconExcel";
import IconList from "./iconList";
import IconPdf from "./iconPdf";
import IconReload from "./iconReload";
import IconSearch from "./iconSearch";
import IconX from "./iconX";
import IconUpDown from "./iconUpDown";
import IconDelete from "./iconDelete";
import IconEdit from "./iconEdit";
import IconEmpty from "./iconEmpty";
import IconPlusMinus from "./iconPlusMinus";
import IconPhotoAdd from "./iconPhotoAdd";
import IconArrowRight from "./iconArrowRight";
import IconFilter from "./iconFilter";
import IconCalendarToday from "./iconCalendarToday";
import IconCalendarConfig from "./iconCalendarConfig";
import IconCalendarAlways from "./iconCalendarAlways";

const Icon = ({ type }) => {
  const icons = useMemo(
    () => ({
      add: <IconAdd />,
      excel: <IconExcel />,
      list: <IconList />,
      pdf: <IconPdf />,
      reload: <IconReload />,
      search: <IconSearch />,
      x: <IconX />,
      up: <IconUpDown type="up" />,
      down: <IconUpDown type="down" />,
      left: <IconUpDown type="left" />,
      right: <IconUpDown type="right" />,
      delete: <IconDelete />,
      edit: <IconEdit />,
      empty: <IconEmpty />,
      plusminus: <IconPlusMinus />,
      photoadd: <IconPhotoAdd />,
      arrowright: <IconArrowRight />,
      filter: <IconFilter />,
      calendartoday: <IconCalendarToday />,
      calendarconfig: <IconCalendarConfig />,
      calendaralways: <IconCalendarAlways />,
    }),
    []
  );
  return icons[type];
};

export default Icon;
