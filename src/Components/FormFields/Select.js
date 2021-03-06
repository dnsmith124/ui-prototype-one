import React, {useState, useEffect} from "react";
import AnimateHeight from "react-animate-height";

const Select = ({label, subtitle, value, name, size, error, errorText, handleChange, noanimate, children}) => {

  value = (value) ? value : "";
  const [selectedItem, setSelectedItem] = useState(value);
  const [selectOpen, setSelectOpen] = useState(false);
  const [height, setHeight] = useState(0);
  let openClass = (selectOpen) ? 'open' : 'closed';
  let animateClass = (noanimate) ? 'no-animate' : 'animate';

  size = (size) ? size : 's';

  handleChange = (handleChange) ? handleChange : () => {};
  errorText = (errorText) ? errorText : "Error Message";

  const handleSelectClick = (e) => {
    e.preventDefault();
    setSelectOpen(!selectOpen);
  }

  const handleOptionClick = (e) => {
    e.preventDefault();
    setSelectedItem(e.target.dataset.value);
    setSelectOpen(!selectOpen);
    handleChange(e.target.dataset.value);
  }
  
  useEffect(() => {
    if(selectOpen === false)
      setHeight(0);
    else
      setHeight('auto');
  }, [selectOpen])

  return (
    <>
      <label className={`select ${size} ${animateClass}`} > 
        {label && <span className="label">{label}</span>}
        {subtitle && <span className="subtitle">{subtitle}</span>}
        <div className={`select-container ${openClass}`}>
          <select type="text" 
              name={name} 
              onMouseDown={handleSelectClick} 
              defaultValue={selectedItem} 
              // rand number key to re-render with correct default value on state change 
              key={`${Math.floor((Math.random() * 1000))}-min`}
              >
            <option value="" disabled hidden>{name}</option>
            {children}
          </select>
          <span className="icon" onMouseDown={handleSelectClick}></span>
          {
            noanimate && 
            <div className={`select-list ${openClass}`}>
              <div>
              {
              children.map((child, i) => {
                return(
                  <span onClick={handleOptionClick} key={i} className="option" data-value={child.props.value}>{child.props.children}</span>
                  );
                })
              }
              </div>
            </div>
          }
          {
            !noanimate &&
            <AnimateHeight className={`select-list ${openClass}`}
              duration={250}
              height={height}
            > {
              children.map((child, i) => {
                return(
                  <span onClick={handleOptionClick} key={i} className="option" data-value={child.props.value}>{child.props.children}</span>
                  );
                })
              }
            </AnimateHeight>
          }

        </div>
        {error && <span className="error-text">{errorText}</span>}
      </label>
    </>
  );
}

export default Select;