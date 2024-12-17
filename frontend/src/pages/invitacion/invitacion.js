import React, { useEffect } from 'react'
import CardInvitacion from '../../components/CardInvitacion'
import axios from 'axios'
import { useDispatch } from "react-redux";
import { getInvitado } from '../../reducers/invitacionReducer';

export default function Invitacion() {

    const dispatch = useDispatch();

    useEffect(() => {
        getData();
      }, []);

    const getData = async()=>{
        try{
            const res = await axios.get("http://localhost:5001/api/users/6760af3fa7805eb1a5c6f025");
            dispatch(getInvitado(res.data));
        }catch(error){
            console.log(error);
        }
    };

    /* const editStatus = async()=>{
        try{
            axios.post('/user', {
                firstName: 'Fred',
                lastName: 'Flintstone'
              })
        }
    } */


  return (
    <div className='bg-[#1e4837] h-screen flex justify-center'>
        <CardInvitacion />
    </div>
  )
}
