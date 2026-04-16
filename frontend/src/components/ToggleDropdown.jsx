import { useState } from 'react';
import {CaretDownIcon, CaretUpIcon} from '@phosphor-icons/react';

const Dropdown = ({ options, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className='bg-orange-300 rounded font-medium'>
      <button onClick={toggleDropdown} className='flex items-center justify-center py-1 px-2'>
        {selected ? selected : "Month"} 
        {!isOpen ? <CaretDownIcon size={24} className='ml-2'/> : <CaretUpIcon size={24} className='ml-2'/>}
      </button>
      <div className='mt-1 bg-orange-200'>
        {isOpen && (
          <ul className="cursor-default space-y-1 py-2">
            {options.map((option, index) => (
              <li key={index} onClick={() => {
                  onUpdate(option)
                  handleOptionClick(option)
                }}
                className='px-3'>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;