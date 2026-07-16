import { PatternFormat } from "react-number-format"

function PhoneInput({value, format, placeholder, onchange, className}) {    
  return (
    <PatternFormat
      className={className}
      value={value}
      format={format}
      allowEmptyFormatting={false}
      placeholder={placeholder}
      onValueChange={(values) => {
        onchange(values)
      }}
    />
  )
}
export default PhoneInput;