

export default function Sidebar1Skeleton() {
  return (
    <section className="firsts mx-2 sticky top-0">
      <div className="bg-linear-to-b from-blue-500 from-25% to-white to-25% rounded-2xl shadow p-5 mt-10 h-fit animate-pulse">

       
        <div className="flex justify-between items-center">

          <div className="flex items-center gap-3">
           
            <div className="size-20 rounded-full bg-gray-300 border"></div>

           
            <div>
              <div className="h-4 w-28 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-20 bg-gray-200 rounded"></div>
            </div>
          </div>

          
          <div className="h-10 w-36 bg-gray-300 rounded-lg"></div>
        </div>

       
        <div className="h-10 w-48 bg-gray-300 rounded-lg mt-8"></div>

        
        <div className="flex justify-between mt-10">
          {[1, 2, 3].map((item) => (
            <div key={item} className="text-center">
              <div className="h-5 w-8 bg-gray-300 rounded mx-auto mb-2"></div>
              <div className="h-3 w-16 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}