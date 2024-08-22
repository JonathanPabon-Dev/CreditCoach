import { useState } from "react";
import PropTypes from "prop-types";

const Form = ({ onSubmit }) => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState(2);
  const [repaymentPeriod, setRepaymentPeriod] = useState(12);
  const [managementFee, setManagementFee] = useState(false);
  const [managementFeeValue, setManagementFeeValue] = useState("");

  const handleLoanAmountChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    const formattedValue = formatCurrency(value);
    setLoanAmount(formattedValue);
  };

  const handleInterestRateChange = (e) => {
    setInterestRate(e.target.value);
  };

  const handleRepaymentPeriodChange = (e) => {
    setRepaymentPeriod(e.target.value);
  };

  const handleManagementFeeChange = (e) => {
    setManagementFee(e.target.checked);
  };

  const handleManagementFeeValueChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    const formattedValue = formatCurrency(value);
    setManagementFeeValue(formattedValue);
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    const formData = {
      loanAmount: parseInt(loanAmount.replaceAll(",", "")),
      interest: parseFloat(interestRate),
      months: parseInt(repaymentPeriod),
      managementFee: managementFeeValue
        ? parseInt(managementFeeValue.replaceAll(",", ""))
        : 0,
    };
    onSubmit(formData);
  };

  const formatCurrency = (value) => {
    const intValue = parseInt(value, 10);
    if (isNaN(intValue)) return "";
    return `${intValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  const tenureOptions = [];

  for (let i = 12; i <= 72; i += 12) {
    tenureOptions.push(
      <option value={i} key={i}>
        {i}
      </option>,
    );
  }

  return (
    <>
      <form
        className="mt-10 flex w-full flex-col items-center gap-5"
        onSubmit={handleCalculate}
      >
        <div className="flex w-full flex-col items-center gap-x-3 gap-y-1 lg:flex-row">
          <label
            htmlFor="value"
            className="w-full font-semibold lg:w-[30%] lg:text-right"
          >
            Amount
          </label>
          <div className="flex w-full items-center gap-3">
            <input
              type="text"
              name="value"
              id="value"
              value={loanAmount}
              onChange={handleLoanAmountChange}
              className="w-[80%] rounded-md p-2 outline-none dark:bg-slate-700"
              required
            />
            <span className="w-[20%]">$</span>
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-x-3 gap-y-1 lg:flex-row">
          <label
            htmlFor="interest"
            className="w-full font-semibold lg:w-[30%] lg:text-right"
          >
            Interest
          </label>
          <div className="flex w-full items-center gap-3">
            <input
              type="number"
              name="interest"
              id="interest"
              min="0"
              step="0.01"
              value={interestRate}
              onChange={handleInterestRateChange}
              className="w-[80%] rounded-md p-2 outline-none dark:bg-slate-700"
              required
            />
            <span className="w-[20%]">%</span>
          </div>
        </div>
        <div className="flex w-full flex-col items-center gap-x-3 gap-y-1 lg:flex-row">
          <label
            htmlFor="tenure"
            className="w-full font-semibold lg:w-[30%] lg:text-right"
          >
            Tenure
          </label>
          <div className="flex w-full items-center gap-3">
            <select
              name="tenure"
              id="tenure"
              value={repaymentPeriod}
              onChange={handleRepaymentPeriodChange}
              className="w-[80%] rounded-md p-2 outline-none dark:bg-slate-700"
              required
            >
              {tenureOptions}
            </select>
            <span className="w-[20%]">Months</span>
          </div>
        </div>
        <div className="flex w-full items-center gap-3">
          <label
            htmlFor="managementFee"
            className="w-[30%] font-semibold lg:text-right"
          >
            Manage Fee
          </label>
          <div className="flex w-full items-center gap-3">
            <input
              type="checkbox"
              name="managementFee"
              id="managementFee"
              checked={managementFee}
              onChange={handleManagementFeeChange}
            />
          </div>
        </div>
        {managementFee && (
          <div className="flex w-full flex-col items-center gap-x-3 gap-y-1 lg:flex-row">
            <label
              htmlFor="managementFeeValue"
              className="w-full font-semibold lg:w-[30%] lg:text-right"
            >
              Fee Value
            </label>
            <div className="flex w-full items-center gap-3">
              <input
                type="text"
                name="managementFeeValue"
                id="managementFeeValue"
                value={managementFeeValue}
                onChange={handleManagementFeeValueChange}
                className="w-[80%] rounded-md p-2 outline-none dark:bg-slate-700"
                required
              />
              <span className="w-[20%]">$</span>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-fit rounded-lg px-4 py-3 font-semibold uppercase dark:bg-slate-800 dark:hover:bg-slate-700"
        >
          Calculate
        </button>
      </form>
    </>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func,
};

export default Form;
