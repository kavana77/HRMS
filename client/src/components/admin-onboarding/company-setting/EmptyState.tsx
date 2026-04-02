import Empty from "@/assets/EmptyState.png"
const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <img
        src={Empty}
        alt="No data"
        className=" h-32 mt-14 mb-4"
      />
      <p className="text-gray-500 text-sm">
        No data is currently available in the system.
      </p>
    </div>
  )
}

export default EmptyState