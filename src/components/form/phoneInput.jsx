export default function PhoneInput({
  value, onChange
}) {
  return (
    <input type="tel" onChange={(e) => { onChange(e.target.value) }} value={value} />
  )
}