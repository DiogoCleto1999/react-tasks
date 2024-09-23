import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "../Title";
import { ChevronLeftIcon } from "lucide-react";
useNavigate;
function DetailsTask() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const description = searchParams.get("description");
  return (
    <div className="w-screen h-screen flex flex-col items-center p-6 bg-sky-800">
      <div className="w-[500px]  space-y-4">
        <div className="relative flex items-center mb-6">
          <button onClick={() => navigate(-1)} className="absolute left-0">
            <ChevronLeftIcon />
          </button>
          <div className="flex-grow text-center">
            <Title>{name}</Title>
          </div>
        </div>

        <div className="bg-slate-200 rounded-md gap-5 ">
          <p className="text-slate-600 p-10 text-justify">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default DetailsTask;
