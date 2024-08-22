import { useState } from "react";
import Form from "./components/Form";
import Table from "./components/Table";

const App = () => {
  const [data, setData] = useState({});
  const [showTable, setShowTable] = useState(false);

  const handleSubmit = (formData) => {
    console.log(formData);
    setData(formData);
    setShowTable(true);
  };

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-10 bg-slate-100 px-5 py-10 text-slate-900 lg:flex-row dark:bg-slate-900 dark:text-slate-100">
        <div className="flex flex-col items-center justify-center md:w-[50%]">
          <h1 className="text-3xl font-bold uppercase">Credit Simulator</h1>
          <Form onSubmit={handleSubmit} />
        </div>
        {showTable && (
          <Table
            loanAmount={data.loanAmount}
            months={data.months}
            interest={data.interest}
            managementFee={data.managementFee}
          />
        )}
      </div>
    </>
  );
};

export default App;
