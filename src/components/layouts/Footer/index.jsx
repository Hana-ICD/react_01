const Footer = () => {
  const year = new Date();
  return (
    <footer>
      <div className="container">
        <p>Copy right {year.getFullYear()}</p>
      </div>
    </footer>
  );
}
export default Footer;