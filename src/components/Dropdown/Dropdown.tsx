import { useEffect, useRef, useState } from 'react';
import css from './Dropdown.module.css';
import DropdownIcon from '../../assets/icons/dropdown.svg?react';
import DropupIcon from '../../assets/icons/dropup.svg?react';

interface DropdownProps {
  placeholder: string;
  options: string[];
  label: string;
  textBefore?: string;
  className?: string;
  classHeight?: string;
  value?: string;
  onChange: (value: string) => void;
}

const Dropdown = ({
  placeholder,
  options,
  label,
  textBefore,
  className,
  classHeight,
  value,
  onChange,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value || null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`${css.dropdown} ${className}`} ref={dropdownRef}>
      <span className={css.label}>{label}</span>
      <button className={css.dropdownButton} type="button" onClick={handleToggle}>
        {textBefore && value && <>{textBefore}</>}
        {value || placeholder}
        {isOpen ? <DropupIcon /> : <DropdownIcon />}
      </button>

      {isOpen && (
        <div className={css.dropdownListWrapper}>
          <ul className={`${css.dropdownList} ${classHeight}`}>
            {options.map((option) => (
              <li
                key={option}
                onClick={() => {
                  handleSelect(option);
                }}
                className={`${css.dropdownItem} ${selectedOption === option ? css.selected : ''}`}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
