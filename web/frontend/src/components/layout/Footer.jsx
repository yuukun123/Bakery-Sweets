import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="Footer_footer_contain">
        <div className="footer_section">
          <h3 className="Footer_footer_title">INTRODUCE</h3>
          <ul>
            <li><button className="Foot_footer_list">Ve Chung Toi</button></li>
            <li><button className="Foot_footer_list">Thoa Thuan Su Dung</button></li>
            <li><button className="Foot_footer_list">Chinh Sach Bao Mat</button></li>
          </ul>
        </div>
        <div className="footer_section">
          <h3 className="Footer_footer_title">CORNER FOOD</h3>
          <ul>
            <li><button className="Foot_footer_list">Mousse</button></li>
            <li><button className="Foot_footer_list">Croissant</button></li>
            <li><button className="Foot_footer_list">Drink</button></li>
          </ul>
        </div>
        <div className="footer_section">
          <h3 className="Footer_footer_title">SUPPORT</h3>
          <ul>
            <li><button className="Foot_footer_list">Giup Do</button></li>
            <li><button className="Foot_footer_list">Tuyen Dung</button></li>
            <li><button className="Foot_footer_list">FAQ</button></li>
          </ul>
        </div>
        <div className="footer_section">
          <div className="footer_logo">
            <img src="/assets/Img/Sweets1.png" alt="The Sweets" />
          </div>
          <ul className="Footer_connect_icon">
            <li><a href="#"><ion-icon name="logo-youtube"></ion-icon></a></li>
            <li><a href="#"><ion-icon name="logo-facebook"></ion-icon></a></li>
            <li><a href="#"><ion-icon name="logo-instagram"></ion-icon></a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom-line"></div>
      <div className="copy-right">
        <p>Copyright 2024 by The MEM Group | Cong ty TNHH The Sweets | Design by The MESince</p>
      </div>
    </div>
  );
}
