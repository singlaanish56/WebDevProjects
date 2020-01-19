//this is a super reusable code for any autocomplete work
//it is not limited to any one api
//Can run several times in the same project
//renders a dropdown autocomplete option menu
//root : the div to add the html to
//renderOption:user customized options from index.js
//onOptionSelect:What to do when the user selects an option
//inputValue:return what to update the input value to
//fetchData:the apiand paramter call to the api

const createAutocomplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {
    // the dropdown is created on the fly inside of pre-creating
    //  it in the html file 
    // this makes the code easier to reuse
    root.innerHTML = `
    <label><b>Search for a Item</b></label>
        <input class="input"/>
            <div class="dropdown">
                 <div class="dropdown-menu">
                    <div class="dropdown-content results">
                     </div>
                </div>
            </div>
    `;

    //the option anchor tag is created for each item searched and added to the dropdown created above
    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');
    const oninput = async event => {
        const items = await fetchData(event.target.value);
        if (!items.length) { //if no results no dropdown
            dropdown.classList.remove('is-active');
            return;
        }
        resultsWrapper.innerHTML = '';
        dropdown.classList.add('is-active');
        for (let item of items) {
            const option = document.createElement('a');

            option.classList.add('dropdown-item');
            option.innerHTML = renderOption(item); //options are customized and not limited to single use/api
            //reading the option that the users selects
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = inputValue(item);
                //to render all info abt the item 
                //a follow up request with item_id has to be made
                onOptionSelect(item);
            });
            resultsWrapper.appendChild(option);
        }
    };
    //debounce reduces the number of api calls by waiting for
    //the user to finish/stop typing
    //this is done because the no of calls are limited to 1000/day
    input.addEventListener('input', debounce(oninput, 500));

    //check for if the click is outside to the dropdown and closing it
    //this happens by checking if the click event resides inside 
    //the root(autocomplete) or not
    document.addEventListener('click', event => {
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active');
        }
    });
};