// LIBRARIES
import { nanoid } from "nanoid";
// import { FaPenSquare, FaWindowClose } from "react-icons/fa";

// TYPES
type FilterGridProps<T> = {
  dataTitlePlural: string;
  data: T[];
  refreshData: () => void;
  updateData: (updateArg: T) => void;
  deleteData: (deleteArg: T) => void;
  disableAllSort?: boolean | undefined;
  disableAllSearch?: boolean | undefined;
  gridCols?: number | undefined;
  columns: {
    dataKey: string;
    title: string;
    gridSpan?: number | undefined;
    disableSort?: boolean | undefined;
    disableSearch?: boolean | undefined;
    type?: "boolean" | "date" | "text" | undefined;
    justify?: "start" | "center" | "end" | undefined;
    textSize?:
      | "xs"
      | "sm"
      | "base"
      | "lg"
      | "xl"
      | "2xl"
      | "3xl"
      | "4xl"
      | "5xl"
      | "6xl"
      | undefined;
    titleSize?:
      | "xs"
      | "sm"
      | "base"
      | "lg"
      | "xl"
      | "2xl"
      | "3xl"
      | "4xl"
      | "5xl"
      | "6xl"
      | undefined;
  }[];
};

// COMPONENT
const FilterGrid = <T,>({
  dataTitlePlural,
  data,
  refreshData,
  updateData,
  deleteData,
  disableAllSort,
  disableAllSearch,
  gridCols = 12,
  columns,
}: FilterGridProps<T>) => {
  // HELPERS
  const countTableColumns = () => {
    let count = 0;
    columns.forEach((column) => {
      if (column.gridSpan) count += column.gridSpan;
      else count++;
    });
    return count;
  };
  if (!data)
    return (
      <div className="text-lg text-base-content">{`No ${dataTitlePlural} Found :'(`}</div>
    );
    return (
      <div className={`grid grid-cols-${gridCols} items-center gap-4`}>
        {data?.map((row) => {
          return <p key={nanoid()}>TEST ROW</p>;
        })}
      </div>
    );
};

export default FilterGrid;
