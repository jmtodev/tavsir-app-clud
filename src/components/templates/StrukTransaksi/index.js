/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint_disable jsx_a11y/img_redundant_alt */
import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { LogoGetpay } from "../../molecules/LogoGetpay";
import { EpSuccessFilled } from "../../molecules/EpSuccessFilled";
import { IconFacebook } from "../../molecules/IconFacebook";
import { IconGlobe } from "../../molecules/IconGlobe";
import { IconInstagram } from "../../molecules/IconInstagram";

import getpayIcon from "../../../../public/img/vector-1.svg";
import icon from "../../../../public/img/image-1719.png";
import {
  convertCurrency,
  getCookie,
  validateCookiey,
} from "../../../services/utils";

const struk_transaksi = {
  backgroundColor: "white",
  display: "fixed",
  flexDirection: "row",
  justifyContent: "center",
  width: "400px",
  color: "#818181",
  fontFamily: "Inter, Helvetica",
  fontSize: "0.875rem",
  fontWeight: 400,
  height: "100%",
};

const LOGO_GETPAY_instance = {
  backgroundImage: "url(../../../../public/img/logo-getpay-4-1.png) !important",
  height: "26px !important",
  left: " 155px !important",
  position: "absolute !important",
  top: "38px !important",
};

const vector = {
  height: "1px",
  left: "26px",
  objectFit: "cover",
  position: "absolute",
  // top: '234px',
  // width: '40rem',
};

const ep_success_filled = {
  height: "20px !important",
  minWidth: "20px !important",
  position: " relative !important",
};

const overlap_group_wrapper = {
  position: "relative",
};

const overlap_group = {
  backgroundImage: "url(../../../../public/img/subtract.svg)",
  backgroundSize: "100% 100%",
};

const overlap = {
  position: "absolute",
};

const image = {
  height: "5.313rem",
  objectFit: "cover",
  position: "relative",
  top: "10rem",
  left: "18rem",
};

const tableWrapper = {
  tableLayout: "fixed",
  width: "100%",
  height: "100%",
  // marginBottom: '0px',
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
  marginTop: "15px",
  marginBottom: "15px",
  paddingLeft: "20px",
  paddingRight: "20px",
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    fontSize: "14px",
    color: "gray",
    marginTop: "15px",
    marginBottom: "15px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: "10px",
    // borderBottom: '1px solid #ddd',
    padding: "5px 0",
  },
  column: {
    flex: 1,
  },
  quantity: {
    flex: "0 0 fit-content",
    textAlign: "center",
  },
  price: {
    flex: "1",
    textAlign: "right",
  },
};

