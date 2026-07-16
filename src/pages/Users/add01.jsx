import Layout from "@/components/layouts";
import { useQuery } from "@tanstack/react-query";
import { getUsersAxios } from "@/services/usersApi"

import AddC from "@/components/user/add01"

function Add() {

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersAxios
  })

  return (
    <Layout>
      <div className="container">        
        <AddC users={users} />
      </div>
    </Layout>
  )
}

export default Add;