import React from "react";
import { labelDiv,
  tagihanWrapper,
  tagihan,
  textWrapper,
  spanStyled } from "./style"


export const VaMandiriContent = () => {
  return (
    <labelDiv>
      <tagihanWrapper>
        <tagihan>
          <textWrapper>
            • Tagihan ini akan otomatis gantikan tagihan Mandiri Virtual Account yang belum dibayar (jika ada).
            <br />
            • Kamu akan mendapatkan
            {" "}
          </textWrapper>
          <spanStyled>kode pembayaran </spanStyled>
          <textWrapper>setelah klik</textWrapper>
          <spanStyled>
            {" "}
            “Bayar”.
            <br />
          </spanStyled>
          <textWrapper>
            • Total tagihan belum termasuk biaya transaksi.
            <br />
            • Pastikan kamu bayar sesuai bank yang dipilih agar transaksi kamu lancar.
          </textWrapper>
        </tagihan>
      </tagihanWrapper>
    </labelDiv>
  );
};
