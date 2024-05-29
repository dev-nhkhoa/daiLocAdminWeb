import React from "react";
import { formatCurrency } from "#/lib/formatCurrency";

/* eslint-disable react/prop-types */
const DefaultColumn = (props) => {
  const { getValue, row, column } = props;

  const convertData = (column) => {
    switch (column.id) {
      case "stt":
        return row.index + 1;
      case "donGiaNhapHang":
      case "donGiaBanHang":
      case "thanhTienNhapHang":
      case "thanhTienBanHang":
        return formatCurrency(getValue());
      case "loiNhuan":
        return formatCurrency(
          row.original.thanhTienBanHang - row.original.thanhTienNhapHang,
        );
      case "thanhToan":
        return getValue() ? "Đã thanh toán" : "Chưa thanh toán";
    }
    return getValue();
  };

  const initialValue = convertData(column);
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <p>{value}</p>;
};

export default DefaultColumn;
