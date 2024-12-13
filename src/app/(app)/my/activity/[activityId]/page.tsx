import UpdateActivityForm from "./components/UpdateActivityForm";

interface PageProps {
  params: Promise<{ activityId: number }>;
}

const UpdateActivityPage = async ({ params }: PageProps) => {
  const { activityId } = await params;
  return (
    <div className="w-full max-w-[800px]">
      <UpdateActivityForm id={activityId} />
    </div>
  );
};

export default UpdateActivityPage;
