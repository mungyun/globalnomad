import Dropdown from "@/components/dropdown/Dropdown";

const ExampleComponent = () => {
  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl">드롭다운 사용 예시</h2>
      <Dropdown label="가격" size="big" options={options} />
      <Dropdown label="가격" size="large" options={options} />
      <Dropdown label="가격" size="medium" options={options} />
      <Dropdown label="가격" size="small" options={options} />
    </div>
  );
};

export default ExampleComponent;
