import "./Footer.css";
function Footer({ name }) {
  return (
    <footer className="footer ">
      <p className=" footer__ content ">Developed by {name}</p>
      <p className="footer__content ">{new Date().getFullYear()}</p>
    </footer>
  );
}
export default Footer;
