import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import { usePathname } from 'src/routes/hooks';

import instance from 'src/components/api/api-instance';

import { UserForm } from 'src/sections/user/form';

// ----------------------------------------------------------------------

const UserCreatePage = () =>{

  const [userData, setUserdata] = useState();

  const pathname = usePathname();

  const { id = '' } = useParams();

  const isEdit = pathname.includes('edit');
  
  useEffect(() => {

    const getData = async () => {
      await instance.get(`users/${id}`).then(({data}) => setUserdata(data)).catch(err => console.log(err))
    }
    
    getData();
  },[id]);
  
  return (
    <>
      <Helmet>
        <title> User | {isEdit ? 'Update' : 'Create'} </title>
      </Helmet>

      <UserForm isEdit={isEdit} userData ={userData} />
    </>
  )
}
export default UserCreatePage