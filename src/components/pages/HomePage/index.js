import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { LoginTemplate, LoginForm } from "components";
import {
  convertPhoneNumber,
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
  removeCookie,
  setCookie,
} from "../../../services/utils";

export default function HomePage() {
  const history = useHistory();
  const [values, setValues] = useState({
    username: null,
    phone: null,
    email: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const onChange = (id, e) => {
    setValues((prev) => ({ ...prev, [id]: e }));
  };

  const onClick = (id) => {
    const loginPayload = { ...values, phone: convertPhoneNumber(values.phone) };

    if (id === "masuk") {
      if (!loginPayload.username && !loginPayload.phone) {
        Swal.fire({
          title: "Oops",
          icon: "warning",
          text: "Masukan nama dan nomor telepon",
        });
      } else if (!loginPayload.username) {
        Swal.fire({
          title: "Oops",
          icon: "warning",
          text: "Nama tidak bisa kosong",
        });
      } else if (!loginPayload.phone) {
        Swal.fire({
          title: "Oops",
          icon: "warning",
          text: "Masukan nomor telepon dengan format yang benar",
        });
      } else if (!isValidEmail(loginPayload.email)) {
        Swal.fire({
          title: "Oops",
          icon: "warning",
          text: "Format email tidak valid",
        });
      } else if (!isValidPhoneNumber(loginPayload.phone)) {
        Swal.fire({
          title: "Oops",
          icon: "warning",
          text: "Format nomor telepon tidak valid",
        });
      } else if (!isValidName(loginPayload.username)) {
        Swal.fire({
          title: "Oops",
          icon: "warning",
          text: "Maksimal nama 25 karakter",
        });
      } else {
        setCookie("user", JSON.stringify(loginPayload));
        history.push("/menu");
      }
    }
  };

  useEffect(() => {
    // Tampilkan loading spinner
    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Bersihkan cookie
    removeCookie("user");
    removeCookie("rest_info");
    removeCookie("order");
    removeCookie("order-data");
    removeCookie("order-payment");
    removeCookie("init");
    removeCookie("seat");

    // Cek query params
    if (history.location.search) {
      const query = new URLSearchParams(history.location.search);
      const tenantId = query.get("tenant_id");
      const seat = query.get("nomor");
      const trans_id = query.get("trans_order_id");

      if (trans_id) {
        setCookie("init", JSON.stringify({ trans_id }));
        Swal.close(); // Tutup loading spinner
        history.push({
          pathname: "./checkout",
          state: { data: { id: trans_id } },
        });
      } else if (tenantId) {
        const params = { tenantId, seat: seat || null };
        setCookie("init", JSON.stringify(params));
        setIsLoading(false); // Selesai loading
        Swal.close(); // Tutup loading spinner
      } else {
        Swal.close(); // Tutup loading spinner
        history.push("/not-found");
      }
    } else {
      Swal.close(); // Tutup loading spinner
      history.push("/not-found");
    }
  }, [history]);

  if (isLoading) {
    return null; // Jangan render apapun, karena Swal sudah menangani loading.
  }

  return (
    <LoginTemplate>
      <LoginForm
        values={values}
        onChange={onChange}
        onClick={onClick}
      />
    </LoginTemplate>
  );
}
