import UpdateActivityForm from "./components/UpdateActivityForm";

interface PageProps {
  params: {
    activityId: string;
  };
}

const UpdateActivityPage = ({ params }: PageProps) => {
  const { activityId } = params;
  return (
    <div className="w-full max-w-[800px]">
      <UpdateActivityForm id={activityId} />
    </div>
  );
};

export default UpdateActivityPage;
