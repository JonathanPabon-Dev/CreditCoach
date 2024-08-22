import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Table = ({
  loanAmount = 1300000,
  months = 12,
  interest = 2,
  managementFee = 0,
}) => {
  const [report, setReport] = useState([]);

  useEffect(() => {
    const reportData = [];
    let balance = loanAmount;
    const monthlyFee = loanAmount / months;
    let interestFee;
    const manageFee = managementFee;
    let totalFee;

    for (let i = 0; i < months; i++) {
      const month = i + 1;

      interestFee = balance * (interest / 100);
      totalFee = monthlyFee + interestFee + manageFee;
      balance = balance - monthlyFee;

      reportData.push({
        month,
        monthlyFee,
        interestFee,
        manageFee,
        totalFee,
        balance,
      });
    }

    setReport(reportData);
  }, [loanAmount, months, interest, managementFee]);

  return (
    <div className="max-h-[60dvh] w-[90%] overflow-auto text-nowrap rounded-xl border-2 p-3 md:w-[70%]">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-2 pb-2">Month</th>
            <th className="px-2 pb-2">Monthly Fee</th>
            <th className="px-2 pb-2">Interest Fee</th>
            {managementFee !== 0 && (
              <th className="px-2 pb-2">Management Fee</th>
            )}
            <th className="px-2 pb-2">Total Fee</th>
            <th className="px-2 pb-2">Balance</th>
          </tr>
        </thead>
        <tbody>
          {report.map((row, index) => (
            <tr key={index} className="text-center">
              <td className="px-5">{row.month}</td>
              <td className="px-5">
                ${" "}
                {parseFloat(row.monthlyFee).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className="px-5">
                ${" "}
                {parseFloat(row.interestFee).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              {managementFee !== 0 && (
                <td className="px-5">
                  ${" "}
                  {parseFloat(row.manageFee).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              )}
              <td className="bg-slate-800 px-5">
                ${" "}
                {parseFloat(row.totalFee).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className="px-5">
                ${" "}
                {parseFloat(row.balance).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  loanAmount: PropTypes.number.isRequired,
  months: PropTypes.number.isRequired,
  interest: PropTypes.number.isRequired,
  managementFee: PropTypes.number,
};

export default Table;
