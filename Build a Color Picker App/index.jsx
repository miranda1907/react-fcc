const { useState } = React;

export const ColorPicker = () => {
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  const handleColor=(e)=> {
    setBackgroundColor( e.target.value,
    );
;  }

  return <div id="color-picker-container" style={{backgroundColor: backgroundColor}}>
  
  <input onChange={handleColor}id="color-input" type="color" value={backgroundColor}></input>
  
  </div>
};