export const StrukTransaksi = ({ data }) => {
  return (
    <div style={struk_transaksi}>
      <table style={tableWrapper}>
        <th style={{ columnSpan: 4 }}>
          <LogoGetpay style={LOGO_GETPAY_instance} />
          <img style={vector} alt="vektor" src={getpayIcon} />
        </th>
      </table>

      <table style={tableWrapper}>
        <th>
          {data.tenant_name}
          <br />
          {data.rest_area_name}
        </th>
      </table>
      <table style={tableWrapper}>
        <tr style={{ columnSpan: 4 }}>
          <td style={{ textAlign: "left" }}>
            {validateCookiey("init") && JSON.parse(getCookie("init")).trans_id
              ? ""
              : `No Meja : ${data.nomor_name}`}
            {/* {`No Meja : ${data.nomor_name}`} */}
          </td>
        </tr>
      </table>
      <table style={tableWrapper}>
        <tr style={{ columnSpan: 2 }}>
          <td style={{ textAlign: "left" }}>{`Kasir: ${data.casheer_name}`}</td>
          <td style={{ textAlign: "right" }}>{`Self Order${
            data.consume_type === "dine_in"
              ? "/Dine In"
              : validateCookiey("init") &&
                JSON.parse(getCookie("init")).trans_id
              ? ""
              : "/Take Away"
          }`}</td>
        </tr>
        <tr style={{ columnSpan: 2 }}>
          <td style={{ textAlign: "left" }}>
            {`No Transaksi: ${data.order_id}`}
          </td>
          <td style={{ textAlign: "right" }}>
            {moment(data.created_at).format("DD MMMM YYYY HH:mm")}
          </td>
        </tr>
      </table>
      <div style={overlap_group_wrapper}>
        <div style={overlap_group}>
          <div style={overlap}>
            <img style={image} alt="Image" src={icon} />
          </div>
        </div>
      </div>

      <table style={tableWrapper}>
        <tr style={{ columnSpan: 6, width: "100%" }}>
          <td>
            <EpSuccessFilled style={ep_success_filled} />
          </td>
          <td style={{ textAlign: "left", width: "70%" }}>
            Transaksi Berhasil!
          </td>
          <td />
          <td />
          <td />
          <td />
        </tr>
      </table>
      {/* <table style={tableWrapper}>
        <th style={{ textAlign: "left" }}>Produk</th>
        <th style={{ width: "fit-content", textAlign: "center" }}>Qty</th>
        <th style={{ textAlign: "left" }}>Harga</th>
        <th style={{ textAlign: "right" }}>Total</th>

        {data &&
          data.detil &&
          data.detil.map((item) => (
            <>
              <tr>
                <td style={{ textAlign: "left" }}>{item.product_name}</td>
                <td
                  style={{ width: "fit-content", textAlign: "center" }}
                >{`${item.product_qty}x `}</td>
                <td style={{ textAlign: "left" }}>
                  {convertCurrency(item.product_base_price)}
                </td>
                <td style={{ textAlign: "right" }}>
                  {convertCurrency(item.product_total_price)}
                </td>
              </tr>
              {item.customize.length > 0 &&
                item.customize.map((item) => (
                  <tr>
                    <td style={{ textAlign: "left" }}>
                      {`${item.customize_name}: ${item.pilihan_name}`}
                    </td>
                    <td />
                    <td style={{ textAlign: "left" }}>
                      {convertCurrency(item.pilihan_price)}
                    </td>
                    <td />
                  </tr>
                ))}
              {item.product_note && (
                <tr>
                  <td style={{ textAlign: "left" }}>{item.product_note}</td>
                  <td />
                  <td />
                  <td />
                </tr>
              )}
            </>
          ))}
      </table> */}
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.row}>
          <div style={styles.column}>Produk</div>
          <div style={{ ...styles.column, textAlign: "center" }}>
            <span>Qty</span>
          </div>
          <div style={styles.column}>Harga</div>
          <div style={{ ...styles.column, textAlign: "right" }}>Total</div>
        </div>

        {/* Data */}
        {data &&
          data.detil &&
          data.detil.map((item) => (
            <>
              {/* Produk */}
              <div style={styles.row}>
                <div style={styles.column}>{item.product_name}</div>
                <div style={{ ...styles.column, textAlign: "center" }}>
                  {item.product_qty}
                </div>
                <div style={styles.column}>
                  {convertCurrency(item.product_base_price)}
                </div>
                <div style={{ ...styles.column, textAlign: "right" }}>
                  {convertCurrency(item.product_total_price)}
                </div>
              </div>

              {/* Customize */}
              {item.customize.length > 0 &&
                item.customize.map((customize) => (
                  <div style={styles.row} key={customize.customize_name}>
                    <div style={styles.column}>
                      {`${customize.customize_name}: ${customize.pilihan_name}`}
                    </div>
                    <div style={{ ...styles.column, textAlign: "center" }} />
                    <div style={styles.column}>
                      {convertCurrency(customize.pilihan_price)}
                    </div>
                    <div style={{ ...styles.column, textAlign: "right" }} />
                  </div>
                ))}

              {/* Note */}
              {item.product_note && (
                <div style={styles.row}>
                  <div style={styles.column}>{item.product_note}</div>
                  <div style={{ ...styles.column, textAlign: "center" }} />
                  <div style={styles.column} />
                  <div style={{ ...styles.column, textAlign: "right" }} />
                </div>
              )}
            </>
          ))}
      </div>

      <table style={tableWrapper}>
        <tr style={{ columnSpan: 2 }}>
          <td style={{ textAlign: "left" }}>Subtotal</td>
          <td style={{ textAlign: "right" }}>
            {convertCurrency(data.sub_total)}
          </td>
        </tr>
        <tr style={{ columnSpan: 2 }}>
          <td style={{ textAlign: "left" }}>Biaya Layanan</td>
          <td style={{ textAlign: "right" }}>
            {convertCurrency(data.service_fee)}
          </td>
        </tr>
        <tr style={{ columnSpan: 2 }}>
          <td style={{ textAlign: "left" }}>Biaya Platform</td>
          <td style={{ textAlign: "right" }}>{convertCurrency(data.fee)}</td>
        </tr>
        <tr style={{ columnSpan: 2 }}>
          <td style={{ textAlign: "left" }}>Diskon</td>
          <td style={{ textAlign: "right" }}>
            {convertCurrency(data.discount || 0)}
          </td>
        </tr>
        {data &&
          data.addon_price &&
          data.addon_price.map((item) => (
            <tr style={{ columnSpan: 2 }}>
              <td style={{ textAlign: "left" }}>{item.name}</td>
              <td style={{ textAlign: "right" }}>
                {convertCurrency(item.price)}
              </td>
            </tr>
          ))}
        <tr style={{ columnSpan: 2 }}>
          <td style={{ textAlign: "left" }}>Total Biaya Lainnya</td>
          <td style={{ textAlign: "right" }}>
            {convertCurrency(data.addon_total)}
          </td>
        </tr>
        <tr style={{ columnSpan: 2 }}>
          <td style={{ textAlign: "left", fontWeight: 600 }}>Total</td>
          <td style={{ textAlign: "right", fontWeight: 600 }}>
            {convertCurrency(data.total)}
          </td>
        </tr>
        <tr style={{ columnSpan: 2 }}>
          <td style={{ textAlign: "left" }}>Metode Pembayaran</td>
          <td style={{ textAlign: "right" }}>{data?.payment_method?.name}</td>
        </tr>
      </table>

      <table style={tableWrapper}>
        <th style={{ height: "80px" }}>
          Terima Kasih, Selamat Belanja Kembali.
          <br />
          Barang yang sudah dibeli tidak dapat ditukar/dikembalikan.
        </th>
      </table>

      <div style={{ paddingBottom: "50px" }}>
        <table style={tableWrapper}>
          <tr style={{ columnSpan: 6, width: "100%" }}>
            <td>
              <IconInstagram />
            </td>
            <td style={{ textAlign: "left", width: "70%" }}>
              {data.instagram || "-"}
            </td>
            <td />
            <td />
            <td />
            <td />
          </tr>
        </table>
        <table style={tableWrapper}>
          <tr style={{ columnSpan: 6, width: "100%" }}>
            <td>
              <IconFacebook />
            </td>
            <td style={{ textAlign: "left", width: "70%" }}>
              {data.facebook || "-"}
            </td>
            <td />
            <td />
            <td />
            <td />
          </tr>
        </table>
        <table style={tableWrapper}>
          <tr style={{ columnSpan: 6, width: "100%" }}>
            <td>
              <IconGlobe />
            </td>
            <td style={{ textAlign: "left", width: "70%" }}>
              {data.website || "-"}
            </td>
            <td />
            <td />
            <td />
            <td />
          </tr>
        </table>
      </div>
    </div>
  );
};

StrukTransaksi.propTypes = {
  data: PropTypes.object,
};

StrukTransaksi.defaultProps = {
  data: {},
};
