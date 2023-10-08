import { Button, Stack, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const AddAadmi = () => {
  const api = "http://localhost:1969"
  const [data, setData] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        address: '',
        fbAvatar: '',
        accountBalance: '',
        age: '',
        expireince: '',
        image: '',
        Detail: '',
        id: '',
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            fetch(api + '/' + id).then((res) => {
                return res.json()
            }).then((data) => {
                setData(data)
            })
        }
    }, [id]);

    const handleTextFieldChange = (e, field) => {
        setData({
            ...data,
            [field]: e.target.value
        });
    };
    const onEdit =() => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
              navigate('/')
            }
          })
    }
    return (
        <>
            <Stack rowGap={2} columnGap={2}>
                    {['firstName', 'lastName', 'mobileNumber', 'address', 'fbAvatar', 'accountBalance', 'age', 'expireince', 'image', 'Detail'].map((temp) => {
                        return <TextField id="outlined-basic" value={data[temp]} label={temp} variant="outlined" onChange={(e) => {
                                handleTextFieldChange(e, temp)
                            }} />

                    })}
                <Button onClick={() => {
                    if (id) {

                        fetch(api+'/'+id, { method: 'PUT', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }).then((res) => { navigate('/person/id/'+id) })
                    } else {
                        fetch(api, { method: 'Post', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }).then((res) => { navigate('/') })
                    }
                }} variant="contained">Submit</Button>
                <Button variant="contained" color='error' onClick={()=>{
                    onEdit();
                }} >Cancel</Button>
            </Stack>
        </>
    )
}

export default AddAadmi