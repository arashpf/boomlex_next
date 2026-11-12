import React from "react";

const CertificatesFooter = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",     // text on top, logo under it
        alignItems: "center",        // center horizontally
        justifyContent: "center",    // center vertically (inside this box)
        gap: "8px",                  // space between text and logo
      }}
    >
      <p>مجوز ها و نماد ها</p>

      <a
        referrerPolicy="origin"
        target="_blank"
        rel="noopener noreferrer"
        href="https://trustseal.enamad.ir/?id=8643104&Code=E75oZlE9yrIBhDQwCyGsEQSbf3zU0JP8"
      >
        <img
          referrerPolicy="origin"
          src="https://trustseal.enamad.ir/logo.aspx?id=8643104&Code=E75oZlE9yrIBhDQwCyGsEQSbf3zU0JP8"
          alt="نماد اعتماد الکترونیکی"
          style={{ cursor: "pointer" }}
          code="E75oZlE9yrIBhDQwCyGsEQSbf3zU0JP8"
        />
      </a>
    </div>
  );
};

export default CertificatesFooter;
