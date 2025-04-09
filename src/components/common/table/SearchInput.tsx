import { Input } from "@/components/ui/input";
import { ISearch } from "@/types/ui/searchInput";

const SearchInput = ({ value, onChange }: ISearch) => {
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search..."
    />
  );
};
export default SearchInput;
