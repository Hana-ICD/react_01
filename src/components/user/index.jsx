import { Activity, useMemo, useState, useCallback, useEffect, useRef } from "react";
import { Link, replace, useLocation } from "react-router-dom";
import { getUsers, addUser, deleteUser, getUsersAxios, addUserA, deleteUserA } from "@/services/usersApi"
import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import { formatPhone } from "@/utils/format"
import {  useNavigate } from "react-router-dom"

// const svGetUsers = await getUsers();
// const svGetUsers = await getUsersAxios();
// svGetUsers: return array  // queryFn: need function => getUsersAxios return function

function Users() {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate()

  const {
    data: users, 
    isLoading, 
    isError,
    error
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersAxios,
  });    

  const delMutation = useMutation({
    mutationFn: deleteUserA,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["users"]
      })
      alert(data?.message)
    },
    onError: (error) => {
      console.log(
        "Error: ", error.response?.data?.message
      );
      alert(error.response?.data?.message);
    }
  })

  const handelDelUser = (id) => {
    const confirmDelete = window.confirm("Are you sure delete this?");
    if(!confirmDelete) {
      return;
    }

    try {
      delMutation.mutate(id)
    } 
    catch (error) {
      throw new Error("Error!: ", error)
    }    
  }
  
  // const [isLoading, setIsLoading] = useState(false);
  // const [err, setErr] = useState(null)
  // const [users, setUsers] = useState([])  

  // const [showAddUser, setShowAddUser] = useState(false);

  // const fetchUsers = async () => {
  //   try {
  //     setIsLoading(true);            
  //     setUsers(svGetUsers);      
  //   }
  //   catch (err) {
  //     console.log(err, 'error');   
  //     setErr(err.message)
  //   }
  //   finally {
  //     setIsLoading(false);
  //   }
  // } 

  // const handelDeleteUser = async (id) => {     
  //   const confirmDelete = window.confirm("Are you sure delete this?");
  //   if(!confirmDelete) {
  //     return;
  //   }
  //   try {
  //     // await deleteUser(id);
  //     await deleteUserA(id);
  //     // alert(`User ${name} deleted successful`);
  //     // setUsers((prev) => prev.filter(user => user.id !== id ))
  //   } 
  //   catch (error) {
  //     throw new Error("Error!: ", error)
  //   }
  // }  

  const [search, setSearch] = useState("");
  const filterUser = useMemo(() => {
    console.log("Run search...");
    
    return users?.filter(
      (user) => 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.website.toLowerCase().includes(search.toLowerCase()) ||
        user.company?.name.toLowerCase().includes(search.toLowerCase()) 
    );
  }, [users, search]);

  // console.log(filterUser, 'filterUser');

  // const filterUser = () => {
  //   console.log("Run search... not useMemo");
    
  //   return users?.filter(
  //     (user) => 
  //       user.name
  //         .toLowerCase()
  //         .includes(search.toLowerCase())
  //   );
  // }

  const [checkbox, setCheckbox] = useState({});

  const handleCb = useCallback((id, value) => {    
    // const newCb = {}
    // newCb[id] = {
    //   status: value
    // }
    setCheckbox(
      (prev) => ({
        ...prev,
        [id]: {
          status: value
        }
      })
    );
  }, [])

  const rowRefs = useRef({});

  const highLightId = location?.state?.highlightId;

  useEffect(() => {    
    if(!highLightId) return; 

    // If row in last of table => scroll to row has added
    rowRefs.current[highLightId]?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    })  
    
    rowRefs.current[highLightId]?.classList.add("highlight");

    const timer = setTimeout(() => {
      navigate(location.pathname, {
        replace: true,
        state: {}
      })
      rowRefs.current[highLightId]?.classList.remove("highlight");
    }, 3000);

    () => clearTimeout(timer); // clear time must () =>

  }, [users])
  
  if(isError) {
    return <div className="container"><p>Error: <br/>{error.message}</p></div>
  }

  if(isLoading) {
    return <div className="container"><p>Loading...</p></div>
  }

  return (
    <section>
      <div className="container my-5">        
        <div className="flex justify-between">
          <h3>Users</h3>
          <input type="type" name="" value={search} onChange={(e) => {
            setSearch(e.target.value)
          }} placeholder="Filter by text..." className="input" />
          <Link to='/users/add' className="underline hover:no-underline">Add new user</Link>
        </div>
        {
          filterUser && (
            <div className="card">
              <div className="w-full overflow-x-auto h-[600px]">
                <table className="w-full min-w-max table-auto">
                  <thead>
                    <tr>
                      <td className="px-3">No</td>
                      <td className="px-3">Check</td>
                      <td className="px-3">Status</td>
                      <td className="px-3">name</td>
                      <td className="px-3">username</td>
                      <td className="px-3">email</td>
                      <td className="px-3">address</td>
                      <td className="px-3">phone</td>
                      <td className="px-3">website</td>
                      <td className="px-3">company</td>
                      <td className="px-3">action</td>
                    </tr>
                  </thead>
                  <tbody>
                    {filterUser.map((item, index) => (
                      <tr key={`${index}_${item.name}`} 
                        ref={ (el) => rowRefs.current[item._id] = el} 
                      >
                        <td className="px-3 py-2">{index + 1}</td>
                        <td className="px-3 py-2">
                          <input type="checkbox" name="" value={checkbox[item._id]} onChange={
                            (e) => {
                              handleCb(item._id, e.target.checked);                           
                            }
                          } />
                        </td>
                        <td className="px-3 py-2">
                          <span>
                            {checkbox[item._id]?.status ? 'Active' : 'Deactive' }
                          </span>
                        </td>
                        <td className="px-3 py-2">{item.name}</td>
                        <td className="px-3 py-2">{item.username}</td>
                        <td className="px-3 py-2">{item.email}</td>                  
                        <td className="px-3 py-2">
                          {
                            item.address && (
                              <>
                                <span>{item?.address?.zipcode ? item?.address?.zipcode : ''}</span>
                                <span>{item?.address?.suite ? ', ' + item?.address?.suite + ' suite': ''}</span>
                                <span>{item?.address?.street ? ', ' + item?.address?.street + ' street': ''}</span>
                                <span>{item?.address?.city ? ', ' + item?.address?.city + ' city' : ''}</span>
                                <span>{item?.address?.geo?.lat ? ' - ' + item?.address?.geo?.lat : ''}</span>
                                <span>{item?.address?.geo?.lng ? ' - ' + item?.address?.geo?.lng : ''}</span>
                              </>                              
                            )
                          }
                        </td>
                        <td className="px-3 py-2">{item?.phone ? formatPhone(item.phone.value, item.phone.countryCode) : '-'}</td>
                        <td className="px-3 py-2">{item?.website ? item?.website : '-'}</td>
                        <td className="px-3 py-2">
                          {
                            item?.company 
                              ? 
                                (item?.company?.name) 
                                  ? item?.company?.name + ' - ' + item?.company?.catchPhrase + ' - ' + item?.company?.bs 
                                  : '-'
                              : '-'
                          }
                          </td>
                        <td className="px-3 py-2">
                          <Link to={`/users/${item._id}`}>Edit</Link>
                        </td>
                        <td className="py-2 px-3">
                          {/* <button type="button" className="btn" onClick={() => {handelDeleteUser(item.id, item.name)}}>Delete</button> */}
                          <button type="button" className="btn" onClick={() => {handelDelUser(item._id)}}>Delete</button>
                        </td>
                      </tr>
                    ))}                           
                  </tbody>
                </table>
              </div>
            </div>  
          )
        } 
      </div>   
    </section>
  )
}
export default Users;