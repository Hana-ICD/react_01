
export default function CountrySelect({
  value,
  onChange,
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="JP">Japan</option>
      <option value="VN">Vietnam</option>
      <option value="US">USA</option>
    </select>    
  );
}