import { Search } from "lucide-react";
import type { ChangeEvent } from "react";

interface SearchBarProps {
    showButton?: boolean;
    placeholder?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function SearchBar({
    showButton = false,
    placeholder = "",
    value,
    onChange,
}: SearchBarProps) {
    return (
        <search>
            <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
                <Search
                    className="absolute left-4 text-festiva-midnight-blue/45"
                    size={22}
                />
                <input
                    name="search" type="search"
                    value={value}
                    onChange={onChange}
                    className={`w-full bg-white rounded-[999px] py-4 pl-12 text-sm ${showButton ? "pr-24" : "pr-4"} border-solid border-festiva-midnight-blue/10 border shadow-sm shadow-festiva-midnight-blue/5`}
                    placeholder={placeholder}/>

                {showButton && (
                    <button className="absolute right-2 bg-festiva-electric-violet font-bold text-white px-4 py-2 rounded-[999px] text-sm" >
                        Buscar
                    </button>
                )}
            </form>
        </search>
    );
}

export default SearchBar;