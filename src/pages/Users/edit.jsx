import Layout from "@/components/layouts"
import { useParams, useNavigate } from "react-router-dom"
import { ChevronLeft } from 'lucide-react';
import { useQuery } from "@tanstack/react-query";
import { getDetailA } from "@/services/usersApi"
import EditC from "@/components/user/edit"

export default function Edit() {
  const navigate = useNavigate()

  const { id } = useParams();

  const { data: user } = useQuery({
    queryKey: ["userDetail", id],
    queryFn: () => getDetailA(id)
  })
  
  return (
    <Layout>
      <section>
        <div className="container">
          <div className="py-3">
            <button onClick={() => {navigate(-1)}} className="underline hover:no-underline cursor-pointer">
              <ChevronLeft className="inline-block" />              
              <span>Back</span>
            </button>
          </div>         
        </div>
      </section>

      <section>
        <div className="container">
          <EditC id={id} user={user?.data} />
        </div>
      </section>      

    </Layout>
  )
}