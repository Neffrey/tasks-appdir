// LIBRARIES
// import { FaPenSquare, FaWindowClose } from "react-icons/fa";
import {
  type UseTRPCQueryResult,
  type UseTRPCMutationResult,
} from "@trpc/react-query/shared";

// PROPS
type FilterGridProps = {
  dataTitle: string;
  data: any[];
  refresh: () => void;
  update: () => void;
  delete: () => void;
  
  // fetchQuery: UseTRPCQueryResult<unknown, unknown>;
  // updateMutation: UseTRPCMutationResult<unknown, unknown, any, unknown>;
  // deleteMutation: UseTRPCMutationResult<unknown, unknown, any, unknown>;
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
const FilterGrid = ({
  dataTitle,
  fetchQuery,
  updateMutation,
  deleteMutation,
  disableAllSort,
  disableAllSearch,
  gridCols = 12,
  columns,
}: FilterGridProps) => {
  const data = fetchQuery.data as [];

  // HELPERS
  const countTableColumns = () => {
    let count = 0;
    columns.forEach((column) => {
      if (column.gridSpan) count += column.gridSpan;
      else count++;
    });
    return count;
  };
  if (fetchQuery.isLoading || fetchQuery?.data === undefined)
    return (
      <div className="text-lg text-base-content">{`No ${dataTitle} Found :'(`}</div>
    );
  return (
    <div className={`grid grid-cols-${gridCols} items-center gap-4`}>
      {data.map((row) => {
        return <p key={row}>{row}</p>;
      })}
    </div>
  );
};

export default FilterGrid;
