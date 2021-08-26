import React, {useEffect, useState} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import SearchBar from './searchbar';

const SearchWithSuggestions = ({
    optimizedFetch,
    matchingStocks
}) => {
    // state to hold value which user enters
    const [inputValue, setInputValue] = useState('');

    // state to hold value which user selects
    const [value, setValue] = useState('');

    // state to control the suggestions panel
    const [openSuggestion, setOpenSuggestion] = useState(false);

    // Fires when user selects one of the suggestions.
    const handleSelection = (event, selectedValue) => {
        console.log('selected->', selectedValue);
        setValue(selectedValue);
    };

    // Fires when user doesn't select any suggested option but 
    // go ahead and searches manually by clicking on search button.
    const handleManualSearch = () => {
        console.log('search with-> ', inputValue);
    };

    // takes care of input change as user types in.
    const handleInputChange = (event, newValue) => {
        setInputValue(newValue);
        if (newValue) {
            optimizedFetch(newValue);
        }
    };

    // Show the suggestions once we have the data
    useEffect(() => {
        if (inputValue && matchingStocks && matchingStocks.length > 0) {
            setOpenSuggestion(true);
        } else {
            setOpenSuggestion(false);
        }
    }, [matchingStocks, inputValue]);

    // Format the response data for suggestion panel.
    const getMatchingStocks = () => {
        if (matchingStocks && matchingStocks.length > 0) {
            return matchingStocks.map((option) => {
                return option['1. symbol']
            });
        }
        return [];
    };

    return (
        <Autocomplete
        freeSolo
        autoComplete
        blurOnSelect
        open={openSuggestion}
        inputValue={inputValue}
        onInputChange={handleInputChange}
        onChange={handleSelection}
        id="autocomplete"
        disableClearable
        options={getMatchingStocks()}
        renderInput={(params) => (
          <SearchBar
            params={params}
            searchInput={inputValue}
            handleSearch={handleManualSearch}
          />
        )}
      />
    );
};

SearchWithSuggestions.propTypes = {
    optimizedFetch: PropTypes.func.isRequired,
    matchingStocks: PropTypes.arrayOf(PropTypes.shape).isRequired
};

export default SearchWithSuggestions;