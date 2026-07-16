import heroLogo from '@/assets/hero.png'
import { useEffect, useRef, useState } from 'react'
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getUsersPaging, getUsersLoading, getUsersMutipleLoading } from "@/services/usersApi"
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import { formatPhone } from "@/utils/format"
import { useVirtualizer } from '@tanstack/react-virtual';

export default function Ex() {

  const [pagePaging, setPagePaging] = useState(1);
  let limit = 5;
  
  const { data: userList, isPending, error } = useQuery({
    queryKey: ["usersPaging", pagePaging],
    queryFn: () => getUsersPaging({
      page: pagePaging,
      limit: limit,
    }),
  });    

  const limitPaging = Math.ceil(userList?.total / limit); 

  // 
  
  const loadingMoreRef = useRef(null); 

  const {
    data: usersLoad,
    isPending: isPendingLoad,
    error: errorLoad,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({

    queryKey: ["users"],
    initialPageParam: 1,

    queryFn: ({ pageParam }) => 
      getUsersLoading({
        pageParam,
        limit: limit,
      }),
    getNextPageParam: (
      lastPage
    ) => {
      const loadedItems = lastPage.page * lastPage.limit;
      return loadedItems < lastPage.total ? lastPage.page + 1 : undefined;
    }
  })  

  useEffect(() => {

    const current =
      loadingMoreRef.current;

    if (!current) return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {

          if (
            entry.isIntersecting &&
            hasNextPage &&
            !isFetchingNextPage
          ) {

            fetchNextPage();

          }

        },
        {
          rootMargin: "200px",
        }
      );

      observer.observe(current);

      return () => {
        observer.disconnect();
      };

    }, [hasNextPage, isFetchingNextPage, fetchNextPage,
  ]);

  // #section3

  const {
    data: usersLoadMutiple,
    fetchNextPage: fetchNextPage01,
    hasNextPage: hasNextPage01,
    isFetchingNextPage: isFetchingNextPage01,
  } = useInfiniteQuery({
    queryKey: ["usersMutiple"],
    initialPageParam: 1,

    queryFn: ({ pageParam }) => getUsersMutipleLoading({
      pageParam,
      limit: 20
    }),

    getNextPageParam: lastPage => {
      const loaded = lastPage.page * lastPage.limit;
      return loaded < lastPage.total ? lastPage.page + 1 : undefined;
    }
  })

  console.log(usersLoadMutiple, 'usersLoadMutiple 11111');  

  const allMutipleUsers = usersLoadMutiple?.pages.flatMap(
    page => page.users
  ) ?? [];

  const mutipleRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: allMutipleUsers.length,
    getScrollElement: () => mutipleRef.current,
    estimateSize: () => 60,
    overscan: 5, // Render thêm bao nhiêu item nằm ngoài vùng nhìn thấy (viewport) => hạn chế việc render ngay lập tức gây dựt 
  })

  console.log(allMutipleUsers, 'mutipleUsers');
  
  console.log(rowVirtualizer.getVirtualItems(), 'rowVirtualizer');

  const virtualItems = rowVirtualizer.getVirtualItems();

  useEffect(() => {
    const lastItem = virtualItems[virtualItems.length - 1];
    if(!lastItem) return;

    // allMutipleUsers length of array
    if(lastItem.index >= allMutipleUsers.length - 2 && hasNextPage01 && !isFetchingNextPage01) {
      fetchNextPage01();
    }
  }, [virtualItems, allMutipleUsers.length, hasNextPage])

  // #section1
  if(isPendingLoad) { 
    return <p>Loading #section1...</p>
  }

  // #section1
  if(errorLoad) {
    return <p>Error of loading #section1...</p>
  }

  return (
    <>
      <section className='pb-5' id='section2'>
        <div className="container">
          <div className="border p-5 pb-0">          
            <div className="overflow-x-auto h-[600px]">
              <table className="w-full">
                <thead>
                  <tr>
                    <td className="px-3 text-left">No</td>
                    <td className="px-3 text-left">name</td>
                    <td className="px-3 text-left">username</td>
                    <td className="px-3 text-left">email</td>
                    <td className="px-3 text-left">phone</td>
                  </tr>
                </thead>
                <tbody>
                  {
                    userList?.paging.map((item, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2 text-left">{(pagePaging * limit) - limit + (index + 1)}</td>
                        <td className="px-3 py-2 text-left">{item.name}</td>
                        <td className="px-3 py-2 text-left">{item.username}</td>
                        <td className="px-3 py-2 text-left">{item.email}</td>
                        <td className="px-3 py-2 text-left">{item?.phone ? formatPhone(item.phone.value, item.phone.countryCode) : '-'}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
            <div className="flex gap-2 justify-center border-t-1 border-dashed mt-10 py-5">
              <button type="button" className='btn inline-block mx-1' disabled={pagePaging === 1} onClick={() => setPagePaging(1)}>
                <ChevronsLeft size={20} />
              </button>
              <button type="button" className='btn inline-block mx-1' disabled={pagePaging === 1} onClick={() => setPagePaging((prev) => prev - 1)}>
                <ChevronLeft size={20} />
              </button>
              <button type="button" className='btn inline-block mx-1' disabled={pagePaging === limitPaging } onClick={() => setPagePaging((prev) => prev + 1)}>
                <ChevronRight size={20} />
              </button>
              <button type="button" className='btn inline-block mx-1' disabled={pagePaging === limitPaging } onClick={() => setPagePaging(limitPaging)}>
                <ChevronsRight size={20} />
              </button>
              <p>Page: {pagePaging}</p>
            </div>
          </div>        
        </div>
      </section>

      {/* loading with mutiple item < 10.000 */}
      <section className='pb-5' id='section1'>
        <div className="container">
          <div className="border overflow-y-auto h-[400px]">
            {
              usersLoad?.pages.map((page) => 
                page.users.map((item, index) => (
                  <div key={index}>
                    <p> 
                      { (page.page * limit) - limit + (index + 1) } ---- 
                      {item?.name}</p>
                    <img 
                      src={heroLogo} 
                      alt="img" 
                      style={{ margin: "50px auto", display: "block" }} 
                      width={150}
                    />
                  </div>
                ))
              )            
            }

            {hasNextPage && (
              <div
                ref={loadingMoreRef}
                style={{
                  padding: "30px",
                  textAlign: "center",
                }}
              >
                {isFetchingNextPage
                  ? "Loading..."
                  : "Scroll xuống"}
              </div>
            )}

            {!hasNextPage && (
              <div
                style={{
                  padding: "30px",
                  textAlign: "center",
                }}
              >
                End Data
              </div>
            )}
            
          </div>   
        </div>
      </section>

      {/* loading with mutiple item >= 10.000 */}
      <section className='pb-5' id='section3'>
        <div className="container">
          <div className="border">
            <div ref={mutipleRef} className='overflow-y-auto h-[300px]'>
              <div
                style={{
                  height: rowVirtualizer.getTotalSize(),
                  position: "relative"
                }}>
                  {
                    virtualItems.map(virtualRow => {
                      const getUserMutiple = allMutipleUsers[virtualRow.index];

                      return (
                        <div 
                          key={getUserMutiple.id}
                          style={{
                            position: "absolute",
                            transform: `translateY(${virtualRow.start}px)`,
                            height: virtualRow.size,
                            width: "100%"
                          }}
                        >
                          { getUserMutiple.name }
                        </div>
                      )
                    })
                  }
              </div>

              {hasNextPage01 && (
                <div
                  style={{
                    padding: "30px",
                    textAlign: "center",
                  }}
                >
                  {isFetchingNextPage01
                    ? "Loading..."
                    : "Scroll xuống"}
                </div>
              )}

              {!hasNextPage01 && (
                <div
                  style={{
                    padding: "30px",
                    textAlign: "center",
                  }}
                >
                  End Data
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// if(!!window.IntersectionObserver){
//     let observer = new IntersectionObserver((entries, observer) => { 
//         // entries : Danh sách các đối tượng chúng ta theo dỏi
//         entries.forEach(entry => {
//         // Kiểm tra ảnh của chúng ta có trong vùng nhìn thấy không
//         if(entry.isIntersecting){
//                 /* Lấy dử liệu từ data-src mà chúng ta đã gán trước đó sau đó gàn vào thuộc
//                 tính src của ảnh , lúc này thì ảnh mới bắt đầu tải về  * /
//             entry.target.src = entry.target.dataset.src;
//             observer.unobserve(entry.target);
//         }
//         });
//     }, {rootMargin: "0px 0px -200px 0px"});
//     document.querySelectorAll('img').forEach(img => { observer.observe(img) });
// }
// else document.querySelector('#warning').style.display = 'block';