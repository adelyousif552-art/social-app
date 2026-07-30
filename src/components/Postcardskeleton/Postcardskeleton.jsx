export default function PostCardSkeleton() {
  return (
    <div className="bg-white shadow-2xl p-3 mt-2 rounded-xl animate-pulse">
      
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-3 items-center">
          <div className="size-12 rounded-full bg-gray-300"></div>

          <div className="space-y-2">
            <div className="h-4 w-32 rounded bg-gray-300"></div>
            <div className="h-3 w-20 rounded bg-gray-200"></div>
          </div>
        </div>

        <div className="size-5 rounded bg-gray-300"></div>
      </div>

     
      <div className="space-y-3">
        <div className="h-4 w-full rounded bg-gray-300"></div>
        <div className="h-4 w-5/6 rounded bg-gray-300"></div>

       
        <div className="w-full h-96 rounded-lg bg-gray-300"></div>

        
        <div className="flex justify-between">
          <div className="h-4 w-20 rounded bg-gray-300"></div>
          <div className="h-4 w-24 rounded bg-gray-300"></div>
        </div>

        
        <div className="grid grid-cols-3 gap-2">
          <div className="h-10 rounded bg-gray-300"></div>
          <div className="h-10 rounded bg-gray-300"></div>
          <div className="h-10 rounded bg-gray-300"></div>
        </div>

        
        <div className="flex gap-3 items-center mt-4">
          <div className="size-10 rounded-full bg-gray-300"></div>
          <div className="h-10 flex-1 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
}