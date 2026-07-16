import Layout from "@/components/layouts";
import { useQuery } from "@tanstack/react-query";
import { getUsersAxios } from "@/services/usersApi"

import AddC from "@/components/user/add"

function Add() {

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersAxios
  })

  // const navigate = useNavigate()

  // const [dataForm, setDataForm] = useState({
  //   name: "",
  //   email: ""
  // })

  // const addUserSubmit = async (event) => {
  //   event.preventDefault();

  //   // const existedUser = users.some(
  //   //   (user) => user.email === dataForm.email
  //   // );    

  //   // if(existedUser) {
  //   //   alert("User existed")
  //   //   return;
  //   // }
  
  //   // const newUsers = await addUser(dataForm);    
  //   // const newUsers = await addUserA(dataForm);    
  //   // setUsers((prev) => [...prev, newUsers]);
  // }

  return (
    <Layout>
      <div className="container">
        {/* <form action="" onSubmit={handelAddUserSubmit}>
          <input className="w-full my-2" type="text" name="" value={dataForm.name} onChange={(e) => {setDataForm({...dataForm, name: e.target.value})}} placeholder="Enter new name" /><br/>
          <input className="w-full my-2" type="email" name="" value={dataForm.email} onChange={(e) => {setDataForm({...dataForm, email: e.target.value})}} placeholder="Enter new email" /><br/>
          <button type="submit" className="btn mt-3">Add new user</button>
        </form> */}
        
        <AddC users={users} />
      </div>
    </Layout>
  )
}

export default Add;