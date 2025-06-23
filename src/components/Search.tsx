import type {JSX} from "react";

interface SearchProps{
    searchTerm: string;
    setSearchTerm(searchTerm: string):void;
}

function Search(searchProps: SearchProps): JSX.Element{

    return (
        <div className="search">
            <div>
                <img src="search.svg" alt="search"/>
                <input
                    className="search-input"
                    type="search"
                    value={searchProps.searchTerm}
                    onChange={event => {
                        searchProps.setSearchTerm(event.target.value);
                    }}
                    placeholder="Search through a search..." />
            </div>
        </div>
    )
}

export default Search;