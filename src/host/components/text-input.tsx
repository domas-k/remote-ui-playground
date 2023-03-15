import React, {forwardRef} from 'react';

interface Props {
  id: string
  label?: string
}

export const TextInput = forwardRef<HTMLInputElement, Props>(
  ({id, label}, ref) => {
    return (
      <div className="TextField">
        <label className="Label" htmlFor={id}>
          {label}
        </label>
        <div className="InputContainer">
          <input id={id} className="Input" type="text" ref={ref} />
        </div>
      </div>
    );
  },
);
